import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import React from 'react';
import App from '../App'
import NavBarOther from '../components/NavBarOther';
import { directive } from '@babel/types';
import { AppBar, Avatar, Divider, Typography, createTheme } from '@mui/material';
import {Toolbar} from '@mui/material';
import { Container } from '@mui/material';
import { Grid } from '@mui/material';
import { Paper } from '@mui/material';
import $ from 'jquery';


export default function UserListing(){
    
    return(
        <>
            
            <NavBarOther/>  
            <Grid container spacing={1} rowSpacing={1}>
                <Grid item xs={5} spacing={12} className="pt-32">
                    
                        <img 
                        className = "pt-[8rem] pl-24 w-[40rem]" 
                        src="https://i.ebayimg.com/images/g/i8gAAOSwSatiDUg1/s-l1600.jpg" 
                        alt="Placeholder"/>
                    
                </Grid>  
                <Grid item className=" pt-72" xs={5}> 
                    
                    <Typography fontSize="30px" spacing={30}className="pt-[9rem]">
                        Vintage Sweater
                    </Typography>
                    <div className=" pl-[9rem]">
                        <Divider className="w-[18rem]"/>
                    </div>
                    <Typography className=" pr-44">
                        $15.99
                    </Typography>
                    <div className=" pl-[9rem]">
                        <Divider className="w-[18rem]"/>
                    </div>
                    <Typography className="pr-44">
                        Size: L
                    </Typography>
                    <div className=" pl-[9rem]">
                        <Divider className="w-[18rem]"/>
                    </div>
                    <Typography className="pr-[7rem]">
                        Condition: New
                    </Typography>
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