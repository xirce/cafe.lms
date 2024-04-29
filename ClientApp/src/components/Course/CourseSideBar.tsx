import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FormLabel } from "@mui/material";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";
import List from "@mui/material/List";
import { NavLink } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import React from "react";
import { CheckCircle, Circle } from "@mui/icons-material";
import { ICourseInfo, UserUnitStatus } from "../../types";

const drawerWidth = 280;

interface ICourseSideBarProps {
    course: ICourseInfo;
}

export function CourseSideBar({ course }: ICourseSideBarProps) {
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
                {course.title}
            </Typography>
            <Typography>
                Прогресс
                <FormLabel component="legend" sx={{ float: 'right' }}>
                    {course.progress?.unitsDoneCount}/{course.unitsCount}
                </FormLabel>
            </Typography>
            <LinearProgress
                variant="determinate"
                value={100 * (course.progress?.unitsDoneCount || 0) / course.unitsCount}
                color={'success'}
                sx={(theme) => ({
                    width: '100%',
                    height: 8,
                    [`&.${linearProgressClasses.root}`]: {
                        backgroundColor: theme.palette.action.disabledBackground,
                    },
                })}
            />
        </Box>
        <Divider />
        <List>
            {course.units.slice().sort((a, b) => a.order - b.order).map(({ id, title, progress }) => (
                <NavLink key={id} to={`unit/${id}`}>
                    <ListItem
                        disablePadding>
                        <ListItemButton sx={(theme) => ({
                            '.active &': {
                                backgroundColor: theme.palette.action.selected,
                                borderRight: 2,
                                borderColor: progress?.status === UserUnitStatus.Done ? theme.palette.success.main : theme.palette.action.active,
                            }
                        })}>
                            <ListItemText primary={title} primaryTypographyProps={{ noWrap: true, title: title }} />
                            {progress?.status === UserUnitStatus.Done
                                ? <CheckCircle color='success' fontSize={'small'} />
                                : <Circle color='disabled' fontSize={'small'} />}
                        </ListItemButton>
                    </ListItem>
                </NavLink>
            ))}
        </List>
    </Drawer>;
}