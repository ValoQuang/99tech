import { useEffect } from "react";
import Form from "./component/Form/Form";
import { useFormContext } from "./AppContextProvider";
import { data } from "./mockData";
import { validateCurrencyData } from "./utils/validateData";

function App() {
  const { setData, setError, error, loading, setLoading } = useFormContext();

  useEffect(() => {
    //const fetchData = async () => {
    //  try {
    //    const response = await fetch(
    //      "https://interview.switcheo.com/prices.json"
    //    );
    //    if (!response.ok) {
    //      throw new Error("Network response was not ok");
    //    }
    //    const data = await response.json();
    //    setData(data);
    //  } catch (error: any) {
    //    setError(error.message as any);
    //  }
    //};

    //mock the api backend call
    const fetchData = async () => {
      try {
        setLoading(true);
        const responseTimeout = setTimeout(() => {
          // Mock data for demonstration
          const validatedData = validateCurrencyData(data);
          setData(validatedData);
          setLoading(false); // Turn off loading state
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
  }, []);
  
  return (
    <>
      <div className="h-screen w-full max-lg:px-0 max-lg:overflow-x-hidden px-36" data-theme="retro">
        {error ? (
          "Error message here"
        ) : (
          <div className="items-center align-middle pt-10 max-lg:pt-0">
            <h1 className="items-center max-lg:text-xl text-3xl align-middle flex justify-center">
              Currency conversion calculator
            </h1>
            <Form />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
