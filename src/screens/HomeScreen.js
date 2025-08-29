import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  Animated,
  Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TaskCard from '../components/TaskCard';
import styles from '../constants/styles';
import {getTasks, storeTasks, getUser, clearUserData} from '../utils/storage';
import {getPosts} from '../utils/api';

const HomeScreen = ({navigation, route}) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [user, setUser] = useState({name: 'User'});
  const [searchQuery, setSearchQuery] = useState('');

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const headerScale = useRef(new Animated.Value(0.9)).current;
  const dateCardScale = useRef(new Animated.Value(0.95)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const filterAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadUserData();
    loadTasks();
    fetchPosts();

    // Run animations on mount
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(headerScale, {
        toValue: 1,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(dateCardScale, {
        toValue: 1,
        friction: 10,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Animate filter change
  useEffect(() => {
    Animated.sequence([
      Animated.timing(filterAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(filterAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [filter, searchQuery]);

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
        {
          id: '1',
          title: 'Google Meet',
          description: 'Morning standup with team',
          completed: false,
        },
        {
          id: '2',
          title: 'Stack',
          description: 'Design Poster for Home screen',
          completed: false,
        },
      ];
      setTasks(sampleTasks);
      await storeTasks(sampleTasks);
    }
  };

  const fetchPosts = async () => {
    const posts = await getPosts();
    console.log('Fetched posts:', posts.length);
  };

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
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
        },
      },
    ]);
  };

  const filteredTasks = tasks.filter(task => {
    let statusMatch = true;
    if (filter === 'completed') statusMatch = task.completed;
    if (filter === 'pending') statusMatch = !task.completed;

    const searchMatch =
      searchQuery === '' ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());

    return statusMatch && searchMatch;
  });

  const toggleTask = async id => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? {...task, completed: !task.completed} : task,
    );
    setTasks(updatedTasks);
    await storeTasks(updatedTasks);
  };

  const deleteTask = async id => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    await storeTasks(updatedTasks);
  };

  const editTask = task => {
    navigation.navigate('TaskForm', {task, isEdit: true});
  };

  const getCurrentDate = () => {
    const date = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    return {
      day: days[date.getDay()],
      date: date.getDate(),
      month: months[date.getMonth()],
    };
  };

  const {day, date, month} = getCurrentDate();
  const completedCount = tasks.filter(task => task.completed).length;

  // Button press animation
  const onPressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={{flex: 1, backgroundColor: '#f8f9fa', marginTop: 20}}>
      <ScrollView style={{padding: 20}}>
        {/* Header Section with Animation */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{translateY: slideAnim}, {scale: headerScale}],
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 25,
            }}>
            <View>
              <Text style={{fontSize: 24, fontWeight: '700', color: '#2d3436'}}>
                Hi {user.name},
              </Text>
              <Text style={{fontSize: 16, color: '#636e72', marginTop: 4}}>
                Good evening!
              </Text>
            </View>
            <Animated.View style={{transform: [{scale: buttonScale}]}}>
              <TouchableOpacity
                onPress={handleLogout}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                style={{
                  backgroundColor: '#fff',
                  padding: 10,
                  borderRadius: 12,
                  elevation: 2,
                }}>
                <Icon name="logout" size={24} color="#2d3436" />
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Animated.View>

        {/* Date Card with Animation */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{translateY: slideAnim}, {scale: dateCardScale}],
            backgroundColor: '#fff',
            borderRadius: 16,
            padding: 20,
            marginBottom: 25,
            elevation: 2,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#2d3436',
              marginBottom: 15,
            }}>
            Today, {day} {date} {month}
          </Text>

          {/* Week Days */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
              <Text
                key={index}
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#636e72',
                  width: 24,
                  textAlign: 'center',
                }}>
                {day}
              </Text>
            ))}
          </View>

          {/* Dates */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}>
            {[19, 20, 21, 22, 23, 24, 25].map((dateNum, index) => (
              <View
                key={index}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: dateNum === date ? '#6c5ce7' : 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: dateNum === date ? '700' : '500',
                    color:
                      dateNum === date
                        ? '#fff'
                        : dateNum === date
                        ? '#6c5ce7'
                        : '#2d3436',
                  }}>
                  {dateNum}
                </Text>
              </View>
            ))}
          </View>

          {/* Task Stats */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 14, color: '#636e72'}}>
              {tasks.length} tasks today
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="trending-up" size={16} color="#00b894" />
              <Text style={{fontSize: 14, color: '#636e72', marginLeft: 5}}>
                Your productivity for the day
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Tasks Header */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{translateY: slideAnim}],
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 15,
            }}>
            <Text style={{fontSize: 18, fontWeight: '700', color: '#2d3436'}}>
              Today
            </Text>
            <TouchableOpacity>
              <Text style={{fontSize: 14, color: '#6c5ce7', fontWeight: '600'}}>
                Upcoming
              </Text>
            </TouchableOpacity>
            <Animated.View style={{transform: [{scale: buttonScale}]}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('TaskForm', {isEdit: false})}
                onPressIn={onPressIn}
                onPressOut={onPressOut}>
                <View style={styles.fabButton}>
                  <Icon name="add" size={25} color="#ffff" />
                </View>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Animated.View>

        {/* Search Bar */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{translateY: slideAnim}],
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderRadius: 12,
            paddingHorizontal: 15,
            paddingVertical: 8,
            marginBottom: 15,
            elevation: 2,
          }}>
          <Icon name="search" size={20} color="#636e72" />
          <TextInput
            style={{flex: 1, marginLeft: 10, fontSize: 16}}
            placeholder="Search tasks..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon name="close" size={20} color="#636e72" />
            </TouchableOpacity>
          )}
        </Animated.View>

        {/* Filter Buttons */}
        <Animated.View
          style={{
            opacity: filterAnim,
            // transform: [{scale: filterAnim}],
            flexDirection: 'row',
            backgroundColor: '#f1f2f6',
            borderRadius: 12,
            padding: 4,
            marginBottom: 20,
          }}>
          <TouchableOpacity
            onPress={() => setFilter('all')}
            style={{
              flex: 1,
              paddingVertical: 8,
              borderRadius: 10,
              backgroundColor: filter === 'all' ? '#6c5ce7' : 'transparent',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: filter === 'all' ? '#fff' : '#636e72',
                fontWeight: '600',
              }}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFilter('completed')}
            style={{
              flex: 1,
              paddingVertical: 8,
              borderRadius: 10,
              backgroundColor:
                filter === 'completed' ? '#6c5ce7' : 'transparent',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: filter === 'completed' ? '#fff' : '#636e72',
                fontWeight: '600',
              }}>
              Completed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFilter('pending')}
            style={{
              flex: 1,
              paddingVertical: 8,
              borderRadius: 10,
              backgroundColor: filter === 'pending' ? '#6c5ce7' : 'transparent',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: filter === 'pending' ? '#fff' : '#636e72',
                fontWeight: '600',
              }}>
              Pending
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Tasks List */}
        <Animated.View>
          {filteredTasks.length === 0 ? (
            <Animated.View
              style={{
                alignItems: 'center',
                marginTop: 40,
                paddingVertical: 30,
                opacity: fadeAnim,
                transform: [{translateY: slideAnim}],
              }}>
              <Icon name="check-circle-outline" size={60} color="#dfe6e9" />
              <Text style={{fontSize: 16, color: '#b2bec3', marginTop: 15}}>
                {searchQuery ? 'No tasks match your search' : 'No tasks found'}
              </Text>
            </Animated.View>
          ) : (
            <FlatList
              data={filteredTasks}
              keyExtractor={item => item.id}
              renderItem={({item, index}) => (
                <Animated.View
                  style={{
                    opacity: fadeAnim,
                    transform: [
                      {
                        translateY: fadeAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [10 * (index + 1), 0],
                        }),
                      },
                    ],
                  }}>
                  <TaskCard
                    task={item}
                    onToggle={() => toggleTask(item.id)}
                    onDelete={() => deleteTask(item.id)}
                    onEdit={() => editTask(item)}
                  />
                </Animated.View>
              )}
              scrollEnabled={false}
            />
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
