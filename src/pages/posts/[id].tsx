import React from 'react';
import { useRouter } from 'next/router';
import PostModal from 'components/PostModal';
import Layout from 'components/Layout';
import dummy from '../../data/posts.json';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const numID = Number(id) - 1;
  const postData = dummy[numID];

  return (
    <Layout type="post" title="creddit: post">
      <div>
        {[postData].map((data) => (
          <PostModal
            key={data.id}
            postTitle={data.title}
            postContent={data.content}
            nickName={data.member}
            commentsCount={data.commentCount}
            likeCount={data.likeCount}
            date={data.createdDate}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Post;
