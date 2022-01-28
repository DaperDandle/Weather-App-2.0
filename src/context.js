import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [forcast, setForcast] = useState({});
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState({
    longitude: 39,
    latitude: 90,
  });
  const URL = "https://api.openweathermap.org/data/2.5/weather?";
  const API_KEY = "&appid=1c1db8d090d9ca476798758a61fc7f7f";

  const fetchData = useCallback(async () => {
    setLoading(true);
    const currentCoordinates = navigator.geolocation.getCurrentPosition(
      (position) => {
        return {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        };
      }
    );
    if (currentCoordinates) {
      setLocation(currentCoordinates);
    }
    const API_CALL = `${URL}lat=${location.latitude}&lon=${location.longitude}${API_KEY}`;

    try {
      const res = await fetch(API_CALL);

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }, [location.latitude, location.longitude]);

  useEffect(() => fetchData(), [fetchData]);
  return (
    <AppContext.Provider value={{ loading, forcast, location, setForcast }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
