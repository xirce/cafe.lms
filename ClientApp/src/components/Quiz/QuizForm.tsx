import { Button, Grid, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Question } from "./Question";
import { FormProvider, useForm } from "react-hook-form";
import React, { useCallback } from "react";
import { IQuizAttempt } from "../../types";
import { mapAnswerFromArray, mapAnswerToArray } from "../../utils/answerMapping";
import { useSubmitQuizMutation } from "../../api/apiClient";

interface IQuizFormProps {
    quiz: IQuizAttempt;
}

export function QuizForm({ quiz }: IQuizFormProps) {
    const form = useForm({
        defaultValues: Object.fromEntries((quiz.questionsWithAnswers.some(q => q.answer) && quiz.questionsWithAnswers.map(q => [q.id, mapAnswerFromArray(q.answer)])) || []),
    });
    const [submitQuiz, _] = useSubmitQuizMutation();

    const onSubmit = useCallback(async (data: Record<string, Array<string> | string>) => {
        console.log(data);
        const answers = Object.entries(data).map(([questionId, answer]) => {
            return {
                questionId,
                answer: mapAnswerToArray(answer)
            };
        });
        const submitResult = await submitQuiz({
            quizId: quiz!.quizId,
            answers: answers
        });
        console.log(submitResult);
    }, [quiz?.quizId]);

    return <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Stack direction='column'>
                <Typography variant="h3" mb={5}>{`Тест к лекции "${quiz.title}`}"</Typography>
                <Grid container alignItems='start' gap={2} mb={4}>
                    {
                        quiz.questionsWithAnswers.map(q => <Question key={q.id} questionWithAnswer={q} />)
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
            </Stack>
        </form>
    </FormProvider>
}