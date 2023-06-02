import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import Router from './views/router/router';
import './app.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-explicit-any
export const UserContext = React.createContext({user: {firstName: null, lastName: null, id: null, joinDate: null, email: null, userType: 'Reader', picture: null, name: null}, setUser: (user: any) => {}});

export function App() {

  const [user, setUser] = React.useState({firstName: null, lastName: null, id: null, joinDate: null, email: null, userType: 'Reader', picture: null, name: null});

  useEffect(() => {
    const user = localStorage.getItem('user');
    if(user){
      setUser(JSON.parse(user));
    }
  }, [])

  useEffect(() => {
    console.log(user)
  }, [user])

  return (
    <UserContext.Provider value={{user, setUser}}>
    <BrowserRouter>
      <div className="flex flex-col h-screen">
        <div style={{ flex: '1 1 0' }}>
          <Header></Header>
          <Router></Router>
        </div>
        <Footer></Footer>
      </div>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;