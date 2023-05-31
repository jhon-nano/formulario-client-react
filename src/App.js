import { Amplify } from 'aws-amplify';
import './App.css';
import awsExports from './aws-exports';
import FormClient from './containers/FormClient';
Amplify.configure(awsExports);


function App() {
  return (
    <div className="App"
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>

      <FormClient  />

    </div>
  );
}

export default App;
