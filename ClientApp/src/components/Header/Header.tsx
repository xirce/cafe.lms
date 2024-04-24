import React from 'react';
import { Avatar, Container } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import { Link } from "react-router-dom";

const Header = () => (
    <>
        <AppBar
            position="fixed"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="h6" noWrap component="div">
                        <Link to='/'>Cafe LMS</Link>
                    </Typography>
                    <Link to='/profile'>
                        <Avatar color={''} alt={'Горохов Денис'} src={'/s'} variant="rounded">ГД</Avatar>
                    </Link>
                </Toolbar>
        </AppBar>
        <Toolbar/>
    </>
);

export default Header;