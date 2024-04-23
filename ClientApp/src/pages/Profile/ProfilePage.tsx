import React from "react";
import { Avatar, Button, FormControl, Grid, Paper, TextField } from "@mui/material";

export function ProfilePage() {
    return <Paper variant="outlined">
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                justifySelf="center"
                p={3}
                gap={2}
            >
                <Grid item>
                    <Avatar
                        sx={{ width: 160, height: 160 }}
                        src="https://vkplay.ru/hotbox/content_files/Stories/2023/08/31/7ba7ab0830be4cf695cbd0d353c757f6.jpg"
                    />
                </Grid>
                <Grid item>
                    {/* FIELDS */}
                    <FormControl sx={{ gap: 2 }}>
                        {/* ROW 1: FIRST NAME */}
                        <TextField
                            id="firstName"
                            name="firstName"
                            label="Имя"
                        />

                        {/* ROW 1: LAST NAME */}
                        <TextField
                            id="lastName"
                            name="lastName"
                            label="Фамилия"
                        />

                        {/* ROW 2: MIDDLE NAME */}
                        <TextField
                            id="middleName"
                            name="middleName"
                            label="Отчество"
                        />


                        <TextField
                            type="email"
                            id="email"
                            name="email"
                            label="Почта"
                        />


                        <Grid
                            container
                            justifyContent={{ xs: "center" }}
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
            </Grid>
        </Paper>;
}