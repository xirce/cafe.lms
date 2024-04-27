import { Link, useParams } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import React from "react";
import { useAppSelector } from "../../app/hooks";
import { getCourse, getCurrentUnit } from "../../app/course";
import { useGetQuizAttemptQuery, useGetQuizQuery } from "../../api/apiClient";
import { IQuestionWithAnswer } from "../../types";
import { QuizForm } from "../../components/Quiz/QuizForm";

export function Quiz() {
    const { unitId } = useParams();
    const currentUnit = (useAppSelector(getCurrentUnit))!;
    const course = (useAppSelector(getCourse))!;
    let {
        data: quizAttempt,
        ...quizAttemptQuery
    } = useGetQuizAttemptQuery(unitId, { refetchOnMountOrArgChange: true });
    const skip = Boolean(quizAttemptQuery.isFetching || quizAttemptQuery.isSuccess && quizAttempt);
    console.log(`Skip get quiz: ${skip}`);
    const { data: quizInfo } = useGetQuizQuery(unitId, { skip: skip, refetchOnMountOrArgChange: true });

    if (quizInfo) {
        quizAttempt = {
            quizId: quizInfo.quizId,
            title: quizInfo.title,
            questionsWithAnswers: quizInfo.questions.map(q => q as IQuestionWithAnswer),
            isCorrect: undefined
        }
    }

    if (!course || !quizAttempt)
        return null;

    return <>
        <QuizForm quiz={quizAttempt} />
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
    </>;
}