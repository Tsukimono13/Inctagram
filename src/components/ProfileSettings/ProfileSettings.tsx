'use client'
import {useAppSelector} from "@/hooks/useAppSelector";
import {signedIn} from "@/features/authReducer/authSelectors";
import {useRouter} from "next/router";
import s from "./ProfileSettings.module.scss"
import {useForm} from "react-hook-form";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {DateField} from "@mui/x-date-pickers";

import {useLogOutMutation} from "@/services/authApi/authApi";
import {useEffect} from "react";
import Link from "next/link";
import {Button} from "@mui/material";

type FormData = {
    userName: string
    firstName: string;
    lastName: string;
    MUIPicker: Date
};

export const ProfileSettings = () => {
    const isSignedIn = useAppSelector(signedIn)
    const router = useRouter()
    const {register, setValue, handleSubmit, formState: {errors}} = useForm<FormData>({
        defaultValues: {
            userName: '',
            firstName: 'string',
            lastName: 'string',
            MUIPicker: new Date("2020-08-01T00:00:00")
        }
    });
    const onSubmit = handleSubmit(data => console.log(data));

    // if(!isSignedIn){
    //   router.replace('/singIn')
    // }

    // useEffect(() => {
    //
    //     isSignedIn && router.push('/signIn')
    //
    // }, [isSignedIn])


    return (
        <div className={s.container}>
            <div className={s.settingOntions}>
                <span>General information</span>
                <span>Devises</span>
                <span>Account Management</span>
                <span>My payments</span>
            </div>
            <div className={s.content}>
                <div className={s.UserFoto}>
                    <img/>
                    <button>Add a profile Photo</button>
                </div>
                <div className={s.UserInformation}>
                    <form onSubmit={onSubmit}>
                        <label>Username</label>
                        <input {...register("userName", {
                            required: true,
                            minLength: 6,
                            maxLength: 20
                        })} />
                        {errors?.userName?.type === "required" && <p>This field is required</p>}
                        {errors?.userName?.type === "minLength" && (
                            <p>Username cannot have less than 6 characters</p>
                        )}
                        {errors?.userName?.type === "maxLength" && (
                            <p>Username cannot exceed 20 characters</p>
                        )}
                        <label>First Name</label>
                        <input {...register("firstName")} />
                        <label>Last Name</label>
                        <input {...register("lastName")} />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateField']}>
                                <DateField label="Basic date field" />
                            </DemoContainer>
                        </LocalizationProvider>
                        <button
                            type="button"
                            onClick={() => {
                                setValue("lastName", "luo"); // ✅
                            }}
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

