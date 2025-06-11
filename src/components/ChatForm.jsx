import React, { useRef } from 'react';

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
    const inputRef = useRef(); // Initialize with null

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const userMessage = inputRef.current.value.trim(); // Corrected typo and access
        if (!userMessage) return;
        inputRef.current.value = "";

        // console.log(userMessage);
        //perbarui chat history dengan userMessage
        setChatHistory((history) => [...history, { role: "user", text: userMessage }]);

        //add a thibking bot responese
        setTimeout(() => {
            setChatHistory((history) => [...history, { role: "model", text: "Thinking..." }]);
            // call the function bot response
            generateBotResponse([...chatHistory, { role: "user", text: userMessage }]);

        }, 600)



    };

    return (
        <form className="chat-form" onSubmit={handleFormSubmit}>
            <input
                type="text"
                placeholder='Message...'
                className="message-input"
                autoComplete="off"
                required
                ref={inputRef} // Assign the ref to the input
            />
            <button className="material-symbols-outlined">
                keyboard_arrow_up
            </button>
        </form>
    );
};

export default ChatForm;
