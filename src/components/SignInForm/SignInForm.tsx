import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import s from './signin.module.css'
import {
    Box,
    Button,
    Container,
    Grid, Stack,
    TextField,
} from "@mui/material";
import {useRouter} from "next/router";
import {LoginFormType, useSignInMutation} from "@/services/authApi/authApi";
import Link from "next/link";


type FormPropsType = {
    email: string;
    password: string;
};

export const SignInForm: React.FC = () => {


    const form = useForm<FormPropsType>()

    const router = useRouter()

    const [signIn, { isLoading, isError }] = useSignInMutation();

    const {register, handleSubmit, formState:{errors}} = form



    const onSubmit:SubmitHandler<LoginFormType> = async (data) => {

        const email = data.email
        const password = data.password

        try{
            const result = await signIn({email,password}).unwrap()
            console.log('Sign-in successful:', result.accesToken);
            await router.push('/')
        } catch (err){
            console.error('Sign-in failed:', err);
        }

    }
    return (

                <Container  component={'main'} maxWidth={'xs'}  style={{backgroundColor:'#171717'}}>
                    <Box
                        sx={{
                            marginTop: 8,
                            height:'70vh',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent:'center'
                        }}
                    >
                        <h1>Sign In</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing={2} width={400}>
                                {isError && <div>Try Again</div>}
                                <TextField
                                    id="standard-basic"
                                    variant="standard"
                                    label="Email"
                                    type="email"
                                    {...register('email', {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                            message: 'Invalid email address',
                                        },
                                    })}
                                    error={!!errors.email}
                                    required
                                />
                                <TextField
                                    id="standard-basic"
                                    variant="standard"
                                    label="Password"
                                    type="password"
                                    {...register('password', {
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message: 'Password must be at least 8 characters',
                                        },
                                    })}
                                    error={!!errors.password}
                                    required
                                />
                                <Link href={'/'} style={{textDecoration:'none'}}>
                                    Forgot password?
                                </Link>
                                <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                                    Sign In
                                </Button>
                                <Grid container>
                                    <Grid item paddingBottom={5}>
                                        Don't have an account?
                                        <Grid><Link href={'/'} style={{textDecoration:'none'}}>Sign Up</Link></Grid>
                                    </Grid>
                                </Grid>
                            </Stack>
                        </form>
                    </Box>
                </Container>

        )
};



