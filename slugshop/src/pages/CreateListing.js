import {BrowserRouter as Router, Routes, Route, BrowserRouter, useParams} from 'react-router-dom';
import React, {useEffect, useState, componentDidMount, Component, useMemo} from 'react';
import App from '../App'
import NavBarOther from '../components/NavBarOther';
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
import {useFilePicker} from 'use-file-picker';
import jQuery from 'jquery';
import axios from 'axios';






export default function CreateListing() {
    const [values, setValues] = useState([])

useEffect(() => {
    fetch("/getcategories").then((data) => data.json()).then((val) => setValues(val)).catch((error) => {
  console.log(error)
})
}, [])
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const {openFilePicker, filesContent, loading, errors} = useFilePicker({
        readAs: 'DataURL',
        accept: 'image/*',
        multiple: true
    })


    const handleSubmit = (e) => {
        e.preventDefault();
        const listings = {name, price, description, category, filesContent};
        const id = 0;
        console.log(category)
        axios
            .post("/createlisting", listings)

            .then(() => {
                console.log(listings)
            }).catch((error) => {
            console.log("failed to update");
        });
    }


    return (

        <>
            <NavBarOther/>
            <form onSubmit={handleSubmit}>
                <Grid container className="pt-[8rem] pl-16" spacing={5} columnSpacing={5}>
                    <Grid item xs={20}>

                        <Typography fontSize="30px">Item Name:</Typography>
                        <TextField id="standard-basic" variant="standard" value={name}
                                   onChange={(e) => setName(e.target.value)} required/>

                        <Typography className="pr-[5.5rem]" fontSize="30px">Description:</Typography>
                        <TextField id="standard-basic" variant="standard" value={description}
                                   onChange={(e) => setDescription(e.target.value)} multiline
                                   rows={4} required/>
                        <Typography className="pr-[6.4rem]" fontSize="30px">Price:</Typography>
                        <TextField id="standard-basic" variant="standard" type="number" name="price"
                                   onChange={(e) => setPrice(e.target.value)} required/>


                        <Typography className="pr-[5.5rem]" fontSize="30px">Category:</Typography>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Category"
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {
                                values.map((vals, i) => <MenuItem key={i} value={vals.category}>{vals.category}</MenuItem>)
                            }
                        </Select>


                        <div>
                            <button onClick={() => openFilePicker()}>Select files</button>
                            <br/>
                            {filesContent.map((file, index) => (
                                <div key={index}>
                                    <h2>{file.name}</h2>
                                    <img alt={file.name} src={file.content}></img>
                                    <br/>
                                </div>
                            ))}
                        </div>

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