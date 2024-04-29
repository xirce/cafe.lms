import React from "react";
import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { UsersList } from "../../components/Users/UsersList";
import { useGetPermissionsQuery, useGetUserQuery, useGetUsersQuery } from "../../api/apiClient";

export function UsersPage() {
    const { data: user } = useGetUserQuery();
    const { data: permissions } = useGetPermissionsQuery();
    const { data: users } = useGetUsersQuery();

    if (!users || !permissions)
        return null;

    return <>
        <Stack direction='row' justifyContent='space-between' mb={5} pb={1} borderBottom={1} borderColor={'divider'}>
            <Typography variant='h4'>Сотрудники</Typography>
        </Stack>
        <UsersList users={users.users.filter(u => u.id !== user?.id)} permissions={permissions.permissions} />
    </>
}