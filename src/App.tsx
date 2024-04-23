import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import Navigation from './components/navigation.component';
import Dashboard from './routes/dashboard/dashboard.component';
import Authentication from './components/authentication/authentication.component';
import CompleteEntry from './routes/complete-entry/complete-entry.component';
import AddEntry from './routes/add-entry/add-entry.component';

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
          <Route path='add-entry' element={<AddEntry />} />
          <Route path='auth' element={<Authentication />} />
          <Route path='complete-entry' element={<CompleteEntry />} />
        </Route>
      </Routes>
    </Wrapper>
  );
};

export default App;
