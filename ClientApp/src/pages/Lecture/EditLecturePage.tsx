import React from "react";
import { useParams } from "react-router-dom";
import { Box, Button, IconButton, List, ListItem, ListItemText, Paper, Stack, TextField } from "@mui/material";
import {
    ISaveQuestionRequest,
    useGetCourseQuery,
    useGetLectureQuery,
    useGetQuizQuery,
    useSaveQuestionMutation
} from "../../api/apiClient";
import Typography from "@mui/material/Typography";
import { SaveLectureForm } from "../../components/Lecture/SaveLectureForm";
import { CreateUnitForm } from "../Course/CreateUnitForm";
import ListItemButton from "@mui/material/ListItemButton";
import { useForm } from "react-hook-form";
import { IQuestion } from "../../types";


interface ISaveQuestionProps {
    question?: IQuestion;
    order: number;
    quizId: string;
}

function SaveQuestionForm(props: ISaveQuestionProps) {
    const { register, handleSubmit, formState } = useForm<ISaveQuestionRequest>({
        defaultValues: {
            content: props.question?.content,
            quizId: props.quizId
        }
    });
    const [saveQuestion] = useSaveQuestionMutation();

    const onSubmit = async (data: ISaveQuestionRequest) => {
        console.log(data);
        saveQuestion({
            questionId: data?.questionId,
            content: data.content,
            order: data.order,
            quizId: props.quizId
        }).unwrap();
    };

    return <form onSubmit={handleSubmit(onSubmit)}>
        <ListItem>
            <TextField
                fullWidth
                variant='standard'
                size='small'
                placeholder='Введите вопрос'
                margin='none'
                sx={{ mr: 2 }}
                {...register('content')}
            />
            <Button disabled={!formState.isDirty || !formState.isValid} type='submit'
                    variant='contained'>
                Создать
            </Button>
        </ListItem>
    </form>;
}

export function EditLecturePage() {
    const { unitId, courseId } = useParams();
    const { data: course } = useGetCourseQuery({ courseId: courseId! });
    const { data: lecture } = useGetLectureQuery(unitId!);
    const { data: quiz } = useGetQuizQuery(unitId!);

    if (!course || !lecture || !quiz)
        return null;

    return <>
        <Stack mb={5} pb={1} borderBottom={1} borderColor={'divider'}>
            <Typography variant='h4'>{unitId ? 'Изменение лекции' : 'Создание лекции'}</Typography>
        </Stack>
        <SaveLectureForm courseId={courseId!} order={course.unitsCount + 1} lecture={lecture} />
        {/*<Box pb={5}>*/}
        {/*    <SaveLectureForm courseId={courseId!} order={course.unitsCount + 1} lecture={lecture} />*/}
        {/*</Box>*/}
        {/*<Box borderTop={1} borderColor='divider' pt={5}>*/}
        {/*    <Typography variant='h5' mb={2}>Вопросы</Typography>*/}
        {/*    <List>*/}
        {/*        {quiz.questions.map(q => <Paper>*/}
        {/*            <ListItem disablePadding*/}
        {/*                      secondaryAction={*/}
        {/*                          <IconButton*/}
        {/*                              type='submit'*/}
        {/*                              disableTouchRipple*/}
        {/*                              edge="end"*/}
        {/*                          >*/}
        {/*                              <SaveQuestionForm />*/}
        {/*                          </IconButton>}*/}
        {/*                      itemID={q.id}>*/}
        {/*                <ListItemButton>*/}
        {/*                    <ListItemText>*/}
        {/*                        {q.content}*/}
        {/*                    </ListItemText>*/}
        {/*                </ListItemButton>*/}
        {/*            </ListItem>*/}
        {/*        </Paper>)}*/}
        {/*        <Paper>*/}
        {/*            {<SaveQuestionForm />}*/}
        {/*        </Paper>*/}
        {/*    </List>*/}
        {/*</Box>*/}
    </>;
}