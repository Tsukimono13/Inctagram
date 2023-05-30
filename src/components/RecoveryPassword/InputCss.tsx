import * as React from 'react';
import {styled} from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const CssTextField = styled(TextField)({
  '& label.Mui': {
    color: 'grey',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',

      borderBottom: '1px solid grey',
      borderBottomColor: 'grey',
      color:'grey'

    },
    '&:hover fieldset': {
      borderColor: 'blue',
    },
    '&:active fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
  },
});

export default function CustomizedInputs() {
  return (

    <CssTextField label="Email" id="custom-css-outlined-input"/>

  );
}