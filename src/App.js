import logo from './logo.svg';
import './App.css';
import ProductList from "./pages/Products/ProductsList/ProductsList";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Aux from "./hoc/AuxWrapper"
import AllRoutes from "./routes";
import {ShoppingCartProvider} from './ShoppingCartContext';


function App() {

    return (
        <Aux>
            <ShoppingCartProvider>
                {<AllRoutes/>}
            </ShoppingCartProvider>
        </Aux>
    );
}

export default App;
