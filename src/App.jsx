import { useLoaderData } from "react-router";

import "./App.css";
import PostList from "./components/ui/PostList";
import AddPostPopover from "./components/ui/AddPostPopover";

async function loader() {
    const API_URL = "https://jsonplaceholder.typicode.com/posts?_limit=10";
    const response = await fetch(API_URL);
    const data = await response.json();

    return data;
}

function App() {
    const posts = useLoaderData();

    return (
        <>
            <h1 className="page-title">Recent Posts</h1>
            <AddPostPopover />
            <PostList posts={posts} />
        </>
    );
}

export { loader };
export default App;
