import { Checkbox, FormControlLabel, FormGroup, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import React from "react";

export enum AnswerType {
    Radio,
    Checkbox
}

interface IQuestionProps {
    questionText: string;
    answerType?: AnswerType;
}

export function Question(props: IQuestionProps) {
    return <Grid container direction="column" gap={1}>
        <Typography variant="h5">
            {props.questionText}
        </Typography>
        <Grid container gap={2} ml={3}>
            {props.answerType === AnswerType.Radio
                ? <RadioGroup name="answers">
                    <FormControlLabel control={<Radio />} label="Ответ 1" />
                    <FormControlLabel control={<Radio />} label="Ответ 2" />
                    <FormControlLabel control={<Radio />} label="Ответ 3" />
                </RadioGroup>
                : <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="Ответ 1" />
                    <FormControlLabel control={<Checkbox />} label="Ответ 2" />
                    <FormControlLabel control={<Checkbox />} label="Ответ 3" />
                </FormGroup>
            }
        </Grid>
    </Grid>
}