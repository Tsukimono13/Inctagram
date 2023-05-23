import React, {useEffect} from 'react';
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
import {LoginType, useSignInMutation} from "@/services/authApi/authApi";
import Link from "next/link";
import {useAppSelector} from "@/hooks/useAppSelector";
import {signedIn} from "@/features/authReducer/authSelectors";
import Image from "next/image";
import GoodleIcon from "public/icons/Google.svg"
import GithubIcon from "public/icons/Github.svg"


type FormPropsType = {
    email: string;
    password: string;
};

export const SignInForm: React.FC = () => {

    const isSignedIn = useAppSelector(signedIn)

    const router = useRouter()

    useEffect(() => {
        isSignedIn && router.push('/profile')
    }, [isSignedIn])

    const [signIn, {isLoading, isError}] = useSignInMutation();

    const {register, handleSubmit, formState: {errors, isValid}, reset} = useForm<FormPropsType>({
        mode: 'onBlur'
    })

    const onSubmit: SubmitHandler<LoginType> = async (data) => {
        try {
            const result = await signIn(data).unwrap()
            console.log('Sign-in successful:', result.accessToken);
        } catch (err) {
            console.error('Sign-in failed:', err, data);
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
                    <Image src={GoodleIcon} alt={'google icon'}/>
                    <Image src={GithubIcon} alt={'github icon'}/>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2} width={400}>
                        <div> {isError && <div style={{color: 'red'}}>Email or Password are incorrect</div>}</div>
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
                        <Link href={'/recovery-password'} style={{textDecoration: 'none', color: '#BDC1C7'}}>
                            Forgot password?
                        </Link>
                        <Button type="submit" variant="contained" color="primary" disabled={isLoading || !isValid}>
                            Sign In
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



