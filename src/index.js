import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import { UserProvider } from "./Components/context/UserContext";
import { Helmet } from "react-helmet";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Helmet>
      <title>Kings Down Bonus Incentive</title>
    </Helmet>
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          {/* <UserProvider> */}
          <App />
          {/* </UserProvider> */}
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
