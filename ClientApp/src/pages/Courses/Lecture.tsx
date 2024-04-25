import React from "react";
import { Link, useParams } from "react-router-dom";
import MuiMarkdown from "mui-markdown";
import { Button, Grid, Stack } from "@mui/material";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";

export function Lecture() {
    const { courseId, unitId } = useParams();

    return <Grid container direction='column'>
        <Grid item mb={6}>
            <MuiMarkdown>
                {`##${unitId}\n` +
                    `<img src="https://sberbusiness.live/bcp-laika-public/72a33711-1d6f-42cb-b93d-1fd8d3a42ac1/original" width="560px" style="display: block; margin-left: auto; margin-right: auto; margin-bottom: 32px"/>\n` +
                    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris varius fermentum tellus, at egestas tortor pretium at. Curabitur sodales elit vitae sodales tincidunt. Fusce consectetur nisi at neque vestibulum, ut tempus leo aliquam. Suspendisse potenti. Mauris ut hendrerit leo, blandit congue enim. Sed sodales auctor dapibus. Fusce ac mollis turpis, quis interdum augue. Vivamus fermentum nulla nec dui porttitor vestibulum. Donec gravida finibus rhoncus. Duis massa lectus, rhoncus ut ornare ac, laoreet in dui.

Integer ac nibh tristique, bibendum nisi ac, pretium nibh. Fusce eget tempor diam. Nullam vitae euismod mauris, sed pharetra massa. Praesent iaculis fermentum diam, et aliquam massa ornare eget. Maecenas vitae lorem eu nunc porttitor feugiat. Pellentesque suscipit fringilla felis eu vulputate. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras maximus quam et massa tristique imperdiet. Vestibulum vel fringilla ipsum, ac porta ex. Pellentesque finibus vitae ante consequat tempor.

Ut a sapien mauris. Suspendisse interdum scelerisque quam, id mattis dolor aliquam quis. Quisque ultrices leo nibh, vehicula maximus est fermentum eget. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer tristique velit nulla, eget volutpat dolor ornare ut. Etiam a velit nec metus varius consectetur at vel nisl. Morbi non varius erat, eget fringilla nisl. Sed tincidunt est sit amet fringilla ultrices. Aenean vel justo fringilla, porttitor tellus vel, egestas sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer erat ex, cursus ut placerat at, vestibulum id sem.

Ut eget ornare nunc. Curabitur dapibus purus ut hendrerit rutrum. Proin quam neque, molestie at facilisis iaculis, iaculis eget odio. Donec non odio id orci pharetra posuere ac vel magna. Maecenas non commodo justo, nec semper risus. Curabitur at ligula elementum, eleifend felis egestas, egestas arcu. Quisque id lorem a purus mattis sodales. Quisque quis purus orci. Duis ut felis et metus hendrerit viverra. Donec eget dui cursus, tincidunt nisi ut, consectetur nisl. Vestibulum vestibulum urna sed ligula tempus, et imperdiet velit eleifend.

Phasellus et nibh ipsum. Quisque ullamcorper molestie tristique. Donec sed enim a ante rutrum vulputate. Maecenas at pharetra magna. Vestibulum luctus justo et dui varius, sed elementum erat pulvinar. Aenean gravida, sapien viverra mollis aliquet, lorem arcu posuere libero, sit amet molestie turpis tellus sed nisl. Nullam in leo tristique, convallis erat sed, pretium magna. Pellentesque nisi diam, mattis sed purus quis, pretium bibendum ex. Proin tempus erat eu quam varius, in egestas lorem consectetur. Mauris imperdiet est ut nisi porttitor, ac dignissim lacus dignissim. Integer porttitor nisi ut libero ultrices, non dapibus odio tincidunt.`}
            </MuiMarkdown>
        </Grid>
        <Stack direction='row' justifyContent='space-between'>
            <Link to={`.././unit/${Number(unitId) - 1}`}>
                <Button variant='contained' startIcon={<NavigateBefore />}>
                    Предыдущий раздел
                </Button>
            </Link>
            <Link to={`test`}>
                <Button variant='contained' endIcon={<NavigateNext />}>Перейти к тесту</Button>
            </Link>
        </Stack>
    </Grid>;
}