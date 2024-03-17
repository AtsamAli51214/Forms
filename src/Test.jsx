import React, { useState } from 'react'

function Test() {
    const [inputValue, setInputValue] = useState('')

    // Function to handle input change and update state
    const handleInputChange = (event) => {
      setInputValue(event.target.value)
    };
  
    // Inline style to dynamically adjust input width
    const inputStyle = {
      width: `${inputValue.length * 10}px`
    };
  
    return (
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type something..."
        style={inputStyle} 
      />
    );
}

export default Test