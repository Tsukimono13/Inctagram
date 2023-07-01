export type RecoveryPasswordType={
    email: string
    recaptcha: string
}
export type NewPasswordType={
    newPassword: string,
    recoveryCode: string
}
export type RegistrationType = {
    userName: string
    email: string
    password: string
}

export type LoginType = Omit<RegistrationType, 'userName'>

export type LoginResponseType = {
    accessToken: string
}

export type RegistrationConfirmation = {
    confirmationCode: string[]
}


export type UserType = {
    userId: number
    userName: string
    email: string
}

export type AvatarsType = {
    url: string,
    width: number,
    height: number,
    fileSize: number
}

export type RequestBodyType = {
    userName: string
    firstName: string
    lastName: string
    dateOfBirth: Date | null
    city: string
    aboutMe: string
}



export type UserProfileType = {
    id: number,
    userName: string,
    firstName: string,
    lastName: string,
    city: string,
    dateOfBirth: Date,
    aboutMe: string,
    avatars: AvatarsType[]
}