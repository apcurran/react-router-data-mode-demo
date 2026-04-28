import { useRef } from "react";
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

async function action({ request, params }) {
    if (request.method === "DELETE") {
        return deletePost(params);
    } else if (request.method === "PATCH") {
        const formData = await request.formData();

        return editPost(params, formData);
    }
}

async function editPost(params, formData) {
    const { id } = params;
    const title = formData.get("title");
    const body = formData.get("body");

    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
            title,
            body,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    });

    if (!response.ok) {
        throw new Error("Editing post failed.");
    }

    return redirect(`/posts/${id}`);
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
    const popoverRef = useRef(null);

    return (
        <>
            <h1 className="page-title">{post.title}</h1>
            <article>
                <p>{post.body}</p>
            </article>
            <button popoverTarget="edit-post-popover">Edit Post</button>
            <div id="edit-post-popover" className="form-popover" popover="auto" ref={popoverRef}>
                <Form method="patch">
                    <h2>Edit Current Post</h2>
                    <button>Apply Edit</button>
                </Form>
            </div>
            <Form method="delete">
                <button>Delete Post</button>
            </Form>
        </>
    );
}

export { loader, action };
export default PostDetail;
