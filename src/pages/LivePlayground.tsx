import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AceEditor from 'react-ace';
import io from 'socket.io-client';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';

const LivePlayground: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [code, setCode] = useState('// Start collaborative coding here');
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    // Connect to the WebSocket server
    const newSocket = io('http://localhost:3001'); // Replace with your actual WebSocket server URL
    setSocket(newSocket);

    newSocket.emit('join', sessionId);

    newSocket.on('code', (receivedCode: string) => {
      setCode(receivedCode);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [sessionId]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    socket.emit('code', { sessionId, code: newCode });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Live Collaborative Playground</h1>
      <p className="mb-4">Session ID: {sessionId}</p>
      <AceEditor
        mode="javascript"
        theme="monokai"
        onChange={handleCodeChange}
        name="live-code-editor"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
        style={{ width: '100%', height: '600px' }}
        value={code}
      />
    </div>
  );
};

export default LivePlayground;