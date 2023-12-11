import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
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


export default function HomePage(){
    
    const[listing, setListings] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/listings')
            .then(res =>{
                return res.json();
            })
            .then(data => {
                setListings(data);
                console.log(data);
            });

    }, []);
    
    return(
        <>
            <NavBarOther/>
            <Grid container>
                <Grid item className="pt-[8rem] pl-24" spacing={4} columnSpacing={4}>
                    <img 
                        className = "w-[10rem]" 
                        src="https://i.ebayimg.com/images/g/i8gAAOSwSatiDUg1/s-l1600.jpg" 
                        alt="Placeholder"/>
                        
                        {listing.map (listing_name => (
                        <Typography>
                            {listing_name.name}
                        </Typography>
                        ))}

                        {listing.map(listing_price => (
                        <Typography>
                            ${listing_price.price}
                        </Typography>
                        ))}
                    
                </Grid>
                <Grid item className="pt-[8rem] pl-24" spacing={4} columnSpacing={4}>
                    
                </Grid>
            </Grid>

        </>
    )
}