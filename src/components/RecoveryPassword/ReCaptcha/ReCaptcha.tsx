import ReCAPTCHA from "react-google-recaptcha"
import s from './ReCaptcha.module.scss'


interface Props {
  onChange: (token: string) => void;
  tokenError:string
}

// const secretKey = process.env.NEXT_PUBLIC_RECAPTCHA_API_KEY as string;

export const Recaptcha = ({onChange,tokenError}: Props) => {
  const GoogleKey = '6LeY2y0mAAAAANwI_paCWfoksCgBm1n2z9J0nwNQ'

  const handleRecaptchaChange = (token: string | null) => {
    if (token) {
      onChange(token);
      return
    }
  };
  const finalClass = tokenError ?  s.mainError:s.main

  return (
    <div className={finalClass}>
      <div className={s.recaptcha}>
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