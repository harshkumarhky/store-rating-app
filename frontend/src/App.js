import React, {useState, useEffect} from 'react';
import axios from 'axios';
const API = process.env.REACT_APP_API || 'http://localhost:4000/api';

function App(){
  const [token,setToken] = useState(localStorage.getItem('token')||'');
  const [email,setEmail]=useState(''), [password,setPassword]=useState('');
  const [stores,setStores]=useState([]);
  const [userId,setUserId]=useState(localStorage.getItem('userId')||'');

  useEffect(()=>{ if(token) fetchStores(); }, [token]);

  async function login(e){
    e.preventDefault();
    try{
      const res = await axios.post(API+'/auth/login',{ email, password });
      setToken(res.data.token);
      setUserId(res.data.userId);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.userId);
    }catch(e){ alert('Login failed'); }
  }

  async function signupDemo(){
    const demoName = 'Demo Normal User For Testing';
    try{
      const res = await axios.post(API+'/auth/signup',{ name: demoName, email:'demo'+Date.now()+'@example.com', password:'User@1234', address:'Demo address' });
      alert('Signed up: '+res.data.email +'. Now login with that email and password User@1234');
    }catch(e){ alert('Signup failed: '+(e.response?.data?.error||e.message)); }
  }

  async function fetchStores(){
    try{
      const res = await axios.get(API+'/stores', { headers:{ Authorization: 'Bearer '+token } });
      setStores(res.data);
    }catch(e){ console.error(e); }
  }

  async function submitRating(storeId, score){
    const comment = prompt('Optional comment');
    try{
      await axios.post(API+'/ratings', { storeId, score, comment }, { headers:{ Authorization: 'Bearer '+token } });
      alert('Submitted/Updated rating');
      fetchStores();
    }catch(e){ alert('Error: '+(e.response?.data?.error||e.message)); }
  }

  return (
    <div className="container">
      <div className="header"><h2>Store Rating Platform (Demo)</h2>
        <div>
          {!token ? (
            <form onSubmit={login} style={{display:'flex',gap:8}}>
              <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
              <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
              <button type="submit">Login</button>
              <button type="button" onClick={signupDemo}>Quick Signup</button>
            </form>
          ) : (
            <div>
              <button onClick={()=>{ localStorage.clear(); setToken(''); setUserId(''); setStores([]); }}>Logout</button>
            </div>
          )}
        </div>
      </div>

      <div>
        <h3>Stores</h3>
        {stores.length===0 && <div className="card">No stores (or please login). After login, sample stores will appear if seeded.</div>}
        {stores.map(s=>(
          <div key={s.id} className="card">
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <div>
                <strong>{s.name}</strong><div>{s.address}</div>
                <div>Avg Rating: {s.averageRating ?? 'No ratings yet'}</div>
              </div>
              <div style={{width:200}}>
                <div>User actions:</div>
                <div style={{display:'flex', gap:6}}>
                  {[1,2,3,4,5].map(n=>(
                    <button key={n} onClick={()=>submitRating(s.id, n)}>{n}★</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
