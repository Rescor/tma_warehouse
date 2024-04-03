import { createBrowserRouter, Navigate } from 'react-router-dom';
import RootPage from '../pages/RootPage';
import MainPage from '../pages/MainPage';
import ItemsList from '../components/Lists/ItemsList/ItemsList';
import ListsPage from '../pages/ListsPage';
import MyOrders from '../components/Lists/MyOrders/MyOrders';
import ItemsForOrder from '../components/Lists/ItemsForOrder/ItemsForOrder';
import MakeOrder from '../pages/MakeOrder';
import EditItem from '../pages/EditItem';
import DeleteItem from '../pages/DeleteItem';
import NewItem from '../pages/NewItem';
import Success from '../components/Success/Success';
import ManageRequest from '../pages/ManageRequest';
import RequestsPage from '../pages/RequestsPage';
import ErrorPage from '../pages/ErrorPage';
import SuccessReqUpdate from '../components/SuccessReqUpdate/SuccessReqUpdate';
import UsersPage from "../pages/UsersPage";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    errorElement: <Navigate to="/" />,
    children: [
      { index: true, element: <MainPage /> },
      { path: 'error', element: <ErrorPage /> },
      { path: 'lists', element: <ListsPage />, children: [
        { path: 'browse', element: <ItemsForOrder /> },
        { path: 'order/:id', element: <MakeOrder /> },
        { path: 'items', element: <ItemsList /> },
        { path: 'items/new', element: <NewItem /> },
        { path: 'items/success', element: <Success /> },
        { path: 'items/:id/edit', element: <EditItem /> },
        { path: 'items/:id/delete', element: <DeleteItem /> },
        { path: 'my_orders', element: <MyOrders /> },
        { path: 'requests', element: <RequestsPage /> },
        { path: 'users', element: <UsersPage /> },
          // I just didn't have enough time to create a common success component for each action. :(
        { path: 'requests/success', element: <SuccessReqUpdate /> },
        { path: 'requests/:id/change', element: <ManageRequest /> },
      ] },
    ],
  }
])
