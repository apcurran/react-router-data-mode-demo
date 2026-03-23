import { useLoaderData } from "react-router";

import "./App.css";

async function loader({ params }) {
    const API_URL = "https://jsonplaceholder.typicode.com/posts?_limit=10";
    const response = await fetch(API_URL);
    const data = await response.json();

    return data;
}

function App() {
    const posts = useLoaderData();
    console.log(posts);

    return (
        <>
            <div>Hello World</div>
        </>
    );
}

export { loader };
export default App;
