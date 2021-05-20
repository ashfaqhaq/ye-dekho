import React from 'react';
import  Login from './components/Login'
import  Signup from './components/Signup'
import  Dashboard from './components/Dashboard'
import  ResetPassword from './components/ResetPassword'
// import  Header from './components/Header'
import  MenuBar from './components/MenuBar'
import  PrivateRoute from './components/PrivateRoute'
// import { useAuth } from "./context/AuthContext"
import { Route, Switch } from 'react-router';
import { Container } from 'semantic-ui-react';
import Search from './pages/Search';
import About from './pages/AboutUs';
import Share from './components/Share';


const App = () => {

 
  return (



   
    <div className="mx-auto">
      <Container>

     
     
      <MenuBar />
      <Switch>
      <PrivateRoute exact path="/" component={Dashboard} />
      
      <Route  path="/signup" component={Signup} />
     
      <Route  path="/login" component={Login} />
      <Route  path="/resetPassword" component={ResetPassword} />
      <Route  path="/share" component={Share} />
      <Route  path="/About" component={About} />
      
      <PrivateRoute  path="/search" component={Search} />
     
      </Switch>
      </Container>
     
    </div>
  );
}

export default App;
