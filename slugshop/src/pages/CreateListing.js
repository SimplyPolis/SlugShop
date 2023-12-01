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

    const {id} = useParams();
    const [listings, setListings] = useState({
        name: '',
        price: '',
        size: '',
        condition: ''
    })

    useEffect(() =>{

        axios.get('/getlistings?query='+listings.name)
        .then(res => {
            setListings({...listings, name: res.data.name, price: res.data.price, size: res.data.size, condition: res.data.condition})
        })
        .catch(err => console.log(err))
    }, [])

    
    const handleClick = (e) => {
        e.preventDefault();
        axios.put('/getlistings?query='+ listings.name, listings)
        .then(res => {
            alert("created");
        })
        .catch(err => console.log(err))

    }
    return(

        <>
            <NavBarOther/>
            <form>
                <Grid container className="pt-[8rem] pl-16" spacing={5} columnSpacing={5}>
                    <Grid item xs={20}>
                        
                            <Typography fontSize="30px">Item Name:</Typography>
                            <TextField id="standard-basic" variant="standard" onChange={e => setListings({...listings, name: e.target.value})}/>

                            <Typography className="pr-[5.5rem]" fontSize="30px">Price:</Typography>
                            <TextField id="standard-basic" variant="standard" onChange={e => setListings({...listings, price: e.target.value})}/>

                            <Typography className="pr-[6.4rem]" fontSize="30px">Size:</Typography>
                            <TextField id="standard-basic" variant="standard" onChange={e => setListings({...listings, size: e.target.value})}/>
                            
                            <Typography className="pr-[2rem]" fontSize="30px">Condition:</Typography>
                            <TextField id="standard-basic" variant="standard" onChange={e => setListings({...listings, condition: e.target.value})}/>
                        
                    </Grid>
                    <Grid item xs={20}>
                        <Typography>
                            <button onClick={handleClick} className="bg-yellow-500 rounded w-20 text-white">
                                Post
                            </button>

                        </Typography>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}