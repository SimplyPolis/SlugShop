import { BrowserRouter as Router, Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import React from 'react';
import App from '../App'
import { directive } from '@babel/types';
import { AppBar, Avatar, Typography, createTheme } from '@mui/material';
import {Toolbar} from '@mui/material';

export default function NavBarOther(){

    return(

        <>
            <AppBar> 
                <Toolbar className="bg-blue-900" varient = "dense">
                    <Avatar src="https://seeklogo.com/images/U/uc-santa-cruz-banana-slugs-logo-96320729C8-seeklogo.com.png"/>
                    <Typography className=" pl-3">SlugShop</Typography>
                    <div className="pl-[68rem]">
                        <div className="bg-yellow-500 rounded-md w-[7rem]">
                            <Link to="/create" className="bg-yellow-500 rounded w-28 btn btn-primary">
                                <Typography>Create Post</Typography>
                            </Link>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
        </>

    )
}