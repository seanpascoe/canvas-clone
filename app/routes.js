import React from 'react';
import { Route, IndexRoute} from 'react-router';
import App from './containers/App';
import About from './components/About';
import Home from './components/Home';
import Courses from './components/Courses';
import Course from './components/Course';
import NotFound from './components/NotFound';


export default(
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/about" component={About} />
    <Route path="/courses" component={Courses} />
    <Route path="/courses/:id" component={Course} />
    <Route path="*" component={NotFound} />
  </Route>
)
