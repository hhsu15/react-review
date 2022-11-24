import axios from 'axios';

const searchImages = async () => {
  const response = await axios.get('https://api.unsplash.com/search/photos', {
    headers: {
      Authorization: 'Client-ID Z80MNvHNEdAJpf80N7lAxRWph_9wqNIk2xBvDxnBeR8'
    },
    params: {
      query: 'cars'
    }
  });
  console.log(response);
  return response;
};

export default searchImages;
