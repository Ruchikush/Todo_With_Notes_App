import AsyncStorage from '@react-native-async-storage/async-storage';

const TASKS_KEY = '@tasks';
const NOTES_KEY = '@notes';
const USER_KEY = '@user';

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

export const storeUser = async (user) => {
  await storeData(USER_KEY, user);
};

export const getUser = async () => {
  return await getData(USER_KEY);
};

// Clear all user data on logout
export const clearUserData = async () => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
    console.log('User data cleared successfully');
    return true;
  } catch (e) {
    console.error('Error clearing user data:', e);
    return false;
  }
};