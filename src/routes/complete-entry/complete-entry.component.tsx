import * as React from 'react';
import { NewEntryContext } from '../../contexts/new-entry.context';
import { Button, TextInput, Typography } from 'base-ui-react';
import camelCaseToTitleCase from '../../utils/camelCaseToTitle.utils';
import styled from 'styled-components';
import { StyledH3 } from '../../components/content-typography.component';
import { UserContext } from '../../contexts/user.context';
import addEntry, {
  convertNutritionalInfoToNutrients,
  extractNutrientValueAndUnit,
} from '../../service/add-entry.service';

const FormContainer = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: space-between;
`;

const EntryContainer = styled.div`
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
`;

const CompleteEntry: React.FC = () => {
  const { entry } = React.useContext(NewEntryContext);
  const { currentUser } = React.useContext(UserContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [state, setState] = React.useState({
    name: '',
    servings: 1,
  });
  const renderEntries = () => {
    return Object.entries(entry).map(([key, value]) => {
      if (
        value === null ||
        value === '' ||
        value === undefined ||
        key === 'imageUrl'
      ) {
        return null;
      }

      return (
        <EntryContainer key={key}>
          <Typography variant='body1'>{camelCaseToTitleCase(key)}: </Typography>
          <Typography variant='body1'>{value}</Typography>
        </EntryContainer>
      );
    });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, name: e.target.value });
  };

  const handleServingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, servings: parseFloat(e.target.value) });
  };

  const newEntryHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await addEntry({
        userId: currentUser?.uid || '',
        name: state.name,
        servings: state.servings,
        calories: parseFloat(entry.calories),
        imageUrl: entry.imageUrl,
        createdAt: new Date(),
        servingSize:
          extractNutrientValueAndUnit(entry.servingSize) || undefined,
        nutrients: convertNutritionalInfoToNutrients(entry),
      });

      if (response) {
        console.log('Entry added successfully');
      }
    } catch (error) {
      console.error('Error in newEntryHandler:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={newEntryHandler}>
      <FormContainer>
        <div>
          <StyledH3>Complete Entry</StyledH3>
          <TextInput
            labelText='Name'
            value={state.name}
            disabled={false}
            onChange={handleNameChange}
          />
          <TextInput
            labelText='Servings'
            value={state.servings}
            disabled={false}
            onChange={handleServingsChange}
          />
          {renderEntries()}
          <Button type='submit'>
            {isLoading ? 'Loading...' : 'Add Entry'}
          </Button>
        </div>
        <div>
          <img src={entry.imageUrl} alt='food' />
        </div>
      </FormContainer>
    </form>
  );
};

export default CompleteEntry;
