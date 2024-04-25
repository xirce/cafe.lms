import { Link, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { AnswerType, IAnswer, Question } from "../../components/Quiz/Question";
import { Button, Grid, Stack } from "@mui/material";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import React from "react";

const answers: IAnswer[] = [
    {
        id: 'answer1',
        text: 'Ответ 1'
    },
    {
        id: 'answer2',
        text: 'Ответ 2 Ответ 2 Ответ 2 Ответ 2 Ответ 2 Ответ 2 Ответ 2 Ответ 2 Ответ 2 Ответ 2 Ответ 2 Ответ 2 Ответ 2 Ответ 2 Ответ 2 Ответ 2 '
    },
    {
        id: 'answer3',
        text: 'Ответ 3'
    },
]

export function Quiz() {
    const { unitId } = useParams();

    return <Stack direction='column' >
        <Typography variant="h3" mb={5}>{`Тест к лекции ${unitId}`}</Typography>
        <Grid container gap={6} mb={3}>
            <Question id={"1"} questionText={"1. Крушка?"} answers={answers} />
            <Question id={"2"} questionText={"2. Чашка?"} answerType={AnswerType.Radio} answers={answers} />
            <Question id={"3"} questionText={"3. Ложка?"} answers={answers} />
        </Grid>
        <Stack direction='row' justifyContent='space-between'>
            <Link to={`..`}>
                <Button variant='contained' startIcon={<NavigateBefore />}>
                    Вернуться к лекции
                </Button>
            </Link>
            <Link to={`../../unit/${Number(unitId) + 1}`}>
                <Button variant='contained' endIcon={<NavigateNext />}>
                    Следующий раздел
                </Button>
            </Link>
        </Stack>
    </Stack>;
}