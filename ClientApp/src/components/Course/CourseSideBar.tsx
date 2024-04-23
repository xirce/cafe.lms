import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FormLabel, ListItemIcon } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import List from "@mui/material/List";
import { NavLink } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import React from "react";
import { CheckCircle } from "@mui/icons-material";

const drawerWidth = 280;

const units = [
    {
        name: '1. Раздел',
        done: true
    },
    {
        name: '2. Раздел ываыаыаыаыаыыффыфыфыфыфыыф',
        done: true
    },
    {
        name: '3. Раздел'
    },
    {
        name: '4. Раздел'
    },
]

export function CourseSideBar() {
    return <Drawer
        sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                marginTop: 8
            },
        }}
        variant="permanent"
        anchor="left"
    >
        <Divider />
        <Box padding={2}>
            <Typography variant="h5" noWrap mb={3} fontWeight='bold'>
                Курс
            </Typography>
            <Typography>
                Прогресс
                <FormLabel component="legend" sx={{ float: 'right' }}>2/4</FormLabel>
            </Typography>
            <LinearProgress variant="determinate" value={50} color={'success'} sx={{ width: '100%', height: 8 }} />
        </Box>
        <Divider />
        <List sx={(theme) => ({
            '.active .MuiListItemButton-root': {
                backgroundColor: theme.palette.action.selected
            }
        })}>
            {units.map(({ name, done }, index) => (
                <NavLink to={`unit/${index}`}>
                    <ListItem
                        key={name}
                        disablePadding>`
                        <ListItemButton>
                            <ListItemText primary={name} primaryTypographyProps={{noWrap: true, title: name}} />
                            {done && <CheckCircle color='success' fontSize={'small'} />}
                        </ListItemButton>
                    </ListItem>
                </NavLink>
            ))}
        </List>
    </Drawer>;
}