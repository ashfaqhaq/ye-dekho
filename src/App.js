import React from 'react';
import  Login from './components/Login'
import  Signup from './components/Signup'
import  Dashboard from './components/Dashboard'
import  ResetPassword from './components/ResetPassword'
import  Header from './components/Header'
import  PrivateRoute from './components/PrivateRoute'
// import { useAuth } from "./context/AuthContext"
import { Route, Switch } from 'react-router';
import { Container } from 'semantic-ui-react';
import Search from './pages/Search';


const App = () => {

 
  return (



   
    <div className="mx-auto">
      <Container>

     
      <Header />
      <Switch>
      <PrivateRoute exact path="/" component={Dashboard} />
      
      <Route  path="/signup" component={Signup} />
     
      <Route  path="/login" component={Login} />
      <Route  path="/resetPassword" component={ResetPassword} />
      <PrivateRoute  path="/search" component={Search} />
     
      </Switch>
      </Container>
     
    </div>
  );
}

export default App;
