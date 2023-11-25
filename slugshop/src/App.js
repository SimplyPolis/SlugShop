import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import UserListing from './pages/UserListing';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';

function App() {

  const theme= createTheme({
      typography: {
          fontFamily:[
            'Josefin Sans','sans-serif'
          ].join(','),
      }
    });


  return (
    <>

      <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route index element = {<Login/>}/>
          <Route path="/user" element ={<UserListing/>}/>
        </Routes>
      </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
