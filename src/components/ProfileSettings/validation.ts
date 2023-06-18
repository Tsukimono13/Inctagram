export const firstLastNameValidation ={
    required: 'This field is required',
    minLength: {
        value: 6,
        message: 'Username cannot have less than 6 characters'
    },
    maxLength: {
        value: 20,
        message: 'Username cannot exceed 20 characters'
    },
}