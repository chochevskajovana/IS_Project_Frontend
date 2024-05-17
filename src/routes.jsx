import {Route, useLocation} from 'react-router-dom';
import {Routes} from 'react-router-dom';
import ProductList from "./pages/Products/ProductsList/ProductsList";
import Header from "./pages/Shared/Header/Header";
import Home from "./pages/Home/Home";
import Footer from "./pages/Shared/Footer/Footer";
import LoginPage from "./pages/Auth/Login/LoginPage";
import RegisterPage from "./pages/Auth/Register/RegisterPage";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";
import Orders from "./pages/Orders/Orders";
import Users from "./pages/Users/Users";
import ForbiddenPage from "./pages/ForbiddenPage/ForbiddenPage";
import ProtectedRoute from "./ProtectedRoute";

const AllRoutes = () => {

    const location = useLocation();

    const isLoginPage = location.pathname === '/login';
    const isRegisterPage = location.pathname === '/register';
    const isCartPage = location.pathname === '/cart';
    const isForbiddenPage = location.pathname === '/forbidden';

    return (
        <div className="h-100">
            <div className={"wrapper"}>
                {!isForbiddenPage && <Header/>}
                <div className={"main"}>
                    <Routes>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/products" element={<ProductList/>}/>
                        <Route element={<ProtectedRoute authorizedRoles={["User"]}/>}>
                            <Route exact path="/cart" element={<ShoppingCart/>}/>
                        </Route>
                        <Route element={<ProtectedRoute authorizedRoles={["Admin"]}/>}>
                            <Route exact path="/orders"  element={<Orders/>}/>
                        </Route>
                        <Route element={<ProtectedRoute authorizedRoles={["Admin"]}/>}>
                            <Route path="/users" element={<Users/>}/>
                        </Route>
                        <Route path="/forbidden" element={<ForbiddenPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/register" element={<RegisterPage/>}/>
                    </Routes>
                </div>
            </div>
            {!isForbiddenPage  && <Footer/>}
        </div>
    )
}

export default AllRoutes;