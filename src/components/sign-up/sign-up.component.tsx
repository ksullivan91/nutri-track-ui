import React, { useState, FormEvent, ChangeEvent } from 'react';
import styled from 'styled-components';
import { Button, TextInput, Typography } from 'base-ui-react';
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from '../../utils/firebase.utils';
import getAuthErrorMessage from '../../utils/authErrorHandling';

// Define the form fields interface
interface FormFields {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Styled components
const SignUpFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;
  margin-top: 32px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  button {
    width: 100%;
    &:first-child {
      margin-bottom: 16px;
    }
  }
`;

const SignUpForm: React.FC = () => {
  const initialFormFields: FormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const [formValues, setFormValues] = useState<FormFields>(initialFormFields);
  const [error, setError] = useState<string>('');
  const { displayName, email, password, confirmPassword } = formValues;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const resetFormFields = () => {
    setFormValues(initialFormFields);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      //@ts-expect-error ignore this line
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (e) {
      setError(getAuthErrorMessage(e as Error));
      console.error('Error creating account:', e);
    }
  };

  const logGoogleUser = async () => {
    try {
      await signInWithGooglePopup();
    } catch (e) {
      setError(getAuthErrorMessage(e as Error));
      console.error('Error signing in', e);
    }
  };

  return (
    <SignUpFormContainer>
      <Typography variant='h3'>Don't have an account?</Typography>
      <Typography variant='label'>
        Sign Up with your email and password
      </Typography>
      {error && <Typography color='error'>{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextInput
          name='displayName'
          value={displayName}
          onChange={handleChange}
          labelText='Display Name'
          type='text'
          required
        />
        <TextInput
          name='email'
          value={email}
          onChange={handleChange}
          labelText='Email'
          type='email'
          required
        />
        <TextInput
          name='password'
          value={password}
          onChange={handleChange}
          labelText='Password'
          type='password'
          required
        />
        <TextInput
          name='confirmPassword'
          value={confirmPassword}
          onChange={handleChange}
          labelText='Confirm Password'
          type='password'
          required
        />
        <ButtonsContainer>
          <Button type='submit'>Sign Up</Button>
          <Button onClick={logGoogleUser} variant='secondary'>
            Sign Up with Google
          </Button>
        </ButtonsContainer>
      </form>
    </SignUpFormContainer>
  );
};

export default SignUpForm;
