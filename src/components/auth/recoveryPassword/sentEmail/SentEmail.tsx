import React from "react";
import TitleForAuth from "@/components/auth/recoveryPassword/titleForAuth/TitleForAuth";
import s from "src/components/auth/recoveryPassword/sentEmail/SentEmail.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import TextForAuth from "@/components/auth/recoveryPassword/textForAuth/TextForAuth";
import variables from "src/styles/variables.module.scss";

import { useRouter } from "next/router";
import ButtonBlue from "@/components/recoveryPassword/Button/ButtonBlue";

const SentEmail = () => {
  const router = useRouter();
  const email = (router.query?.email);
  const onClickHandler = () => {
    return router.push("/signIn");
  };
  return (
    <div className={s.main}>
      <div className={s.title}>
        <TitleForAuth marginBottom={"0px"} text={"Email sent"} />
        <CloseIcon onClick={onClickHandler} style={{ cursor: "pointer" }} />
      </div>
      <div className={s.subTitle}>
        <TextForAuth text={`We have sent a link to confirm your email to ${email}`}
                     color={variables.whiteColor}
                     marginBottom={"18px"}
                     fontSize={"16px"}
        />
        <div style={{ marginBottom: "6px", textAlign: "end" }}>
          <ButtonBlue
            callback={onClickHandler}
            disabled={false}
            title={"OK"}
            width={"96px"}
            type={"button"}
          />
        </div>
      </div>
    </div>


  );
};

export default SentEmail;