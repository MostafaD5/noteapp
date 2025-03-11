import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login/Login";
import Layout from "./Components/Layout/Layout";
import Signup from "./Pages/Signup/Signup";
import Home from "./Pages/Home/Home";
import ProtectRoute from "./Components/protectedRoute/ProtectRoute";
import UserProvider from "./Context/UserrContext";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "home",
        element: (
          <ProtectRoute>
            <Home />
          </ProtectRoute>
        ),
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);
function App() {
  return (
    <>
      <UserProvider>
        <RouterProvider router={router}></RouterProvider>
      </UserProvider>
    </>
  );
}

export default App;
