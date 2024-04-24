import {
    Alert,
    Button,
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
import React from "react";
import { Controller, useForm } from "react-hook-form";
import _ from "lodash";

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
    const {
        handleSubmit,
        control,
        formState
    } = useForm();

    console.log(formState);

    const isCorrectAnswer = formState.isSubmitSuccessful;

    const onSubmit = (data: any) => {
        console.log(data);
    }

    return <form onSubmit={handleSubmit(onSubmit)} name={props.id}>
        <Grid container direction="column" alignItems="flex-start" gap={2}>
            <Typography variant="h6">
                {props.questionText}
            </Typography>
            {props.answerType === AnswerType.Radio
                ? <Controller
                    name={props.id}
                    control={control}
                    rules={{ required: true }}
                    defaultValue={null}
                    render={({ field }) => {
                        return <RadioGroup {...field}>
                            {props.answers.map(a =>
                                <Paper key={a.id} variant='outlined' sx={{ px: 3, mb: 1 }}>
                                    <FormControlLabel
                                        disabled={formState.isSubmitting || formState.isSubmitSuccessful}
                                        value={a.id}
                                        control={<Radio />}
                                        label={a.text}
                                    />
                                </Paper>
                            )}
                        </RadioGroup>
                    }} />
                :
                <Controller
                    name={props.id}
                    control={control}
                    rules={{ required: true }}
                    defaultValue={[]}
                    render={({ field, fieldState, formState }) => {
                        console.log(field);
                        console.log(fieldState);
                        return <FormGroup>
                            {props.answers.map(a => (
                                <Paper key={a.id} variant='outlined' sx={{ px: 3, mb: 1 }}>
                                    <FormControlLabel
                                        label={a.text}
                                        name={props.id}
                                        value={a.id}
                                        disabled={formState.isSubmitting || formState.isSubmitSuccessful}
                                        control={
                                            <Checkbox
                                                checked={field.value.includes(a.id)}
                                                onChange={() => field.onChange(_.xor(field.value, [a.id]))}
                                            />
                                        }
                                    />
                                </Paper>
                            ))}
                        </FormGroup>
                    }}
                />
            }
            <Stack direction='row' alignItems='center' gap={4}>
                <Button variant="contained" type='submit'
                        disabled={!formState.isDirty || !formState.isValid || isCorrectAnswer}>
                    Сохранить
                </Button>
                {formState.isSubmitted
                 && <Alert severity={isCorrectAnswer ? 'success' : 'error'} >
                        {isCorrectAnswer ? 'Верно' : 'Неверно'}
                    </Alert>}
            </Stack>
        </Grid>
    </form>;
}