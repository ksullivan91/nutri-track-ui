import * as React from 'react';
import Home from './routes/home/home.component';

import { Route, Routes } from 'react-router-dom';
import Navigation from './components/navigation.component';
import styled from 'styled-components';
import Dashboard from './routes/dashboard/dashboard.component';
import Authentication from './components/authentication/authentication.component';
import CompleteEntry from './routes/complete-entry/complete-entry.component';

const Wrapper = styled.div<{ children: React.ReactNode }>`
  margin: 0 auto;
  max-width: 1024px;
  padding: 32px;
  box-sizing: border-box;
`;

const App: React.FC = () => {
  return (
    <Wrapper>
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Dashboard />} />
          <Route path='add-entry' element={<Home />} />
          <Route path='auth' element={<Authentication />} />
          <Route path='complete-entry' element={<CompleteEntry />} />
        </Route>
      </Routes>
    </Wrapper>
  );
};

export default App;
