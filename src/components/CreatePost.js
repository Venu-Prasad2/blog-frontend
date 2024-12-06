import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./CreatePost.css";

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Check for authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if no token found
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!title || !body) {
      setError('Both fields are required.');
      setIsLoading(false);
      return;
    }

    const res = await fetch('http://localhost:5000/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body }),
    });

    const data = await res.json();

    if (res.status === 201) {
      navigate('/'); // Redirect to home after successful post creation
    } else {
      setError(data.message || 'Failed to create post.');
      setIsLoading(false);
    }
  };

  return (
    <>
      
      <div className="create-post-container">
        <form className="create-post-form" onSubmit={handleSubmit}>
          <h2 className="create-post-title">Create a New Post</h2>
          <div className="input-group">
            <label className="input-label" htmlFor="title">Post Title:</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field"
              placeholder="Enter post title"
              aria-label="Post Title"
            />
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="body">Post Content:</label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="textarea-field"
              placeholder="Enter post content"
              aria-label="Post Content"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Create Post'}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
