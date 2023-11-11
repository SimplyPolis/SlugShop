import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import React from 'react';
import App from '../App'
import { directive } from '@babel/types';

export default function Login(){
    return(

        <div>
            <div className="bg-[url('https://collegevine.imgix.net/571e9a11-964f-48a4-83d0-562584d134ac.jpg')] w-screen h-screen">          
                <div className="pl-[750px] pt-[250px]">
                    <div className="bg-blue-600 rounded-xl w-96 h-96 flex items-center justify-center">
                        <form>
                            <label className="pl-[-100px]" for="fname">UCSC Email:</label>
                            <br></br>
                            
                            <input type="text"> 
                            </input>
                            
                            <br></br>
                            <br></br>
                            
                            <label className="bottom-96 left-96" for="fname">Password:</label>
                            
                            <br></br>
                            
                            <input type="text">
                            </input>

                            <br></br>
                            <br></br>
                            
                            <button className="bg-white rounded w-12" onClick={""}>Login</button>
                    
                        </form>
                    </div>    
                </div>
            </div>
        </div>

    )
}