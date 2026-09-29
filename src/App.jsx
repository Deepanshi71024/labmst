import { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [post, setPost] = useState("");
  const [createdPost, setCreatedPost] = useState("");
  const [error, setError] = useState("");

  const accounts = {
    admin: {
      password: "admin123",
      role: "Admin",
    },
    viewer: {
      password: "viewer123",
      role: "Viewer",
    },
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (username.trim() === "" || password.trim() === "") {
      setError("Enter your username and password to continue.");
      return;
    }

    const account = accounts[username];

    if (!account || account.password !== password) {
      setError("That username and password don't match.");
      return;
    }

    setUser({
      username: username,
      role: account.role,
    });

    setUsername("");
    setPassword("");
    setError("");
  };

  const handleCreatePost = () => {
    if (post.trim() === "") {
      setError("Write a post before publishing.");
      return;
    }

    setCreatedPost(post);
    setPost("");
    setError("");
  };

  const handleDeletePost = () => {
    setCreatedPost("");
  };

  const handleLogout = () => {
    setUser(null);
    setPost("");
    setError("");
  };

  return (
    <main className={user ? "app-shell is-dashboard" : "app-shell"}>
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Rolebase home">
          <span className="brand-mark" aria-hidden="true">r.</span>
          <span>rolebase</span>
        </a>
        <span className="topbar-note">A quieter way to work together</span>
        <span className="secure-label"><span /> Secure workspace</span>
      </header>

      {!user ? (
        <section className="auth-layout" id="home">
          <aside className="intro-panel">
            <div className="intro-copy">
              <span className="eyebrow"><span className="eyebrow-line" /> YOUR SPACE, IN SYNC</span>
              <h1>Good work<br />starts <em>here.</em></h1>
              <p>A considered space for teams to share updates and stay in the loop.</p>
            </div>
            <div className="orbit-art" aria-hidden="true">
              <div className="orbit orbit-outer" />
              <div className="orbit orbit-inner" />
              <div className="orbit-core"><span>r.</span></div>
              <span className="orbit-dot dot-one" />
              <span className="orbit-dot dot-two" />
            </div>
            <div className="panel-caption">
              <span>01 / 02</span>
              <span>Thoughtful by design</span>
            </div>
          </aside>

          <section className="form-panel" aria-labelledby="login-title">
            <div className="form-content">
              <span className="form-kicker">WELCOME BACK</span>
              <h2 id="login-title">Sign in to your<br />workspace<span>.</span></h2>
              <p className="form-subtitle">Pick up right where your team left off.</p>

              <form className="login-form" onSubmit={handleLogin} noValidate>
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="e.g. admin"
                  value={username}
                  onChange={(event) => {
                    setUsername(event.target.value);
                    setError("");
                  }}
                />

                <div className="label-row">
                  <label htmlFor="password">Password</label>
                  <span>Keep it private</span>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError("");
                  }}
                />

                {error && <p className="form-error" role="alert">{error}</p>}
                <button className="primary-button" type="submit">
                  <span>Sign in</span><span className="button-arrow" aria-hidden="true">↗</span>
                </button>
              </form>

              <div className="access-note">
                <span className="access-icon" aria-hidden="true">i</span>
                <p><strong>Demo access</strong><br />Use <b>admin</b> / <b>admin123</b> or <b>viewer</b> / <b>viewer123</b></p>
              </div>
            </div>
            <footer className="form-footer"><span>© 2026 rolebase</span><span>Made for better work.</span></footer>
          </section>
        </section>
      ) : (
        <section className="dashboard-layout" id="home">
          <aside className="dashboard-rail">
            <span className="eyebrow"><span className="eyebrow-line" /> WORKSPACE</span>
            <h1>Your team,<br /><em>in the loop.</em></h1>
            <p>Updates and ideas, all in one place.</p>
            <div className="rail-bottom"><span className="status-dot" /> Workspace active</div>
          </aside>

          <div className="dashboard-main">
            <div className="dashboard-heading">
              <div>
                <span className="form-kicker">YOUR DASHBOARD</span>
                <h2>Welcome, {user.username}<span>.</span></h2>
                <p>Here’s what’s happening with your team.</p>
              </div>
              <div className="profile-chip"><span className="avatar">{user.username.slice(0, 1).toUpperCase()}</span><span><strong>{user.username}</strong><small>{user.role}</small></span></div>
            </div>

            <div className="dashboard-content">
              <section className="post-section">
                <div className="section-heading"><div><span className="form-kicker">TEAM FEED</span><h3>Latest updates</h3></div><span className="feed-count">{createdPost ? "01" : "00"} POSTS</span></div>
            {createdPost ? (
                  <article className="post">
                    <div className="post-meta"><span className="avatar post-avatar">{user.username.slice(0, 1).toUpperCase()}</span><span><strong>{user.username}</strong><small>Just now · {user.role}</small></span>
                {user.role === "Admin" && (
                      <button className="text-button" onClick={handleDeletePost}>Delete post</button>
                )}
                    </div>
                    <p className="post-body">{createdPost}</p>
                  </article>
            ) : (
                  <div className="empty-feed"><span className="empty-mark" aria-hidden="true">✳</span><h4>A little room to begin.</h4><p>Team updates will show up here when they’re shared.</p></div>
            )}
              </section>

          {user.role === "Admin" ? (
              <section className="admin-section">
                <span className="form-kicker">SHARE WITH YOUR TEAM</span>
                <h3>Create an update</h3>
              <textarea
                    aria-label="Write an update"
                    placeholder="What would you like everyone to know?"
                value={post}
                    onChange={(event) => {
                      setPost(event.target.value);
                      setError("");
                    }}
              />
                {error && <p className="form-error" role="alert">{error}</p>}
                <button className="primary-button publish-button" onClick={handleCreatePost}><span>Publish update</span><span className="button-arrow" aria-hidden="true">↗</span></button>
              </section>
          ) : (
              <p className="readonly-note"><span className="access-icon" aria-hidden="true">i</span> You have viewer access. Posts are read-only.</p>
          )}
            </div>
            <button className="logout-button" onClick={handleLogout}>Sign out <span aria-hidden="true">↗</span></button>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;