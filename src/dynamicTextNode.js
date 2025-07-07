// DynamicTextNode.js
import { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

export const DynamicTextNode = ({ id, data, selected }) => {
  const [text, setText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [textareaHeight, setTextareaHeight] = useState(60);
  
  // Handle text change
  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    
    // Update parent data
    if (data.onChange) {
      data.onChange({ ...data, text: newText });
    }
    
    // Adjust textarea height
    const minHeight = 60;
    const lineHeight = 20;
    const lines = newText.split('\n').length;
    const calculatedHeight = Math.max(minHeight, lines * lineHeight);
    setTextareaHeight(calculatedHeight);
  };
  
  // Detect variables in text
  useEffect(() => {
    const regex = /\{\{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g;
    const detectedVars = [];
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      if (!detectedVars.includes(match[1])) {
        detectedVars.push(match[1]);
      }
    }
    
    setVariables(detectedVars);
  }, [text]);
  
  // Node width based on text length
  const calculateWidth = () => {
    const minWidth = 200;
    const charWidth = 8;
    const longestLine = text.split('\n')
      .reduce((max, line) => Math.max(max, line.length), 0);
    return Math.max(minWidth, longestLine * charWidth);
  };
  
  const nodeWidth = calculateWidth();
  
  return (
    <div 
      style={{
        width: nodeWidth,
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: selected ? '#f5f0ff' : 'white',
        overflow: 'hidden',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease'
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
          key={`var-${variable}`}
          type="target"
          position={Position.Left}
          id={variable}
          style={{ 
            top: 40 + (index * 24),
            background: '#9C27B0'
          }}
        >
          <div 
            style={{
              position: 'absolute',
              right: 20,
              fontSize: '10px',
              background: 'rgba(156, 39, 176, 0.1)',
              padding: '2px 4px',
              borderRadius: '4px',
              pointerEvents: 'none',
              whiteSpace: 'nowrap'
            }}
          >
            {variable}
          </div>
        </Handle>
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