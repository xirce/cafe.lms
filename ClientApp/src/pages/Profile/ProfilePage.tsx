import React from "react";
import { Avatar, Card, Grid, Stack, TextField } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import { useGetUserQuery } from "../../api/apiClient";
import { PersonalDataForm } from "../../components/Profile/PersonalDataForm";

export function ProfilePage() {
    const { data, isSuccess } = useGetUserQuery();

    if (!isSuccess)
        return null;

    return <Stack width={520} mx='auto'>
        <Typography variant='h4' mb={1} >Профиль</Typography>
        <Card variant='outlined'>
            <Grid
                container
                direction="row"
                justifyContent="stretch"
                alignItems="start"
                marginY='auto'
                columns={2}
                flexWrap='wrap'
                p={3}
                gap={3}
            >
                <Grid item container direction='row' justifyContent='space-between' borderBottom={1}
                      borderColor={'divider'}
                      pb={3}>
                    <Stack justifyContent='start' alignItems='center' gap={7}>
                        <Avatar
                            sx={{ width: 160, height: 160 }}
                            src="https://vkplay.ru/hotbox/content_files/Stories/2023/08/31/7ba7ab0830be4cf695cbd0d353c757f6.jpg"
                        />
                        <TextField
                            id="role"
                            label="Роль"
                            defaultValue={data.position.title}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Stack>
                    <PersonalDataForm user={data} />
                </Grid>
                <Grid item container alignItems='start' direction='column'>
                    <Typography fontSize='large' mb={1}>Документы</Typography>
                    <Stack direction='column' gap={2}>
                        <TextField
                            name="health-book"
                            label='Санитарная книжка'
                            InputProps={{
                                readOnly: true,
                                endAdornment: <><CloudUpload color='info' />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            right: 0,
                                            bottom: 0,
                                            left: 0,
                                            opacity: 0,
                                            cursor: 'pointer'
                                        }}
                                    /></>
                            }}
                        />
                    </Stack>
                </Grid>
            </Grid>
        </Card>
    </Stack>;
}