import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import "./PostDetails.css";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  // Check for authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if no token found
    } else {
      const fetchPost = async () => {
        const res = await fetch(`http://localhost:5000/api/posts/${id}`);
        const data = await res.json();
        setPost(data);
      };
      fetchPost();
    }
  }, [id]);

  

  if (!post) return <p>Loading...</p>;

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="post-detail-container">
      <div className="post-detail">
        <button onClick={handleBackClick} className="back-button">
          <BiArrowBack className="back-icon" /> Back
        </button>
        <h1 className="post-title">{post.title}</h1>
        <p className="post-content">{post.body}</p>
      </div>
    </div>
  );
};

export default PostDetails;
