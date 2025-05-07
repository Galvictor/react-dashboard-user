import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import UsersList from '../pages/Users/UsersList';
import Profile from '../pages/Profile/Profile';
import DashboardHome from '../pages/Dashboard/DashboardHome';
import ProtectedRoute from './ProtectedRoute';
import ChatPage from "../pages/Chat/ChatPage";

export const appRoutes = [
    {
        path: '/',
        element: <Login/>,
    },
    {
        path: '/dashboard',
        element: (
            <ProtectedRoute roles={['admin', 'professor', 'aluno']}>
                <Dashboard/>
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <DashboardHome/>,
            },
            {
                path: 'usuarios',
                element: (
                    <ProtectedRoute roles={['admin', 'professor']}>
                        <UsersList/>
                    </ProtectedRoute>
                ),
            },
            {
                path: 'chat',
                element: <ChatPage/>,
            },
            {
                path: 'profile',
                element: <Profile/>,
            },
        ],
    },
];