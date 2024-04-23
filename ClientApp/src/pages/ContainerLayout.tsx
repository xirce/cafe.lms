import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import React from "react";

export function ContainerLayout () {
    return <Box
        minWidth="100%"
        minHeight="100%"
        paddingX={30}
        paddingY={4}>
        <Outlet/>
    </Box>;
}