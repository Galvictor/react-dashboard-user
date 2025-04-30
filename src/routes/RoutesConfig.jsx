import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import UsersList from '../pages/Users/UsersList';
import Profile from '../pages/Profile/Profile';
import DashboardHome from '../pages/Dashboard/DashboardHome';
import ProtectedRoute from './ProtectedRoute';

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
                path: 'profile',
                element: <Profile/>,
            },
        ],
    },
];