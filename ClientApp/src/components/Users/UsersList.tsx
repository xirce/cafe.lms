import { FormLabel, List, ListItem, ListItemText, Paper } from "@mui/material";
import { IUserInfo } from "../../types";
import { buildParametrizedPermission, Permission } from "../../authorization/permissions";
import { Link } from "react-router-dom";

interface IUsersListProps {
    users: IUserInfo[];
    permissions: string[];
}

export function UsersList({ users, permissions }: IUsersListProps) {
    return <List sx={{ width: '100%' }}>
        {
            users.map(u =>
                <Paper sx={{ mb: 1 }}>
                    <ListItem
                        secondaryAction={
                            permissions.includes(buildParametrizedPermission(Permission.StatisticsView, u.position.id))
                                ? <Link to={`/users/${u.id}/courses`}>
                                    <FormLabel sx={(theme) => ({
                                        textDecoration: 'underline', '&:hover': {
                                            color: theme.palette.text.primary,
                                            cursor: 'pointer'
                                        }
                                    })}>
                                        Статистика
                                    </FormLabel>
                                </Link>
                                : null

                        }
                        itemID={u.id}>
                        <ListItemText>
                            {u.lastName} {u.firstName} - {u.position.title}
                        </ListItemText>
                    </ListItem>
                </Paper>
            )
        }
    </List>
}