import React from 'react';
import {getLayout} from "@/components/Layout/Layout";
import CreateNewPassword from "@/components/CreateNewPassword/CreateNewPassword";

const NewPasswordPage = () => <CreateNewPassword/>
NewPasswordPage.getLayout=getLayout
export default NewPasswordPage;