import { useCallback, useEffect, useState } from "react";
import Form from "./component/Form/Form";
import { useFormContext } from "./AppContextProvider";
import { data } from "./mockData";
import Navbar from "./component/Navbar/Navbar";
import Footer from "./component/Footer/Footer";
import Loading from "./component/Loading/Loading";

function App() {
  const { theme, setData, setError } = useFormContext();
  const [loading, setLoading] = useState(false);

  const fetchExchangeData = useCallback(() => {
    setLoading(true);
    const responseTimeout = setTimeout(() => {
      setData(data);
      setLoading(false);
    }, 500);
    return () => {
      clearTimeout(responseTimeout);
    };
  }, [setData]);

  useEffect(() => {
    fetchExchangeData();
  }, []);

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
