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

export enum AnswerType {
    Radio,
    Checkbox
}

export interface IAnswer {
    id: string;
    text: string;
}

interface IQuestionProps {
    id: string;
    questionText: string;
    answerType?: AnswerType;
    answers: IAnswer[]
}

export function Question(props: IQuestionProps) {
    const { control, formState, reset } = useFormContext();
    const isCorrectAnswer = useMemo(() => (formState.submitCount > 0 && formState.isSubmitSuccessful || undefined) && (Math.random() > 0.5), [formState.submitCount]);
    console.log(formState);
    console.log(`Question: ${props.id}, isCorrectAnswer: ${isCorrectAnswer}`);

    const isAnswerChecked = useCallback((a: IAnswer, field: ControllerRenderProps) => field.value === a.id || field.value?.includes(a.id), []);

    const getAnswerControl = useCallback((a: IAnswer, renderProps: { field: ControllerRenderProps, formState: FormState<FieldValues> }) => {
        return props.answerType === AnswerType.Radio
            ? <FormControlLabel
                label={a.text}
                value={a.id}
                control={<Radio
                    color={(isAnswerChecked(a, renderProps.field) && isCorrectAnswer !== undefined)
                        && (isCorrectAnswer ? 'success' : 'error')
                        || 'info'} />}
            />
            : <FormControlLabel
                label={a.text}
                name={props.id}
                value={a.id}
                disableTypography={true}
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
    }, [props, formState]);

    const renderAnswers = useCallback((renderProps: {field: ControllerRenderProps, formState: FormState<FieldValues>}) => {
        return props.answers.map(a =>
            <Paper key={a.id} variant='outlined' sx={(theme) => {
                let borderColor = !formState.isSubmitSuccessful && isAnswerChecked(a, renderProps.field) ? theme.palette.info.main : '';

                if (formState.isSubmitSuccessful && isAnswerChecked(a, renderProps.field))
                    borderColor = isCorrectAnswer ? theme.palette.success.main : theme.palette.error.main;

                return {
                px: 3,
                mb: 1,
                borderColor: borderColor
            }}}>
                {getAnswerControl(a, renderProps)}
            </Paper>
        );
    }, [props, isCorrectAnswer]);

    return <Grid container direction="column" alignItems="flex-start" gap={1}>
        <Typography variant="h6">
            {props.questionText}
        </Typography>
        {props.answerType === AnswerType.Radio
            ? <Controller
                name={props.id}
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
                name={props.id}
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
        <Stack direction='row' alignItems='center' gap={4} height={48}>
            {isCorrectAnswer !== undefined
                && <Alert severity={isCorrectAnswer ? 'success' : 'error'}>
                    {isCorrectAnswer ? 'Верно' : 'Неверно'}
                </Alert>}
        </Stack>
    </Grid>;
}