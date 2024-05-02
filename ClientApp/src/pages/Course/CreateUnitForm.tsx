import { useForm } from "react-hook-form";
import { Button, ListItem, Paper, Stack, TextField } from "@mui/material";
import { useSaveLectureMutation } from "../../api/apiClient";

interface ICreateUnitForm {
    courseId: string;
    order: number;
}

export function CreateUnitForm({ courseId, order }: ICreateUnitForm) {
    const [saveLecture] = useSaveLectureMutation();
    const { handleSubmit, register, formState, reset } = useForm({ defaultValues: { courseId, title: '', order } });

    const onSubmit = async (data: any) => {
        console.log(data);
        await saveLecture({
            courseId: courseId,
            title: data.title,
            content: '',
            order: data.order,
        });
        reset();
    };

    return <Paper>
        <form onSubmit={handleSubmit(onSubmit)}>
            <ListItem>
                <TextField
                    fullWidth
                    variant='standard'
                    size='small'
                    placeholder='Введите название лекции'
                    margin='none'
                    sx={{ mr: 2 }}
                    {...register('title')}
                />
                <Button disabled={!formState.isDirty || !formState.isValid} type='submit' variant='contained'>
                    Создать
                </Button>
            </ListItem>
        </form>
    </Paper>;
}
