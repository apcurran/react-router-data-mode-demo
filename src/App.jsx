import { useLoaderData } from "react-router";

import "./App.css";
import PostList from "./components/ui/PostList";

async function loader({ params }) {
    const API_URL = "https://jsonplaceholder.typicode.com/posts?_limit=10";
    const response = await fetch(API_URL);
    const data = await response.json();

    return data;
}

function App() {
    const posts = useLoaderData();

    return (
        <main>
            <h1>Recent Posts</h1>
            <PostList posts={posts} />
        </main>
    );
}

export { loader };
export default App;
