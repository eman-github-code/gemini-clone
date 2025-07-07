import React, { useState } from "react";
import axios from "axios";
import Message from "./Message";

function ChatBox() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        messages: updatedMessages.map((msg) => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text,
        })),
      });

      const botReply = res.data.choices[0].message.content;
      setMessages([...updatedMessages, { text: botReply, sender: "bot" }]);
    } catch (error) {
      console.error(error);
      alert("Error: Unable to connect to backend.");
    }

    setLoading(false);
  };

  return (
    <div className="chat-box">
      <div className="messages">
        {messages.map((msg, i) => (
          <Message key={i} text={msg.text} sender={msg.sender} />
        ))}
        {loading && <Message text="Typing..." sender="bot" />}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          placeholder="Ask me anything..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatBox;
