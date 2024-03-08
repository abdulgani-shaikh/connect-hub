import PostSkeleton from 'components/skeletons/PostSkeleton';
import { useState, useEffect, useRef } from 'react';
import { postService } from 'service';
import Post from 'components/shared/Post';
import NoData from 'components/shared/NoData';
import useErrorBehavior from 'hooks/useErrorBehavior';
import { useIsVisible } from 'hooks/useIsVisible';

const UserPosts = ({ user = {} }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const endOfUserPosts = useRef(null);
  const isVisible = useIsVisible(endOfUserPosts);

  const defaultErrorBehavior = useErrorBehavior();

  const fetchPosts = async () => {
    if (!user.userId) return;
    setLoading(true);
    try {
      const res = await postService.getPostsOfUser(user.userId, page);
      if (res.data.size > 0) {
        setPosts([...posts, ...res.data.content]);
        setPage(page + 1);
      }
    } catch (error) {
      defaultErrorBehavior(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [user]);

  useEffect(() => {
    if (isVisible) {
      fetchPosts();
    }
  }, [isVisible]);
  return (
    <>
      {posts.map((post) => (
        <Post {...post} {...user} key={post.postId} />
      ))}
      <div ref={endOfUserPosts}></div>
      {!loading && posts.length === 0 && (
        <div className="bg-white rounded-3xl h-full w-full p-5">
          <NoData message={`${user.username} haven't posted anything`} />
        </div>
      )}
      {loading &&
        Array(2)
          .fill(1)
          .map((_, i) => <PostSkeleton key={i} />)}
    </>
  );
};

export default UserPosts;