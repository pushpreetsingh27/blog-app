import React, { useState, useEffect } from 'react';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/config';
import MyContext from './MyContext';
import toast from 'react-hot-toast';

const MyState = ({ children }) => {
  const [mode, setMode] = useState('light');
  const [allBlogs, setAllBlogs] = useState([]);

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = 'rgb(17, 24, 39)';
    } else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
    }
  };

  const getAllBlogs = () => {
    try {
      const q = query(collection(db, "blogPost"), orderBy('time'));
      onSnapshot(q, (QuerySnapshot) => {
        const blogArray = QuerySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setAllBlogs(blogArray);
      });
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  const deleteBlogs = async (id) => {
    try {
      await deleteDoc(doc(db, "blogPost", id));
      getAllBlogs();
      toast.success("Blog deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MyContext.Provider value={{ mode, toggleMode, allBlogs, getAllBlogs, deleteBlogs }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyState;
