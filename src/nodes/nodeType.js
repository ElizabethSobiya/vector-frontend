// nodeTypes.js
import React, { useState } from 'react';
import { createNodeComponent } from './baseNode';

// Styling for form elements
const labelStyle = { 
  display: 'block', 
  marginBottom: '8px',
  fontSize: '12px'
};

const inputStyle = { 
  width: '100%', 
  padding: '5px',
  border: '1px solid #ddd',
  borderRadius: '4px'
};

const selectStyle = { 
  width: '100%', 
  padding: '5px',
  border: '1px solid #ddd',
  borderRadius: '4px'
};

// Input Node Content Component
const InputNodeContent = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  return (
    <div>
      <label style={labelStyle}>
        Name:
        <input 
          type="text" 
          value={currName} 
          onChange={(e) => setCurrName(e.target.value)} 
          style={inputStyle}
        />
      </label>
      <label style={labelStyle}>
        Type:
        <select 
          value={inputType} 
          onChange={(e) => setInputType(e.target.value)}
          style={selectStyle}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </div>
  );
};

// LLM Node Content Component
const LLMNodeContent = () => (
  <div>
    <span>This is a LLM.</span>
  </div>
);

// Output Node Content Component
const OutputNodeContent = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  return (
    <div>
      <label style={labelStyle}>
        Name:
        <input 
          type="text" 
          value={currName} 
          onChange={(e) => setCurrName(e.target.value)} 
          style={inputStyle}
        />
      </label>
      <label style={labelStyle}>
        Type:
        <select 
          value={outputType} 
          onChange={(e) => setOutputType(e.target.value)}
          style={selectStyle}
        >
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </label>
    </div>
  );
};

// Text Node Content Component
const TextNodeContent = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  return (
    <div>
      <label style={labelStyle}>
        Text:
        <input 
          type="text" 
          value={currText} 
          onChange={(e) => setCurrText(e.target.value)} 
          style={inputStyle}
        />
      </label>
    </div>
  );
};

// Filter Node Content Component
const FilterNodeContent = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || '');
  
  return (
    <div>
      <label style={labelStyle}>
        Condition:
        <input 
          type="text" 
          value={condition} 
          onChange={(e) => setCondition(e.target.value)} 
          placeholder="Enter filter condition..." 
          style={inputStyle}
        />
      </label>
    </div>
  );
};

// Math Node Content Component
const MathNodeContent = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');
  
  return (
    <div>
      <label style={labelStyle}>
        Operation:
        <select 
          value={operation} 
          onChange={(e) => setOperation(e.target.value)}
          style={selectStyle}
        >
          <option value="add">Addition</option>
          <option value="subtract">Subtraction</option>
          <option value="multiply">Multiplication</option>
          <option value="divide">Division</option>
        </select>
      </label>
    </div>
  );
};

// Transform Node Content Component
const TransformNodeContent = ({ id, data }) => {
  const [transform, setTransform] = useState(data?.transform || '');
  
  return (
    <div>
      <label style={labelStyle}>
        Transform:
        <textarea
          value={transform}
          onChange={(e) => setTransform(e.target.value)}
          placeholder="Enter transformation code..."
          rows={3}
          style={{...inputStyle, resize: 'vertical'}}
        />
      </label>
    </div>
  );
};

// Timer Node Content Component
const TimerNodeContent = ({ id, data }) => {
  const [delay, setDelay] = useState(data?.delay || 1000);
  
  return (
    <div>
      <label style={labelStyle}>
        Delay (ms):
        <input 
          type="number" 
          value={delay} 
          onChange={(e) => setDelay(parseInt(e.target.value))} 
          min={0}
          style={inputStyle}
        />
      </label>
    </div>
  );
};

// API Node Content Component
const APINodeContent = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || '');
  const [method, setMethod] = useState(data?.method || 'GET');
  
  return (
    <div>
      <label style={labelStyle}>
        URL:
        <input 
          type="text" 
          value={url} 
          onChange={(e) => setUrl(e.target.value)} 
          placeholder="https://example.com/api" 
          style={inputStyle}
        />
      </label>
      <label style={labelStyle}>
        Method:
        <select 
          value={method} 
          onChange={(e) => setMethod(e.target.value)}
          style={selectStyle}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </label>
    </div>
  );
};

// Input Node
export const InputNode = createNodeComponent({
  type: 'customInput',
  title: 'Input',
  color: '#4CAF50',
  outputs: (id) => [{ id: `${id}-value` }],
  renderContent: (id, data) => <InputNodeContent id={id} data={data} />
});

// LLM Node
export const LLMNode = createNodeComponent({
  type: 'llm',
  title: 'LLM',
  color: '#2196F3',
  inputs: (id) => [
    { id: `${id}-system` },
    { id: `${id}-prompt` }
  ],
  outputs: (id) => [{ id: `${id}-response` }],
  renderContent: (id, data) => <LLMNodeContent id={id} data={data} />
});

// Output Node
export const OutputNode = createNodeComponent({
  type: 'customOutput',
  title: 'Output',
  color: '#F44336',
  inputs: (id) => [{ id: `${id}-value` }],
  renderContent: (id, data) => <OutputNodeContent id={id} data={data} />
});

// Text Node (we'll use DynamicTextNode in ui.js for the advanced functionality)
export const TextNode = createNodeComponent({
  type: 'text',
  title: 'Text',
  color: '#9C27B0',
  outputs: (id) => [{ id: `${id}-output` }],
  renderContent: (id, data) => <TextNodeContent id={id} data={data} />
});

// Filter Node
export const FilterNode = createNodeComponent({
  type: 'filter',
  title: 'Filter',
  color: '#FF9800',
  inputs: (id) => [{ id: `${id}-in` }],
  outputs: (id) => [
    { id: `${id}-true` },
    { id: `${id}-false` }
  ],
  renderContent: (id, data) => <FilterNodeContent id={id} data={data} />
});

// Math Node
export const MathNode = createNodeComponent({
  type: 'math',
  title: 'Math Operation',
  color: '#8BC34A',
  inputs: (id) => [
    { id: `${id}-a` },
    { id: `${id}-b` }
  ],
  outputs: (id) => [{ id: `${id}-result` }],
  renderContent: (id, data) => <MathNodeContent id={id} data={data} />
});

// Transform Node
export const TransformNode = createNodeComponent({
  type: 'transform',
  title: 'Data Transform',
  color: '#607D8B',
  inputs: (id) => [{ id: `${id}-in` }],
  outputs: (id) => [{ id: `${id}-out` }],
  renderContent: (id, data) => <TransformNodeContent id={id} data={data} />
});

// Timer Node
export const TimerNode = createNodeComponent({
  type: 'timer',
  title: 'Timer',
  color: '#009688',
  inputs: (id) => [{ id: `${id}-trigger` }],
  outputs: (id) => [{ id: `${id}-timeout` }],
  renderContent: (id, data) => <TimerNodeContent id={id} data={data} />
});

// API Node
export const APINode = createNodeComponent({
  type: 'api',
  title: 'API Call',
  color: '#E91E63',
  inputs: (id) => [{ id: `${id}-request` }],
  outputs: (id) => [
    { id: `${id}-response` },
    { id: `${id}-error` }
  ],
  renderContent: (id, data) => <APINodeContent id={id} data={data} />
});