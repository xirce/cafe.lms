import { Link, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Button, Grid, Stack } from "@mui/material";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useAppSelector } from "../../app/hooks";
import { getCourse, getCurrentUnit } from "../../app/course";
import { useGetQuizAttemptQuery, useGetQuizQuery } from "../../api/apiClient";
import { IQuestionWithAnswer } from "../../types";
import { Question } from "../../components/Quiz/Question";

export function Quiz() {
    const { unitId } = useParams();
    const form = useForm();
    const currentUnit = (useAppSelector(getCurrentUnit))!;
    const course = (useAppSelector(getCourse))!;
    let { data: quizAttempt, ...quizAttemptQuery } = useGetQuizAttemptQuery(unitId);
    const skip = Boolean(quizAttemptQuery.isFetching || quizAttemptQuery.isSuccess && quizAttempt);
    console.log(`Skip get quiz: ${skip}`);
    const { data: quizInfo } = useGetQuizQuery(unitId, { skip: skip });

    if (quizInfo) {
        quizAttempt = {
            quizId: quizInfo.quizId,
            title: quizInfo.title,
            questionsWithAnswers: quizInfo.questions?.map(q => q as IQuestionWithAnswer) ?? [],
            isCorrect: undefined
        }
    }

    if (!quizAttempt)
        return null;

    const onSubmit = (data: any) => {
        console.log(data);
    }

    return <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Stack direction='column'>
                <Typography variant="h3" mb={5}>{`Тест к лекции "${quizAttempt.title}`}"</Typography>
                <Grid container alignItems='start' gap={2} mb={4}>
                    {
                        quizAttempt.questionsWithAnswers.map(q => <Question key={q.id} questionWithAnswer={q}/>)
                    }
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