import {
    Alert,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Grid,
    Paper,
    Radio,
    RadioGroup,
    Stack,
    Typography
} from "@mui/material";
import React, { useCallback, useMemo } from "react";
import { Controller, ControllerRenderProps, FieldValues, useFormContext } from "react-hook-form";
import _ from "lodash";
import { FormState } from "react-hook-form/dist/types/form";
import { AnswerType, IAnswer, IQuestionWithAnswer } from "../../types";

interface IQuestionProps {
    questionWithAnswer: IQuestionWithAnswer;
}

export function Question({ questionWithAnswer }: IQuestionProps) {
    const { control, formState, reset } = useFormContext();
    const isCorrectAnswer = useMemo(() => questionWithAnswer.isCorrectAnswer, [questionWithAnswer.answer]);
    console.log(formState);
    console.log(`Question: ${questionWithAnswer.id}, isCorrectAnswer: ${isCorrectAnswer}`);

    const isAnswerChecked = useCallback((a: IAnswer, field: ControllerRenderProps) => field.value === a.id || field.value?.includes(a.id), []);

    const getAnswerControl = useCallback((a: IAnswer, renderProps: {
        field: ControllerRenderProps,
        formState: FormState<FieldValues>
    }) => {
        return questionWithAnswer.answerType === AnswerType.Radio
            ? <FormControlLabel
                label={a.content}
                value={a.id}
                sx={{ width: '100%' }}
                control={<Radio
                    color={(isAnswerChecked(a, renderProps.field) && isCorrectAnswer !== undefined)
                        && (isCorrectAnswer ? 'success' : 'error')
                        || 'info'} />}
            />
            : <FormControlLabel
                label={a.content}
                name={questionWithAnswer.id}
                value={a.id}
                sx={{ width: '100%' }}
                control={
                    <Checkbox
                        checked={isAnswerChecked(a, renderProps.field)}
                        color={(isAnswerChecked(a, renderProps.field) && isCorrectAnswer !== undefined)
                            && (isCorrectAnswer ? 'success' : 'error')
                            || 'info'}
                        onChange={(data) => {
                            reset(undefined, { keepDirtyValues: true, keepSubmitCount: true });
                            renderProps.field.onChange(_.xor(renderProps.field.value, [a.id]));
                        }}
                    />
                }
            />;
    }, [questionWithAnswer, formState]);

    const renderAnswers = useCallback((renderProps: {
        field: ControllerRenderProps,
        formState: FormState<FieldValues>
    }) => {
        return questionWithAnswer.answers.map(a =>
            <Paper key={a.id} variant='outlined' sx={(theme) => {
                let borderColor = !formState.isSubmitSuccessful && isAnswerChecked(a, renderProps.field) ? theme.palette.info.main : '';

                if (formState.isSubmitSuccessful && isAnswerChecked(a, renderProps.field))
                    borderColor = isCorrectAnswer ? theme.palette.success.main : theme.palette.error.main;

                return {
                    px: 3,
                    mb: 1,
                    borderColor: borderColor,
                    width: '100%'
                }
            }}>
                {getAnswerControl(a, renderProps)}
            </Paper>
        );
    }, [questionWithAnswer, isCorrectAnswer]);

    return <Grid container direction="column" alignItems="flex-start" gap={1}>
        <Typography variant="h6">
            {questionWithAnswer.order}. {questionWithAnswer.content}
        </Typography>
        <Grid item alignSelf='stretch'>
            {questionWithAnswer.answerType === AnswerType.Radio
                ? <Controller
                    name={questionWithAnswer.id}
                    control={control}
                    rules={{ required: true }}
                    defaultValue={null}
                    render={(renderProps) => {
                        return <RadioGroup {...renderProps.field} onChange={(data) => {
                            reset(undefined, { keepDirtyValues: true, keepSubmitCount: true });
                            renderProps.field.onChange(data)
                        }}>
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
            {isCorrectAnswer !== undefined
                && <Alert severity={isCorrectAnswer ? 'success' : 'error'}>
                    {isCorrectAnswer ? 'Верно' : 'Неверно'}
                </Alert>}
        </Stack>
    </Grid>;
}