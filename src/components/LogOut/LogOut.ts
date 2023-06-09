import {useLogOutMutation} from "@/services/authApi/authApi";

export const LogOut = () => {
    const [logOut] = useLogOutMutation()

    const logOutHandler = async () => {
        await logOut()
    }
}