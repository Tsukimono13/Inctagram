
import s from "@/components/ProfileSettings/ProfileSettings.module.scss";
import {Box, Button, FormControl, Stack, TextField} from "@mui/material";
import {firstLastNameValidation} from "@/components/profileSettings/validation";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DatePicker} from "@mui/x-date-pickers";
import {Controller, useForm} from "react-hook-form";
import {useGetProfileQuery, useUpdateProfileMutation} from "@/services/authApi/authApi";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {RequestBodyType} from "@/services/authApi/types";
import UploadAvatar from "@/components/profileSettings/uploadAvatar/UploadAvatar";


export const GeneralInformation = () => {

    const {data: userName, isLoading, isFetching, isError, error} = useGetProfileQuery(null)
    const [updateProfile] = useUpdateProfileMutation()


    const {control, handleSubmit, formState: {errors, isValid}} = useForm<RequestBodyType>({
        mode: "onChange",
        defaultValues: {
            userName: '',
            firstName: '',
            lastName: '',
            dateOfBirth: null,
            aboutMe: '',
            city: ''
        }
    });
    const onSubmit = handleSubmit(data => {
        updateProfile(data)
        console.log(data)
        alert(JSON.stringify(data))
    })


    if (isLoading) {
        return <div></div>
    }

    return (
        <div className={s.content}>
            <UploadAvatar/>
            <div className={s.userInformation}>
                <form onSubmit={onSubmit}>
                    <FormControl sx={{width: 494}}>
                        <Stack spacing={1}>
                            <Controller
                                name="userName"
                                control={control}
                                rules={{required: 'Username is required'}}
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        label="User Name"
                                        variant="outlined"
                                        error={!!errors.userName}
                                        helperText={errors.userName?.message}
                                    />
                                )}
                            />
                            <Controller
                                name="firstName"
                                control={control}
                                rules={firstLastNameValidation}
                                render={({field}) => (
                                    <TextField
                                        {...field}

                                        label="First Name"
                                        variant="outlined"
                                        error={!!errors.firstName}
                                        helperText={errors.firstName?.message}
                                    />
                                )}
                            />
                            <Controller
                                name="lastName"
                                control={control}
                                rules={firstLastNameValidation}
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        label="Last Name"
                                        variant="outlined"
                                        error={!!errors.lastName}
                                        helperText={errors.lastName?.message}
                                    />
                                )}
                            />
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'left',
                            }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                                    <Controller
                                        name="dateOfBirth"
                                        control={control}
                                        render={({field}) => (
                                            <DatePicker
                                                {...field}
                                                label="Date of Birth"
                                                value={field.value}
                                                format="DD.MM.YYYY"
                                                onChange={(newValue) => {
                                                    field.onChange(newValue);
                                                }}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            </Box>
                            <Controller
                                name="city"
                                control={control}
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        label="City"
                                        variant="outlined"
                                    />
                                )}
                            />
                            <Controller
                                name="aboutMe"
                                control={control}
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        label="About me"
                                        multiline
                                        rows={3}
                                        variant="outlined"
                                    />
                                )}
                            />
                        </Stack>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'right',
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

