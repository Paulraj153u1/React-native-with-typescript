// src/components/TodoItem.tsx

import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

const TodoItem: React.FC<Props> = ({ todo, onToggle, onDelete }) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => onToggle(todo.id)}>
        <Text style={[styles.text, todo.completed && styles.completed]}>
          {todo.title}
        </Text>
      </Pressable>
      <Pressable onPress={() => onDelete(todo.id)}>
        <Text style={styles.delete}>🗑</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-between', padding: 10 },
  text: { fontSize: 16 },
  completed: { textDecorationLine: 'line-through', color: 'gray' },
  delete: { color: 'red', fontSize: 18 }
});

export default TodoItem;
