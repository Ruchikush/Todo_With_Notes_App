import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import styles from '../constants/styles';
import { getTasks, storeTasks } from '../utils/storage';
import { createPost, updatePost } from '../utils/api';

const TaskFormScreen = ({ route, navigation }) => {
  const { task, isEdit } = route.params || {};
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    if (isEdit && task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setTime(task.time || '');
    }
  }, [isEdit, task]);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Task title is required');
      return;
    }

    const tasks = await getTasks();
    let updatedTasks = [];

    if (isEdit) {
      // Update existing task
      updatedTasks = tasks.map(t => 
        t.id === task.id ? { ...t, title, description, time } : t
      );
      
      // API call to update post (mock)
      await updatePost(task.id, { title, body: description });
    } else {
      // Add new task
      const newTask = {
        id: Date.now().toString(),
        title,
        description,
        time,
        completed: false
      };
      
      updatedTasks = [...tasks, newTask];
      
      // API call to create post (mock)
      await createPost({ title, body: description });
    }

    await storeTasks(updatedTasks);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f8f9fa',marginTop:35 }}>
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
          {isEdit ? 'Edit Task' : 'Create New Task'}
        </Text>
      </View>

      <ScrollView style={{ padding: 20 }}>
        <InputField
          label="Title"
          value={title}
          onChangeText={setTitle}
          placeholder="Enter task title"
        />

        <InputField
          label="Description"
          value={description}
          onChangeText={setDescription}
          placeholder="Enter task description"
          multiline={true}
        />

        <InputField
          label="Time (Optional)"
          value={time}
          onChangeText={setTime}
          placeholder="e.g., 03:30-05:00 AM"
        />

        <CustomButton 
          title={isEdit ? "Update Task" : "Save Task"} 
          onPress={handleSave} 
          style={{ marginTop: 10 }}
        />
      </ScrollView>
    </View>
  );
};

export default TaskFormScreen;