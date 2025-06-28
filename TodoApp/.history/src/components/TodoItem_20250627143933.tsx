// src/components/TodoItem.tsx
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Todo } from '../types/Todo';

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<Props> = ({ todo, onToggle, onDelete }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Pressable onPress={() => onToggle(todo.id)}>
        <Text style={{ textDecorationLine: todo.completed ? 'line-through' : 'none' }}>
          {todo.title}
        </Text>
      </Pressable>
      <Pressable onPress={() => onDelete(todo.id)}>
        <Text style={{ color: 'red' }}>Delete</Text>
      </Pressable>
    </View>
  );
};

export default TodoItem;
