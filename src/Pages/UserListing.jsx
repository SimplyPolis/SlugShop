import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import App from '../App'
import { directive } from '@babel/types';
import { AppBar, Avatar, Divider, Typography, createTheme } from '@mui/material';
import {Toolbar} from '@mui/material';
import { Container } from '@mui/material';
import { Grid } from '@mui/material';
import { Paper } from '@mui/material';


export default function UserListing(){
    
    const[listing, setListings] = useState([])

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
            
           
            <Grid container spacing={1} rowSpacing={1}>
                <Grid item xs={5} spacing={12} className="pt-32">
                    
                        <img 
                        className = "pt-[8rem] pl-24 w-[40rem]" 
                        src="https://i.ebayimg.com/images/g/i8gAAOSwSatiDUg1/s-l1600.jpg" 
                        alt="Placeholder"/>
                    
                </Grid>  
                <Grid item className=" pt-72" xs={5}> 
        
                    {listing.map (listing_name => (
                        <Typography fontSize="30px" spacing={30}className="pt-[9rem]">
                            {listing_name.name}
                        </Typography>
                    ))}

                    <div className=" pl-[9rem]">
                        <Divider className="w-[18rem]"/>
                    </div>
                    
                    {listing.map(listing_price => (
                        <Typography className=" pr-44">
                            ${listing_price.price}
                        </Typography>
                    ))}

                    <div className=" pl-[9rem]">
                        <Divider className="w-[18rem]"/>
                    </div>
                    
                    {listing.map(listing_size => (
                        <Typography className="pr-44">
                            Size: {listing_size.size}
                        </Typography>
                    ))}

                    <div className=" pl-[9rem]">
                        <Divider className="w-[18rem]"/>
                    </div>

                    {listing.map(listing_condition => (
                        <Typography className="pr-[7rem]">
                            Condition: {listing_condition.condition}
                        </Typography>
                    ))}    

                    <div className=" pl-[9rem]">
                        <Divider className="w-[18rem]"/>
                    </div>
                    
                </Grid>
                <Grid item xs={5}>
                    
                    <Typography className=" pl-[6rem]">
                    Contact Seller:
                    </Typography>
                    <Typography className=" pl-[6rem]">
                    mialaniz@ucsc.edu                        
                    </Typography>
                    
                </Grid>
            </Grid>



        </>

    )
}