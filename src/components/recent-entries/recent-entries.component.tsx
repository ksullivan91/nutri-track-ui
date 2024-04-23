import * as React from 'react';
import { CompleteEntry } from '../../service/add-entry.service';
import ContentWrapper from '../content-wrapper.component';
import {
  StyledH4,
  StyledH5,
  StyledLabel,
  StyledP,
} from '../content-typography.component';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

interface OwnProps {
  data: CompleteEntry[] | null;
}

const RecentEntries: React.FC<OwnProps> = ({ data }) => {
  if (data === null) {
    return null;
  }

  return (
    <ContentWrapper>
      <StyledH4>Recent Entries</StyledH4>
      {data && data.length > 0 ? (
        data.map((entry) => <RecentEntry key={entry.name} entry={entry} />)
      ) : (
        <StyledP>No entries found</StyledP>
      )}
    </ContentWrapper>
  );
};

const RecentEntry: React.FC<{ entry: CompleteEntry }> = ({ entry }) => {
  return (
    <Container>
      <StyledH5>{entry.name}</StyledH5>
      <StyledLabel>Calories: {entry.calories}</StyledLabel>
      <StyledLabel>Servings: {entry.servings}</StyledLabel>
      <StyledLabel>Macros:</StyledLabel>
      <StyledLabel>
        Protein: {entry.nutrients.filter((n) => n.name === 'protein')[0].value}
      </StyledLabel>
      <StyledLabel>
        Carbs:{' '}
        {entry.nutrients.filter((n) => n.name === 'carbohydrates')[0].value}
      </StyledLabel>
      <StyledLabel>
        Fat: {entry.nutrients.filter((n) => n.name === 'fat')[0].value}
      </StyledLabel>
    </Container>
  );
};

export default RecentEntries;
