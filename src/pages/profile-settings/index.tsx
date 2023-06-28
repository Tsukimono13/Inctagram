import {LayoutWithBar} from "@/components/layout/layoutWithBar/LayoutWithBar";
import {ProfileSettings} from "@/components/profileSettings/ProfileSettings";
import {ReactElement} from "react";

const Index = () => <ProfileSettings/>

Index.getLayout = function getLayout(page: ReactElement) {
    return (
        <LayoutWithBar>
            {page}
        </LayoutWithBar>
    );
};

export default Index