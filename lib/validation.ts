import * as yup from 'yup';

export const destinationFormSchema = yup.object().shape({
  name: yup.string().required('Destination name is required'),
  location: yup.string().required('Location is required'),
  price: yup.string().required('Price is required'),
  image: yup.string().url('Please enter a valid URL starting with http:// or https://').required('Image URL is required'),
  description: yup.string().required('Description is required'),
  amenities: yup.string().required(),
  features: yup.string().required(),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .min(0, 'Rating must be between 0 and 5')
    .max(5, 'Rating must be between 0 and 5')
    .required('Rating is required')
    .transform((value, originalValue) => (originalValue === '' ? undefined : value)),
});

export const userFormSchema = (editingUser?: boolean) =>
  yup.object().shape({
    name: yup.string().required('Full name is required'),
    username: yup.string().required('Username is required').min(3, 'Username must be at least 3 characters long'),
    email: yup.string().required('Email is required').email('Please enter a valid email address'),
    password: editingUser
      ? yup.string().notRequired().min(6, 'Password must be at least 6 characters long')
      : yup.string().required('Password is required for new users').min(6, 'Password must be at least 6 characters long'),
    role: yup.string().oneOf(['user', 'admin']),
    bio: yup.string(),
    avatar: yup
      .string()
      .test('is-url-or-path', 'Please enter a valid URL or path starting with / or http://',
        (value) => !value || value.startsWith('/') || value.startsWith('http')
      ),
  });

export const contactFormSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  subject: yup.string().required('Subject is required'),
  message: yup.string().required('Message is required'),
});

export const profileFormSchema = yup.object().shape({
  name: yup.string().required('Full name is required'),
  email: yup.string().email('Please enter a valid email address').required('Email is required'),
  bio: yup.string(),
});

export const bookingFormSchema = yup.object().shape({
  selectedDate: yup.string().required('Please select a check-in date'),
  nights: yup.number().min(1).max(10).required('Number of nights is required'),
  guests: yup.number().min(1).max(10).required('Number of guests is required'),
  specialRequests: yup.string().required(),
});

export const registerFormSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Please confirm your password'),
  bio: yup.string().required(),
  avatar: yup.string().required(),
}); 