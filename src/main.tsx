import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import './index.css';
import { docs_routes } from './docs';
import Swpu from './swpu';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Swpu,
  },
  ...docs_routes,
]);

console.table(router.routes);

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
