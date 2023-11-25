import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
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
                </Toolbar>
            </AppBar>
        </>

    )
}