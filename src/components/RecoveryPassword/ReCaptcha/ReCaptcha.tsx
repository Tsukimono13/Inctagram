import ReCAPTCHA from "react-google-recaptcha"
import {useState} from "react";
import s from './ReCaptcha.module.scss'


interface Props {
  onChange: (token: string) => void;
}

// const secretKey = process.env.NEXT_PUBLIC_RECAPTCHA_API_KEY as string;

export const Recaptcha = ({onChange}: Props) => {
  const GoogleKey = '6LeY2y0mAAAAANwI_paCWfoksCgBm1n2z9J0nwNQ'
  const errorText = 'Please verify that you are not a robot'
  const captchaExpiredText = 'Verification expired. Check the checkbox again.'

  const [tokenError, setTokenError] = useState<string>('')

  const handleRecaptchaChange = (token: string | null) => {
    if (token) {
      setTokenError('')
      onChange(token);
      return
    }
    setTokenError(errorText)

  };
  const finalClass = tokenError ?  s.mainError:s.main

  return (
    <div className={finalClass}>

      <div className={s.recaptcha}>
        <div className={s.error}>
          {/*{tokenError && <span >Try again</span>}*/}
        </div>
        <ReCAPTCHA
          sitekey={GoogleKey}
          onChange={handleRecaptchaChange}
        />
      </div>
      <div className={s.error}>
        {tokenError && <span >{tokenError}</span>}
      </div>


    </div>

  );
};