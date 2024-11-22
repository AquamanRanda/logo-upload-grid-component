import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Route,
  Router,
  RouterProvider,
  Routes,
} from "react-router-dom";
import App from "./App.tsx";
import Viewer from "./pages/Viewer.tsx";
import "./index.css";

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//   },
//   {
//     path: '/viewer',
//     element: <Viewer />,
//   },
// ]);

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  //   <RouterProvider router={router} />
  // </StrictMode>
  <StrictMode>
    <App />
  </StrictMode>
);
