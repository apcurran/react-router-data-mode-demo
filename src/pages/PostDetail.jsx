import { useEffect, useRef } from "react";
import { useLoaderData, useActionData, Form, redirect } from "react-router";

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

    return await response.json();
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
    const loaderData = useLoaderData();
    const actionData = useActionData();
    const post = actionData || loaderData; // default to action first, then loader

    const popoverRef = useRef(null);

    useEffect(() => {
        if (actionData && popoverRef.current) {
            // close popup form after submitting an edit req
            popoverRef.current.hidePopover();
        }
    }, [actionData]);

    return (
        <>
            <h1 className="page-title">{post.title}</h1>
            <article>
                <p>{post.body}</p>
            </article>
            <div className="post-details-buttons-group">
                <button popoverTarget="edit-post-popover">Edit Post</button>
                <Form method="delete">
                    <button>Delete Post</button>
                </Form>
            </div>
            <div id="edit-post-popover" className="form-popover" popover="auto" ref={popoverRef}>
                <Form method="patch">
                    <h2>Edit Current Post</h2>
                    <div className="form-group">
                        <input name="title" type="text" defaultValue={post.title} required />
                    </div>
                    <div className="form-group">
                        <textarea name="body" defaultValue={post.body} required />
                    </div>
                    <div className="form-group">
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => popoverRef.current.hidePopover()}>
                            Cancel
                        </button>
                    </div>
                </Form>
            </div>
        </>
    );
}

export { loader, action };
export default PostDetail;
