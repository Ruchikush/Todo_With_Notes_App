import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TaskCard from '../components/TaskCard';
import styles from '../constants/styles';
import colors from '../constants/colors';
import { getTasks, storeTasks, getUser, clearUserData } from '../utils/storage';
import { getPosts } from '../utils/api';

const HomeScreen = ({ navigation, route }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [user, setUser] = useState({ name: 'User' });

  useEffect(() => {
    loadUserData();
    loadTasks();
    fetchPosts();
  }, []);

  const loadUserData = async () => {
    const userData = await getUser();
    if (userData) {
      setUser(userData);
    }
  };

  const loadTasks = async () => {
    const storedTasks = await getTasks();
    if (storedTasks.length > 0) {
      setTasks(storedTasks);
    } else {
      const sampleTasks = [
        { id: '1', title: 'Google Meet', description: 'Morning standup with team', time: '03:30-05:00 AM', completed: false },
        { id: '2', title: 'Stack', description: 'Design Poster for Home screen', time: '03:30-09:30 AM', completed: false },
      ];
      setTasks(sampleTasks);
      await storeTasks(sampleTasks);
    }
  };

  const fetchPosts = async () => {
    const posts = await getPosts();
    console.log('Fetched posts:', posts.length);
  };

  // Handle logout
  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Logout',
          onPress: async () => {
            const success = await clearUserData();
            if (success) {
              navigation.replace('Auth');
            } else {
              Alert.alert('Error', 'Failed to logout');
            }
          }
        }
      ]
    );
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const toggleTask = async (id) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    await storeTasks(updatedTasks);
  };

  const deleteTask = async (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    await storeTasks(updatedTasks);
  };

  const editTask = (task) => {
    navigation.navigate('TaskForm', { task, isEdit: true });
  };

  const getCurrentDate = () => {
    const date = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return {
      day: days[date.getDay()],
      date: date.getDate(),
      month: months[date.getMonth()],
    };
  };

  const { day, date, month } = getCurrentDate();
  const completedCount = tasks.filter(task => task.completed).length;

  return (
    <View style={{ flex: 1, backgroundColor: '#f8f9fa',marginTop:20 ,}}>
      <ScrollView style={{ padding: 20, }}>
        {/* Header Section */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 }}>
          <View>
            <Text style={{ fontSize: 24, fontWeight: '700', color: '#2d3436' }}>Hi {user.name},</Text>
            <Text style={{ fontSize: 16, color: '#636e72', marginTop: 4 }}>Good evening!</Text>
          </View>
          <TouchableOpacity 
          //  onPress={() => navigation.navigate('Auth')}
          onPress={() => navigation.logout ? navigation.logout() : navigation.navigate('Auth')}
            style={{ backgroundColor: '#fff', padding: 10, borderRadius: 12, elevation: 2 }}
          >
            <Icon name="logout" size={24} color="#2d3436" />
          </TouchableOpacity>
        </View>

        {/* Date Card */}
        <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 25, elevation: 2 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#2d3436', marginBottom: 15 }}>
            Today, {day} {date} {month}
          </Text>
          
          {/* Week Days */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
              <Text key={index} style={{ fontSize: 14, fontWeight: '600', color: '#636e72', width: 24, textAlign: 'center' }}>
                {day}
              </Text>
            ))}
          </View>
          
          {/* Dates */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
            {[19, 20, 21, 22, 23, 24, 25].map((dateNum, index) => (
              <View 
                key={index} 
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: dateNum === date ? '#6c5ce7' : 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Text style={{
                  fontSize: 14,
                  fontWeight: dateNum === date ? '700' : '500',
                  color: dateNum === date ? '#fff' : dateNum === date ? '#6c5ce7' : '#2d3436'
                }}>
                  {dateNum}
                </Text>
              </View>
            ))}
          </View>

          {/* Task Stats */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 14, color: '#636e72' }}>{tasks.length} tasks today</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="trending-up" size={16} color="#00b894" />
              <Text style={{ fontSize: 14, color: '#636e72', marginLeft: 5 }}>Your productivity for the day</Text>
            </View>
          </View>
        </View>

        {/* Tasks Header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: '#2d3436' }}>Today</Text>
          <TouchableOpacity>
            <Text style={{ fontSize: 14, color: '#6c5ce7', fontWeight: '600' }}>Upcoming</Text>
          </TouchableOpacity>
        </View>

        {/* Filter Buttons */}
        <View style={{ flexDirection: 'row', backgroundColor: '#f1f2f6', borderRadius: 12, padding: 4, marginBottom: 20 }}>
          <TouchableOpacity 
            onPress={() => setFilter('all')} 
            style={{
              flex: 1,
              paddingVertical: 8,
              borderRadius: 10,
              backgroundColor: filter === 'all' ? '#6c5ce7' : 'transparent',
              alignItems: 'center'
            }}
          >
            <Text style={{ color: filter === 'all' ? '#fff' : '#636e72', fontWeight: '600' }}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setFilter('completed')} 
            style={{
              flex: 1,
              paddingVertical: 8,
              borderRadius: 10,
              backgroundColor: filter === 'completed' ? '#6c5ce7' : 'transparent',
              alignItems: 'center'
            }}
          >
            <Text style={{ color: filter === 'completed' ? '#fff' : '#636e72', fontWeight: '600' }}>Completed</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setFilter('pending')} 
            style={{
              flex: 1,
              paddingVertical: 8,
              borderRadius: 10,
              backgroundColor: filter === 'pending' ? '#6c5ce7' : 'transparent',
              alignItems: 'center'
            }}
          >
            <Text style={{ color: filter === 'pending' ? '#fff' : '#636e72', fontWeight: '600' }}>Pending</Text>
          </TouchableOpacity>
        </View>

        {/* Tasks List */}
        {filteredTasks.length === 0 ? (
          <View style={{ alignItems: 'center', marginTop: 40, paddingVertical: 30 }}>
            <Icon name="check-circle-outline" size={60} color="#dfe6e9" />
            <Text style={{ fontSize: 16, color: '#b2bec3', marginTop: 15 }}>No tasks found</Text>
          </View>
        ) : (
          <FlatList
            data={filteredTasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TaskCard
                task={item}
                onToggle={() => toggleTask(item.id)}
                onDelete={() => deleteTask(item.id)}
                onEdit={() => editTask(item)}
              />
            )}
            scrollEnabled={false}
          />
        )}

        {/* Add Task Button */}
        <View style={{marginBottom:20}}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('TaskForm', { isEdit: false })}
          style={{
            backgroundColor: '#6c5ce7',
            paddingVertical: 16,
            borderRadius: 12,
            alignItems: 'center',
            marginTop: 20,
            marginBottom: 10,
            flexDirection: 'row',
            justifyContent: 'center'
          }}
        >
          <Icon name="add" size={20} color="#fff" />
          <Text style={{ color: '#fff', fontWeight: '600', marginLeft: 8 }}>Add New Task</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;