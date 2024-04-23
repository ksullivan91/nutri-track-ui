// utils/authErrorHandling.js

/**
 * Translates Firebase authentication error codes into user-friendly messages.
 * @param {Object} error - The error object from Firebase authentication.
 * @returns {string} The user-friendly error message.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAuthErrorMessage = (error: any) => {
  switch (error.code) {
    case 'auth/user-not-found':
      return 'No user found with this email.';
    case 'auth/wrong-password':
      return 'Incorrect password.';
    default:
      return 'Failed to sign in. Please try again.';
  }
};

export default getAuthErrorMessage;
