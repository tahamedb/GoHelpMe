import HomePage from "./routes/homePage/homePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./routes/register/register";
import Login from "./routes/login/login";
import ListPage from "./routes/listPage/listPage";
import Layout from "./routes/layout/layout";
import SinglePage from "./routes/singlePage/singlePage";
import ProfilePage from "./routes/profilePage/profilePage";
import NewPostPage from "./routes/newPostPage/newPostPage";
import { singlePageLoader } from "./lib/loaders";
import { listPageLoader } from "./lib/loaders";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      children: [
        {
          path: "/",
          element: <HomePage></HomePage>,
        },
        {
          path: "/list",
          element: <ListPage></ListPage>,
          loader: listPageLoader,
        },
        {
          path: "/:id",
          element: <SinglePage></SinglePage>,
          loader: singlePageLoader,
        },
        {
          // path to the user profile
          path: "/profile",
          element: <ProfilePage></ProfilePage>,
        },
        {
          // path to the user profile
          path: "/register",
          element: <Register></Register>,
        },
        {
          // path to the user profile
          path: "/login",
          element: <Login></Login>,
        },
        {
          path: "/add",
          element: <NewPostPage></NewPostPage>,
        },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
