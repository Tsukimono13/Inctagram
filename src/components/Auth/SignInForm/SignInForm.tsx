import React, {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {
    Box,
    Button,
    Container,
    Grid, Stack,
} from "@mui/material";
import {useRouter} from "next/router";
import {LoginType, useSignInMutation} from "@/services/authApi/authApi";
import Link from "next/link";
import Image from "next/image";
import GoogleIcon from "public/icons/Google.svg"
import GithubIcon from "public/icons/Github.svg"
import CustomInput from "@/components/CustomComponents/CustomInput/CustomInput";
import CustomButton from "@/components/CustomComponents/CustomButton/CustomButton";



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

            if(result.accessToken){
                localStorage.setItem('token', result.accessToken)

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

        <Container component={'main'} maxWidth={'xs'}  style={{backgroundColor: "#171717", marginTop: '36px'}}>
            <Box
                sx={{
                    marginTop: 8,
                    minHeight: "516px",
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
                      justifyContent="center"
                      gap="60px"
                      style={{ marginTop: '13px' }}
                >
                    <Image src={GoogleIcon} alt={'google icon'}/>
                    <Image src={GithubIcon} alt={'github icon'}/>
                </Grid>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2} width={400}>
                        <Grid container
                              alignItems={'center'}
                              justifyContent={'center'}
                        > {isError && <div style={{color: 'red'}}>Email or Password are incorrect</div>}</Grid>

                        <CustomInput
                            label="Email"
                            id="email"
                            type="email"
                            register={register}
                            errors={errors.email} />
                        <CustomInput
                            label="Password"
                            id="password"
                            type="password"
                            register={register}
                            errors={errors.password}
                            showPassword={showPassword}
                            handleClickShowPassword={handleClickShowPassword}
                            handleMouseDownPassword={handleMouseDownPassword} />

                        <Link href={'recovery-password'} style={{
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



