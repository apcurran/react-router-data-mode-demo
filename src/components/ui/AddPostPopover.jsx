import { useActionState, useRef } from "react";

async function createPostAction(prevState, formData) {}

function AddPostPopover() {
    const popoverRef = useRef(null);

    return (
        <div className="add-post-wrapper">
            <button popoverTarget="post-form-popover">Add New Post</button>
            {/* popover elem */}
            <div id="post-form-popover" popover="auto" ref={popoverRef} className="form-popover">
                <form action="">
                    <button type="button" onClick={() => popoverRef.current.hidePopover()}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddPostPopover;
