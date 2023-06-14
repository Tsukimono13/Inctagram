import React, { useEffect, useState } from "react";
import {SubmitHandler, useForm} from 'react-hook-form';
import {
    Box,
    Button,
    Container,
    Grid, IconButton, InputAdornment, Stack,
    TextField
} from "@mui/material";
import {useRouter} from "next/router";
import {LoginType, RegistrationType, useRegistrationMutation, useSignInMutation} from "@/services/authApi/authApi";
import Link from "next/link";
import {useAppSelector} from "@/hooks/useAppSelector";
import {signedUp} from "@/features/authReducer/authSelectors";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Image from "next/image";
import GoodleIcon from "public/icons/Google.svg"
import GithubIcon from "public/icons/Github.svg"
import styled from "styled-components";


type FormPropsType = {
    userName: string;
    email: string;
    password: string;
    passwordConfirmation: string
};

const RegistrationForm: React.FC = () => {
    const isSignedUp = useAppSelector(signedUp);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);


    const router = useRouter()

    useEffect(() => {
        isSignedUp && router.push('/')
    }, [isSignedUp])

   // useRedirectToMainPageIfSignUp();

    const [signUp, {isLoading, isError}] = useRegistrationMutation();


    //const {register, handleSubmit, formState: {errors}, watch, reset, onSubmit} = useRegistrationForm()
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
        <Container component={'main'} maxWidth={'xs'} style={{backgroundColor: '#171717', marginTop: '24px'}}>
            <Box
                sx={{
                    marginTop: 8,
                    height: "612px",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <h1>Sign Up</h1>
                <Grid container
                      alignItems="center"
                      justifyContent="center"
                      gap="60px"
                      style={{ marginTop: '13px' }}>
                    <Image src={GoodleIcon} alt={'google icon'}/>
                    <Image src={GithubIcon} alt={'github icon'}/>
                </Grid>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2} width={400}>
                        <div> {isError && <div style={{color: 'red'}}>Email or Password are incorrect</div>}</div>
                        <TextField
                            InputLabelProps={{className: "textField"}}
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
                            InputLabelProps={{className: "textField"}}
                            id="standard-basic"
                            variant="standard"
                            label="Email"
                            type="text"
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
                            InputLabelProps={{className: "textField"}}
                            id="standard-basic"
                            variant="standard"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            {...register('password', {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters',
                                },
                            })}
                            error={!!errors.password}
                            required
                            InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        sx={{ color: "rgba(255,255,255,0.65)" }}
                                      >
                                          {showPassword ? <Visibility /> : <VisibilityOff />}
                                      </IconButton>
                                  </InputAdornment>
                                ),
                            }}
                        />
                    {/*   // {renderField('standart-basic', 'password confimation', password.validation,
                       // 232323, 2323232,232323233)}*/}
                        <TextField
                            InputLabelProps={{className: "textField"}}
                            id="standard-basic"
                            variant="standard"
                            label="Password confirmation"
                            type={showPassword ? "text" : "password"}
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
                            InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        sx={{ color: "rgba(255,255,255,0.65)" }}
                                      >
                                          {showPassword ? <Visibility /> : <VisibilityOff />}
                                      </IconButton>
                                  </InputAdornment>
                                ),
                            }}
                        />
                        <Button type="submit" variant="contained" color="primary" disabled={isLoading} style={{ marginTop: '36px' }}>
                            Sign Up
                        </Button>
                        <Grid container direction="column"
                              alignItems="center"
                              justifyContent="center">
                            <Grid container
                                  direction="column"
                                  alignItems="center"
                                  justifyContent="center"
                                  style={{ marginTop: '2px' }}>
                                Do you have an account?
                                <Grid style={{ marginTop: '12px' }}>
                                  <Link href={"signIn"} style={{textDecoration: "none"}}>
                                    <SignInText>Sign In</SignInText>
                                  </Link>
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

const SignInText = styled.p`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #397DF6;
`
