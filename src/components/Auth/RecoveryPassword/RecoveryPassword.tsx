import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {TextField} from "@mui/material";
import s from 'src/components/Auth/RecoveryPassword/RecoveryPassword.module.scss'
import variables from 'src/styles/variables.module.scss';
import {Recaptcha} from "@/components/Auth/RecoveryPassword/ReCaptcha/ReCaptcha";
import TitleForAuth from "@/components/Auth/RecoveryPassword/TitleForAuth/TitleForAuth";
import TextForAuth from "@/components/Auth/RecoveryPassword/TextForAuth/TextForAuth";
import {ContainerForAuth} from "@/components/Auth/RecoveryPassword/ContainerForAuth/ContainerForAuth";
import {useForgotPasswordMutation} from "@/services/authApi/authApi";
import {useRouter} from "next/router";
import CustomLink from "@/components/Auth/RecoveryPassword/Link/Link";
import ButtonBlue from "@/components/RecoveryPassword/Button/ButtonBlue";


const RecoveryPassword = () => {
    const errorText = 'Please verify that you are not a robot'
    const [token, setToken] = useState<string>('')
    const [tokenError, setTokenError] = useState<string>('')
    const router = useRouter()
    const [forgotPassword, {isLoading, isError}] = useForgotPasswordMutation()

    function onChange(token: string) {
      setToken(token)
    }

    const {register, formState: {errors, isDirty, isValid}, handleSubmit} = useForm<{ email: string }>({
      defaultValues: {email: ""}, mode: "onTouched" || "onBlur"|| "onChange",
    })

    const onSubmit = (data: { email: string }) => {
      if (token) {
        setTokenError('')
        forgotPassword({email: data.email, recaptcha: token})
          .unwrap()
          .then(() => router.push({pathname: '/sent-email', query: {email: data.email},}))
          .catch((err) => console.log(err))
      } else {
        setTokenError(errorText)
      }
    }

    return (
      <ContainerForAuth border={'1px solid #333333'} background={'#171717'}>
        <TitleForAuth marginBottom={'19px'} text={'Forgot password'}/>
        <form onSubmit={handleSubmit(onSubmit)}>

          <TextField
            {...register("email", {
              required: "Required field",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email.",
              },
            })}
            margin={"none"}
            fullWidth
            variant="standard"
            id="standard-basic"
            label="Email"
            name="email"
            error={!!errors.email}
            InputLabelProps={{className: s.textFieldLabel}}
            InputProps={{className: s.input}}
          />
          <div className={s.error}>{errors?.email && <p>{errors?.email?.message || "Error"}</p>}</div>
          <TextForAuth
            fontSize={'14px'}
            color={variables.lightColor}
            marginBottom={'29px'}
            text={'Enter your email address and we will send you further instructions'}/>
          <div style={{marginBottom: '30px'}}>
            <ButtonBlue
              disabled={!isValid || !isDirty || isLoading}
              title={'Send Link'}
              width={'100%'}
              type={'submit'}
            />
          </div>
        </form>
        <CustomLink title={'Back to Sign In'} path={'/signIn'}/>
        <Recaptcha onChange={onChange} tokenError={tokenError}/>
      </ContainerForAuth>
    )
  }
;

export default RecoveryPassword;