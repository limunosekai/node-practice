import React, { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    async function fetchServer() {
      const response = await fetch('/users');
      const body = await response.text();
      console.log('body: ', body);
    }
    fetchServer();
  }, []);

  return <div className='App'>ㅎㅇㅎ</div>;
}

export default App;
