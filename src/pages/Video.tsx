import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';

const Video: React.FC = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const [code, setCode] = useState('// Start coding here');
  const [notes, setNotes] = useState('');

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  const handleSaveNotes = () => {
    // Implement saving notes functionality (e.g., to localStorage or backend)
    console.log('Saving notes:', notes);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <div className="aspect-w-16 aspect-h-9 mb-4">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Notes</h2>
          <textarea
            value={notes}
            onChange={handleNotesChange}
            className="w-full h-32 p-2 border rounded"
            placeholder="Take notes here..."
          ></textarea>
          <button
            onClick={handleSaveNotes}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Notes
          </button>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Code Editor</h2>
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
      </div>
    </div>
  );
};

export default Video;