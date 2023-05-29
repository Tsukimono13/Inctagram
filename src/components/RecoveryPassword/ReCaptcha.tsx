import ReCAPTCHA from "react-google-recaptcha"

const GoogleKey = '6LeY2y0mAAAAANwI_paCWfoksCgBm1n2z9J0nwNQ'


interface Props {
    onChange: (token: string | number) => void;
}

// const secretKey = process.env.NEXT_PUBLIC_RECAPTCHA_API_KEY as string;

export const Recaptcha = ({ onChange }: Props) => {
    const handleRecaptchaChange = (token: string | number | null) => {
        if (token) {
            onChange(token);
        }
    };

    return (
        <ReCAPTCHA
            sitekey={GoogleKey}
            onChange={handleRecaptchaChange}
        />
    );
};