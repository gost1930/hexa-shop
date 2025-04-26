import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// pages
import { Home, ProDetails, Store, UserLayout, Login, Checkout, CategoryPro } from "./pages";
import { ErrorPage } from "./containers";
import Layout from "./admin/layout";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import {
  AdminHome,
  AdminProducts,
  AdminCategory,
  AdminOrders,
} from "./admin/pages";
import { ThemeProvider } from "./context/ThemeProvider";
import PrivateRoute from "./context/PrivateRoute";
const App = () => {
  return (
    <Router>
      <ToastContainer />
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/product/:id" element={<ProDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/category/:catName" element={<CategoryPro />} />
            <Route path="*" element={<ErrorPage text="Page Not Found :(" />} />
          </Route>

          <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<Layout />}>
            <Route index element={<AdminHome />} /> {/* Default child route */}
            <Route path="products" element={<AdminProducts />} />
            <Route path="categories" element={<AdminCategory />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="user" element={<h1>asd </h1>} />
            <Route path="*" element={<ErrorPage text="Page Not Found :(" />} />
          </Route>
          </Route>
        </Routes>
      </ThemeProvider>
    </Router>
  );
};

export default App;
