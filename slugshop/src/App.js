import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import CreateListing from './pages/CreateListing';
import Login from './pages/Login';
import UserListing from './pages/UserListing';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';

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
      <GoogleOAuthProvider clientId="235433750685-tob4g20h94o3oof65g596u7ltlnkucms.apps.googleusercontent.com">
      <Router>
        <Routes>
            <Route index element = {<Login/>}/>
            <Route path="/user" element ={<UserListing/>}/>
            <Route path="/create" element={<CreateListing/>}/>
            <Route path="/home" element={<HomePage/>}/>
          
        </Routes>
      </Router>
      </GoogleOAuthProvider>;
      </ThemeProvider>
    </>
  );
}

export default App;
