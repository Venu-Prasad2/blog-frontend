import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Rings } from 'react-loader-spinner';
import "./HomePage.css"

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to Login if no token is found
    } else {
      fetchPosts();
    }
  }, [navigate]);

  const fetchPosts = async () => {
    const res = await fetch('http://localhost:5000/api/posts');
    const data = await res.json();
    setPosts(data);
    setLoading(false);
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="company-name">Welcome to My Life in Posts</h1>
        <p className="company-tagline">"Where every post tells a story"</p>
      </header>
      <div className="title-container">
        <h1 className="post-title">All Posts</h1>
      </div>

      <div className='posts-section'>
        {loading ? (
          <Rings color="blue" height={100} width={100} />
        ) : (
          <div className='all-posts'>
            {posts.map(post => (
              <Link to={`/posts/${post.id}`} key={post.id} className="post-card">
                <h3 className="post-title">{post.title}</h3>
                <p className="post-content">{post.body.substring(0, 70)}    Read more...</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
