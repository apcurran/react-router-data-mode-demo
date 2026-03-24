import PostItem from "./PostItem";

function PostList({ posts }) {
    return (
        <ul className="post-list">
            {posts.map((post) => (
                <PostItem key={post.id} post={post} />
            ))}
        </ul>
    );
}

export default PostList;
