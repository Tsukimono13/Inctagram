import s from './header.module.css'
import {Button} from "@mui/material"
import {useLogOutMutation} from "@/services/authApi/authApi";


export const Header = () => {

    const [logOut]=useLogOutMutation()

    const logOutHandler = async () => {
        await logOut()
    }

    return (
        <div className={s.header}>
            <h2 className={s.title}>Inctagram</h2>
            <Button color="inherit" onClick={logOutHandler}>Log Out</Button>
        </div>
    )
}