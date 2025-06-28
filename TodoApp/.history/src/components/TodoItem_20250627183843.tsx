import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { Todo } from '../types/Todo';

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
}

const TodoItem: React.FC<Props> = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.title);

  const handleSave = () => {
    if (editedText.trim()) {
      onEdit(todo.id, editedText);
      setIsEditing(false);
    }
  };

  return (
    <View style={styles.container}>
      {isEditing ? (
        <>
          <TextInput
            value={editedText}
            onChangeText={setEditedText}
            style={styles.input}
          />
          <Pressable onPress={handleSave}>
            <Text style={styles.save}>✔️</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Pressable onPress={() => onToggle(todo.id)}>
            <Text style={[styles.text, todo.completed && styles.completed]}>
              {todo.title}
            </Text>
          </Pressable>
          <View style={styles.actions}>
            <Pressable onPress={() => setIsEditing(true)}>
              <Text style={styles.edit}>✏️</Text>
            </Pressable>
            <Pressable onPress={() => onDelete(todo.id)}>
              <Text style={styles.delete}>🗑</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 },
  text: { fontSize: 16 },
  completed: { textDecorationLine: 'line-through', color: 'gray' },
  input: { borderBottomWidth: 1, flex: 1, fontSize: 16 },
  save: { fontSize: 18, color: 'green', marginLeft: 10 },
  delete: { fontSize: 18, color: 'red', marginLeft: 10 },
  edit: { fontSize: 18, marginLeft: 10 },
  actions: { flexDirection: 'row' }
});

export default TodoItem;
