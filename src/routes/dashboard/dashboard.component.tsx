import { FC, useContext, useEffect, useState } from 'react';
import ContentWrapper from '../../components/content-wrapper.component';
import {
  StyledH3,
  StyledP,
} from '../../components/content-typography.component';
import { UserContext } from '../../contexts/user.context';
import Loader from '../../components/loader.component';
import { getDocumentFromCollectionByUserId } from '../../utils/firebase.utils';
import { CompleteEntry, Nutrient } from '../../service/add-entry.service';
import NutrientScore from '../../components/nutrient-score/nutrient-score.component';
import RecentEntries from '../../components/recent-entries/recent-entries.component';

const Dashboard: FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<CompleteEntry[] | null>(null);
  const [allNutrients, setNutrients] = useState<Nutrient[]>([]);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getNutrients = (data: CompleteEntry[]): Nutrient[] => {
      const nuts: Nutrient[] = [];
      data.forEach((entry) => {
        entry.nutrients.forEach((nutrient) => {
          nuts.push(nutrient);
        });
      });

      return nuts;
    };

    const fetchData = async () => {
      try {
        const response = await getDocumentFromCollectionByUserId(
          'entries',
          currentUser ? currentUser.uid : ''
        );
        const responseData = response.docs.map((doc) =>
          doc.data()
        ) as CompleteEntry[];
        setData(responseData);

        const nutrients = getNutrients(responseData);

        setNutrients(nutrients);

        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loader />; // Display a loader component while data is loading
  }

  return (
    <ContentWrapper>
      <StyledH3>Daily Tracker</StyledH3>
      <StyledP>Checkout recent entries and add more</StyledP>
      {allNutrients && allNutrients.length > 0 ? (
        <div>
          <NutrientScore nutrients={allNutrients} />
          <RecentEntries data={data} />
        </div>
      ) : (
        <StyledP>No data found</StyledP>
      )}
    </ContentWrapper>
  );
};

export default Dashboard;
