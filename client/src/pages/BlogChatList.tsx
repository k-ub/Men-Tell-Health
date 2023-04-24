import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

interface BlogChat {
  _id: string;
  title: string;
}

interface RouteParams extends Record<string, string | undefined> {
  categoryId: string;
}

const BlogChatList: React.FC = () => {
  const [blogChats, setBlogChats] = useState<BlogChat[]>([]);
  const { categoryId } = useParams<RouteParams>();

  useEffect(() => {
    const fetchBlogChats = async () => {
      const response = await axios.get<BlogChat[]>(`/api/categories/${categoryId}/blogChats`);
      setBlogChats(response.data);
    };
    fetchBlogChats();
  }, [categoryId]);

  return (
    <div>
      <h2>Blog Chats</h2>
      <ul>
        {blogChats.map((blogChat) => (
          <li key={blogChat._id}>
            <Link to={`/blogChat/${blogChat._id}`}>{blogChat.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogChatList;
