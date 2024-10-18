import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AceEditor from 'react-ace';
import { Play, Save, Share } from 'lucide-react';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';

const Playground: React.FC = () => {
  const [code, setCode] = useState('// Start coding here');
  const [output, setOutput] = useState('');
  const [savedSessions, setSavedSessions] = useState<string[]>([]);

  useEffect(() => {
    // Load saved sessions from localStorage
    const sessions = JSON.parse(localStorage.getItem('codeSessions') || '[]');
    setSavedSessions(sessions);
  }, []);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleRunCode = () => {
    try {
      // This is a simple evaluation. In a production environment, you'd want to use a sandboxed environment.
      const result = eval(code);
      setOutput(String(result));
    } catch (error) {
      setOutput(`Error: ${error}`);
    }
  };

  const handleSaveSession = () => {
    const sessionName = prompt('Enter a name for this coding session:');
    if (sessionName) {
      const newSessions = [...savedSessions, sessionName];
      setSavedSessions(newSessions);
      localStorage.setItem('codeSessions', JSON.stringify(newSessions));
      localStorage.setItem(`codeSession_${sessionName}`, code);
    }
  };

  const handleShareSession = () => {
    // Generate a unique ID for the live session
    const sessionId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    // In a real app, you'd save this to a database and redirect to the live session
    alert(`Share this link: ${window.location.origin}/live-playground/${sessionId}`);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Playground</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AceEditor
            mode="javascript"
            theme="monokai"
            onChange={handleCodeChange}
            name="code-editor"
            editorProps={{ $blockScrolling: true }}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2,
            }}
            style={{ width: '100%', height: '400px' }}
            value={code}
          />
          <div className="mt-4 flex space-x-4">
            <button
              onClick={handleRunCode}
              className="flex items-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              <Play size={18} className="mr-2" />
              Run Code
            </button>
            <button
              onClick={handleSaveSession}
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              <Save size={18} className="mr-2" />
              Save Session
            </button>
            <button
              onClick={handleShareSession}
              className="flex items-center bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              <Share size={18} className="mr-2" />
              Share Live Session
            </button>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Output</h2>
            <pre className="bg-gray-800 text-white p-4 rounded">{output}</pre>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Saved Sessions</h2>
          <ul className="bg-white rounded-lg shadow divide-y">
            {savedSessions.map((session, index) => (
              <li key={index} className="p-4 hover:bg-gray-50">
                <Link to={`/playground/${session}`} className="text-blue-600 hover:underline">
                  {session}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Playground;