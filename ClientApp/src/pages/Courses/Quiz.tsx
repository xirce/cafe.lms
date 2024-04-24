import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { AnswerType, IAnswer, Question } from "../../components/Quiz/Question";
import { Grid } from "@mui/material";

const answers: IAnswer[] = [
    {
        id: 'answer1',
        text: 'Ответ 1'
    },
    {
        id: 'answer2',
        text: 'Ответ 2 Ответ 2 Ответ 2 Ответ 2 Ответ 2 Ответ 2 Ответ 2 Ответ 2 Ответ 2 Ответ 2 Ответ 2 Ответ 2 Ответ 2 Ответ 2 Ответ 2 Ответ 2 '
    },
    {
        id: 'answer3',
        text: 'Ответ 3'
    },
]

export function Quiz() {
    const { unitId } = useParams();

    return <>
        <Typography variant="h3" mb={5}>{`Тест к лекции ${unitId}`}</Typography>
        <Grid container gap={6}>
            <Question id={"1"} questionText={"1. Крушка?"} answers={answers} />
            <Question id={"2"} questionText={"2. Чашка?"} answerType={AnswerType.Radio} answers={answers} />
            <Question id={"3"} questionText={"3. Ложка?"} answers={answers} />
        </Grid>
    </>;
}