import { Alert, FormGroup, Grid, RadioGroup, Stack, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { Controller, ControllerRenderProps, FieldValues, useFormContext } from "react-hook-form";
import { FormState } from "react-hook-form/dist/types/form";
import { AnswerType, IAnswer, IQuestionWithAnswer } from "../../types";
import { Answer } from "./Answer";
import _ from "lodash";

interface IQuestionProps {
    questionWithAnswer: IQuestionWithAnswer;
}

export function Question({ questionWithAnswer }: IQuestionProps) {
    const { control, formState, reset } = useFormContext();
    console.log(formState);

    const isAnswerChecked = useCallback((a: IAnswer, field: ControllerRenderProps) => field.value === a.id || field.value?.includes(a.id), []);

    const renderAnswers = useCallback((renderProps: {
        field: ControllerRenderProps,
        formState: FormState<FieldValues>
    }) => {
        return questionWithAnswer.answers.map(a =>
            <Answer
                key={a.id}
                answer={{
                    ...a,
                    type: questionWithAnswer.answerType,
                    isCorrect: questionWithAnswer.answer.includes(a.id) && !questionWithAnswer.incorrectAnswerIds.includes(a.id),
                    questionId: questionWithAnswer.id,
                }}
                isChecked={isAnswerChecked(a, renderProps.field)}
                onChange={d => renderProps.field.onChange(_.xor(renderProps.field.value, [a.id]))}
            />);
    }, [questionWithAnswer]);

    return <Grid container direction="column" alignItems="flex-start" gap={1}>
        <Typography variant="h6">
            {questionWithAnswer.order}. {questionWithAnswer.content}
        </Typography>
        <Grid item alignSelf='stretch'>
            {questionWithAnswer.answerType === AnswerType.SingleCorrect
                ? <Controller
                    name={questionWithAnswer.id}
                    control={control}
                    rules={{ required: true }}
                    defaultValue={null}
                    render={(renderProps) => {
                        return <RadioGroup {...renderProps.field}>
                            {renderAnswers(renderProps)}
                        </RadioGroup>
                    }} />
                :
                <Controller
                    name={questionWithAnswer.id}
                    control={control}
                    rules={{ required: true }}
                    defaultValue={[]}
                    render={(renderProps) => {
                        return <FormGroup>
                            {renderAnswers(renderProps)}
                        </FormGroup>
                    }}
                />
            }
        </Grid>
        <Stack direction='row' alignItems='center' gap={4} height={48}>
            {questionWithAnswer.isCorrectAnswer !== undefined
                && <Alert severity={questionWithAnswer.isCorrectAnswer ? 'success' : 'error'}>
                    {questionWithAnswer.isCorrectAnswer ? 'Верно' : 'Неверно'}
                </Alert>}
        </Stack>
    </Grid>;
}