
import { LayoutWithBar } from "@/components/Layout/LayoutWithBar/LayoutWithBar";
import { ReactElement } from "react";
import ProfilePage from "@/components/profile/ProfilePage";

const Profile = () => <ProfilePage/>


Profile.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutWithBar>
      {page}
    </LayoutWithBar>
  );
};

export default Profile;