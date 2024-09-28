import React, { useState } from 'react';

const generateRandomId = (length) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$&_';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};

const RandomIdGenerator = () => {
  const [randomId, setRandomId] = useState('');

  const handleGenerate = () => {
    setRandomId(generateRandomId(10));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Random ID Generator</h1>
        <p className="text-lg font-mono text-gray-700 mb-6">{randomId || 'Click the button to generate an ID!'}</p>
        <button
          onClick={handleGenerate}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Generate ID
        </button>
      </div>
    </div>
  );
};

export default RandomIdGenerator;
