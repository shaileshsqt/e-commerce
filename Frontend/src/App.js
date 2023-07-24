import { Route, Routes } from "react-router-dom";
import Header from "./component/Main/Header";
import Cards from "./component/Cart/Card";
import CardsDetails from "./component/Cart/ProductDetail";
import Login from "./component/Auth/Login";
import Register from "./component/Auth/Register";
import Checkout from "./component/Cart/Checkout";
import ProductDetail from "./component/Cart/ProductDetail";

function App() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route element={<Register />} path="/Signup" />
        <Route element={<Login />} path="/" />
        <Route path="/Header" element={<Header />} />
        <Route path="/Dashboard" element={<Cards />} />
        <Route path="/ProductDetail/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Checkout />} />
      </Routes>
    </>
  );
}

export default App;
