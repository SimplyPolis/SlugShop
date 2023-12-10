import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import React from 'react';
import App from '../App'
import { directive } from '@babel/types';
import { Typography } from '@mui/material';

export default function Login(){
    return(

        <div>
            <div className="bg-[url('https://collegevine.imgix.net/571e9a11-964f-48a4-83d0-562584d134ac.jpg')] w-screen h-screen">          
                <div className="2xl:pl-[750px] 2xl:pt-[250px] xl:pl-[550px] xl:pt-[150px]">
                    <div className="bg-blue-900 rounded-xl w-96 h-96 flex items-center justify-center">
                        <form>
                            <label for="fname">
                                <Typography>UCSC Email:</Typography>

                            </label>
                            <br></br>
                            
                            <input type="email"> 
                            </input>
                            
                            <br></br>
                            <br></br>
                            
                            <label className="bottom-96 left-96" for="fname"><Typography>Password:</Typography></label>
                            
                            <br></br>
                            
                            <input type="password">
                            </input>

                            <br></br>
                            <br></br>
                            
                            <button className="bg-white rounded w-12" onClick={""}><Typography>Login</Typography></button>
                    
                        </form>
                    </div>    
                </div>
            </div>
        </div>

    )
}