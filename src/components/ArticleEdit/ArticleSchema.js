import * as yup from 'yup';

const schema = yup.object().shape({
  title: yup
    .string()
    .min(3, 'Minimum 3 characters long')
    .max(100, 'Maximum 100 characters long')
    .required('Title is required'),

  description: yup
    .string()
    .min(3, 'Minimum 3 characters long')
    .max(300, 'Maximum 300 characters long')
    .required('Descritpion is required'),

  body: yup.string().required('Article text is required'),

  tagList: yup
    .array()
    .required()
    .of(
      yup
        .string()
        .matches(/(^[a-zA-Zа-яА-Я][ а-яА-Яa-zA-Z0-9-_]*$)/, {
          excludeEmptyString: true,
          message:
            'Allowed symbols are numbers, letters (capital and small), dash and underscore. First character must be a letter',
        })
        .max(15, '15 symbols maximum')
    ),
});

export default schema;
