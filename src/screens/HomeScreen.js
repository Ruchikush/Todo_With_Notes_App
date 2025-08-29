import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TaskCard from '../components/TaskCard';
import styles from '../constants/styles';
import { getTasks, storeTasks, getUser, clearUserData } from '../utils/storage';
import { getPosts } from '../utils/api';

const HomeScreen = ({ navigation, route }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [user, setUser] = useState({ name: 'User' });
  const [searchQuery, setSearchQuery] = useState(''); // New state for search query

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
        { id: '1', title: 'Google Meet', description: 'Morning standup with team', completed: false },
        { id: '2', title: 'Stack', description: 'Design Poster for Home screen', completed: false },
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
            try {
              await clearUserData();
              navigation.replace('Auth');
            } catch (error) {
              console.log('Logout error:', error);
            }
          }
        },
      ]
    );
  };

  // Filter tasks based on both filter status and search query
  const filteredTasks = tasks.filter(task => {
    // First apply the status filter (all, completed, pending)
    let statusMatch = true;
    if (filter === 'completed') statusMatch = task.completed;
    if (filter === 'pending') statusMatch = !task.completed;
    
    // Then apply the search filter if there's a query
    const searchMatch = searchQuery === '' || 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return statusMatch && searchMatch;
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
    <View style={{ flex: 1, backgroundColor: '#f8f9fa', marginTop: 20 }}>
      <ScrollView style={{ padding: 20 }}>
        {/* Header Section */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 }}>
          <View>
            <Text style={{ fontSize: 24, fontWeight: '700', color: '#2d3436' }}>Hi {user.name},</Text>
            <Text style={{ fontSize: 16, color: '#636e72', marginTop: 4 }}>Good evening!</Text>
          </View>
          <TouchableOpacity 
            onPress={handleLogout}
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
          <TouchableOpacity onPress={() => navigation.navigate('TaskForm', { isEdit: false })}>
            <View style={styles.fabButton}>
              <Icon name="add" size={25} color="#ffff" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          backgroundColor: '#fff', 
          borderRadius: 12, 
          paddingHorizontal: 15,
          paddingVertical: 8,
          marginBottom: 15,
          elevation: 2
        }}>
          <Icon name="search" size={20} color="#636e72" />
          <TextInput
            style={{ flex: 1, marginLeft: 10, fontSize: 16 }}
            placeholder="Search tasks..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon name="close" size={20} color="#636e72" />
            </TouchableOpacity>
          )}
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
            <Text style={{ fontSize: 16, color: '#b2bec3', marginTop: 15 }}>
              {searchQuery ? 'No tasks match your search' : 'No tasks found'}
            </Text>
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
      </ScrollView>
    </View>
  );
};

export default HomeScreen;