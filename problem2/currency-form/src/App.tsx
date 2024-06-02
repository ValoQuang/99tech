import { useEffect } from "react";
import Form from "./component/Form/Form";
import { useFormContext } from "./AppContextProvider";
import { data } from "./mockData";
import Navbar from "./component/Navbar/Navbar";
import Footer from "./component/Footer/Footer";
import Loading from "./component/Loading/Loading";

function App() {
  const { loading, theme, setData, setError, setLoading } = useFormContext();
  useEffect(() => {
    //mock the api call with fetching time to display loading spinner
    setLoading(true);
    const responseTimeout = setTimeout(() => {
      setData(data);
      setLoading(false);
    }, 500);
    return () => {
      clearTimeout(responseTimeout);
    };
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
