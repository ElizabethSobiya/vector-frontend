// store.js
import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
} from 'reactflow';

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    nodeIDs: {},
    
    getNodeID: (type) => {
        const state = get();
        const newIDs = { ...state.nodeIDs };
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({ nodeIDs: newIDs });
        return `${type}-${newIDs[type]}`;
    },
    
    addNode: (node) => {
        const state = get();
        set({ nodes: [...state.nodes, node] });
    },
    
    onNodesChange: (changes) => {
        const state = get();
        set({ nodes: applyNodeChanges(changes, state.nodes) });
    },
    
    onEdgesChange: (changes) => {
        const state = get();
        set({ edges: applyEdgeChanges(changes, state.edges) });
    },
    
    onConnect: (connection) => {
        const state = get();
        const newEdge = {
            ...connection,
            type: 'smoothstep',
            animated: true,
            markerEnd: {
                type: MarkerType.Arrow,
                height: '20px',
                width: '20px'
            }
        };
        set({ edges: addEdge(newEdge, state.edges) });
    },
}));