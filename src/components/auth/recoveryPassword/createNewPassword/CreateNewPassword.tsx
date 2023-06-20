import React, {useState} from 'react';
import {ContainerForAuth} from "@/components/auth/recoveryPassword/containerForAuth/ContainerForAuth";
import TitleForAuth from "@/components/auth/recoveryPassword/titleForAuth/TitleForAuth";
import {useForm} from "react-hook-form"
import TextField from "@mui/material/TextField";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import s from 'src/components/auth/recoveryPassword/createNewPassword/CreateNewPassword.module.scss'
import TextForAuth from "@/components/auth/recoveryPassword/textForAuth/TextForAuth";
import variables from 'src/styles/variables.module.scss';
import {useRouter} from "next/router";
import {useCreateNewPasswordMutation,} from "@/services/authApi/authApi";
import ButtonBlue from "@/components/recoveryPassword/Button/ButtonBlue";


const CreateNewPassword = () => {
  const [type, setType] = useState("password")
  const [type1, setType1] = useState("password")
  const router = useRouter()
  const [createNewPassword, {isLoading, isError}] = useCreateNewPasswordMutation()

  console.log(isError)
  const {register, watch, formState: {errors, isDirty, isValid}, handleSubmit}
    = useForm<{ password: string, confirm_password: string }>({
    defaultValues: {
      password: "",
      confirm_password: "",
    },
    mode: "onTouched" || "onBlur",
  })
  const changeType = (type: string, setType: (value: string) => void) => {
    if (type === "password") setType("text")
    else setType("password")
  }

  const onSubmit = (data: { password: string, confirm_password: string }) => {


    createNewPassword({newPassword: data.password, recoveryCode: router.query.code as string})
      .unwrap()
      .then(() => router.push('/signIn'))
      .catch((err) => {
        console.log(err)
        return router.push({pathname: '/invalid-link', query: {code: router.query.code as string}})
      })

  }

  return (
    <ContainerForAuth border={'1px solid #333333'} background={'#171717'}>
      <TitleForAuth marginBottom={'35px'} text={'Create New Password'}/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.password}>
          <TextField
            {...register("password", {
              required: "Required field",
              minLength: {
                value: 8,
                message: "Min length 8 symbols",
              },
              maxLength: {
                value: 20,
                message: "Max length 20 symbols",
              },
            })}

            error={!!errors.password}
            fullWidth
            margin="none"
            name="password"
            label="New Password"
            type={type}
            variant="standard"
            id="standard-basic"
            InputLabelProps={{className: s.textFieldLabel}}
            InputProps={{className: s.input}}
          />
          <VisibilityOffIcon className={s.showPassword} onClick={() => changeType(type, setType)}/>
        </div>
        <div className={s.error}>
          <div className={s.error}>{errors?.password && <p>{errors?.password?.message || "Error"}</p>}</div>

        </div>
        <div className={s.password}>
          <TextField
            {...register("confirm_password", {
              required: "Required field",
              validate: (val: string) => {
                if (watch("password") != val) {
                  return "The password must match the new password"
                }
              },
            })}
            error={!!errors.confirm_password}
            margin="none"
            fullWidth
            name="confirm_password"
            label="Password confirmation"
            type={type1}
            variant="standard"
            id="standard-basic2"
            InputLabelProps={{className: s.textFieldLabel}}
            InputProps={{className: s.input}}
          />
          <VisibilityOffIcon className={s.showPassword} onClick={() => changeType(type1, setType1)}/>
        </div>
        <div className={s.error}>
          <div className={s.error}>{errors?.confirm_password &&
              <p>{errors?.confirm_password?.message || "Error"}</p>}</div>
        </div>
        <TextForAuth text={'Your password must be between 6 and 20 characters'}
                     color={variables.lightColor}
                     marginBottom={'41px'}
                     fontSize={'14px'}
        />
        <div style={{marginBottom: '12px'}}>
          <ButtonBlue
            disabled={!isValid || !isDirty || isLoading}
            title={'Create New Password'}
            width={'100%'}
            type={'submit'}
          />
        </div>
      </form>
    </ContainerForAuth>
  );
};

export default CreateNewPassword;