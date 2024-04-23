import { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SignUpForm from '../../components/sign-up/sign-up.component';
import SignInForm from '../../components/sign-in/sign-in.component';
import { UserContext } from '../../contexts/user.context';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  margin: auto;
  width: 100%;
  justify-content: space-between;
  max-width: 1024px;
  flex-wrap: wrap;
  align-items: center;
`;

const Authentication = () => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (currentUser) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [currentUser, navigate, location.state]);

  return (
    <StyledDiv>
      <SignInForm />
      <SignUpForm />
    </StyledDiv>
  );
};

export default Authentication;
