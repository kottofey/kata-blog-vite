import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup
    .string()
    .matches(/(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)/, {
      message: 'Proper email address must be provided',
    })
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

export default schema;
