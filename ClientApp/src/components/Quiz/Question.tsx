import {
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Grid,
    Paper,
    Radio,
    RadioGroup,
    Typography
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";

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
        formState,
    } = useForm();

    console.log(formState);

    const onSubmit = (data: any) => console.log(data)

    return <form onSubmit={handleSubmit(onSubmit)} name={props.id}>
        <Grid container direction="column" alignItems="flex-start" gap={2}>
            <Typography variant="h6">
                {props.questionText}
            </Typography>
            {props.answerType === AnswerType.Radio
                ? <RadioGroup name='answers'>
                    {props.answers.map(a =>
                        <Paper key={a.id} variant='outlined' sx={{ px: 3, mb: 1 }}>
                            <Controller
                                name={props.id}
                                control={control}
                                render={({ field }) => {
                                    return <FormControlLabel control={<Radio name={props.id} value={a.id} onChange={field.onChange}/>} label={a.text} />
                                }} />
                        </Paper>)}
                </RadioGroup>
                : <FormGroup>
                    {props.answers.map(a =>
                        <Paper key={a.id} variant='outlined' sx={{ px: 3, mb: 1 }}>
                            <Controller
                                name={a.id}
                                control={control}
                                render={({ field }) =>
                                    {
                                        return <FormControlLabel control={<Checkbox name={props.id} value={field.value} onChange={field.onChange} />} label={a.text} />
                                    }
                                } />
                        </Paper>)}
                </FormGroup>
            }
            <Button variant="contained" type='submit'>
                Сохранить
            </Button>
        </Grid>
    </form>;
}