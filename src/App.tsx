import React, {useRef, useState} from 'react';
import './App.css';
import DiceGroup, {DiceGroupRef} from "./dice/DiceGroup";

function App() {
    const diceGroupRef = useRef<DiceGroupRef>(null);
    const [total, setTotal] = useState(0);

    function updateTotal(val: string) {
        try {
            setTotal(parseInt(val))
        } catch(e) {
            setTotal(0);
        }
    }

    function runDice() {
        diceGroupRef.current?.rollAllDice();
    }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Test Dice App</h1>
          <div>
            <input type="number" value={total} onChange={(e) => updateTotal(e.target.value)} />
          </div>
          <button type="button" onClick={runDice}>Roll Group</button>
          <DiceGroup ref={diceGroupRef} total={total} />
      </header>
    </div>
  );
}

export default App;
