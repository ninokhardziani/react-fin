// src/components/Home.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import '../css/Home.css';
import { useDarkMode } from '../context/DarkModeContext';

const Home = () => {
  const [data, setData] = useState([]);
  const [likedItems, setLikedItems] = useState([]);
  const [deletedItems, setDeletedItems] = useState([]);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts/1/comments"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleLike = (id) => {
    if (likedItems.includes(id)) {
      setLikedItems(likedItems.filter((likedId) => likedId !== id));
    } else {
      setLikedItems([...likedItems, id]);
    }
  };

  const handleDelete = (id) => {
    setDeletedItems([...deletedItems, id]);
  };

  return (
    <div className={`main-content ${darkMode ? 'dark' : 'light'}`}>
      <AnimatePresence>
        {data.map((item) => {
          if (!deletedItems.includes(item.id)) {
            return (
              <motion.div
                key={item.id}
                className={`comment-container ${darkMode ? 'dark' : 'light'}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <p><strong>Name:</strong> {item.name}</p>
                <p><strong>Email:</strong> {item.email}</p>
                <p><strong>Comment:</strong> {item.body}</p>

                <div className="action-buttons">
                  <motion.button
                    className={`like-button ${likedItems.includes(item.id) ? 'liked' : ''}`}
                    onClick={() => handleLike(item.id)}
                    whileTap={{ scale: 1.2 }}
                  >
                    ♥
                  </motion.button>

                  <motion.button
                    className="delete-button"
                    onClick={() => handleDelete(item.id)}
                    whileTap={{ scale: 1.2 }}
                  >
                    X
                  </motion.button>
                </div>
              </motion.div>
            );
          }

          return null;
        })}
      </AnimatePresence>
    </div>
  );
};

export default Home;