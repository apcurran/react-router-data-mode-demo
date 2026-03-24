import { Link } from "react-router";

function PostItem({ post }) {
    return (
        <li className="post-item">
            <article>
                <Link to={`/posts/${post.id}`}>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                </Link>
            </article>
        </li>
    );
}

export default PostItem;
