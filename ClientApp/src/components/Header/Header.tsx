import React, { useState } from 'react';
import { Avatar, Button, IconButton, Menu, MenuItem, Stack } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import { Link, NavLink } from "react-router-dom";
import { useGetUserQuery } from "../../api/apiClient";
import { Coffee } from "@mui/icons-material";
import Box from "@mui/material/Box";


const pages = [
    {
        title: 'Все курсы',
        link: 'courses'
    },
    {
        title: 'Мои курсы',
        link: 'my-courses'
    },
    {
        title: 'Сотрудники',
        link: 'users'
    },
]


const Header = () => {
    const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>();
    const { data: user, isFetching } = useGetUserQuery();

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => setMenuAnchor(event.currentTarget);
    const handleCloseMenu = () => setMenuAnchor(null);

    return <>
        <AppBar
            position="fixed"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Stack direction='row' gap={2}>
                    <Stack direction='row' alignItems='center' gap={1}>
                        <Coffee />
                        <Typography variant="h6" noWrap component="div">
                            <Link to='/'>Cafe LMS</Link>
                        </Typography>
                    </Stack>
                    <Box>
                        {pages.map((page) => (
                            <NavLink end to={page.link}>
                                <Button
                                    key={page.link}
                                    onClick={handleCloseMenu}
                                    sx={(theme) => ({
                                        color: 'white',
                                        '.active &': {
                                            backgroundColor: theme.palette.primary.dark
                                        }
                                    })}
                                >
                                    {page.title}
                                </Button>
                            </NavLink>
                        ))}
                    </Box>
                </Stack>
                <IconButton disableRipple onClick={handleOpenMenu}>
                    <Avatar alt={user?.lastName + ' ' + user?.firstName}
                            src={'/s'}>{user?.lastName[0]}{user?.firstName[0]}</Avatar>
                </IconButton>
                <Menu
                    sx={{ mt: '40px' }}
                    id="menu"
                    anchorEl={menuAnchor}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(menuAnchor)}
                    onClose={handleCloseMenu}
                >
                    <Link to='/profile'>
                        <MenuItem onClick={handleCloseMenu}>
                            <Typography textAlign="center">Профиль</Typography>
                        </MenuItem>
                    </Link>
                    <Link to={`http://localhost:5270/authorize/logout?backUrl=${window.location.href}`}>
                        <MenuItem onClick={handleCloseMenu}>
                            <Typography textAlign="center">Выйти</Typography>
                        </MenuItem>
                    </Link>
                </Menu>
            </Toolbar>
        </AppBar>
        <Toolbar />
    </>
};

export default Header;