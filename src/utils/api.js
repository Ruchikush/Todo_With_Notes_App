import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const getPosts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/posts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

export const createPost = async (post) => {
  try {
    const response = await axios.post(`${BASE_URL}/posts`, post);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    return null;
  }
};

export const updatePost = async (id, post) => {
  try {
    const response = await axios.put(`${BASE_URL}/posts/${id}`, post);
    return response.data;
  } catch (error) {
    console.error('Error updating post:', error);
    return null;
  }
};

export const deletePost = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/posts/${id}`);
    return true;
  } catch (error) {
    console.error('Error deleting post:', error);
    return false;
  }
};