import {getLayout} from "@/components/Layout/Layout";
import {useUserQuery} from "@/services/authApi/authApi";
import ButtonTransparent from "@/components/Buttons/ButtonTransparent/ButtonTransparent";
import Avatar from "@/components/Profile/Avatar/Avatar";

const Profile = () => {

    const {data:user,isSuccess} = useUserQuery()


    return(
        <div>
            Hello {isSuccess ? user.userName : 'User'}
          <div>
            <Avatar/>
            <ButtonTransparent title={'Add a Profile Photo'} width={'100%'} disabled={false}/>
          </div>
        </div>
    )

}

Profile.getLayout = getLayout

export default Profile