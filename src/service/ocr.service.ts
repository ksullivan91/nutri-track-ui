const baseUrl = 'http://localhost:8080/nutritional-facts';

/**
 * Interface for the nutritional information returned from the server.
 */
export interface NutritionalInfo {
  imageUrl: string;
  calories: string;
  fat: string;
  carbohydrates: string;
  protein: string;
  servingSize: string;
  dietaryFiber?: string;
  sugars?: string;
  vitaminA?: string;
  vitaminC?: string;
  vitaminD?: string;
  calcium?: string;
  iron?: string;
  sodium?: string;
  potassium?: string;
}

/**
 * Function to fetch nutritional facts by uploading an image to the server.
 * @param imageFile - The image file to upload.
 * @returns A promise with the nutritional information.
 */
export const fetchNutritionalFacts = async (
  imageFile: File
): Promise<NutritionalInfo | null> => {
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await fetch(baseUrl, {
      headers: {
        accept: 'application/json',
      },
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      console.log(`HTTP error! Status: ${response.status}`);
    }

    return (await response.json()) as NutritionalInfo;
  } catch (error) {
    console.error('Failed to fetch nutritional facts:', error);
    return null;
  }
};
