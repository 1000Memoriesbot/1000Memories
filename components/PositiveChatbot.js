import React, { useState, useEffect } from "react";
import axios from "axios";
import debounce from "lodash/debounce";

const cache = new Map();

const getResponse = async (input) => {
  const query = encodeURIComponent(input);
  if (cache.has(query)) return cache.get(query);
  
  try {
    const response = await axios.get(`https://api.duckduckgo.com/?q=${query}&format=json`);
    const relatedTopics = response.data.RelatedTopics;
    let quote = relatedTopics.length > 0 ? relatedTopics[0].Text : null;
    
    const friendlyResponses = [
      `I hear you. That’s a tough one. But this quote always helps me: "${quote || "Even silence carries wisdom. Keep searching."}"`,
      `Man, I know that feeling. Here’s something that keeps me going: "${quote || "The journey is long, but every step matters."}"`,
      `I totally get it. This quote always makes me feel better: "${quote || "Wisdom doesn’t come easy, but it’s worth the wait."}"`,
      `That’s real. I’ve been there. But this always puts things into perspective for me: "${quote || "Sometimes the darkest nights produce the brightest stars."}"`
    ];
    
    const responseText = friendlyResponses[Math.floor(Math.random() * friendlyResponses.length)];
    cache.set(query, responseText);
    return responseText;
  } catch (error) {
    return "Even the greatest minds face moments of uncertainty. Keep searching.";
  }
};

export default function PositiveChatbot() {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const userMessage = { sender: "user", text: input };
    const botResponse = { sender: "bot", text: await getResponse(input) };
    
    setChatHistory((prev) => [...prev, userMessage, botResponse]);
    setInput("");
    setLoading(false);
  };

  useEffect(() => {
    const chatContainer = document.getElementById("chatbox");
    if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [chatHistory]);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg font-serif">
      <h2 className="text-2xl font-bold mb-4 text-center">Seek Wisdom</h2>
      <div id="chatbox" className="h-60 overflow-y-auto border rounded p-3 mb-3 text-lg leading-relaxed">
        {chatHistory.map((msg, index) => (
          <div key={index} className={`mb-4 ${msg.sender === "user" ? "text-right text-gray-600" : "text-left text-black italic"}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <input
        className="border rounded p-2 w-full text-lg"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask me something deep..."
        disabled={loading}
      />
      <button className="bg-black text-white px-4 py-2 mt-2 w-full" onClick={handleSend} disabled={loading}>
        {loading ? "Thinking..." : "Send"}
      </button>
    </div>
  );
}
