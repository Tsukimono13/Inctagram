import {getLayout} from "@/components/Layout/Layout";
import {useUserQuery} from "@/services/authApi/authApi";
import UploadAvatar from "@/components/Profile/UploadAvatar/UploadAvatar";

const Profile = () => {

    const {data:user,isSuccess} = useUserQuery()


    return(
        <div>
            Hello {isSuccess ? user.userName : 'User'}

            <UploadAvatar/>    {/*временно вставлен*/}
        </div>
    )

}

Profile.getLayout = getLayout

export default Profile