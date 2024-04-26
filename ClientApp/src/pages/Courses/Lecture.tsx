import React from "react";
import { Link, useParams } from "react-router-dom";
import MuiMarkdown from "mui-markdown";
import { Button, Grid, Stack } from "@mui/material";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { useGetLectureQuery } from "../../api/apiClient";
import Typography from "@mui/material/Typography";
import { useAppAction } from "../../app/hooks";

export function Lecture() {
    const { unitId } = useParams();
    const { data, isFetching, isSuccess } = useGetLectureQuery(unitId!);
    const { setCurrentUnit } = useAppAction();

    if (isFetching || !isSuccess)
        return null;

    if (data) {
        setCurrentUnit(data.id);
    }

    return <Grid container direction='column'>
        <Grid item mb={6}>
            <Typography variant='h3' mb={5}>{data.title}</Typography>
            <MuiMarkdown>
                {
                    data.content
                }
            </MuiMarkdown>
        </Grid>
        <Stack direction='row' justifyContent='space-between'>
            <Link to={`.././unit/${Number(unitId) - 1}`}>
                <Button variant='contained' startIcon={<NavigateBefore />}>
                    Предыдущая тема
                </Button>
            </Link>
            <Link to={`test`}>
                <Button variant='contained' endIcon={<NavigateNext />}>Перейти к тесту</Button>
            </Link>
        </Stack>
    </Grid>;
}