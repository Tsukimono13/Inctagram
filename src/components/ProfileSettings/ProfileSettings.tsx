'use client'
import {useAppSelector} from "@/hooks/useAppSelector";
import {signedIn} from "@/features/authReducer/authSelectors";
import {useRouter} from "next/router";
import s from "./ProfileSettings.module.scss"
import {useForm} from "react-hook-form";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {Box, Button, FormControl, Link, Stack, TextField} from "@mui/material";
import {useGetProfileMutation, UserProfileType} from "@/services/authApi/authApi";
import iconNoPhoto from "../../assets/img/profileSettings/icon-no-photo.png"
import {DesktopDatePicker} from "@mui/x-date-pickers";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import dayjs from "dayjs";
import {firstLastNameValidation} from "@/components/ProfileSettings/validation";


type FormData = {
    userName: string
    firstName: string
    lastName: string
    date: string
    city: string
    aboutMe: string
};

type SettingsInformationType = {
    id: number
    settingName: string,
    href: string
}

export const ProfileSettings = () => {

        const settingsInformation: SettingsInformationType[] = [
            {id: 0, settingName: 'General information', href: '#'},
            {id: 1, settingName: 'Devises', href: '#'},
            {id: 2, settingName: 'Account Management', href: '#'},
            {id: 3, settingName: 'My payments', href: '#'},
        ]


        const isSignedIn = useAppSelector(signedIn)
        const router = useRouter()
        const userProfile = useGetProfileMutation<UserProfileType>()


        const {register, setValue, handleSubmit, formState: {errors, isValid}} = useForm<FormData>({
            mode: "onTouched" || "onBlur" || "onChange",
            defaultValues: {
                userName: '',
                firstName: '',
                lastName: '',
                date: '',
                aboutMe: '',
                city: ''
            }
        });
        const onSubmit = handleSubmit(data => {
            console.log(data)
            alert(JSON.stringify(data))
        })

        const changePhotoHandler = () => {

        }

        const theme = createTheme({
            palette: {
                primary: {
                    main: '#397DF6'
                },
                secondary: {
                    main: '#f1c02b',
                },
            },
        });


        return (
            <div className={s.profileSettingsContainer}>
                <div className={s.container}>
                    <Box
                        sx={{
                            borderBottom: '1px solid red',
                            display: 'flex',
                            flexWrap: 'nowrap',
                            justifyContent: 'center',
                            typography: 'body1',
                            '& > :not(style) + :not(style)': {
                                ml: 6,
                            },
                        }}

                    >
                        {settingsInformation.map(s => {
                            return <Link sx={{
                                color: '#BDC1C7',

                            }}
                                         key={s.id}
                                         href={s.href}
                                         underline="hover">{s.settingName}
                            </Link>
                        })}
                    </Box>
                    <div className={s.content}>
                        <Stack className={s.photoContainer}>
                            <Box className={s.UserPhoto}>
                                <button onClick={changePhotoHandler} className={s.img}>
                                    <div src={iconNoPhoto} className={s.icon}></div>
                                </button>

                                <Button sx={{
                                    marginTop: '20px',
                                    border: "1px solid "
                                }} variant="outlined" onClick={changePhotoHandler}>Add a profile Photo</Button>

                            </Box>
                        </Stack>
                        <div className={s.UserInformation}>
                            <form onSubmit={onSubmit}>
                                <FormControl sx={{width: 494}}>
                                    <Stack spacing={1}>
                                        <ThemeProvider theme={theme}>
                                            <TextField
                                                id="userName"
                                                label="Username"
                                                variant="standard"
                                                {...register("userName")} />
                                            <TextField
                                                id="firstName"
                                                label="First Name"
                                                variant="standard"

                                                {...register("firstName", firstLastNameValidation)} />
                                            <TextField
                                                id="lastName"
                                                label="Last Name"
                                                variant="standard"

                                                {...register("lastName", firstLastNameValidation)} />
                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'left',
                                            }}>
                                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                                                    <DesktopDatePicker
                                                        label="Date of birthday"
                                                        format="DD.MM.YYYY"
                                                    />
                                                </LocalizationProvider>
                                            </Box>
                                            <TextField
                                                       id="city"
                                                       label="City"
                                                       variant="standard"

                                                       {...register("city")} />
                                            <TextField
                                                id="aboutMe"
                                                label="About me"
                                                multiline
                                                rows={3}
                                                defaultValue="Text-area"
                                                {...register("aboutMe")}
                                            />
                                        </ThemeProvider>
                                    </Stack>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'right'
                                    }}>
                                        <Button sx={{
                                            marginTop: '20px'
                                        }}
                                                type="submit"
                                                variant="contained"
                                                disabled={!isValid}
                                        >
                                            Save Changes
                                        </Button>
                                    </Box>
                                </FormControl>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
;

