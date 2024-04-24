import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

export function CourseLayout() {
    return <Box
        sx={{ pt: 3, pb: 20, px: 32 }}
    >
        <Outlet/>
    </Box>
}