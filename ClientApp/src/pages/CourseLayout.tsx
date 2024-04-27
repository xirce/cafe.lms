import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

export function CourseLayout() {
    return <Box
        sx={{ pt: 8, pb: 20, px: 6, width: '100%' }}
    >
        <Box mx='auto' maxWidth={1000}>
            <Outlet/>
        </Box>
    </Box>
}