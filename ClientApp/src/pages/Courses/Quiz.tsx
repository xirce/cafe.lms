import { Link, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { AnswerType, IAnswer, Question } from "../../components/Quiz/Question";
import { Button, Grid, Stack } from "@mui/material";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useAppSelector } from "../../app/hooks";
import { getCourse, getCurrentUnit } from "../../app/course";

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
    const form = useForm();
    const currentUnit = (useAppSelector(getCurrentUnit))!;
    const course = (useAppSelector(getCourse))!;

    const onSubmit = (data: any) => {
        console.log(data);
    }

    return <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Stack direction='column'>
                <Typography variant="h3" mb={5}>{`Тест к лекции "${currentUnit!.title}`}"</Typography>
                <Grid container alignItems='start' gap={2} mb={4}>
                    <Question id={"1"} questionText={"1. Крушка?"} answers={answers} />
                    <Question id={"2"} questionText={"2. Чашка?"} answerType={AnswerType.Radio} answers={answers} />
                    <Question id={"3"} questionText={"3. Ложка?"} answers={answers} />
                </Grid>
                <Grid container justifyContent='start' mb={12}>
                    <Button
                        size='large'
                        variant="contained"
                        type='submit'
                        disabled={!form.formState.isDirty || !form.formState.isValid || form.formState.isSubmitSuccessful}
                    >
                        Сохранить
                    </Button>
                </Grid>
                <Stack direction='row' justifyContent='space-between'>
                    <Link to={`..`}>
                        <Button variant='contained' startIcon={<NavigateBefore />}>
                            Вернуться к лекции
                        </Button>
                    </Link>
                    {
                        currentUnit.order + 1 < course.unitsCount &&
                        <Link to={`../../unit/${Number(unitId) + 1}`}>
                            <Button variant='contained' endIcon={<NavigateNext />}>
                                Следующая тема
                            </Button>
                        </Link>
                    }
                </Stack>
            </Stack>
        </form>
    </FormProvider>;
}