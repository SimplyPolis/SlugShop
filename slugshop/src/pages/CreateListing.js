import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import React from 'react';
import App from '../App'
import NavBarOther from '../components/NavBarOther';
import { directive } from '@babel/types';
import { AppBar, Avatar, Typography, createTheme } from '@mui/material';
import {Toolbar} from '@mui/material';
import { Container } from '@mui/material';
import { Grid } from '@mui/material';
import { Paper } from '@mui/material';
import { TextField } from '@mui/material';
import { IconButton } from '@mui/material';


export default function CreateListing(){

    return(

        <>
            <NavBarOther/>
            <Grid container className="pt-[8rem] pl-16" spacing={5}>
                <Grid item>
                    <Typography fontSize="30px">Item Name:</Typography>
                    <TextField id="standard-basic" variant="standard"/>
                    <Typography className="pr-[5.5rem]" fontSize="30px">Price:</Typography>
                    <TextField id="standard-basic" variant="standard"/>
                    <Typography className="pr-[6.4rem]" fontSize="30px">Size:</Typography>
                    <TextField id="standard-basic" variant="standard"/>
                    <Typography className="pr-[2rem]" fontSize="30px">Condition:</Typography>
                    <TextField id="standard-basic" variant="standard"/>
                    
                </Grid>
            </Grid>

        </>
    )
}