import React from 'react';
import { Avatar, Container } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";

const Header = () => (
    <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
        <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                <Typography variant="h6" noWrap component="div">
                    Cafe LMS
                </Typography>
                <Avatar color={''} alt={'Горохов Денис'} src={'/s'} variant="rounded">ГД</Avatar>
            </Toolbar>
        </Container>
    </AppBar>
);

export default Header;