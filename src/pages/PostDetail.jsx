import { useLoaderData } from "react-router";

async function loader({ params }) {
    const { id } = params;
    const API_URL = `https://jsonplaceholder.typicode.com/posts/${id}`;
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Data fetching failed.");
    }

    const data = await response.json();

    return data;
}

function PostDetail() {
    const post = useLoaderData();
    console.log(post);

    return <div>My POst</div>;
}

export { loader };
export default PostDetail;
