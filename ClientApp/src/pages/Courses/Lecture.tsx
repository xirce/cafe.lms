import React from "react";
import { Link, useParams } from "react-router-dom";
import MuiMarkdown from "mui-markdown";
import { Button, Grid } from "@mui/material";
import Box from "@mui/material/Box";

export function Lecture() {
    const { courseId, unitId } = useParams();

    return <>
        <Box mb={3}>
            <MuiMarkdown>
                {`##${unitId}\n` +
                    `<img src="https://sberbusiness.live/bcp-laika-public/72a33711-1d6f-42cb-b93d-1fd8d3a42ac1/original" width="60%" style="display: block; margin-left: auto; margin-right: auto"/>`}
            </MuiMarkdown>
        </Box>
        <Grid container justifyContent="center">
            <Link to={`../test/${unitId}`}>
                <Button variant='contained'>Перейти к тесту</Button>
            </Link>
        </Grid>
    </>;
}