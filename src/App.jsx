import { useLoaderData } from "react-router";

import "./App.css";
import PostList from "./components/ui/PostList";
import AddPostPopover from "./components/ui/AddPostPopover";
import Nav from "./components/ui/Nav";

async function loader({ params }) {
    const API_URL = "https://jsonplaceholder.typicode.com/posts?_limit=10";
    const response = await fetch(API_URL);
    const data = await response.json();

    return data;
}

function App() {
    const posts = useLoaderData();

    return (
        <div className="wrapper-site">
            <Nav />
            <main>
                <h1 className="page-title">Recent Posts</h1>
                <AddPostPopover />
                <PostList posts={posts} />
            </main>
        </div>
    );
}

export { loader };
export default App;
