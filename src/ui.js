// ui.js
import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { 
  InputNode, 
  LLMNode, 
  OutputNode, 
  FilterNode,
  MathNode,
  TransformNode,
  TimerNode,
  APINode
} from './nodes/nodeType';
import { DynamicTextNode } from './dynamicTextNode';
import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: DynamicTextNode,
  filter: FilterNode,
  math: MathNode,
  transform: TransformNode,
  timer: TimerNode,
  api: APINode,
};

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    
    // Use individual selectors to prevent unnecessary re-renders
    const nodes = useStore(state => state.nodes);
    const edges = useStore(state => state.edges);
    const getNodeID = useStore(state => state.getNodeID);
    const addNode = useStore(state => state.addNode);
    const onNodesChange = useStore(state => state.onNodesChange);
    const onEdgesChange = useStore(state => state.onEdgesChange);
    const onConnect = useStore(state => state.onConnect);

    const getInitNodeData = (nodeID, type) => {
      return { 
        id: nodeID, 
        nodeType: type
      };
    };

    const onDrop = useCallback((event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;

        if (typeof type === 'undefined' || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    }, [reactFlowInstance, getNodeID, addNode]);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <div ref={reactFlowWrapper} style={{width: '100vw', height: '70vh'}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
            >
                <Background color="#aaa" gap={gridSize} />
                <Controls />
                <MiniMap />
            </ReactFlow>
        </div>
    );
};