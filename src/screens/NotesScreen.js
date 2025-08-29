import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NoteCard from '../components/NoteCard';
import CustomButton from '../components/CustomButton';
import styles from '../constants/styles';
import colors from '../constants/colors';
import {getNotes, storeNotes} from '../utils/storage';

const NotesScreen = ({navigation}) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const storedNotes = await getNotes();
    if (storedNotes.length > 0) {
      setNotes(storedNotes);
    } else {
      // Add some sample notes if none exist
      const sampleNotes = [
        {
          id: '1',
          title: 'Project Ideas',
          content: 'Brainstorm ideas for the new mobile app project',
          date: new Date(),
        },
      ];
      setNotes(sampleNotes);
      await storeNotes(sampleNotes);
    }
  };

  const deleteNote = async id => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    await storeNotes(updatedNotes);
  };

  const editNote = note => {
    navigation.navigate('NoteForm', {note, isEdit: true});
  };

  return (
    <View style={{flex: 1, backgroundColor: '#f8f9fa', marginTop: 10}}>
      {/* Header Section */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 20,
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderBottomColor: '#e0e0e0',
        }}>
        <Text style={{fontSize: 24, fontWeight: '700', color: '#2d3436'}}>
          My Notes
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {/* <Icon name="close" size={24} color="#2d3436" /> */}
        </TouchableOpacity>
      </View>

      <ScrollView style={{padding: 20}}>
        {notes.length === 0 ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 60,
              paddingVertical: 40,
            }}>
            <Icon name="sticky-note-2" size={70} color="#dfe6e9" />
            <Text
              style={{
                fontSize: 18,
                color: '#b2bec3',
                marginTop: 20,
                fontWeight: '600',
              }}>
              No notes yet
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#b2bec3',
                textAlign: 'center',
                marginTop: 10,
                lineHeight: 20,
                paddingHorizontal: 40,
              }}>
              Add your first note to get started with organizing your thoughts
            </Text>
          </View>
        ) : (
          <FlatList
            data={notes}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <NoteCard
                note={item}
                onDelete={() => deleteNote(item.id)}
                onEdit={() => editNote(item)}
              />
            )}
            scrollEnabled={false}
            style={{marginBottom: 20}}
          />
        )}

        <TouchableOpacity
          onPress={() => navigation.navigate('NoteForm', {isEdit: false})}
          style={{
            backgroundColor: '#6c5ce7',
            paddingVertical: 16,
            borderRadius: 12,
            alignItems: 'center',
            marginTop: 20,
            marginBottom: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            elevation: 2,
          }}>
          <Icon name="add" size={20} color="#fff" />
          <Text
            style={{
              color: '#fff',
              fontWeight: '600',
              marginLeft: 8,
              fontSize: 16,
            }}>
            Add New Note
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default NotesScreen;
