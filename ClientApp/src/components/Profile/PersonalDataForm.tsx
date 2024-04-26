import { Button, FormControl, Grid, TextField } from "@mui/material";
import { IUserInfo } from "../../types";
import { useForm } from "react-hook-form";
import { useChangeUserMutation } from "../../api/apiClient";

interface IPersonaDataFormProps {
    user: IUserInfo;
}

type PersonalDataFormValues = {
    lastName: string;
    firstName: string;
    middleName: string;
    email?: string;
}

export function PersonalDataForm({ user }: IPersonaDataFormProps) {
    const { formState, register, handleSubmit } = useForm<PersonalDataFormValues>({
        defaultValues: {
            lastName: user.lastName,
            firstName: user.firstName,
            middleName: user.middleName,
            email: user.email,
        }
    });

    const [changeUser, _] = useChangeUserMutation();

    const onSubmit = async (data: any) => {
        console.log(data);
        await changeUser(data);
    };

    return <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl sx={{ gap: 2 }}>
            <TextField
                id="lastName"
                label="Фамилия"
                required
                {...register("lastName", { required: true })}
            />
            <TextField
                id="firstName"
                label="Имя"
                required
                {...register("firstName", { required: true })}
            />
            <TextField
                id="middleName"
                label="Отчество"
                required

                {...register("middleName", { required: true })}
            />
            <TextField
                type="email"
                id="email"
                label="Почта"
                {...register("email")}
            />
            <Grid
                container
                justifyContent='center'
                item
            >
                <Button
                    type='submit'
                    size="large"
                    variant="contained"
                    disabled={!formState.isDirty || !formState.isValid || formState.isSubmitting}
                >
                    Сохранить
                </Button>
            </Grid>
        </FormControl>
    </form>;
}