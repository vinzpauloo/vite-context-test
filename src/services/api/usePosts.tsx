import axios, { AxiosError } from "axios";

export const usePosts = () => {
  const getPosts = async () => {
    const endpoint = `posts`;

    try {
      const response = await axios.get(endpoint);

      if (response.status === 200) {
        const { data } = response;
        return data;
      }
    } catch (err) {
      let error;
      if (err instanceof AxiosError) {
        error = `*${err.message}`;
      } else if (err instanceof Error) {
        error = err.message;
      }

      console.log(`ERROR`, error);
      return { error };
    }
  };

  return { getPosts };
};
