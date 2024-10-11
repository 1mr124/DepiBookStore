import axios from 'axios';

// Create Axios instances for the APIs
const googleBooksApi = axios.create({
  baseURL: 'https://www.googleapis.com/books/v1', // Base URL for Google Books API
});

const openLibraryApi = axios.create({
  baseURL: 'https://openlibrary.org/search.json', // Base URL for Open Library API
});

// Fetch books function with fallback logic
export const fetchBooks = async (searchTerm) => {
  const apis = [
    { api: googleBooksApi, path: `/volumes?q=${searchTerm}` },
    { api: openLibraryApi, path: `?q=${searchTerm}` },
  ];

  for (const { api, path } of apis) {
    try {
      const res = await api.get(path);
      // Return books based on which API is being used
      if (api === googleBooksApi) {
        return res.data.items || []; // Return items from Google Books API
      } else if (api === openLibraryApi) {
        return res.data.docs || []; // Return docs from Open Library API
      }
    } catch (error) {
      console.error(`Error fetching from ${api.defaults.baseURL}:`, error);
      
      // If it's a rate limit error, log it and continue to the next API
      if (error.response?.status === 429) {
        console.warn(`Rate limit exceeded for ${api.defaults.baseURL}. Trying the next API...`);
        continue; // Move to the next API
      }
      
      // If any other error occurs, break the loop
      break; 
    }
  }

  return []; // Return empty if all APIs fail
};
