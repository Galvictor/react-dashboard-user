import React from 'react';
import {BrowserRouter, useRoutes} from 'react-router-dom';
import {appRoutes} from './routes/RoutesConfig';
import {UserProvider} from "./services/UserContext.jsx";

export default function App() {
    const Routing = () => useRoutes(appRoutes);

    return (
        <UserProvider>
            <BrowserRouter>
                <Routing/>
            </BrowserRouter>
        </UserProvider>
    );
}