import React from "react";
import { Checkbox, FormControlLabel, Paper, Radio } from "@mui/material";
import { AnswerType, IAnswer } from "../../types";

interface IAnswerProps {
    answer: IAnswer & { isCorrect?: boolean, type: AnswerType, questionId: string },
    isChecked: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Answer({ answer, isChecked, onChange }: IAnswerProps) {
    const color = isChecked && answer.isCorrect !== undefined && (answer.isCorrect ? 'success' : 'error') || (isChecked ? 'info' : '');

    const Control = answer.type === AnswerType.SingleCorrect ? Radio : Checkbox;

    return <Paper variant="outlined" sx={{
        px: 3,
        mb: 1,
        borderColor: color ? `${color}.main` : '',
        width: '100%'
    }}>
        {
            <FormControlLabel
                label={answer.content}
                name={answer.questionId}
                value={answer.id}
                sx={{ width: '100%' }}
                control={<Control checked={isChecked} color={color || 'default'} onChange={onChange} />}
            />
        }
    </Paper>;
}