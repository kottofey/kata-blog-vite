import * as yup from 'yup';

const schema = yup.object().shape(
  {
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
      .matches(
        /(^[a-z][a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)/,
        {
          message:
            'Proper email address must be provided. First character cannot be capital letter, dot or number',
        }
      )
      .required('Email is required'),
    password: yup
      .string()
      .when({
        is: (val) => val.length > 0,
        then: (rule) => rule.min(6, 'Minimum 6 characters long'),
      })
      .when({
        is: (val) => val.length >= 6,
        then: (rule) => rule.max(40, 'Maximum 40 characters long'),
      }),
    image: yup.string().url('Proper URL address must be provided'),
  }
  // [['password', 'password']]
);

export default schema;
