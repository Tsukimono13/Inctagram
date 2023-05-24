import React, {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {
    Box,
    Button,
    Container, FormControl,
    Grid, IconButton, Input, InputAdornment, InputLabel, Stack,
} from "@mui/material";
import {useRouter} from "next/router";
import {LoginType, useSignInMutation} from "@/services/authApi/authApi";
import Link from "next/link";
import Image from "next/image";
import GoogleIcon from "public/icons/Google.svg"
import GithubIcon from "public/icons/Github.svg"
import {Visibility, VisibilityOff} from "@mui/icons-material";


type FormPropsType = {
    email: string;
    password: string;
};

export const SignInForm: React.FC = () => {

    const [showPassword,setShowPassword] = useState<boolean>(false)


    const router = useRouter()


    const [signIn, {isLoading, isError}] = useSignInMutation();

    const {register, handleSubmit, formState: {errors, isValid}, reset} = useForm<FormPropsType>({
        mode: 'onBlur'
    })

    const onSubmit: SubmitHandler<LoginType> = async (data) => {
        try {
            const result = await signIn(data).unwrap()
            console.log('Sign-in successful:', result.accessToken);
            if(result.accessToken){
                return router.push('/profile')
            }
        } catch (err) {
            console.error('Sign-in failed:', err, data);
        } finally {
            reset()
        }
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    return (

        <Container component={'main'} maxWidth={'xs'} style={{backgroundColor: '#171717'}}>
            <Box
                sx={{
                    marginTop: 8,
                    height: '70vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 3
                }}
            >
                <h1>Sign In</h1>
                <Grid container
                      alignItems="center"
                      justifyContent="space-evenly">
                    <Image src={GoogleIcon} alt={'google icon'}/>
                    <Image src={GithubIcon} alt={'github icon'}/>
                </Grid>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2} width={400}>
                        <Grid container
                              alignItems={'center'}
                              justifyContent={'center'}
                        > {isError && <div style={{color: 'red'}}>Email or Password are incorrect</div>}</Grid>

                        <FormControl sx={{m: 1}} variant="standard">
                            <InputLabel htmlFor="standard-adornment-email" error={!!errors.email}
                                        required>Email</InputLabel>
                            <Input
                                id="standard-adornment-email"
                                type={'email'}
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
                        </FormControl>

                        <FormControl sx={{m: 1}} variant="standard">
                            <InputLabel htmlFor="standard-adornment-password" error={!!errors.password}
                                        required>Password</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                {...register('password', {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message: 'Password must be at least 8 characters',
                                    },
                                })}
                                error={!!errors.password}
                                required
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>

                        <Link href={'/'} style={{
                            textDecoration: 'none',
                            color: '#BDC1C7',
                            marginTop: '70px',
                            display: 'flex',
                            justifyContent: 'flex-end'
                        }}>
                            Forgot password?
                        </Link>
                        <Button type="submit" variant="contained" color="primary" disabled={isLoading || !isValid}>
                            Sign In
                        </Button>
                        <Grid container direction="column"
                              alignItems="center"
                              gap="30px"
                        >
                            <p> Don't have an account?</p>

                            <Link href={'registration'} style={{textDecoration: 'none'}}>Sign Up</Link>

                        </Grid>

                    </Stack>
                </form>
            </Box>
        </Container>
    )
};



