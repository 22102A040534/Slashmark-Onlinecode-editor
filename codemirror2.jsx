// src/components/CodeEditor.js
import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import axios from 'axios';

const CodeEditor = ({ onOutput }) => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');

  const handleRun = async () => {
    try {
      const response = await axios.post('http://localhost:5000/execute', { code, language });
      onOutput(response.data);
    } catch (error) {
      onOutput(error.response.data);
    }
  };

  return (
    <div>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
      </select>
      <CodeMirror
        value={code}
        options={{
          mode: language,
          theme: 'material',
          lineNumbers: true
        }}
        onBeforeChange={(editor, data, value) => {
          setCode(value);
        }}
      />
      <button onClick={handleRun}>Run</button>
    </div>
  );
};

