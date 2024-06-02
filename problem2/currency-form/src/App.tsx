import { useEffect } from "react";
import Form from "./component/Form/Form";
import { useFormContext } from "./AppContextProvider";
import { data } from "./mockData";
import { validateCurrencyData } from "./utils/validateData";
import Navbar from "./component/Navbar/Navbar";
import Footer from "./component/Footer/Footer";
import Loading from "./component/Loading/Loading";

function App() {
  const { loading, theme, setData, setError, setLoading } = useFormContext();
  useEffect(() => {
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
  }, [setData, setError]);

  return (
    <div
      className="h-screen w-full max-lg:px-0 max-lg:overflow-x-hidden px-48 flex flex-col justify-between"
      data-theme={theme}
    >
      <div className="items-center align-middle pt-1">
        <Navbar />
        {loading ? <Loading /> : <Form />}
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
