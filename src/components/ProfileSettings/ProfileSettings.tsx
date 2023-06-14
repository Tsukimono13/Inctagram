'use client'
import {useAppSelector} from "@/hooks/useAppSelector";
import {signedIn} from "@/features/authReducer/authSelectors";
import {useRouter} from "next/router";
import s from "./ProfileSettings.module.scss"
import {useForm} from "react-hook-form";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {Box, Button, FormControl, Link, Stack, TextField} from "@mui/material";
import {UserType, useUserQuery} from "@/services/authApi/authApi";
import iconNoPhoto from "../../assets/img/profileSettings/icon-no-photo.png"
import {DesktopDatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";


type FormData = {
    userName: string
    firstName: string
    lastName: string
    MUIPicker: Date
    city: string
    aboutMe: string
};

export const ProfileSettings = () => {


    const isSignedIn = useAppSelector(signedIn)
    const router = useRouter()

    const user = useUserQuery<UserType>()
    const {register, setValue, handleSubmit, formState: {errors, isValid}} = useForm<FormData>({
        mode: "onTouched" || "onBlur" || "onChange",
        defaultValues: {
            userName: user.userName,
            firstName: '',
            lastName: '',
            MUIPicker: new Date(),
            aboutMe: '',
            city: ''
        }
    });
    const onSubmit = handleSubmit(data => {
        console.log(data)
        alert(JSON.stringify(data))
    })
    const addPhotoHandler = () => {
    }
    const changePhotoHandler = () => {
    }
    // const onSubmit =(data:FormData)=>{
    //     alert(JSON.stringify(data))
    // }


    // if(!isSignedIn){
    //   router.push('/singIn')
    // }
    return (
        <div className={s.profileSettingsContainer}>
            <div className={s.container}>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'nowrap',
                        justifyContent: 'center',
                        typography: 'body1',
                        '& > :not(style) + :not(style)': {
                            ml: 5,
                        },
                    }}

                >
                    <Link href="#" underline="hover">{'General information'}</Link>
                    <Link href="#" underline="hover">{'Devises'}</Link>
                    <Link href="#" underline="hover">{'Account Management'}</Link>
                    <Link href="#" underline="hover">{'Account Management'}</Link>
                </Box>
                <div className={s.content}>
                    <Stack className={s.photoContainer}>
                        <div className={s.UserPhoto}>
                            <button onClick={changePhotoHandler} className={s.img}>
                                <div style={{borderBottom: `url(${iconNoPhoto})`}} className={s.icon}></div>
                            </button>
                            <div className={s.button}>
                                <Button variant="outlined" onClick={addPhotoHandler}>Add a profile Photo</Button>
                            </div>
                        </div>
                    </Stack>
                    <div className={s.UserInformation}>
                        <form onSubmit={onSubmit}>
                            <FormControl sx={{width: 494}}>
                                <Stack spacing={1}>
                                    <TextField sx={{color: "white"}}
                                               id="userName"
                                               label="Username"
                                               variant="standard"

                                               {...register("userName", {
                                                   required: 'This field is required',
                                                   minLength: {
                                                       value: 6,
                                                       message: 'Username cannot have less than 6 characters'
                                                   },
                                                   maxLength: {
                                                       value: 20,
                                                       message: 'Username cannot exceed 20 characters'
                                                   },
                                               })} />
                                    <TextField
                                        id="firstName"
                                        label="First Name"
                                        variant="standard"

                                        {...register("firstName", {
                                            required: {value: true, message: 'This field is required'},
                                            minLength: {
                                                value: 6,
                                                message: 'Username cannot have less than 6 characters'
                                            },
                                            maxLength: {value: 20, message: 'Username cannot exceed 20 characters'},
                                        })} />
                                    <TextField
                                        id="lastName"
                                        label="Last Name"
                                        variant="standard"

                                        {...register("lastName", {
                                            required: {value: true, message: 'This field is required'},
                                            minLength: {
                                                value: 6,
                                                message: 'Username cannot have less than 6 characters'
                                            },
                                            maxLength: {value: 20, message: 'Username cannot exceed 20 characters'},
                                        })} />
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'left'
                                    }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                                            <DesktopDatePicker label="Date of birthday"/>
                                        </LocalizationProvider>
                                    </Box>
                                    <TextField
                                        id="userName"
                                        label="Username"
                                        variant="standard"

                                        {...register("userName", {
                                            required: {value: true, message: 'This field is required'},
                                            minLength: {
                                                value: 6,
                                                message: 'Username cannot have less than 6 characters'
                                            },
                                            maxLength: {value: 20, message: 'Username cannot exceed 20 characters'},
                                        })} />
                                    <TextField
                                        id="aboutMe"
                                        label="Abou me"
                                        multiline
                                        rows={3}
                                        defaultValue="Text-area"
                                    />
                                </Stack>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'right'
                                }}>
                                    <Button
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
            </div>
        </div>
    );
};

