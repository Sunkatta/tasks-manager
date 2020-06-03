import React from 'react';
import './App.css';
import { Switch } from 'react-router-dom';
import { Register } from './components/auth/register/Register';
import { NonAuthenticatedRoute } from './core/guards/NonAuthenticatedRoute';
import { Layout } from './components/layout/Layout';
import { Login } from './components/auth/login/Login';
import { AuthenticatedRoute } from './core/guards/AuthenticatedRoute';

function App() {
  return (
    <div className="App">
      <Switch>
        <NonAuthenticatedRoute path="/login" exact component={Login}></NonAuthenticatedRoute>
        <NonAuthenticatedRoute path="/register" exact component={Register}></NonAuthenticatedRoute>
        <AuthenticatedRoute path="/" component={Layout}></AuthenticatedRoute>
      </Switch>
    </div>
  );
}

export default App;
