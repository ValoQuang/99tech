import { useEffect } from "react";
import Form from "./component/Form/Form";
import { useFormContext } from "./AppContextProvider";
import { data } from "./mockData";
import { validateCurrencyData } from "./utils/validateData";
import Navbar from "./component/Navbar/Navbar";

function App() {
  const { theme, setData, setError, error, setLoading } = useFormContext();
  useEffect(() => {
    //const fetchData = async () => {
    //  try {
    //    const response = await fetch(
    //      "https://interview.switcheo.com/prices.json"
    //    );
    //    if (!response.ok) {
    //      setError(...)
    //    }
    //    const data = await response.json();
    //    setData(data);
    //    setLoading(false);
    //  } catch (error) {
    //    setError(error.message);
    //  }
    //};

    //mock the api backend call with fetching tim around 1s to display loading spinner
    const fetchData = async () => {
      try {
        setLoading(true);
        const responseTimeout = setTimeout(() => {
          const validatedData = validateCurrencyData(data);
          setData(validatedData);
          setLoading(false);
        }, 500);
        return () => {
          clearTimeout(responseTimeout);
        };
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchData();
  }, [setData, setError, setLoading]);

  return (
    <div
      className="h-screen w-full max-lg:px-0 max-lg:overflow-x-hidden px-48"
      data-theme={theme}
    >
      {error ? (
        "Error message here"
      ) : (
        <div className="items-center align-middle max-lg:pt-1 pt-2">
          <Navbar />

          <h1 className="items-center max-lg:text-xl text-2xl align-middle flex justify-center pt-10">
            Currency exchange calculator
          </h1>
          <Form />
        </div>
      )}
    </div>
  );
}

export default App;
