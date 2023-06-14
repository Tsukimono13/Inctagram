import React from 'react';
import { FormControl, InputLabel, Input, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { UseFormRegister } from 'react-hook-form/dist/types/form';



const emailValidationPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;


 type Props = {
    label: string;
    id: string;
    type: string;
    register: UseFormRegister<TFieldValues>;
    errors?: any;
    showPassword?: boolean;
    handleClickShowPassword?: () => void;
    handleMouseDownPassword?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const CustomInput: React.FC<Props> = ({
                                          label,
                                          id,
                                          type,
                                          register,
                                          errors,
                                          showPassword,
                                          handleClickShowPassword,
                                          handleMouseDownPassword,
                                      }: Props) => {
    return (
        <FormControl sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor={id} error={!!errors} required>
                {label}
            </InputLabel>
            <Input
                id={id}
                type={ showPassword ? 'text' : type}
                {...register(id, {
                    required: `Please enter a valid ${label.toLowerCase()}`,
                    ...(type === 'email' && {
                        pattern: {
                            value: emailValidationPattern,
                            message: 'Invalid email address',
                        },
                    }),
                    ...(type === 'password' && {
                        minLength: {
                            value: 8,
                            message: 'Password must be at least 8 characters',
                        },
                    }),
                })}
                error={!!errors}
                required
                endAdornment={
                    type === 'password' &&
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                }
            />
        </FormControl>
    );
};

export default CustomInput;