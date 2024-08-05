import React, { useEffect, useState } from 'react';
import { fetchLatestContent, fetchUserLatestContent } from './client';
import './index.css';
import { Link } from 'react-router-dom';

const Homepage: React.FC = () => {
  const [content, setContent] = useState<any>(null);
  const [genericContent, setGenericContent] = useState<any>(null);
  const [user, setUser] = useState<any>(null); // Initial state is null

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          console.log("Fetching user content...");
          const userContent = await fetchUserLatestContent(user.id);
          console.log("User content fetched:", userContent);
          setContent(userContent);
        } else {
          console.log("Fetching latest content...");
          const latestContent = await fetchLatestContent();
          console.log("Latest content fetched:", latestContent);
          setGenericContent(latestContent);
        }
      } catch (error) {
        console.error("Error fetching content", error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="homepage">
      <header>
        <div>
          <h1>Welcome to Socials</h1>
          <p>Your go-to platform for social connections and latest updates.</p>
        </div>
        <Link to="/profile" className="profile-button">Go to Your Profile</Link>
      </header>
      <section className="latest-updates">
        <h2>Latest Updates</h2>
        {user ? (
          <div>
            {content ? (
              <div>
                {content.map((post: any) => (
                  <div key={post._id}>
                    <h3>{post.title}</h3>
                    <p>{post.snippet}</p>
                    <a href={`/post/${post._id}`}>Read more</a>
                  </div>
                ))}
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        ) : (
          <div>
            {genericContent ? (
              <div>
                {genericContent.map((post: any) => (
                  <div key={post._id}>
                    <h3>{post.title}</h3>
                    <p>{post.snippet}</p>
                    <a href={`/post/${post._id}`}>Read more</a>
                  </div>
                ))}
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        )}
      </section>
      <footer className="footer">
        <a href="/team">Team Information</a>
        <p>
          1] Sree Nikitha Reddy Doddareddy<br />
          2] Karan Goyal<br />
          <br />
          <a href="https://github.com/your-username/socials-react-app">Link to GitHub repository to React.js project</a>
          <br /><br />
          <a href="https://github.com/your-username/socials-node-app">Link to GitHub repository to Node.js project</a>
        </p>
      </footer>
    </div>
  );
};

export default Homepage;
