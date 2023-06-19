'use client'
import {useAppSelector} from "@/hooks/useAppSelector";
import {signedIn} from "@/features/authReducer/authSelectors";
import {useRouter} from "next/router";
import s from "./ProfileSettings.module.scss"
import {Box} from "@mui/material";
import {useState} from "react";
import {GeneralInformation} from "@/components/ProfileSettings/General information";
import {Devises} from "@/components/ProfileSettings/Devises";
import {AccountManagement} from "@/components/ProfileSettings/AccountManagement";
import {MyPayments} from "@/components/ProfileSettings/MyPayments";
import styled from "styled-components";


type SettingsInformationType = {
    id: number
    settingName: string,

}



export const ProfileSettings = () => {

        const settingsInformation: SettingsInformationType[] = [
            {id: 0, settingName: 'General information'},
            {id: 1, settingName: 'Devises'},
            {id: 2, settingName: 'Account Management'},
            {id: 3, settingName: 'My payments'},
        ]
        const [optionsIsActive, setOptionsIsActive] = useState(0)


        const isSignedIn = useAppSelector(signedIn)
        const router = useRouter()


        const changeSettingOptions = (id: number) => {
            setOptionsIsActive(id)
        }


        return (
            <div className={s.profileSettingsContainer}>

                <div className={s.container}>
                    <Box
                        sx={{
                            borderBottom: '2px solid #4C4C4C',
                            display: 'flex',
                            flexWrap: 'nowrap',
                            justifyContent: 'space-evenly',
                        }}

                    >
                        {settingsInformation.map(s => {
                            return <Button
                                key={s.id}
                                onClick={() => changeSettingOptions(s.id)}>
                                {s.settingName}
                            </Button>
                        })}
                    </Box>

                    {optionsIsActive === 0 ? <GeneralInformation/> :
                        optionsIsActive === 1 ? <Devises/> :
                            optionsIsActive === 2 ? <AccountManagement/> :
                                optionsIsActive === 3 ? <MyPayments/> : ''
                    }
                </div>
            </div>
        );
    }
;

const Button = styled.button`
  font-size: 16px;
  color: #4C4C4C;
`

