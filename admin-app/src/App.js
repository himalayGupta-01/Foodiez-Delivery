import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css';
import PrivateRoute from './Components/HOC/PrivateRoute';
import Home from './Containers/Home/Home';
import Signin from './Containers/SignIn/Signin';
import Signup from './Containers/Signup/Signup';
import { useDispatch, useSelector } from 'react-redux'
import { isUserLoggedIn } from './actions/Auth.actions'
import { getInitialData} from './actions/Action'
import Products from './Containers/Products/Products';
import Orders from './Containers/Orders/Orders';
import Category from './Containers/Category/Category';

function App(props) {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)


  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    dispatch(getInitialData());
  }, [])


  return (
    <div className="App">
      <Switch>
        <PrivateRoute  path='/' exact component= {Home} />
        <PrivateRoute  path='/category' component= {Category} />
        <PrivateRoute  path='/products' component= {Products} />
        <PrivateRoute  path='/orders' component= {Orders} />
        <Route path='/signin' component={Signin} />
        <Route path='/signup' component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
