import AsyncStorage from '@react-native-async-storage/async-storage';

const TASKS_KEY = '@tasks';
const NOTES_KEY = '@notes';
const USER_KEY = '@user';
const USERS_KEY = '@users'; 

export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error('Error storing data:', e);
  }
};

export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error retrieving data:', e);
    return null;
  }
};

export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('Error removing data:', e);
  }
};

export const storeTasks = async (tasks) => {
  await storeData(TASKS_KEY, tasks);
};

export const getTasks = async () => {
  return await getData(TASKS_KEY) || [];
};

export const storeNotes = async (notes) => {
  await storeData(NOTES_KEY, notes);
};

export const getNotes = async () => {
  return await getData(NOTES_KEY) || [];
};

// export const storeUser = async (user) => {
//   await storeData(USER_KEY, user);
// };

// Updated user functions
export const storeUser = async (user) => {
  try {
    // Get existing users
    const existingUsers = await getData(USERS_KEY) || [];
    
    // Check if user already exists
    const userExists = existingUsers.some(u => u.email === user.email);
    if (userExists) {
      throw new Error('User with this email already exists');
    }
    
    // Add new user to users list
    const updatedUsers = [...existingUsers, user];
    await storeData(USERS_KEY, updatedUsers);
    
    // Also store as current user
    await storeData(USER_KEY, user);
    
    return true;
  } catch (error) {
    console.error('Error storing user:', error);
    throw error;
  }
};

export const authenticateUser = async (email, password) => {
  try {
    const users = await getData(USERS_KEY) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Store as current user
    await storeData(USER_KEY, user);
    return user;
  } catch (error) {
    console.error('Error authenticating user:', error);
    throw error;
  }
};

export const getUser = async () => {
  return await getData(USER_KEY);
};

// Clear all user data on logout
export const clearUserData = async () => {
  try {
    await AsyncStorage.multiRemove([USER_KEY, TASKS_KEY, NOTES_KEY]);
    console.log('User data cleared successfully');
    return true;
  } catch (e) {
    console.error('Error clearing user data:', e);
    return false;
  }
};