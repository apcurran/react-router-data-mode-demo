import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import "./index.css";
import App, { loader as appLoader } from "./App.jsx";
import About from "./pages/About.jsx";
import PostDetail, { deletePost, loader as postDetailLoader } from "./pages/PostDetail.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        loader: appLoader,
        Component: App,
    },
    {
        path: "/about",
        Component: About,
    },
    {
        path: "/posts/:id",
        loader: postDetailLoader,
        Component: PostDetail,
        action: deletePost,
    },
]);
const root = document.getElementById("root");

createRoot(root).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
