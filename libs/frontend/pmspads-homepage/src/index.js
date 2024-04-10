import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './Navigation/RootLayout';
import ErrorPage from './Pages/Error/ErrorPage';
import AboutPage from './Pages/AboutPage';
import ContactPage from './Pages/ContactPage';

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
      {
        path: '/contact',
        element: <ContactPage />,
      }
    ],
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={browserRouter}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);

reportWebVitals();
