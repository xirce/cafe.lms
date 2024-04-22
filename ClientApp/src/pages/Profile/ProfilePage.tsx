import Box from "@mui/material/Box";
import React from "react";
import { Avatar, Button, Card, CardContent, FormControl, Grid, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

export function ProfilePage() {
    return <Box
        minWidth="100%"
        minHeight="100%"
        padding="24px 240px">
        <Card variant="outlined">
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                {/* CARD HEADER START */}
                <Grid item sx={{ p: "1.5rem 0rem", textAlign: "center" }}>
                    {/* PROFILE PHOTO */}
                        <Avatar
                            sx={{ width: 100, height: 100, mb: 1.5 }}
                            src="https://media.glamour.com/photos/5a425fd3b6bcee68da9f86f8/master/pass/best-face-oil.png"

                        ></Avatar>
                </Grid>
                {/* CARD HEADER END */}

                {/* BUTTON */}
                <Card variant="outlined" sx={{ height: "100%", width: "100%" }}>
                    {/* TABS */}
                    <br></br>
                    <Divider></Divider>

                    {/* MAIN CONTENT CONTAINER */}
                    <form>
                        <CardContent
                            sx={{
                                p: 3,
                                maxHeight: { md: "40vh" },
                                textAlign: { xs: "center", md: "start" }
                            }}
                        >
                            {/* FIELDS */}
                            <FormControl fullWidth>
                                <Grid
                                    container
                                    direction={{ xs: "column", md: "row" }}
                                    columnSpacing={5}
                                    rowSpacing={3}
                                >
                                    {/* ROW 1: FIRST NAME */}
                                    <Grid component="form" item xs={6}>
                                        <TextField
                                            id="firstName"
                                            name="firstName"
                                            value={"Денис"}
                                        ></TextField>
                                    </Grid>

                                    {/* ROW 1: LAST NAME */}
                                    <Grid component="form" item xs={6}>
                                        <TextField
                                            id="lastName"
                                            name="lastName"
                                            value={"Горохов"}
                                        />
                                    </Grid>

                                    {/* ROW 2: MIDDLE NAME */}
                                    <Grid item xs={6}>
                                        <TextField
                                            id="midName"
                                            name="midName"
                                            value={"Вячеславович"}
                                        ></TextField>
                                    </Grid>

                                    {/* ROW 3: EMAIL */}
                                    <Grid item xs={6}>
                                        <TextField
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={"dgorohov78@gmail.com"}
                                            title="Почта"
                                        />
                                    </Grid>

                                    {/* BUTTON */}
                                    <Grid
                                        container
                                        justifyContent={{ xs: "center", md: "flex-end" }}
                                        item
                                        xs={6}
                                    >
                                        <Button
                                            sx={{ p: "1rem 2rem", my: 2, height: "3rem" }}
                                            component="button"
                                            size="large"
                                            variant="contained"
                                            color="secondary"
                                        >
                                            Сохранить
                                        </Button>
                                    </Grid>
                                </Grid>
                            </FormControl>
                        </CardContent>
                    </form>
                </Card>
            </Grid>
        </Card>
    </Box>;
}