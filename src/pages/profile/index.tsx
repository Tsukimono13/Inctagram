import {getLayout} from "@/components/Layout/Layout";
import {useUserQuery} from "@/services/authApi/authApi";

const Profile = () => {

    const {data:user,isSuccess} = useUserQuery()


    return(
        <div>
            Hello {isSuccess ? user.userName : 'User'}
        </div>
    )

}

Profile.getLayout = getLayout

export default Profile