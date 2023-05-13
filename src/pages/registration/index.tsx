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
import GoodleIcon from "public/icons/google.svg"
import GithubIcon from "public/icons/github.svg"


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

    const {register, handleSubmit, formState: {errors, isValid}, reset, getValues, watch} = useForm<FormPropsType>({
        mode: 'onBlur'
    })
    let password = watch("password", "");
    const onSubmit: SubmitHandler<any> = async (data) => {
        try {
            const result = await signUp(data).unwrap()
            console.log('Sign-up successful:');
        } catch (err) {
            console.error('Sign-up failed:', err, data);
        } finally {
            reset()
        }

    }
    return (
        <Container component={'main'} maxWidth={'xs'} style={{backgroundColor: '#171717'}}>
            <Box
                sx={{
                    marginTop: 8,
                    height: '70vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <h1>Sign In</h1>
                <div>
                    <Image src={GoodleIcon} alt={'google icon'} width={36} height={36}/>
                    <Image src={GithubIcon} alt={'github icon'} width={36} height={36}/>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2} width={400}>
                        <div> {isError && <div style={{color: 'red'}}>Email or Password are incorrect</div>}</div>
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
                                validate: (value) => value === getValues("password")
                            })}
                            error={!!errors.passwordConfirmation}
                            required
                        />
                        <Link href={'/'} style={{textDecoration: 'none', color: '#BDC1C7'}}>
                            Forgot password?
                        </Link>
                        <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                            Sign Up
                        </Button>
                        <Grid container>
                            <Grid item paddingBottom={5}>
                                Don't have an account?
                                <Grid><Link href={'registration'} style={{textDecoration: 'none'}}>Sign Up</Link></Grid>
                            </Grid>
                        </Grid>
                    </Stack>
                </form>
            </Box>
        </Container>

    )
};
export default RegistrationForm;


