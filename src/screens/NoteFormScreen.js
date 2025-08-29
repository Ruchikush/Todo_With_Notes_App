// NoteFormScreen.js
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert, Text, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../components/CustomButton';
import { getNotes, storeNotes } from '../utils/storage';
import styles from '../constants/styles';
import colors from '../constants/colors';

const NoteFormScreen = ({ route, navigation }) => {
  const { note, isEdit } = route.params || {};
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (isEdit && note) {
      setTitle(note.title);
      setContent(note.content || '');
    }
  }, [isEdit, note]);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Note title is required');
      return;
    }

    const notes = await getNotes();
    let updatedNotes = [];

    if (isEdit) {
      // Update existing note
      updatedNotes = notes.map(n => 
        n.id === note.id ? { ...n, title, content, date: new Date() } : n
      );
    } else {
      // Add new note
      const newNote = {
        id: Date.now().toString(),
        title,
        content,
        date: new Date()
      };
      updatedNotes = [...notes, newNote];
    }

    await storeNotes(updatedNotes);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f8f9fa', marginTop: 35 }}>
      {/* Header with Back Button */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 5, 
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0'
      }}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={{ padding: 8, marginRight: 15 }}
        >
          <Icon name="arrow-back" size={24} color="#2d3436" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: '700', color: '#2d3436' }}>
          {isEdit ? 'Edit Note' : 'Create New Note'}
        </Text>
      </View>

      <ScrollView style={{ padding: 20 }}>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8, color: colors.dark }}>
            Title
          </Text>
          <TextInput
            style={{
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#ddd',
              borderRadius: 8,
              padding: 12,
              fontSize: 16,
            }}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter note title"
          />
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8, color: colors.dark }}>
            Content
          </Text>
          <TextInput
            style={{
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#ddd',
              borderRadius: 8,
              padding: 12,
              fontSize: 16,
              minHeight: 200,
              textAlignVertical: 'top',
            }}
            value={content}
            onChangeText={setContent}
            placeholder="Write your note here..."
            multiline={true}
            numberOfLines={10}
          />
        </View>

        <CustomButton 
          title={isEdit ? "Update Note" : "Save Note"} 
          onPress={handleSave} 
          style={{ marginTop: 10 }}
        />
      </ScrollView>
    </View>
  );
};

export default NoteFormScreen;