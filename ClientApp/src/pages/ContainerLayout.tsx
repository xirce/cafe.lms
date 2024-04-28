import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import React from "react";

export function ContainerLayout () {
    return <Box
        minWidth="100%"
        minHeight="100%"
        px={4}
        pt={6}
        pb={4}>
        <Box pb={6} mx='auto' maxWidth={1000}>
            <Outlet/>
        </Box>
    </Box>;
}