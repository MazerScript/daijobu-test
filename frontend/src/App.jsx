// frontend/src/App.jsx
import { useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const response = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input, session_id : "12345" }),
    });

    const data = await response.json();
    console.log(data)
    const botMsg = { sender: "bot", text: data.full_message || "Erreur API" };

    setMessages((prev) => [...prev, botMsg]);
    setInput("");
  };

  return (
    <div className="chat-container" style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <h1>Chatbot IA</h1>
      <div style={{ border: "1px solid #ccc", padding: 10, minHeight: 300 }}>
        {messages.map((msg, i) => (
          <p key={i} style={{ textAlign: msg.sender === "user" ? "right" : "left" }}>
            <strong>{msg.sender === "user" ? "Moi" : "IA"}:</strong> {msg.text}
          </p>
        ))}
      </div>
      <div style={{ marginTop: 10 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: "80%" }}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Envoyer</button>
      </div>
    </div>
  );
}

export default App;
