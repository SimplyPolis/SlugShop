import { BrowserRouter as Router, Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import React from 'react';
import App from '../App'
import { directive } from '@babel/types';
import { Typography } from '@mui/material';
import { useGoogleLogin, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';


export default function Login(){
    
    const login = useGoogleLogin({
        onSuccess: window.location.href='localhost:3000/create',
      });
    
    
    return(

        <div>
            <div className="bg-[url('https://collegevine.imgix.net/571e9a11-964f-48a4-83d0-562584d134ac.jpg')] w-screen h-screen">          
                <div className="2xl:pl-[750px] 2xl:pt-[250px] xl:pl-[550px] xl:pt-[150px]">
                    <div className="bg-blue-900 rounded-xl w-96 h-96 flex items-center justify-center">
                        <form>
                        <GoogleLogin
                        onSuccess={credentialResponse => {
                            console.log(credentialResponse);
                            window.location.href="/create";
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                        />
                        </form>
                    </div>    
                </div>
            </div>
        </div>

    )
}