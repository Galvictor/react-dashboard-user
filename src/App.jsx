import React from 'react';
import {BrowserRouter, useRoutes} from 'react-router-dom';
import {appRoutes} from './routes/RoutesConfig';

export default function App() {
    const Routing = () => useRoutes(appRoutes);

    return (
        <BrowserRouter>
            <Routing/>
        </BrowserRouter>
    );
}