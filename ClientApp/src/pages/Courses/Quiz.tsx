import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { AnswerType, Question } from "../../components/Quiz/Question";
import { Grid } from "@mui/material";

export function Quiz() {
    const { unitId } = useParams();

    return <>
        <Typography variant="h2" mb={5}>{`Тест к лекции ${unitId}`}</Typography>
        <Grid container gap={4}>
            <Question questionText={"1. Крушка?"} />
            <Question questionText={"2. Чашка?"} answerType={AnswerType.Radio} />
            <Question questionText={"3. Ложка?"} />
        </Grid>
    </>;
}