import { Button, IconButton, List, ListItem, ListItemText, Paper, TextField } from "@mui/material";
import { IUnit } from "../types";
import { Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSaveLectureMutation } from "../api/apiClient";
import { useForm } from "react-hook-form";

interface ICreateUnitForm {
    courseId: string;
    order: number;
}

function CreateUnitForm({ courseId, order }: ICreateUnitForm) {
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
            <ListItem
                itemID='add-new'
            >
                <TextField
                    fullWidth
                    variant='standard'
                    size='small'
                    placeholder='Введите название лекции'
                    margin='none'
                    sx={{mr: 2}}
                    {...register('title')}
                />
                <Button disabled={!formState.isDirty || !formState.isValid} type='submit' variant='contained'>
                    Создать
                </Button>
            </ListItem>
        </form>
    </Paper>;
}

interface IUnitsListProps {
    units: IUnit[];
    courseId: string;
}

export function UnitsList({ units, courseId }: IUnitsListProps) {
    return <List sx={{ width: '100%' }}>
        {
            units.slice().sort((a, b) => a.order - b.order).map(u =>
                <Paper sx={{mb: 1}}>
                    <ListItem
                        secondaryAction={
                            <Link to={`/courses/${courseId}/unit/${u.id}/edit`}>
                                <IconButton
                                    disableTouchRipple
                                    edge="end"
                                >
                                    <Edit />
                                </IconButton>
                            </Link>
                        }
                        itemID={u.id}>
                        <ListItemText>
                            {u.title}
                        </ListItemText>
                    </ListItem>
                </Paper>)
        }
        {<CreateUnitForm order={units.length + 1} courseId={courseId} />}
    </List>
}