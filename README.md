# VectorShift Frontend

A React-based visual pipeline builder that allows users to create, connect, and analyze data flow pipelines through an intuitive drag-and-drop interface. Built as part of the VectorShift technical assessment.

## 🚀 Features

- **Visual Pipeline Builder**: Drag-and-drop interface for creating workflows
- **Node Abstraction System**: Reusable component architecture for different node types
- **Dynamic Text Nodes**: Auto-resizing text inputs with variable detection
- **Real-time Connections**: Visual connections between nodes with validation
- **Pipeline Analysis**: Submit pipelines for backend analysis (node count, edge count, DAG validation)
- **Modern UI**: Clean, responsive design with smooth animations
- **State Management**: Efficient global state handling with Zustand

## 🛠️ Tech Stack

- **React 18**: Modern React with hooks and functional components
- **ReactFlow**: Professional flow chart library for visual programming
- **Zustand**: Lightweight state management solution
- **JavaScript/ES6+**: Modern JavaScript features
- **CSS3**: Custom styling with animations and responsive design
- **HTML5**: Semantic markup

## 📋 Prerequisites

- Node.js 16+ (18+ recommended)
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

## 🔧 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd vectorshift-frontend
```

### 2. Install Dependencies
```bash
# Using npm
npm install

# Using yarn
yarn install
```

### 3. Verify Installation
```bash
# Check if key dependencies are installed
npm list react reactflow zustand
```

## 🚀 Running the Application

### Development Server
```bash
# Start development server
npm start

# Alternative with yarn
yarn start
```

The application will open in your browser at: `http://localhost:3000`

### Production Build
```bash
# Create production build
npm run build

# Serve production build locally
npm install -g serve
serve -s build
```

## 🎯 Usage Guide

### Creating a Pipeline

1. **Add Nodes**: Click on node types in the toolbar to add them to the canvas
2. **Position Nodes**: Drag nodes to arrange them on the canvas
3. **Connect Nodes**: Drag from output handles (right side) to input handles (left side)
4. **Configure Nodes**: Click on nodes to configure their properties
5. **Submit Pipeline**: Click the "Submit Pipeline" button to analyze your workflow

### Node Types

#### **Input Node** 🟢
- **Purpose**: Entry point for data into the pipeline
- **Configuration**: Name and input type (Text/File)
- **Handles**: One output handle

#### **LLM Node** 🔵
- **Purpose**: Large Language Model processing
- **Configuration**: Model parameters
- **Handles**: Two inputs (system, prompt), one output (response)

#### **Output Node** 🔴
- **Purpose**: Final destination for pipeline data
- **Configuration**: Name and output type (Text/Image)
- **Handles**: One input handle

#### **Text Node** 🟣
- **Purpose**: Text processing with variable support
- **Configuration**: Dynamic text input with `{{variable}}` detection
- **Handles**: Dynamic input handles based on detected variables, one output
- **Special Features**: 
  - Auto-resizing based on content
  - Variable detection (`{{input}}`, `{{data}}`, etc.)
  - Dynamic handle creation

#### **Filter Node** 🟠
- **Purpose**: Conditional data filtering
- **Configuration**: Filter condition
- **Handles**: One input, two outputs (true/false)

#### **Math Node** 🟢
- **Purpose**: Mathematical operations
- **Configuration**: Operation type (add, subtract, multiply, divide)
- **Handles**: Two inputs (a, b), one output (result)

#### **Transform Node** 🔘
- **Purpose**: Data transformation
- **Configuration**: Custom transformation code
- **Handles**: One input, one output

#### **Timer Node** 🟦
- **Purpose**: Delayed execution
- **Configuration**: Delay in milliseconds
- **Handles**: One input (trigger), one output (timeout)

#### **API Node** 🔴
- **Purpose**: External API calls
- **Configuration**: URL and HTTP method
- **Handles**: One input (request), two outputs (response, error)

### Keyboard Shortcuts

- **Delete**: Select node/edge and press Delete to remove
- **Ctrl/Cmd + Z**: Undo last action (via ReactFlow)
- **Space + Drag**: Pan the canvas
- **Mouse Wheel**: Zoom in/out

## 🏗️ Project Structure

```
frontend/
├── public/
│   ├── index.html          # HTML template
│   └── favicon.ico         # App icon
├── src/
│   ├── App.js              # Main application component
│   ├── index.js            # React entry point
│   ├── index.css           # Global styles
│   ├── store.js            # Zustand state management
│   ├── toolbar.js          # Draggable node palette
│   ├── ui.js               # Main ReactFlow canvas
│   ├── submit.js           # Submit button and results modal
│   ├── submitButton.css    # Submit component styles
│   ├── draggableNode.js    # Draggable node component
│   ├── dynamicTextNode.js  # Enhanced text node with variables
│   └── nodes/
│       ├── baseNode.js     # Base node abstraction
│       ├── nodeType.js     # All node type definitions
│       ├── inputNode.js    # Input node component
│       ├── llmNode.js      # LLM node component
│       ├── outputNode.js   # Output node component
│       └── textNode.js     # Basic text node component
├── package.json            # Dependencies and scripts
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

## 🔧 Architecture Overview

### Component Hierarchy
```
App
├── PipelineToolbar      # Node palette
├── PipelineUI           # Main canvas (ReactFlow)
└── SubmitButton         # Analysis submission
```

### State Management (Zustand)
```javascript
{
  nodes: [],              # Array of pipeline nodes
  edges: [],              # Array of connections
  nodeIDs: {},           # Counter for unique IDs
  getNodeID: fn,         # Generate new node IDs
  addNode: fn,           # Add node to pipeline
  onNodesChange: fn,     # Handle node updates
  onEdgesChange: fn,     # Handle edge updates
  onConnect: fn          # Handle new connections
}
```

### Node Abstraction System

#### BaseNode Component
Provides common functionality for all node types:
- Consistent styling and layout
- Handle positioning and rendering
- Header and content areas

#### Node Factory Pattern
```javascript
const createNodeComponent = (config) => {
  return (props) => (
    <BaseNode {...config}>
      {config.renderContent(props.id, props.data)}
    </BaseNode>
  );
};
```

Benefits:
- **DRY Principle**: No code duplication
- **Consistency**: All nodes follow same patterns
- **Maintainability**: Easy to add new node types
- **Flexibility**: Customizable per node type

### Data Flow

1. **User Interaction**: Drag node from toolbar
2. **Drop Handler**: Creates new node with unique ID
3. **State Update**: Zustand store updates nodes array
4. **Re-render**: ReactFlow re-renders with new node
5. **Connection**: User drags between handles
6. **Edge Creation**: New edge added to store
7. **Submission**: Pipeline data sent to backend API

## 🎨 Styling and Theming

### CSS Architecture
- **Global Styles**: `index.css` for base styles
- **Component Styles**: Individual CSS files for complex components
- **Inline Styles**: React style objects for dynamic styling

### Color Scheme
- **Input Nodes**: Green (`#4CAF50`)
- **LLM Nodes**: Blue (`#2196F3`)
- **Output Nodes**: Red (`#F44336`)
- **Text Nodes**: Purple (`#9C27B0`)
- **Filter Nodes**: Orange (`#FF9800`)
- **Math Nodes**: Light Green (`#8BC34A`)
- **Transform Nodes**: Blue Grey (`#607D8B`)
- **Timer Nodes**: Teal (`#009688`)
- **API Nodes**: Pink (`#E91E63`)

### Responsive Design
- Canvas adapts to window size
- Toolbar scales with available space
- Modal dialogs center on screen
- Touch-friendly for tablet usage

## 🔌 Backend Integration

### API Endpoints
The frontend communicates with the FastAPI backend:

```javascript
// Submit pipeline for analysis
POST http://localhost:8000/pipelines/parse
{
  "nodes": [...],
  "edges": [...]
}

// Response
{
  "num_nodes": 5,
  "num_edges": 4,
  "is_dag": true
}
```

### Error Handling
- Connection failures display user-friendly messages
- Network timeouts show retry options
- Invalid responses logged to console
- Graceful degradation when backend unavailable

## 🧪 Testing

### Manual Testing Checklist

#### Node Operations
- [ ] Can drag nodes from toolbar to canvas
- [ ] Nodes appear in correct positions
- [ ] Can delete nodes by selecting and pressing Delete
- [ ] Node properties can be edited

#### Connection Operations
- [ ] Can connect compatible handles
- [ ] Invalid connections are prevented
- [ ] Connections can be deleted
- [ ] Handles highlight on hover

#### Text Node Features
- [ ] Text input resizes with content
- [ ] Variables detected in `{{variable}}` format
- [ ] Input handles created for detected variables
- [ ] Multiple variables supported

#### Pipeline Submission
- [ ] Submit button sends data to backend
- [ ] Results modal displays correctly
- [ ] Error messages shown for failures
- [ ] Modal can be closed

### Browser Testing
Test in multiple browsers:
- Chrome/Chromium
- Firefox
- Safari
- Edge

## 🚨 Troubleshooting

### Common Issues

#### Nodes Not Appearing
```bash
# Check console for errors
# Verify ReactFlow is installed
npm list reactflow

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Connection Issues
- Ensure handles have correct types (`source` vs `target`)
- Check that handle IDs are unique
- Verify ReactFlow onConnect handler is working

#### State Management Problems
```bash
# Check Zustand installation
npm list zustand

# Verify store selectors are not causing re-renders
# Check browser React DevTools
```

#### Backend Connection Failures
- Verify backend is running on `http://localhost:8000`
- Check CORS configuration in backend
- Inspect Network tab in browser DevTools
- Test API endpoints directly with curl

#### Performance Issues
- Check for infinite re-renders in React DevTools
- Verify memoization is working correctly
- Monitor bundle size with `npm run build`

### Debug Mode
Enable additional logging:
```javascript
// Add to store.js for debug logging
const useStore = create((set, get) => ({
  // ... existing code
  debug: true,
  addNode: (node) => {
    if (get().debug) console.log('Adding node:', node);
    set({ nodes: [...get().nodes, node] });
  }
}));
```

## 🚀 Deployment

### Build for Production
```bash
# Create optimized build
npm run build

# The build folder contains:
# - Minified JavaScript
# - Optimized CSS
# - Compressed assets
```

### Deployment Options

#### Static Hosting (Recommended)
- **Netlify**: Drag and drop `build` folder
- **Vercel**: Connect GitHub repository
- **GitHub Pages**: Use `gh-pages` package
- **AWS S3**: Upload to S3 bucket with static hosting

#### Traditional Hosting
- Upload `build` folder contents to web server
- Configure server to serve `index.html` for all routes
- Set up HTTPS for production use

### Environment Variables
Create `.env` files for different environments:

```bash
# .env.development
REACT_APP_API_URL=http://localhost:8000
REACT_APP_DEBUG=true

# .env.production
REACT_APP_API_URL=https://api.yourdomain.com
REACT_APP_DEBUG=false
```

## 🤝 Development

### Adding New Node Types

1. **Define Node Configuration** in `nodes/nodeType.js`:
```javascript
export const CustomNode = createNodeComponent({
  type: 'custom',
  title: 'Custom Node',
  color: '#YOUR_COLOR',
  inputs: (id) => [{ id: `${id}-input` }],
  outputs: (id) => [{ id: `${id}-output` }],
  renderContent: (id, data) => <YourCustomContent />
});
```

2. **Add to Node Types** in `ui.js`:
```javascript
const nodeTypes = {
  // ... existing types
  custom: CustomNode,
};
```

3. **Add to Toolbar** in `toolbar.js`:
```javascript
<DraggableNode type='custom' label='Custom' bgColor='#YOUR_COLOR' />
```

### Code Style Guidelines
- Use functional components with hooks
- Follow React best practices
- Use meaningful variable names
- Add comments for complex logic
- Keep components small and focused

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/new-node-type

# Make changes and commit
git add .
git commit -m "Add new custom node type"

# Push and create pull request
git push origin feature/new-node-type
```

## 📦 Package.json Scripts

```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run test suite
npm run eject      # Eject from Create React App (irreversible)
```

## 🔄 Integration with Backend

### Prerequisites
1. Backend running on `http://localhost:8000`
2. CORS enabled for `http://localhost:3000`
3. Backend endpoints `/pipelines/parse` available

### Data Format
Frontend sends this structure to backend:
```javascript
{
  nodes: [
    {
      id: "input-1",
      type: "customInput",
      position: { x: 100, y: 100 },
      data: { inputName: "user_input" }
    }
  ],
  edges: [
    {
      id: "edge-1",
      source: "input-1",
      target: "llm-1",
      sourceHandle: "input-1-value",
      targetHandle: "llm-1-prompt"
    }
  ]
}
```

## 📄 License

This project is part of the VectorShift technical assessment.

## 🆘 Support

For issues and questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Verify all dependencies are installed correctly
3. Check browser console for error messages
4. Ensure backend is running and accessible

## 🔮 Future Enhancements

Potential improvements for the application:
- **Undo/Redo**: Full action history management
- **Save/Load**: Pipeline persistence to backend
- **Templates**: Pre-built pipeline templates
- **Validation**: Real-time pipeline validation
- **Themes**: Dark/light mode support
- **Collaboration**: Multi-user editing
- **Export**: Pipeline export to various formats