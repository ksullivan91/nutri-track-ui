import { addDocumentToCollection } from '../utils/firebase.utils';
import { NutritionalInfo } from './ocr.service';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type NutrientName = keyof Omit<
  NutritionalInfo,
  'imageUrl' | 'calories' | 'servingSize'
>;

export interface Nutrient {
  name: NutrientName;
  value: number;
  measurement: 'g' | 'mcg' | 'mg';
}

export interface CompleteEntry {
  name: string;
  servings: number;
  userId: string;
  createdAt: Date;
  imageUrl: string;
  calories: number;
  servingSize?: {
    value: number;
    measurement: 'g' | 'mcg' | 'mg';
  };
  nutrients: Nutrient[];
}

export function extractNutrientValueAndUnit(
  nutrientValue: string | undefined
): { value: number; measurement: 'g' | 'mcg' | 'mg' } | null {
  if (!nutrientValue) return null;

  const match = nutrientValue.match(/(\d+\.?\d*)\s*(mg|g|mcg)/i);
  if (match) {
    return {
      value: parseFloat(match[1]),
      measurement: match[2].toLowerCase() as 'g' | 'mcg' | 'mg',
    };
  }
  return null;
}

export function convertNutritionalInfoToNutrients(
  info: NutritionalInfo
): Nutrient[] {
  const nutrientKeys: NutrientName[] = [
    'fat',
    'carbohydrates',
    'protein',
    'dietaryFiber',
    'sugars',
    'vitaminA',
    'vitaminC',
    'vitaminD',
    'calcium',
    'iron',
    'sodium',
    'potassium',
  ];

  return nutrientKeys.reduce<Nutrient[]>((acc, key) => {
    const nutrientInfo = extractNutrientValueAndUnit(info[key]);
    if (nutrientInfo) {
      acc.push({
        name: key,
        value: nutrientInfo.value,
        measurement: nutrientInfo.measurement,
      });
    }
    return acc;
  }, []);
}

const addEntry = async (entry: CompleteEntry) => {
  try {
    const response = await addDocumentToCollection('entries', entry);
    return response;
  } catch (error) {
    console.error('Failed to add the entry:', error);
  }
};

export default addEntry;
