import React, { lazy, Suspense } from 'react'
import {BrowserRouter, Routes,Route } from 'react-router-dom'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import { Toaster, toast } from "sonner";
import { PersistGate } from "redux-persist/integration/react";
import { appStore, persist } from "./Redux/Store";
import { Provider } from "react-redux";
import PrivetRoute from './PrivetRoute';
import AuthPrivetRoute from './AuthPrivetRoute';
import Spinner from './Components/Spinner';


const Dashboard = lazy(()=> import('./Pages/Dashboard'))
const App = () => {

  return (
    <Provider store={appStore}>
    <PersistGate loading={null} persistor={persist}>
    <BrowserRouter>
     <Toaster richColors position="top-center" />

      <Routes>
        <Route path='/' element={<AuthPrivetRoute><Signin /></AuthPrivetRoute>} />
        <Route path='Signup/' element={<AuthPrivetRoute><Signup /></AuthPrivetRoute>} />
        <Route path='Dashboard/' element={<PrivetRoute><Suspense fallback={<Spinner />}><Dashboard /></Suspense></PrivetRoute>} />

      </Routes>
    </BrowserRouter>
    </PersistGate>
    </Provider>
    )
}

export default App