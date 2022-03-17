import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import ComponentApp2 from "app2/ComponentApp2";
import ErrorBoundary from "./ErrorBoundary";
import { MyContextProvider } from "app1/MyContext";
const ComponentApp3 = React.lazy(() => import('app3/ComponentApp3'));


const App = () => (
  <div className="container">
    <div>App1</div>
    <MyContextProvider value={{contextSource: 'App1.'}}>
      <ErrorBoundary>
        <ComponentApp2 prop1="propFromApp1"/>
      </ErrorBoundary>
      <ErrorBoundary>
        <React.Suspense fallback="loading...">
          <ComponentApp3 prop1="propFromApp1"/>
        </React.Suspense>
      </ErrorBoundary>
    </MyContextProvider>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
