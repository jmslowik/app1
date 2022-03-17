import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import ComponentApp2 from "app2/ComponentApp2";
import ErrorBoundary from "./ErrorBoundary";
const ComponentApp3 = React.lazy(() => import('app3/ComponentApp3'));


const App = () => (
  <div className="container">
    <div>App1</div>
    <ErrorBoundary>
      <ComponentApp2 prop1="propFromApp1"/>
    </ErrorBoundary>
    <ErrorBoundary>
      <React.Suspense fallback="loading...">
        <ComponentApp3 prop1="propFromApp1"/>
      </React.Suspense>
    </ErrorBoundary>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
