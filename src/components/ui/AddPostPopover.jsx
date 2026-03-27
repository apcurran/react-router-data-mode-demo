import { useActionState, useRef } from "react";

function AddPostPopover() {
    return (
        <div className="add-post-wrapper">
            <button popoverTarget="post-form-popover"></button>
            {/* popover elem */}
            <div id="post-form-popover" popover="auto" ref={popoverRef} className="form-popover">
                <form action=""></form>
            </div>
        </div>
    );
}

export default AddPostPopover;
