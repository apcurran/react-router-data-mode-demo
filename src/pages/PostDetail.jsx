import { useLoaderData, Form, redirect } from "react-router";

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

async function deletePost(params) {
    const { id } = params;

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Error deleting post!");
        }

        return redirect("/"); // go home after successful deletion of post
    } catch (err) {
        console.error("Post deletion error:", err);

        throw err;
    }
}

function PostDetail() {
    const post = useLoaderData();

    return (
        <>
            <h1 className="page-title">{post.title}</h1>
            <article>
                <p>{post.body}</p>
            </article>
            <Form method="delete">
                <button>Delete Post</button>
            </Form>
        </>
    );
}

export { loader, deletePost };
export default PostDetail;
