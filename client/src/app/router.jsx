import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import { Login, Register } from "@/pages/Auth";
import Monster from "@/pages/Monster";
import Favorites from "@/pages/Favorites";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/auth/login", element: <Login /> },
  { path: "/auth/register", element: <Register /> },
  { path: "/monster/:id", element: <Monster /> },
  { path: "/favorites", element: <Favorites /> },
]);