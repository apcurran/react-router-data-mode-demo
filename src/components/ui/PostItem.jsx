function PostItem({ post }) {
    return (
        <li className="post-item">
            <article>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
            </article>
        </li>
    );
}

export default PostItem;
