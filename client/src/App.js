import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './css/new.css';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LoginForm from './components/LoginForm/LoginForm';
import SoftwareList from './components/SoftwareList/SoftwareList';

function App() {
  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route exact path='/' component={LoginForm} />
        <Route exact path='SoftwareList' component={SoftwareList} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
