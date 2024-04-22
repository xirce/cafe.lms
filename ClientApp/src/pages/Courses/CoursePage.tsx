import React from 'react';
import Box from "@mui/material/Box";
import { NavLink, Outlet, useParams } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { FormLabel } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const drawerWidth = 300;

const CoursePage = () => {
    const { courseId } = useParams();

    return <Box sx={{display: 'flex'}}>
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar/>
            <Divider/>
            <Toolbar sx={{ padding: '16px' }}>
                <Typography variant="h5" noWrap component="div">
                    Курс
                    <br/>
                    <Typography>Прогресс<FormLabel component="legend"
                                                   sx={{ float: 'right' }}>2/4</FormLabel></Typography>
                    <LinearProgress variant="determinate" value={50} color={'success'} sx={{ width: 252 }}/>
                </Typography>
            </Toolbar>
            <Divider/>
            <List>
                {['1. Раздел', '2. Раздел', '3. Раздел'].map((text, index) => (
                    <NavLink to={`unit/${index}`} >
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemText primary={text}/>
                            </ListItemButton>
                        </ListItem>
                    </NavLink>
                ))}
            </List>
        </Drawer>
        <Outlet/>
    </Box>
};

export default CoursePage;