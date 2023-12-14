import { BrowserRouter as Router, Routes, Route, BrowserRouter, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import App from '../App'
import { directive } from '@babel/types';
import { AppBar, Avatar, Divider, Typography, createTheme } from '@mui/material';
import {Toolbar} from '@mui/material';
import { Container } from '@mui/material';
import { Grid } from '@mui/material';
import { Paper } from '@mui/material';
import useFetch from './useFetch';
import Footer from '../Components/Footer/Footer';
import Navbar from '../Components/Navbar/Navbar';


export default function UserListing(){
    
    const { id } = useParams();
    const {data: listings, error, isPending} = useFetch('http://localhost:8000/listings/' + id);

    return(
        <>
            <Navbar/>
            <Grid container spacing={1} rowSpacing={1}>
                <Grid item xs={5} spacing={12} className="pt-32">
                        {listings && (
                            <img 
                            className = "pt-[8rem] pl-24 w-[40rem]" 
                            src={listings.image} 
                            alt="Placeholder"/>
                        )}
                </Grid>  
                <Grid item className=" pt-72" xs={5}> 
        
                    {listings && (
                        <Typography fontSize="45px" spacing={30}className="pt-[9rem] pl-[10rem]">
                            {listings.name}
                        </Typography>
                    )}

                    <div className=" pl-[9rem]">
                        <Divider className="w-[25rem]"/>
                    </div>
                    
                    {listings && (
                        <Typography fontSize="30px" className="pr-44 pl-[10rem]">
                        ${listings.price}
                        </Typography>
                    )}
                

                    <div className=" pl-[9rem]">
                        <Divider className="w-[18rem]"/>
                    </div>
                    
                    {listings && (
                        <Typography fontSize="30px" className="pl-[10rem]">
                        Category: {listings.category}
                        </Typography>
                    )}
                        
                    <div className=" pl-[9rem]">
                        <Divider className="w-[18rem]"/>
                    </div>

                    {listings && (
                        <Typography fontSize="30px" className="pl-[10rem]">
                        Description: {listings.description}
                        </Typography>
                    )}
                        
                    <div className=" pl-[9rem]">
                        <Divider className="w-[40rem]"/>
                    </div>
                    
                </Grid>
                <Grid item xs={5}>
                    
                    <Typography className=" pl-[6rem]">
                    Contact Seller:
                    </Typography>
                    
                    {listings && (
                        <Typography className=" pl-[6rem]">
                            {listings.contact}                       
                        </Typography>
                    )}
                        
                    
                </Grid>
            </Grid>            
            <Footer/>            
        </>

    )
}