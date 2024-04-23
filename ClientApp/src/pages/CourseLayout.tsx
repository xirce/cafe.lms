import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

export function CourseLayout() {
    return <Box
        sx={{ py: 3, px: 20 }}
    >
        <Outlet/>
    </Box>
}