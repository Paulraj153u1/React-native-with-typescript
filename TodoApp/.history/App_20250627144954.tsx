// App.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import { Todo } from './src/types/Todo';
// import { v4 as uuid } from 'uuid'; // install uuid for unique IDs
import uuid from 'react-native-uuid';

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>('');


const newId = uuid.v4(); // returns a string UUID

  const addTodo = () => {
    if (input.trim() === '') return;
    const newTodo: Todo = { id: newId, title: input, completed: false };
    setTodos([...todos, newTodo]);
    setInput('');
  };

  console.log('todos:', todos);
  

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Add a todo"
        value={input}
        onChangeText={setInput}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <Button title="Add" onPress={addTodo} />
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={{ padding: 10 }}>{item.title}</Text>
        )}
      />
    </View>
  );
};

export default App;
