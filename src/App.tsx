import { Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import useFetch from "./utility/useFetch";
import { useEffect } from "react";
import { useStore } from "./utility/store";
import Navbar from "./components/navbar";


function App() {
    const { data, loading, error } = useFetch(
      import.meta.env.VITE_URL
    );
    const {setData, setLoading, setPlatforms, setError, search,platform, filteredGames} = useStore();
    useEffect(()=>{
      setData(data);
      setLoading(loading);
      setError(error);
      setPlatforms(data);
    },[data, loading, error, setData, setLoading, setError,setPlatforms]);
    useEffect(() => {
      filteredGames(data, search, platform);
    },[data,search,platform,filteredGames]);
  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
    </div>
  )
}

export default App
