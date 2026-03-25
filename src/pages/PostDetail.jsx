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

    return (
        <main>
            <h1 className="page-title">{post.title}</h1>
            <article>
                <p>{post.body}</p>
            </article>
        </main>
    );
}

export { loader };
export default PostDetail;
