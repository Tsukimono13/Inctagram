import React, {useState} from 'react';
import TitleForAuth from "@/components/Auth/RecoveryPassword/TitleForAuth/TitleForAuth";
import {TextField} from "@mui/material";
import s from "@/components/Auth/RecoveryPassword/RecoveryPassword.module.scss";
import TextForAuth from "@/components/Auth/RecoveryPassword/TextForAuth/TextForAuth";
import variables from "@/styles/variables.module.scss";

import {ContainerForAuth} from "@/components/Auth/RecoveryPassword/ContainerForAuth/ContainerForAuth";
import {useForm} from "react-hook-form";
import CustomLink from "@/components/Auth/RecoveryPassword/Link/Link";
import ButtonBlue from "@/components/RecoveryPassword/Button/ButtonBlue";

const SendLinkAgain = () => {
  const [token, setToken] = useState<string>('')


  function onChange(token: string) {
    console.log(token)
  }

  const {register, formState: {errors, isDirty, isValid}, handleSubmit} = useForm<{ email: string }>({
    defaultValues: {email: ""}, mode: "onBlur"
  })

  const onSubmit = (data: { email: string }) => {
    if (token) {
      console.log(data)
    } else {

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
          label="Index"
          name="email"
          error={!!errors.email}
          InputLabelProps={{className: s.textFieldLabel}}
          InputProps={{className: s.input}}
        />
        <div className={s.error}>{errors?.email && <p>{errors?.email?.message || "Error"}</p>}</div>
        <TextForAuth
          fontSize={'14px'}
          color={variables.lightColor}
          marginBottom={'35px'}
          text={'Enter your email address and we will send you further instructions'}
        />
        <TextForAuth
          fontSize={'16px'}
          color={variables.whiteColor}
          marginBottom={'18px'}
          text={'The link has been sent by email.If you don’t receive an email send link again'}
        />
        <div style={{marginBottom: '30px'}}>
          <ButtonBlue
            disabled={false}
            title={'Send Link Again'}
            width={'100%'}
            type={'submit'}
          />
        </div>
      </form>
      <CustomLink title={'Back to Sign In'} path={'/signIn'}/>

    </ContainerForAuth>
  )
};

export default SendLinkAgain;