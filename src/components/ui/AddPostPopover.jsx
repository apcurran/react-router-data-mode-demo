import { useActionState, useRef } from "react";

async function createPostAction(prevState, formData) {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: JSON.stringify({
                title: formData.get("title"),
                body: formData.get("body"),
                userId: 1,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });

        if (!response.ok) {
            throw new Error("Server error on req.");
        }

        const data = await response.json();

        return {
            success: true,
            data,
            error: null,
        };
    } catch (err) {
        return {
            success: false,
            data: null,
            error: err.message,
        };
    }
}

function AddPostPopover() {
    const [state, formAction, isPending] = useActionState(createPostAction, {
        success: false,
        data: null,
        error: null,
    });
    const popoverRef = useRef(null);

    return (
        <div className="add-post-wrapper">
            {/* trigger popover */}
            <button popoverTarget="post-form-popover">Add New Post</button>
            {/* popover elem */}
            <div id="post-form-popover" popover="auto" ref={popoverRef} className="form-popover">
                <form action={formAction}>
                    <button type="button" onClick={() => popoverRef.current.hidePopover()}>
                        Cancel
                    </button>
                    <div className="status-feeback">
                        {state.success ? (
                            <p className="success-message">Success! ID: {state.data.id}</p>
                        ) : null}
                        {state.error ? <p className="error-message">Error: {state.error}</p> : null}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddPostPopover;
