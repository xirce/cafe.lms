import { IconButton, List, ListItem, ListItemText, Paper } from "@mui/material";
import { IUnit, UserUnitStatus } from "../types";
import { CheckCircle, Circle, Edit } from "@mui/icons-material";
import { Link, NavLink } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";

interface IUnitsListProps {
    units: IUnit[];
    courseId: string;
    showProgress?: boolean;
    editable?: boolean;
}

export function UnitsList({ units, courseId, showProgress, editable }: IUnitsListProps) {
    return <List sx={{ width: '100%' }}>
        {
            units.slice().sort((a, b) => a.order - b.order).map(u => {
                const listItem = <ListItem disablePadding
                                           secondaryAction={
                                               <>
                                                   {
                                                       showProgress ? u.progress?.status === UserUnitStatus.Done
                                                           ? <CheckCircle color='success' fontSize={'small'} />
                                                           : <Circle color='disabled' fontSize={'small'} /> : null
                                                   }
                                                   {
                                                       editable ? <Link to={`/courses/${courseId}/unit/${u.id}/edit`}>
                                                           <IconButton
                                                               disableTouchRipple
                                                               edge="end"
                                                           >
                                                               <Edit />
                                                           </IconButton>
                                                       </Link> : null
                                                   }
                                               </>}
                                           itemID={u.id}>
                    <ListItemButton>
                        <ListItemText>
                            {u.title}
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
                return <Paper sx={{ mb: 1, }}>
                    {
                        editable ? listItem : <NavLink to={`/courses/${courseId}/unit/${u.id}`}>{listItem}</NavLink>
                    }
                </Paper>
            })
        }
    </List>
}