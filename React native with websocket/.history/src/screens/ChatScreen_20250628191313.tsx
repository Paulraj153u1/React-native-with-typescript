// src/screens/ChatScreen.tsx
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { Message } from '../types/Message';
import uuid from 'react-native-uuid';

const ChatScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket('wss://echo.websocket.events'); // public echo WebSocket

    ws.current.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.current.onmessage = (e) => {
      const newMsg: Message = {
        id: uuid.v4() as string,
        text: e.data,
        sender: 'bot',
      };
      setMessages(prev => [...prev, newMsg]);
    };

    ws.current.onerror = (err) => {
      console.error('WebSocket error', err);
    };

    ws.current.onclose = () => {
      console.log('WebSocket closed');
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  const sendMessage = () => {
    if (ws.current && input.trim() !== '') {
      const userMsg: Message = {
        id: uuid.v4() as string,
        text: input,
        sender: 'me',
      };

      ws.current.send(input);
      setMessages(prev => [...prev, userMsg]);
      setInput('');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={item.sender === 'me' ? styles.myMsg : styles.botMsg}>
            {item.sender === 'me' ? 'You: ' : 'Bot: '}
            {item.text}
          </Text>
        )}
      />
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Type a message"
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 },
  myMsg: { textAlign: 'right', marginVertical: 4, color: 'blue' },
  botMsg: { textAlign: 'left', marginVertical: 4, color: 'green' },
});
