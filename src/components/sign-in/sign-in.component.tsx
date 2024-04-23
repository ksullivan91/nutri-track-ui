import React, { useState, FormEvent, ChangeEvent } from 'react';
import styled from 'styled-components';
import { Button, TextInput, Typography } from 'base-ui-react';
import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from '../../utils/firebase.utils';
import getAuthErrorMessage from '../../utils/authErrorHandling';

const SignInFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  max-width: 380px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  button {
    width: 100%;
    &:first-child {
      margin-bottom: 16px;
    }
  }
`;

interface FormValues {
  email: string;
  password: string;
}

const SignInForm: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = formValues;
    setError('');

    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );

      if (response?.user) {
        // Do something with the response if necessary
      }
    } catch (error) {
      setError(getAuthErrorMessage(error as Error));
      console.error('Error signing in:', error);
    }
  };

  const logGoogleUser = async () => {
    try {
      await signInWithGooglePopup();
    } catch (error) {
      setError(getAuthErrorMessage(error as Error));
      console.error('Error signing in', error);
    }
  };

  return (
    <SignInFormContainer>
      <Typography variant='h3'>I already have an account</Typography>
      <Typography variant='label'>
        Sign in with your email and password
      </Typography>
      {error && <Typography color='error'>{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextInput
          type='email'
          name='email'
          value={formValues.email}
          onChange={handleChange}
          placeholder='Email'
          labelText='Email'
          required
        />
        <TextInput
          type='password'
          name='password'
          value={formValues.password}
          onChange={handleChange}
          placeholder='Password'
          labelText='Password'
          required
        />
        <ButtonsContainer>
          <Button type='submit' variant='primary'>
            Sign In
          </Button>
          <Button type='button' onClick={logGoogleUser} variant='secondary'>
            Sign In with Google
          </Button>
        </ButtonsContainer>
      </form>
    </SignInFormContainer>
  );
};

export default SignInForm;
