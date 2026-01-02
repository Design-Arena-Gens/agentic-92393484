'use client';

import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [usernames, setUsernames] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateUsernames = (inputName) => {
    if (!inputName.trim()) return [];

    const cleanName = inputName.trim().toLowerCase().replace(/\s+/g, '');
    const nameParts = inputName.trim().split(/\s+/);
    const firstName = nameParts[0]?.toLowerCase() || '';
    const lastName = nameParts[nameParts.length - 1]?.toLowerCase() || '';

    const suggestions = [
      cleanName,
      `${cleanName}_official`,
      `the_${cleanName}`,
      `${cleanName}.real`,
      `${cleanName}hq`,
      `${cleanName}_`,
      `_${cleanName}_`,
      `${cleanName}__`,
      `i_am_${cleanName}`,
      `its_${cleanName}`,
      `${cleanName}_tech`,
      `${cleanName}_dev`,
      `${cleanName}_design`,
      `${cleanName}_art`,
      `${cleanName}_creative`,
      `${cleanName}${Math.floor(Math.random() * 999)}`,
      `${cleanName}${new Date().getFullYear()}`,
      `${cleanName}pro`,
      `${cleanName}_pro`,
      `${cleanName}x`,
    ];

    if (firstName && lastName && firstName !== lastName) {
      suggestions.push(
        `${firstName}.${lastName}`,
        `${firstName}_${lastName}`,
        `${firstName}${lastName}`,
        `${lastName}.${firstName}`,
        `${firstName}${lastName[0]}`,
        `${firstName[0]}${lastName}`
      );
    }

    return [...new Set(suggestions)].slice(0, 20);
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    setTimeout(() => {
      const suggestions = generateUsernames(name);
      setUsernames(suggestions);
      setLoading(false);
    }, 500);
  };

  const copyToClipboard = (username) => {
    navigator.clipboard.writeText(username);
    alert(`Copied "${username}" to clipboard!`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🎯 Social Media Username Generator</h1>
        <p style={styles.subtitle}>Enter your name and get creative username suggestions</p>

        <form onSubmit={handleGenerate} style={styles.form}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name..."
            style={styles.input}
            autoFocus
          />
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Generating...' : 'Generate Usernames'}
          </button>
        </form>

        {usernames.length > 0 && (
          <div style={styles.results}>
            <h2 style={styles.resultsTitle}>Available Username Suggestions:</h2>
            <div style={styles.grid}>
              {usernames.map((username, index) => (
                <div
                  key={index}
                  style={styles.usernameCard}
                  onClick={() => copyToClipboard(username)}
                >
                  <span style={styles.username}>@{username}</span>
                  <span style={styles.copyHint}>Click to copy</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  card: {
    background: 'white',
    borderRadius: '20px',
    padding: '40px',
    maxWidth: '800px',
    width: '100%',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  },
  title: {
    fontSize: '2.5rem',
    margin: '0 0 10px 0',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#666',
    textAlign: 'center',
    marginBottom: '30px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '30px',
  },
  input: {
    padding: '15px 20px',
    fontSize: '1.1rem',
    border: '2px solid #e0e0e0',
    borderRadius: '10px',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  button: {
    padding: '15px 30px',
    fontSize: '1.1rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'transform 0.2s, opacity 0.2s',
  },
  results: {
    marginTop: '20px',
  },
  resultsTitle: {
    fontSize: '1.5rem',
    color: '#333',
    marginBottom: '20px',
    textAlign: 'center',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '15px',
  },
  usernameCard: {
    background: '#f8f9fa',
    padding: '15px',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    border: '2px solid transparent',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '5px',
  },
  username: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#667eea',
  },
  copyHint: {
    fontSize: '0.75rem',
    color: '#999',
  },
};
