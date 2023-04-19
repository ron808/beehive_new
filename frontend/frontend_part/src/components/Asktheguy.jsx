import React, { useState } from 'react';

export const Asktheguy = () => {
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');

  const handleTextAreaChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/asktheguy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
      } else {
        throw new Error('Failed to send text');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='asktheguy'>

      <div className='box_of_guy'>
        <h1>Ask the Guy</h1>
        <div className='out_of_box_guy'>
        {message ? <h3><pre>{message}</pre></h3>:<h3>Ask the guy anything...</h3>}
        </div>
        <textarea  className='question_box_00' placeholder='Write a question' value={text} onChange={handleTextAreaChange} />
        <button className='_ask_button' onClick={handleSubmit}>Ask</button>

      </div>

    </div>
  );
};

