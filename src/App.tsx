
import React, { useState } from 'react';
import TldrawComponent from './TldrawComponent';

function App() {
  const [itemCount, setItemCount] = useState(5);
  const [shouldGenerate, setShouldGenerate] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemCount(parseInt(e.target.value) || 0);
  };

  const handleGenerate = () => {
    setShouldGenerate(true);
  };

  return (
    <div className="App">
      <h1>Alai Timeline Challenge</h1>
      <div>
        <input 
          type="number" 
          value={itemCount} 
          onChange={handleInputChange} 
          min="1"
        />
        <button onClick={handleGenerate}>Generate</button>
      </div>
      <TldrawComponent itemCount={itemCount} shouldGenerate={shouldGenerate} onGenerated={() => setShouldGenerate(false)} />
    </div>
  );
}

export default App;