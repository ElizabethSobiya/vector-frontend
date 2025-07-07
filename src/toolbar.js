// toolbar.js
import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    return (
        <div style={{ 
            padding: '15px', 
            backgroundColor: '#f0f4f8', 
            borderBottom: '1px solid #ddd'
        }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>Node Palette</h3>
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', 
                gap: '12px' 
            }}>
                <DraggableNode type='customInput' label='Input' bgColor='#4CAF50' />
                <DraggableNode type='llm' label='LLM' bgColor='#2196F3' />
                <DraggableNode type='customOutput' label='Output' bgColor='#F44336' />
                <DraggableNode type='text' label='Text' bgColor='#9C27B0' />
                
                {/* New node types */}
                <DraggableNode type='filter' label='Filter' bgColor='#FF9800' />
                <DraggableNode type='math' label='Math' bgColor='#8BC34A' />
                <DraggableNode type='transform' label='Transform' bgColor='#607D8B' />
                <DraggableNode type='timer' label='Timer' bgColor='#009688' />
                <DraggableNode type='api' label='API' bgColor='#E91E63' />
            </div>
        </div>
    );
};