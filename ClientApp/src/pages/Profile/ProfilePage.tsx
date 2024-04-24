import React from "react";
import { Avatar, Button, FormControl, Grid, Paper, Stack, TextField } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import Typography from "@mui/material/Typography";

export function ProfilePage() {
    return <Paper variant='outlined' sx={{width: 520, mx: 'auto'}} >
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
            <Grid item container justifyContent='space-between' borderBottom={1} borderColor={'divider'} pb={3}>
                <Avatar
                    sx={{ width: 160, height: 160 }}
                    src="https://vkplay.ru/hotbox/content_files/Stories/2023/08/31/7ba7ab0830be4cf695cbd0d353c757f6.jpg"
                />
                {/* FIELDS */}
                <FormControl sx={{ gap: 2 }}>
                    <TextField
                        id="lastName"
                        name="lastName"
                        label="Фамилия"
                        defaultValue='Горохов'
                    />
                    <TextField
                        id="firstName"
                        name="firstName"
                        label="Имя"
                        defaultValue='Денис'
                    />
                    <TextField
                        id="middleName"
                        name="middleName"
                        label="Отчество"
                        defaultValue='Вячеславович'
                    />
                    <TextField
                        type="email"
                        id="email"
                        name="email"
                        label="Почта"
                        defaultValue='yoviltri@gmail.com'
                    />
                    <Grid
                        container
                        justifyContent='center'
                        item
                    >
                        <Button
                            component="button"
                            size="large"
                            variant="contained"
                        >
                            Сохранить
                        </Button>
                    </Grid>
                </FormControl>
            </Grid>
            <Grid item container alignItems='start' direction='column'>
                <Typography fontSize='large' mb={1}>Документы</Typography>
                <Stack direction='column' gap={2}>
                     <TextField
                        name="health-book"
                        label='Санитарная книжка'
                        InputProps={{
                            readOnly: true,
                            endAdornment: <><CloudUpload color='info'/>
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
    </Paper>;
}