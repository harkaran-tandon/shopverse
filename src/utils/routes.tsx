import { RouteObject } from 'react-router-dom';
import Home from '../features/Home';
import ProductDetail from '../features/ProductDetail';
import Cart from '../features/Cart';

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/product/:id',
        element: <ProductDetail/>
    },
    {
        path: '/cart',
        element: <Cart/>
    },
];

export default routes;
