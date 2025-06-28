import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import uuid from 'react-native-uuid';
import { Todo } from './src/types/Todo';
import TodoItem from './src/components/TodoItem';

const App = () => {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = () => {
    if (!input.trim()) return;
    const newTodo: Todo = {
      id: uuid.v4() as string,
      title: input,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInput('');
  };

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Add a task"
        value={input}
        onChangeText={setInput}
        style={styles.input}
      />
      <Button title="Add" onPress={addTodo} />
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem todo={item} onToggle={toggleTodo} onDelete={deleteTodo} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderBottomWidth: 1, marginBottom: 10, fontSize: 16 },
});

export default App;
