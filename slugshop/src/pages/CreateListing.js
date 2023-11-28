import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import React, { useState } from 'react';
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

    const [listing, setListing]= useState({

        item_name: "",
        price: "",
        size: "",
        condition: ""
    })

    const handleInputs = (e)=>{
        let namee = e.target.name;
        let value = e.target.value;
        setListing({...listing,[namee]:value})
    }

    const postData = async(e)=>{
        e.preventDefault()
        const {item_name, price, size, condition} = listing
        const res = await fetch('/createlisting', {
            

        })
    }


    return(

        <>
            <NavBarOther/>
            <Grid container className="pt-[8rem] pl-16" spacing={5} columnSpacing={5}>
                <Grid item xs={20}>
                    
                        <Typography fontSize="30px">Item Name:</Typography>
                        <TextField id="standard-basic" variant="standard" value={listing.item_name} onChange={handleInputs}/>

                        <Typography className="pr-[5.5rem]" fontSize="30px">Price:</Typography>
                        <TextField id="standard-basic" variant="standard" value={listing.price} onChange={handleInputs}/>

                        <Typography className="pr-[6.4rem]" fontSize="30px">Size:</Typography>
                        <TextField id="standard-basic" variant="standard" value={listing.size} onChange={handleInputs}/>
                        
                        <Typography className="pr-[2rem]" fontSize="30px">Condition:</Typography>
                        <TextField id="standard-basic" variant="standard" value={listing.condition} onChange={handleInputs}/>
                    
                </Grid>
            <Grid item xs={20}>
                <Typography>
                    <button className="bg-yellow-500 rounded w-20 text-white">
                        Post
                    </button>

                </Typography>
            </Grid>
            </Grid>

        </>
    )
}