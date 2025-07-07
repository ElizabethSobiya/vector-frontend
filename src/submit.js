// submit.js
import { useState } from 'react';
import { useStore } from './store';
import './submitButton.css';

export const SubmitButton = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    
    const nodes = useStore(state => state.nodes);
    const edges = useStore(state => state.edges);
    
    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges })
            });
            
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            
            const data = await response.json();
            setResult(data);
        } catch (err) {
            console.error('Error submitting pipeline:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="submit-container">
            <button 
                className="submit-button"
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? 'Processing...' : 'Submit Pipeline'}
            </button>
            
            {result && (
                <div className="result-modal">
                    <div className="result-content">
                        <h3>Pipeline Analysis</h3>
                        <div className="result-item">
                            <span>Nodes:</span>
                            <strong>{result.num_nodes}</strong>
                        </div>
                        <div className="result-item">
                            <span>Edges:</span>
                            <strong>{result.num_edges}</strong>
                        </div>
                        <div className="result-item">
                            <span>Is DAG:</span>
                            <strong className={result.is_dag ? 'success' : 'error'}>
                                {result.is_dag ? 'Yes' : 'No'}
                            </strong>
                        </div>
                        
                        {!result.is_dag && (
                            <div className="warning">
                                Warning: Your pipeline contains cycles, which may cause infinite loops.
                            </div>
                        )}
                        
                        <button 
                            className="close-button"
                            onClick={() => setResult(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            
            {error && (
                <div className="error-message">
                    {error}
                    <button 
                        className="close-error"
                        onClick={() => setError(null)}
                    >
                        ×
                    </button>
                </div>
            )}
        </div>
    );
};