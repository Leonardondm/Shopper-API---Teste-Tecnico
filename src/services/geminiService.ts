import axios from 'axios';

export const processImage = async (image: string) => {
  const apiUrl = 'https://ai.google.dev/gemini-api/vision';
  const apiKey = process.env.GEMINI_API_KEY;

  try {
    const response = await axios.post(apiUrl, { image }, {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    });

    if (response.status === 200) {
      const data = response.data;
      return {
        image_url: data.image_url,
        measure_value: data.measure_value,
        measure_uuid: data.measure_uuid
      };
    } else {
      throw new Error('Failed to process image');
    }
  } catch (error) {
    console.error("Erro ao chamar API Gemini", error);
    throw error;
  }
};
