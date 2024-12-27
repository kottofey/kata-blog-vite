import * as yup from 'yup';

const schema = yup.object().shape({
  username: yup
    .string()
    .matches(/^[a-zA-Z0-9_-]+$/, {
      excludeEmptyString: true,
      message:
        'Allowed symbols are numbers, Latin letters (capital and small), dash and underscore',
    })
    .min(3, 'Minimum 3 characters long')
    .max(20, 'Maximum 20 characters long')
    .required('Username is required'),
  email: yup
    .string()
    .matches(/(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)/, {
      message: 'Proper email address must be provided',
    })
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Minimum 6 characters long')
    .max(40, 'Maximum 40 characters long')
    .required('Password is required'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), null])
    .required('Type password once again to cofirm it'),
  isChecked: yup
    .boolean()
    .oneOf([true], 'This must be checked to create account'),
});

export default schema;
