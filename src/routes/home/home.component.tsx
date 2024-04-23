import { FC, useContext, useState } from 'react';
import ContentWrapper from '../../components/content-wrapper.component';
import {
  StyledH3,
  StyledP,
} from '../../components/content-typography.component';
import { Button } from 'base-ui-react';
import ImageUpload from '../../components/image-upload.component';
import styled from 'styled-components';
import { fetchNutritionalFacts } from '../../service/ocr.service';
import { NewEntryContext } from '../../contexts/new-entry.context';
import SpinnerIcon from '../../components/sign-up/spinner-icon.component';
import { useNavigate } from 'react-router-dom';

const StyledButton = styled(Button)`
  width: 100%;
`;

const Container = styled.div`
  max-width: 436px;
`;

const Home: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { updateEntry } = useContext(NewEntryContext);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    if (file) {
      try {
        const fetchedData = await fetchNutritionalFacts(file);
        if (fetchedData) {
          updateEntry(fetchedData);
          setIsLoading(false);
          navigate('/complete-entry');
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <ContentWrapper>
      <Container>
        <StyledH3>Entry</StyledH3>
        <StyledP>
          Add an entry to your food jouurnal by submitting a picture of the
          nutrition label
        </StyledP>
        <ImageUpload setFile={setFile} />
        <StyledButton onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? <SpinnerIcon /> : 'Submit'}
        </StyledButton>
      </Container>
    </ContentWrapper>
  );
};

export default Home;
