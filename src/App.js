import './App.css';
import FormClient from './containers/FormClient';
import { API, Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { useEffect, useState } from 'react';
Amplify.configure(awsExports);


function App() {

  const [form, setForm] = useState([])

  useEffect(() => {

    API.get('api', '/form/list')
      .then((res) => {
        setForm(res.rows);
      })
      .catch((error) => {
        console.error(error);
      });


    return () => {
      setForm()
    }
  }, [])



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
