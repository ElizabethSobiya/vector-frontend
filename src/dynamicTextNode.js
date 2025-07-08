// DynamicTextNode.js
import React, { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

export const DynamicTextNode = ({ id, data, selected }) => {
  const [text, setText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  
  // Simple text change handler without store updates
  const handleTextChange = (e) => {
    setText(e.target.value);
  };
  
  // Detect variables with stable dependency
  useEffect(() => {
    const regex = /\{\{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g;
    const detectedVars = [];
    let match;
    
    const textToProcess = text || '';
    while ((match = regex.exec(textToProcess)) !== null) {
      if (!detectedVars.includes(match[1])) {
        detectedVars.push(match[1]);
      }
    }
    
    setVariables(detectedVars);
  }, [text]);
  
  // Calculate dimensions
  const minHeight = 60;
  const lineHeight = 20;
  const lines = text.split('\n').length;
  const textareaHeight = Math.max(minHeight, lines * lineHeight);
  
  const minWidth = 200;
  const charWidth = 8;
  const longestLine = text.split('\n').reduce((max, line) => Math.max(max, line.length), 0);
  const nodeWidth = Math.max(minWidth, longestLine * charWidth);
  
  return (
    <div 
      style={{
        width: nodeWidth,
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: selected ? '#f5f0ff' : 'white',
        overflow: 'hidden',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
      }}
    >
      <div 
        style={{
          backgroundColor: '#9C27B0',
          color: 'white',
          padding: '8px 10px',
          borderBottom: '1px solid #ddd',
          fontWeight: 'bold'
        }}
      >
        <span>Text</span>
      </div>
      
      <div style={{ padding: '10px' }}>
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Enter text here... Use {{variable}} for inputs"
          style={{
            width: '100%',
            height: textareaHeight,
            resize: 'none',
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontFamily: 'inherit',
            fontSize: '13px',
            lineHeight: '20px'
          }}
        />
      </div>
      
      {/* Variable Input Handles */}
      {variables.map((variable, index) => (
        <Handle
          key={variable}
          type="target"
          position={Position.Left}
          id={variable}
          style={{ 
            top: 40 + (index * 24),
            background: '#9C27B0'
          }}
        />
      ))}
      
      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{ 
          top: 20,
          background: '#9C27B0'
        }}
      />
    </div>
  );
};