import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import HomePage from "../../../features/activities/home/HomePage";
import ActivityDashboard from "../../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../../features/activities/form/ActivityForm";
import ActivityDetailPage from "../../../features/activities/details/ActivityDetailPage";
// import Counter from "../../../features/counter/counter";
// import TestErrors from "../../../features/errors/TestErrors";
import NotFound from "../../../features/errors/NotFound";
import ServerError from "../../../features/errors/ServerError";
import RegisterPage from "../../../features/authentication/page/RegisterPage";
import LoginPage from "../../../features/authentication/page/LoginPage";
import RequireAuth from '../../../lib/hooks/RequireAuth';

export const router = createBrowserRouter([
    {
        path:'/',
        element: <App/>,
        children: [
            {element: <RequireAuth />, children:[
            { path:'activities', element: <ActivityDashboard />},
            { path:'activities/:id', element: <ActivityDetailPage />},
            { path:'createActivity', element: <ActivityForm key='create'/>},
            { path:'manage/:id', element: <ActivityForm />},

            ]},
            { path:'', element: <HomePage />},
           
            { path:'not-found', element: <NotFound />},
            { path:'server-error', element: <ServerError />},
            { path:'*', element: <Navigate replace to='/not-found' />},
            { path:'loginPage', element: <LoginPage />},
            { path:'registerPage', element: <RegisterPage />},

        ]
    }
])