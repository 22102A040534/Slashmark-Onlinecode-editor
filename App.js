// src/App.js
import React, { useState } from 'react';
import CodeEditor from './components/CodeEditor';
import Output from './components/Output';
import './App.css';

const App = () => {
  const [output, setOutput] = useState('');

  return (
    <div className="App">
      <h1>Online Code Editor</h1>
      <CodeEditor onOutput={setOutput} />
      <Output output={output} />
    </div>
  );
};
export default App;
