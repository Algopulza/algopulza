import AppRouter from "components/Router";
import GlobalStyle from "theme/GlobalStyle";
import "./App.css";
import React from "react";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <AppRouter />
    </>
  );
};

export default App;
