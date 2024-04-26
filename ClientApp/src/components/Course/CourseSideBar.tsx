import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FormLabel } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import List from "@mui/material/List";
import { NavLink } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import React from "react";
import { CheckCircle, Circle } from "@mui/icons-material";

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
];

const unitsDone = units.filter(u => u.done).length;

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
                <FormLabel component="legend" sx={{ float: 'right' }}>{unitsDone}/{units.length}</FormLabel>
            </Typography>
            <LinearProgress
                variant="determinate"
                value={100 * unitsDone / units.length}
                color={'success'} sx={{ width: '100%', height: 8 }} />
        </Box>
        <Divider />
        <List>
            {units.map(({ name, done }, index) => (
                <NavLink key={name} to={`unit/${index}`}>
                    <ListItem
                        disablePadding>
                        <ListItemButton sx={(theme) => ({
                            '.active &': {
                                backgroundColor: theme.palette.action.selected,
                                borderRight: 2,
                                borderColor: done ? theme.palette.success.main : theme.palette.action.active,
                            }
                        })}>
                            <ListItemText primary={name} primaryTypographyProps={{ noWrap: true, title: name }} />
                            {done
                                ? <CheckCircle color='success' fontSize={'small'} />
                                : <Circle color='disabled' fontSize={'small'} />}
                        </ListItemButton>
                    </ListItem>
                </NavLink>
            ))}
        </List>
    </Drawer>;
}