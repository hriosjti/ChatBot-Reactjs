import React from 'react'
import { useState } from 'react'
import Chatboticon from './components/Chatboticon'
import ChatForm from './components/ChatForm'
import ChatMessage from './components/ChatMessage'
import personaPrompt from './components/personaPrompt'

const App = () => {
  const [chatHistory, setChatHistory] = useState([])

  const generateBotResponse = async (history) => {
    // helper function to update chat
    const updateHistory = (text) => {
      setChatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking..."), { role: "model", text }]);
    }


    // history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));
    // Tambahkan persona di awal prompt
    history = [
      { role: "user", parts: [{ text: personaPrompt }] },
      ...history.map(({ role, text }) => ({ role, parts: [{ text }] }))
    ];



    // console.log(history);
    const requestOptions = {
      method: 'POST',
      header: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: history })
    }


    try {
      //make the api call to get the bort response
      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
      const data = await response.json()
      if (!response.ok) throw new Error(data.error.message || "Something Wrong!!")

      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\(.*?\)/g, '')   // hapus isi dalam kurung
        .replace(/\*/g, '')        // hapus tanda bintang
        .trim();

      updateHistory(apiResponseText);

      console.log(data);
    } catch (error) {
      console.log(error);
    }

  }


  return (
    <div className='container'>
      <div className='chatbot-popup'>
        {/* chat header */}
        <div className='chat-header'>
          <div className='header-info'>
            <Chatboticon />
            <h2 className='logo-text'>
              Chatbot
            </h2>
          </div>
          <button className="material-symbols-outlined">
            keyboard_arrow_down
          </button>
        </div>
        {/* chat body */}
        <div className="chat-body">
          <div className="message bot-message">
            <Chatboticon />
            <p className="message-text">
              halo :) <br />
              apa yang bisa saya bantu?
            </p>
          </div>


          {/* render chat otomatis */}
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>
        {/* chat footer */}
        <div className="chat-footer" >
          <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} />
        </div>
      </div>
    </div>
  )
}

export default App