import { FC, ReactNode } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  margin: 32px 0;
`;

const ContentWrapper: FC<{ children: ReactNode }> = (props) => {
  return <StyledDiv>{props.children}</StyledDiv>;
};

export default ContentWrapper;
