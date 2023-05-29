import React from 'react';
import {useForm} from "react-hook-form";
import {Box, Button, Container, Stack, TextField, Typography} from "@mui/material";
import Link from "next/link";
import s from './RecoveryPassword.module.css'


import {Recaptcha} from "@/components/RecoveryPassword/ReCaptcha";

const RecoveryPassword = () => {

    function onChange(token: any) {
        console.log(token)

    }

    const {
        register,
        watch,
        formState: {errors, isDirty, isValid},
        handleSubmit,
    } = useForm<any>({
        defaultValues: {
            email: "",
            captcha: false,
        },
        mode: "onChange",
    })

    const onSubmit = (data: any) => {

        console.log(data)
    }


    return (
        <Container component={'main'} maxWidth={'xs'} style={{backgroundColor: '#171717'}}>
            <Box
                sx={{
                    marginTop: 8,
                    // height: '70vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >

                <Typography component="h1" variant="h5">
                    Forgot password
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2} width={400}>
                        <TextField
                            {...register("email", {
                                required: "Required field",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: "Invalid email.",
                                },
                            })}
                            margin="normal"
                            fullWidth
                            className={s.input}
                            id="email"
                            label="Email Address"
                            name="email"
                            style={{color: 'white'}}
                        />
                        {/*<div className={s.error}>{errors?.email && <p>{errors?.email?.message || "Error"}</p>}</div>*/}


                        <Recaptcha onChange={onChange}/>

                        <Button
                            disabled={
                                // !isDirty
                                //     || !isValid
                                //     ||
                                !watch("captcha")}
                            type="submit"
                            variant={"contained"}
                            sx={{mt: 3, mb: 2}}
                        >
                            Send Link
                        </Button>

                        <Link href={'/signIn'} style={{textDecoration: 'none', color: '#BDC1C7'}}>
                            Back to Sign In
                        </Link>
                    </Stack>
                </form>
            </Box>
        </Container>
    )
};

export default RecoveryPassword;