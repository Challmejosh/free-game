import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Game } from '../Pages/Home';

interface FetchState {
  data:  Game[] | null;
  loading: boolean;
  error: string | null;
}

function useFetch(url: string){
  const [state, setState] = useState<FetchState>({
    data: null ,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;
    setState({ data: [], loading: true, error: null });
    axios.get(url,{
        headers: {
		'x-rapidapi-key': import.meta.env.VITE_API,
		'x-rapidapi-host': import.meta.env.VITE_HOST,
	    }
    })
      .then((response) => {
        if (isMounted) setState({ data: response.data, loading: false, error: null });
      })
      .catch((error) => {
        let errorMsg = 'Unknown error';
        if (axios.isAxiosError(error)) {
          errorMsg = error.response?.data?.message || error.message || errorMsg;
        } else if (error instanceof Error) {
          errorMsg = error.message;
        }
        if (isMounted) setState({ data: [], loading: false, error: errorMsg });
      });
    return () => {
      isMounted = false;
    };
  }, [url]);

  return state;
}

export default useFetch;
