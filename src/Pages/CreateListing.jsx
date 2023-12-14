import {BrowserRouter as Router, Routes, Route, BrowserRouter, useParams, useNavigate} from 'react-router-dom';
import React, {useEffect, useState, componentDidMount, Component, useMemo} from 'react';
import App from '../App'
import {directive} from '@babel/types';
import {AppBar, Avatar, Typography, createTheme, getCardActionsUtilityClass} from '@mui/material';
import {Toolbar} from '@mui/material';
import {Container} from '@mui/material';
import {Grid} from '@mui/material';
import {Paper} from '@mui/material';
import {TextField} from '@mui/material';
import {IconButton} from '@mui/material';
import {Select} from "@mui/material";
import {MenuItem} from "@mui/material";
import {FormControl} from '@mui/material';
import {Button} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';



export default function CreateListing() {
    const [values, setValues] = useState([])

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [contact, setContact] = useState('');

    const navigate =useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        const listings = {name, price, description, category, image, contact};
        const id = 0;
        console.log(image)
        fetch('http://localhost:8000/listings', {    // come back to this.
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(listings)
        }).then(() =>{
            navigate(-1)
        })
    }

    return (

        <>
            <Navbar/>
            <form className="pl-[30rem] pb-44"  onSubmit={handleSubmit}>
                <Grid container className="pt-[1rem] pl-16" spacing={5} columnSpacing={5}>
                    <Grid item xs={100}>

                        <Typography fontSize="30px">Item Name:</Typography>
                        <TextField id="standard-basic" variant="standard" value={name}
                                   onChange={(e) => setName(e.target.value)}/>
                        <Typography className="" fontSize="30px">Description:</Typography>
                        <TextField id="standard-basic" variant="standard" value={description}
                                   onChange={(e) => setDescription(e.target.value)}/>
                        <Typography className="pr-[6.4rem]" fontSize="30px">Price:</Typography>
                        <TextField id="standard-basic" variant="standard" type="number" name="price"
                                   onChange={(e) => setPrice(e.target.value)}/>
                        <Typography className="pr-[1rem]" fontSize="30px">Category:</Typography>
                        <TextField id="standard-basic" variant="standard" name="category" value={category}
                                   onChange={(e) => setCategory(e.target.value)}/>
                        <Typography className="pr-[1rem]" fontSize="30px">Contact Email:</Typography>
                        <TextField id="standard-basic" variant="standard" name="contact" value={category}
                                   onChange={(e) => setContact(e.target.value)}/>
                        <br></br>
                        <Typography className="pr-[1rem]" fontSize="30px">Image:</Typography>
                        <br></br>
                        <TextField type="file" onChange={(e) => setImage(e.target.value)}/>
                            



                    </Grid>
                    <Grid item xs={20}>
                        <div className="pl-[3rem]">
                            <Typography>
                                <button className="bg-yellow-500 rounded w-20 text-white">
                                    Post
                                </button>
                            </Typography>
                        </div>
                        
                    </Grid>
                </Grid>
            </form>
            <Footer/>
        </>
    )
}
