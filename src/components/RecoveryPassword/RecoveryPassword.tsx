import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {TextField} from "@mui/material";
import Link from "next/link";
import s from './RecoveryPassword.module.scss'
import variables from '../../styles/variables.module.scss';
import {Recaptcha} from "@/components/RecoveryPassword/ReCaptcha/ReCaptcha";
import TitleForAuth from "@/components/RecoveryPassword/TitleForAuth/TitleForAuth";
import TextForAuth from "@/components/RecoveryPassword/TextForAuth/TextForAuth";
import {ContainerForAuth} from "@/components/RecoveryPassword/ContainerForAuth/ContainerForAuth";
import ButtonBlue from "@/components/RecoveryPassword/Button/ButtonBlue";
import {useForgotPasswordMutation} from "@/services/authApi/authApi";
import {useRouter} from "next/router";


const RecoveryPassword = () => {
  const errorText = 'Please verify that you are not a robot'
  const [token, setToken] = useState<string>('')
  const [tokenError, setTokenError] = useState<string>('')
  const router = useRouter()
  const [forgotPassword, {isLoading, isError}] = useForgotPasswordMutation()
  console.log(isError)

  function onChange(token: string) {
    console.log(token)
    setToken(token)
  }

  const {register, formState: {errors, isDirty, isValid}, handleSubmit} = useForm<{ email: string }>({
    defaultValues: {email: ""}, mode: "onBlur"
  })

  const onSubmit = async (data: { email: string }) => {
    if (token) {
      setTokenError('')
      try {
        const res = await forgotPassword({email: data.email, recaptcha: token})
        return router.push({
          pathname: '/sent-email',
          query: { email: data.email },
        })
      } catch (err) {
        console.log(err)
      }

    } else {
      setTokenError(errorText)
    }
  }


  return (
    <ContainerForAuth>
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
            disabled={false}
            title={'Send Link'}
            width={'100%'}
            type={'submit'}
          />
        </div>


      </form>

      <Link href={'/signIn'} className={s.link}>
        Back to Sign In
      </Link>
      <Recaptcha onChange={onChange} tokenError={tokenError}/>
    </ContainerForAuth>
  )
};

export default RecoveryPassword;