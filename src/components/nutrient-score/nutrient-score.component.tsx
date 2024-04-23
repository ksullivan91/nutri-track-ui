import React from 'react';
import { Badge } from 'base-ui-react';
import { Nutrient } from '../../service/add-entry.service'; // Assuming this is correctly imported based on your project structure
import styled from 'styled-components';

interface OwnProps {
  nutrients: Nutrient[];
}

const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  span {
    min-height: 30px;
  }
`;

const recommendations: Record<
  string,
  { value: number; measurement: 'mg' | 'mcg' | 'g' }
> = {
  Fat: { value: 78, measurement: 'g' },
  'Dietary Fiber': { value: 28, measurement: 'g' },
  Sugars: { value: 50, measurement: 'g' },
  Calcium: { value: 1300, measurement: 'mg' },
  Iron: { value: 18, measurement: 'mg' },
  Potassium: { value: 4700, measurement: 'mg' },
  Sodium: { value: 2300, measurement: 'mg' },
  Protein: { value: 50, measurement: 'g' },
  'Total carbohydrate': { value: 275, measurement: 'g' },
  'Vitamin A': { value: 900, measurement: 'mcg' },
  'Vitamin C': { value: 90, measurement: 'mg' },
  'Vitamin D': { value: 20, measurement: 'mcg' },
};

const convertToMilligrams = (
  value: number,
  unit: 'mg' | 'mcg' | 'g'
): number => {
  switch (unit) {
    case 'g':
      return value * 1000; // Convert grams to milligrams
    case 'mcg':
      return value / 1000; // Convert micrograms to milligrams
    default:
      return value; // Already in milligrams
  }
};

const getBadgeVariant = (percentage: number): string => {
  if (percentage <= 15) {
    return 'darkPink';
  } else if (percentage > 15 && percentage <= 30) {
    return 'pink';
  } else if (percentage > 30 && percentage <= 65) {
    return 'lightPink';
  } else {
    return 'success';
  }
};

const normalizeNutrientName = (name: string) => {
  const mappings: Record<string, string> = {
    dietaryFiber: 'Dietary Fiber',
    carbohydrates: 'Total carbohydrate',
    vitaminA: 'Vitamin A',
    vitaminC: 'Vitamin C',
    vitaminD: 'Vitamin D',
    // Add other mappings if names do not match exactly
  };
  return mappings[name] || name.charAt(0).toUpperCase() + name.slice(1);
};

const NutrientScore: React.FC<OwnProps> = ({ nutrients }) => {
  const combinedNutrients = nutrients.reduce<Record<string, number>>(
    (acc, nutrient) => {
      const normalizedName = normalizeNutrientName(nutrient.name);
      const nutrientValueInMg = convertToMilligrams(
        nutrient.value,
        nutrient.measurement
      );
      if (!acc[normalizedName]) {
        acc[normalizedName] = 0;
      }
      acc[normalizedName] += nutrientValueInMg;
      return acc;
    },
    {}
  );

  const nutrientPercentages = Object.entries(combinedNutrients).map(
    ([name, totalValueInMg]) => {
      const recommendation = recommendations[name];
      if (recommendation) {
        const recommendationInMg = convertToMilligrams(
          recommendation.value,
          recommendation.measurement
        );
        const percentage = (totalValueInMg / recommendationInMg) * 100;
        return {
          name,
          score: percentage.toFixed(2) + '%',
          variant: getBadgeVariant(percentage),
        };
      }
      return {
        name,
        score: 'No Recommendation',
        variant: 'default',
      };
    }
  );

  return (
    <BadgeContainer>
      {nutrientPercentages
        .sort(
          (a, b) =>
            parseFloat(b.score.toString()) - parseFloat(a.score.toString())
        )
        .map((nutrient) => (
          <Badge
            key={nutrient.name}
            variant={nutrient.variant}
            className='badge'
          >
            {nutrient.name} Intake: {nutrient.score}
          </Badge>
        ))}
    </BadgeContainer>
  );
};

export default NutrientScore;
