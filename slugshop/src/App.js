import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route index element = {<Login/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
