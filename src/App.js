import './App.css';
import FormClient from './containers/FormClient';

function App() {
  return (
    <div className="App"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
      <FormClient />
    </div>
  );
}

export default App;
