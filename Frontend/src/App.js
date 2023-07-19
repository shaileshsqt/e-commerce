import { Route, Routes } from "react-router-dom";
import Header from "./component/Main/Header";
import Cards from "./component/Cart/Card";
import CardsDetails from "./component/Cart/CardDetails";
import Login from "./component/Auth/Login";
import Register from "./component/Auth/Register";

function App() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route element={<Register />} path="/Signup" />
        <Route element={<Login />} path="/login" />
        <Route path="/Header" element={<Header />} />
        <Route path="/" element={<Cards />} />
        <Route path="/cart/:id" element={<CardsDetails />} />
      </Routes>
    </>
  );
}

export default App;
