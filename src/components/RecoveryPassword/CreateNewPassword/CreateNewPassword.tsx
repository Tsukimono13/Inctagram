import React, {useState} from 'react';
import {ContainerForAuth} from "@/components/RecoveryPassword/ContainerForAuth/ContainerForAuth";
import TitleForAuth from "@/components/RecoveryPassword/TitleForAuth/TitleForAuth";
import { useForm } from "react-hook-form"
import {TextField} from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import s from './CreateNewPassword.module.scss'
import TextForAuth from "@/components/RecoveryPassword/TextForAuth/TextForAuth";
import variables from '../../../styles/variables.module.scss';
import ButtonBlue from "@/components/RecoveryPassword/Button/ButtonBlue";

const CreateNewPassword = () => {
  const [type, setType] = useState("password")
  const [type1, setType1] = useState("password")
  const {
    register,
    watch,
    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm<{ password: string,confirm_password:string }>({
    defaultValues: {
      password: "",
      confirm_password: "",
    },
    mode: "onChange",
  })
  const changeType = (type: string, setType: (value: string) => void) => {
    if (type === "password") setType("text")
    else setType("password")
  }

  const onSubmit = (data: any) => {
    console.log(data)
  }

    return (
        <ContainerForAuth>
          <TitleForAuth marginBottom={'35px'} text={'Create New Password'}/>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={s.password}>
              <TextField
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 6,
                    message: "Min length 6 symbols",
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
              <VisibilityOffIcon className={s.showPassword} onClick={() => changeType(type, setType)} />
            </div>
            <div className={s.error}>
              <div className={s.error}>{errors?.password && <p>{errors?.password?.message || "Error"}</p>}</div>

            </div>
            <div className={s.password}>
              <TextField
                {...register("confirm_password", {
                  required: true,
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
                id="standard-basic"
                InputLabelProps={{className: s.textFieldLabel}}
                InputProps={{className: s.input}}
              />
              <VisibilityOffIcon className={s.showPassword} onClick={() => changeType(type1, setType1)} />
            </div>
            <div className={s.error}>
              <div className={s.error}>{errors?.confirm_password && <p>{errors?.confirm_password?.message || "Error"}</p>}</div>
            </div>

<TextForAuth text={'Your password must be between 6 and 20 characters'}
             color={variables.lightColor}
             marginBottom={'41px'}
             fontSize={'14px'}
             />
            <div style={{marginBottom: '12px'}}>
              <ButtonBlue
                disabled={!isValid|| isDirty}
                title={'Send Link'}
                width={'100%'}
                type={'submit'}
              />
            </div>
          </form>
        </ContainerForAuth>
    );
};

export default CreateNewPassword;