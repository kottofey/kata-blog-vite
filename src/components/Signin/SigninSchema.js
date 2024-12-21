import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Proper email address must be provided')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

export default schema;
