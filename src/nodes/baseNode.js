// BaseNode.js
import React from 'react';
import { Handle, Position } from 'reactflow';

export const BaseNode = ({ 
  id, 
  data, 
  type,
  title,
  children,
  inputs = [],
  outputs = [],
  width = 200,
  height = 'auto',
  color = '#1C2536',
  textColor = 'white'
}) => {
  return (
    <div 
      style={{
        width: width,
        minHeight: height,
        border: '1px solid #ddd',
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
        backgroundColor: 'white'
      }}
    >
      <div 
        style={{
          background: color,
          color: textColor,
          padding: '8px 10px',
          borderBottom: '1px solid #ddd',
          fontWeight: 'bold'
        }}
      >
        <span>{title || type}</span>
      </div>
      
      <div style={{ padding: '10px', flexGrow: 1 }}>
        {children}
      </div>
      
      {/* Input Handles */}
      {inputs.map((input, index) => (
        <Handle
          key={input.id}
          type="target"
          position={Position.Left}
          id={input.id}
          style={{
            top: input.position || `${(index + 1) * 100 / (inputs.length + 1)}%`,
            background: input.color || '#555'
          }}
        />
      ))}
      
      {/* Output Handles */}
      {outputs.map((output, index) => (
        <Handle
          key={output.id}
          type="source"
          position={Position.Right}
          id={output.id}
          style={{
            top: output.position || `${(index + 1) * 100 / (outputs.length + 1)}%`,
            background: output.color || '#555'
          }}
        />
      ))}
    </div>
  );
};

// Simplified factory function
export const createNodeComponent = (config) => {
  const NodeComponent = (props) => {
    const { id, data } = props;
    
    const inputs = typeof config.inputs === 'function' ? config.inputs(id, data) : config.inputs || [];
    const outputs = typeof config.outputs === 'function' ? config.outputs(id, data) : config.outputs || [];
    
    return (
      <BaseNode 
        {...config}
        id={id}
        data={data}
        inputs={inputs}
        outputs={outputs}
      >
        {config.renderContent && config.renderContent(id, data)}
      </BaseNode>
    );
  };
  
  return NodeComponent;
};