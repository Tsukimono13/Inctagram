import React, {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {
    Box,
    Button,
    Container,
    Grid, Stack,
    TextField,
} from "@mui/material";
import {useRouter} from "next/router";
import {LoginType, RegistrationType, useRegistrationMutation, useSignInMutation} from "@/services/authApi/authApi";
import Link from "next/link";
import {useAppSelector} from "@/hooks/useAppSelector";
import {signedIn, signedUp} from "@/features/authReducer/authSelectors";
import Image from "next/image";
import GoodleIcon from "public/icons/Google.svg"
import GithubIcon from "public/icons/Github.svg"


type FormPropsType = {
    userName: string;
    email: string;
    password: string;
    passwordConfirmation: string
};

const RegistrationForm: React.FC = () => {

    const isSignedUp = useAppSelector(signedUp)

    const router = useRouter()

    useEffect(() => {
        isSignedUp && router.push('/')
    }, [isSignedUp])

    const [signUp, {isLoading, isError}] = useRegistrationMutation();

    const {register, handleSubmit, formState: {errors}, watch, reset} = useForm<FormPropsType>({
        mode: 'onBlur'
    })
    let password = watch("password", "");
    const onSubmit: SubmitHandler<RegistrationType> = async ({userName, password, email}) => {
        try {
            const result = await signUp({userName, password, email}).unwrap()
            alert('Sign-up successful:');
        } catch (err) {
            console.error('Sign-up failed:', err, {userName, password, email});
        } finally {
            reset()
        }
    }
    return (
        <Container component={'main'} maxWidth={'xs'} style={{backgroundColor: '#171717'}}>
            <Box
                sx={{
                    marginTop: 8,
                    height: '84vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <h1>Sign Up</h1>
                <Grid container
                      alignItems="center"
                      justifyContent="space-evenly">
                    <Image src={GoodleIcon} alt={'google icon'}/>
                    <Image src={GithubIcon} alt={'github icon'}/>
                </Grid>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2} width={400}>
                        <div> {isError && <div style={{color: 'red'}}>Index or Password are incorrect</div>}</div>
                        <TextField
                            id="standard-basic"
                            variant="standard"
                            label="Username"
                            type="text"
                            {...register('userName', {
                                required: "Username is required",
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters'
                                },
                                maxLength: {
                                    value: 30,
                                    message: "Password must be less then 30 characters"
                                }
                            })}
                            error={!!errors.userName}
                            required
                        />
                        <TextField
                            id="standard-basic"
                            variant="standard"
                            label="Index"
                            type="email"
                            {...register('email', {
                                required: "Index is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: 'Invalid email address',
                                },
                            })}
                            error={!!errors.email}
                            required
                        />
                        {errors?.email && <div style={{color: "red"}}>{errors.email.message}</div>}
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
                        <TextField
                            id="standard-basic"
                            variant="standard"
                            label="Password confirmation"
                            type="password"
                            {...register('passwordConfirmation', {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters',
                                },
                                validate: (value) => value === watch("password") //watch
                            })}
                            error={!!errors.passwordConfirmation}
                            required
                        />
                        <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                            Sign Up
                        </Button>
                        <Grid container direction="column"
                              alignItems="center"
                              justifyContent="center">
                            <Grid item paddingBottom={5}>
                                Do you have an account?
                                <Grid container direction="column"
                                      alignItems="center">
                                    <Link href={'signIn'} style={{textDecoration: 'none'}}>Sign In</Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Stack>
                </form>
            </Box>
        </Container>

    )
};

export default RegistrationForm;


