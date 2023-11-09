import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import React from 'react';
import App from '../App'
import { directive } from '@babel/types';

export default function Login(){
    return(

        <div>
            <div className="bg-yellow-300 w-screen h-screen">
                <div className="bg-yellow-300 w-minh-96 h-[250px]"></div>
                    <div className=" pl-[750px]">
                        <div className="bg-blue-600 rounded-xl w-96 h-96 flex items-center justify-center">
                            <form>
                                <label className="bottom-96 left-96" for="fname">UCSC Email:</label>
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