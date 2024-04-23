import { Tabs, Tab, TabsList } from 'base-ui-react';
import { FC, Fragment, useContext, useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import styled from 'styled-components';
import { UserContext } from '../contexts/user.context';

const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const StyledTabs = styled(Tabs)`
  width: 240px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  &:visited {
    color: initial;
  }
`;

const StyledOutlet = styled(Outlet)`
  margin: 32px 0;
`;

const Navigation: FC = () => {
  const { currentUser } = useContext(UserContext);
  const [tab, setTab] = useState<string>('dashboard');
  const location = useLocation();

  useEffect(() => {
    const handleLocationChange = () => {
      const { pathname } = location;
      if (pathname === '/add-entry') {
        setTab('add-entry');
      } else if (pathname === '/') {
        setTab('dashboard');
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  });

  return (
    <Fragment>
      <NavigationContainer>
        <StyledTabs defaultValue={'home'} value={tab}>
          <TabsList>
            <Tab value={'dashboard'}>
              <StyledLink to={'/'}>Dashboard</StyledLink>
            </Tab>
            <Tab value={'add-entry'}>
              <StyledLink to={'/add-entry'}>New Entry</StyledLink>
            </Tab>
          </TabsList>
        </StyledTabs>
        <Link className='nav-link' to='/auth'>
          {currentUser ? currentUser?.displayName : 'Sign in'}
        </Link>
      </NavigationContainer>
      <StyledOutlet />
    </Fragment>
  );
};

export default Navigation;
