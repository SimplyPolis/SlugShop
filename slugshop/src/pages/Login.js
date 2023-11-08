import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import React from 'react';
import App from '../App'
import { directive } from '@babel/types';

export default function Login(){
    return(

        <div>
            <div className="bg-yellow-300 w-full h-[300px]">
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
                    
                    <button className="bg-slate-600" onClick={""}>Login</button>

                </form>    
            </div>
        </div>

    )
}