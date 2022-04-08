import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ErrorBoundary from "./ErrorHandler/ErrorBoundary";
import Loading from "./Media/Loading.gif";
import Header from "./Components/Header/Header";
import Login from "./Components/Login/Login";
const Registration = React.lazy(() =>
  import("./Components/Registration/Registration")
);
function App() {
  return (
    <div className="App">
      <ErrorBoundary>
      <Suspense
        fallback={
          <div>
            <img className="loading" src={Loading} alt="Loading..." />
          </div>
        }
      >
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </BrowserRouter>
      </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
