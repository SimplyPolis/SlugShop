import { BrowserRouter as Router, Routes, Route, BrowserRouter, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
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
import jQuery from 'jquery';
import axios from 'axios';


export default function CreateListing(){

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [size, setSize] = useState('');
    const [condition, setCondition] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const listings = {name, price, size, condition};
        const id = 0;

        fetch('http://localhost:8000/listings', {
           method: 'POST',
           headers: {"Content-Type": "application/json"},
           body: JSON.stringify(listings),

        }). then(() =>{
            console.log(listings)
        }) .catch((error) => {
            console.log("failed to update");
        });
    }


    return(

        <>
            <NavBarOther/>
            <form onSubmit={handleSubmit}>
                <Grid container className="pt-[8rem] pl-16" spacing={5} columnSpacing={5}>
                    <Grid item xs={20}>
                        
                            <Typography fontSize="30px">Item Name:</Typography>
                            <TextField id="standard-basic" variant="standard" value={name} onChange={(e) => setName(e.target.value)}/>

                            <Typography className="pr-[5.5rem]" fontSize="30px">Price:</Typography>
                            <TextField id="standard-basic" variant="standard" value={price}onChange={(e) => setPrice(e.target.value)}/>

                            <Typography className="pr-[6.4rem]" fontSize="30px">Size:</Typography>
                            <TextField id="standard-basic" variant="standard" value={size} onChange={(e) => setSize(e.target.value)}/>
                            
                            <Typography className="pr-[2rem]" fontSize="30px">Condition:</Typography>
                            <TextField id="standard-basic" variant="standard" value={condition} onChange={(e) => setCondition(e.target.value)}/>
                        
                    </Grid>
                    <Grid item xs={20}>
                        <Typography>
                            <button className="bg-yellow-500 rounded w-20 text-white">
                                Post
                            </button>

                        </Typography>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}