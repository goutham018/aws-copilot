import { useState } from 'react';

function App() {
  const [id, setId] = useState('');
  const [value, setValue] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/item`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, value })
    });
    setResponse(await res.json());
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Fullstack App: DynamoDB Demo</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="ID" value={id} onChange={e => setId(e.target.value)} />
        <input placeholder="Value" value={value} onChange={e => setValue(e.target.value)} />
        <button type="submit">Save to DynamoDB</button>
      </form>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
}

export default App;
