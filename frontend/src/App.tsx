import AppRouter from "components/Router";
import GlobalStyle from "theme/GlobalStyle";
import "./App.css";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <AppRouter />
    </>
  );
};

export default App;