import React, { useState } from 'react';
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import { Link } from "react-router-dom";
import { useGetUserQuery } from "../../api/apiClient";

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
                <Typography variant="h6" noWrap component="div">
                    <Link to='/'>Cafe LMS</Link>
                </Typography>
                <IconButton disableRipple onClick={handleOpenMenu}>
                    <Avatar alt={user?.lastName + ' ' + user?.firstName} src={'/s'}>{user?.lastName[0]}{user?.firstName[0]}</Avatar>
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
                    <Link to='/my-courses'>
                        <MenuItem onClick={handleCloseMenu}>
                            <Typography textAlign="center">Мои курсы</Typography>
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