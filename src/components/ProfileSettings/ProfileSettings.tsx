'use client'
import {useAppSelector} from "@/hooks/useAppSelector";
import {signedIn} from "@/features/authReducer/authSelectors";
import {useRouter} from "next/router";
import s from "./ProfileSettings.module.scss"
import {useForm} from "react-hook-form";
import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import {Box, Button, Container, FormControl, Stack, TextField, Link} from "@mui/material";
import {UserType, useUserQuery} from "@/services/authApi/authApi";
import {useState} from "react";


type FormData = {
    userName: string
    firstName: string
    lastName: string
    MUIPicker: Date
    city:string
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
    // const onSubmit =(data:FormData)=>{
    //     alert(JSON.stringify(data))
    // }


    // if(!isSignedIn){
    //   router.push('/singIn')
    // }
    return (

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
                <div className={s.UserPhoto}>
                    <img className={s.img} />
                    <button className={s.button}>Add a profile Photo</button>
                </div>
                <div className={s.UserInformation}>
                    <form onSubmit={onSubmit}>
                        <FormControl>
                            <Stack spacing={2} width={494}  >
                                <TextField
                                    id="userName"
                                    label="Username"
                                    variant="standard"

                                    {...register("userName", {
                                        required: {value: true, message: 'This field is required'},
                                        minLength: {value: 6, message: 'Username cannot have less than 6 characters'},
                                        maxLength: {value: 20, message: 'Username cannot exceed 20 characters'},
                                    })} />
                                <TextField
                                    id="userName"
                                    label="Username"
                                    variant="standard"

                                    {...register("userName", {
                                        required: {value: true, message: 'This field is required'},
                                        minLength: {value: 6, message: 'Username cannot have less than 6 characters'},
                                        maxLength: {value: 20, message: 'Username cannot exceed 20 characters'},
                                    })} />
                                <TextField
                                    id="userName"
                                    label="Username"
                                    variant="standard"

                                    {...register("userName", {
                                        required: {value: true, message: 'This field is required'},
                                        minLength: {value: 6, message: 'Username cannot have less than 6 characters'},
                                        maxLength: {value: 20, message: 'Username cannot exceed 20 characters'},
                                    })} />
                                <TextField
                                           id="userName"
                                           label="Username"
                                           variant="standard"

                                           {...register("userName", {
                                               required: {value: true, message: 'This field is required'},
                                               minLength: {value: 6, message: 'Username cannot have less than 6 characters'},
                                               maxLength: {value: 20, message: 'Username cannot exceed 20 characters'},
                                           })} />
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker/>
                                    </DemoContainer>
                                </LocalizationProvider>
                                <TextField
                                    id="aboutMe"
                                    label="Abou me"
                                    multiline
                                    rows={4}
                                    defaultValue="Text-area"
                                />
                                <Button
                                    type="submit"
                                    disabled={!isValid}
                                >
                                    Save Changes
                                </Button>
                            </Stack>
                        </FormControl>
                    </form>
                </div>
            </div>
        </div>
    );
};

