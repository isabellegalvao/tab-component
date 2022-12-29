import { useState } from 'react';
import './App.css';
import Tab from './components/TabControlled';

function App() {
  const [activeTab, setActiveTab] = useState(0)

  const onActiveChange = (e: any) => {
    setActiveTab(e)
  }

  return (
    <div className="App">

      <p className="title"> Uncontrolled - Task 1</p>
      <Tab initialActive={0}>
        <Tab.Pane title="First Pane">
          First Pane Body
        </Tab.Pane>

        <Tab.Pane title="Second Pane">
          Second Pane Body
        </Tab.Pane>
      </Tab>

      <p className="title"> Controlled - Task 2</p>
      <Tab active={activeTab} onActiveChange={onActiveChange}>
        <Tab.Pane title="First Pane">
          First Pane Body
        </Tab.Pane>

        <Tab.Pane title="Second Pane">
          Second Pane Body
        </Tab.Pane>
      </Tab>

    </div>
  );
}

export default App;
