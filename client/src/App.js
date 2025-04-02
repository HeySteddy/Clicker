import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WebApp from '@twa-dev/sdk';

function App() {
  const [message, setMessage] = useState('Loading...');
  const [resources, setResources] = useState({
    wood: 0,
    stone: 0,
    iron: 0,
    sulfur: 0
  });

  useEffect(() => {
    // Проверка подключения к серверу
    axios.get('/api/test')
      .then(res => setMessage(res.data.message))
      .catch(err => setMessage('Server connection error'));
    
    // Инициализация Telegram WebApp
    WebApp.ready();
  }, []);

  const handleClick = (resource) => {
    setResources(prev => ({
      ...prev,
      [resource]: prev[resource] + 1
    }));
  };

  return (
    <div className="game-container">
      <h1>Rust Clicker</h1>
      <p>Status: {message}</p>
      
      <div className="resources">
        <button onClick={() => handleClick('wood')}>🪵 Дерево: {resources.wood}</button>
        <button onClick={() => handleClick('stone')}>🪨 Камень: {resources.stone}</button>
        <button onClick={() => handleClick('iron')}>⛓️ Железо: {resources.iron}</button>
        <button onClick={() => handleClick('sulfur')}>🪨 Сера: {resources.sulfur}</button>
      </div>
    </div>
  );
}

export default App;
