import { getLayout } from "@/components/Layout/Layout";
import { useUserQuery } from "@/services/authApi/authApi";
import { LayoutWithBar } from "@/components/Layout/LayoutWithBar/LayoutWithBar";
import { ReactElement } from "react";

const Profile = () => {

  const { data: user, isSuccess } = useUserQuery();


  return (
    <div>
      Hello {isSuccess ? user.userName : "User"}
    </div>
  );

};

Profile.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutWithBar>
      {page}
    </LayoutWithBar>
  )
}

export default Profile;