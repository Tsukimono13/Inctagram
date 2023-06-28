import Image from "next/image";
import s from "@/components/ProfileSettings/ProfileSettings.module.scss";
import {Box, Button, FormControl, Stack, TextField} from "@mui/material";
import {firstLastNameValidation} from "@/components/profileSettings/validation";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DesktopDatePicker} from "@mui/x-date-pickers";
import {useForm} from "react-hook-form";
import {useGetProfileMutation, UserProfileType, useUpdateProfileMutation} from "@/services/authApi/authApi";
import photoIcon from '../../assets/img/profileSettings/Vector.svg'
import styled from "styled-components";

type FormData = {
    userName: string
    firstName: string
    lastName: string
    date: string
    city: string
    aboutMe: string
};


export const GeneralInformation = () => {

    const userProfile = useGetProfileMutation<UserProfileType>()
    const updateProfile = useUpdateProfileMutation()


    const {register, setValue, handleSubmit, formState: {errors, isValid}} = useForm<FormData>({
        mode: "onTouched" || "onBlur" || "onChange",
        defaultValues: {
            userName: '',
            firstName: '',
            lastName: '',
            date: '',
            aboutMe: '',
            city: ''
        }
    });
    const onSubmit = handleSubmit(data => {
        // updateProfile(data)
        console.log(data)
        alert(JSON.stringify(data))
    })

    const changePhotoHandler = () => {

    }
    return (
        <div className={s.content}>
            <Stack className={s.photoContainer}>
                <Box className={s.UserPhoto}>
                    <button className={s.img}>
                        <Image onClick={changePhotoHandler} src={photoIcon} alt={'photoIcon'}/>
                    </button>

                    <Button sx={{
                        marginTop: '20px',
                        border: "1px solid "
                    }} variant="outlined" onClick={changePhotoHandler}>Add a profile Photo</Button>

                </Box>
            </Stack>
            <div className={s.userInformation}>
                <form onSubmit={onSubmit}>
                    <FormControl sx={{width: 494}}>
                        <Stack spacing={1}>
                            <TextField
                                id="userName"
                                label="Username"
                                variant="standard"
                                {...register("userName")} />
                            <TextField
                                id="firstName"
                                label="First Name"
                                variant="standard"

                                {...register("firstName", firstLastNameValidation)} />
                            <TextField
                                id="lastName"
                                label="Last Name"
                                variant="standard"

                                {...register("lastName", firstLastNameValidation)} />
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'left',
                            }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                                    <DesktopDatePicker
                                        label="Date of birthday"
                                        format="DD.MM.YYYY"
                                        // value={value}
                                        // onChange={(newValue) => setValue(newValue)}
                                    />
                                </LocalizationProvider>
                                {/*<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">*/}
                                {/*    <Controller*/}
                                {/*        name="dateOfBirth"*/}
                                {/*        control={control}*/}
                                {/*        rules={{ required: 'Date of Birth is required' }}*/}
                                {/*        render={({ field }) => (*/}
                                {/*            <DatePicker*/}
                                {/*                {...field}*/}
                                {/*                label="Date of Birth"*/}
                                {/*                value={field.value}*/}
                                {/*                onChange={(newValue) => {*/}
                                {/*                    field.onChange(newValue);*/}
                                {/*                }}*/}
                                {/*                renderInput={(params) => (*/}
                                {/*                    <TextField*/}
                                {/*                        {...params}*/}
                                {/*                        variant="outlined"*/}
                                {/*                        error={!!errors.dateOfBirth}*/}
                                {/*                        helperText={errors.dateOfBirth?.message}*/}
                                {/*                    />*/}
                                {/*                )}*/}
                                {/*            />*/}
                                {/*        )}*/}
                                {/*    />*/}
                                {/*</LocalizationProvider>*/}
                            </Box>
                            <TextField
                                id="city"
                                label="City"
                                variant="standard"

                                {...register("city")} />
                            <TextField
                                id="aboutMe"
                                label="About me"
                                multiline
                                rows={3}
                                defaultValue="Text-area"
                                {...register("aboutMe")}
                            />

                        </Stack>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'right'
                        }}>
                            <Button sx={{
                                marginTop: '20px'
                            }}
                                    type="submit"
                                    variant="contained"
                                    disabled={!isValid}
                            >
                                Save Changes
                            </Button>
                        </Box>
                    </FormControl>
                </form>
            </div>
        </div>
    )
}

const NewTextField = styled(TextField)`
    border-bottom: white;
`
