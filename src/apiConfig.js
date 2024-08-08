const apiConfig = {
    baseURL: 'https://notes-uku4.onrender.com',
    // baseURL: 'http://localhost:5000',
    endpoints: {
      notes: '/notes',
      updateImportance: '/updateImportance',
      login: '/login',
      deleteNote: '/deleteNote/',
      updateNote:'/updateNote',
    },
  };
  
  export default apiConfig;
  