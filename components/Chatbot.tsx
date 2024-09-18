'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import '../app/page';

const Chatbot = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ given_name: string } | null>(null); // To store user data

  // Fetch user session data from the API
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axios.get('/api/session'); // Call the API route
        if (response.data.authenticated) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error('Error fetching session:', error);
      }
    };

    fetchSession();
  }, []);

  const handleSearch = async (query: string) => {
    try {
      const response = await axios.post('/api/search', { query });
      return response.data.results;
    } catch (error) {
      console.error('Error searching:', error);
      return [];
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    let botMessageContent = '';

    if (input.toLowerCase().includes('find') || input.toLowerCase().includes('search')) {
      const searchQuery = input.replace(/find|search/gi, '').trim();
      const results = await handleSearch(searchQuery);

      if (results.length > 0) {
        botMessageContent = `I found the following results for "${searchQuery}":<br>${results
          .map((r: any) => `${r.type}: <a href="http://localhost:3000${r.link}" target="_blank">${r.title}</a>`)
          .join('<br>')}`;  // Format as HTML with clickable links
      } else {
        botMessageContent = `Sorry, I couldn't find anything for "${searchQuery}".`;
      }
    } else {
      const response = await axios.post('/api/chat', { message: input });
      botMessageContent = response.data.message;
    }

    const botMessage = { role: 'bot', content: botMessageContent };
    setMessages((prevMessages) => [...prevMessages, botMessage]);

    setInput('');
  };
  return (
    <div className={`chatbot ${isOpen ? 'open' : 'closed'}`}>
      <div className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        <span>{isOpen ? '✖' : '💬'}</span>
      </div>
      {isOpen && (
        <div className="chatbot-container">
          {user ? <h3>Welcome, {user?.given_name}</h3> : <h3>Not authenticated</h3>}
          <div className="chat-window">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.role}`}>
                <strong>{msg.role === 'user' ? 'You' : 'Bot'}:</strong>
                <div dangerouslySetInnerHTML={{ __html: msg.content }} />
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
