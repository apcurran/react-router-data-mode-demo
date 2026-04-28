import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import "./index.css";
import Layout from "./components/layout/Layout.jsx";
import App, { loader as appLoader } from "./App.jsx";
import About from "./pages/About.jsx";
import PostDetail, {
    action as postDetailAction,
    loader as postDetailLoader,
} from "./pages/PostDetail.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
        children: [
            {
                path: "/",
                Component: App,
                loader: appLoader,
            },
            {
                path: "/about",
                Component: About,
            },
            {
                path: "/posts/:id",
                Component: PostDetail,
                loader: postDetailLoader,
                action: postDetailAction,
            },
        ],
    },
]);
const root = document.getElementById("root");

createRoot(root).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
