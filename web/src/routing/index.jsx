import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { StartingPage } from '../pages/StartingPage';
import { Panel } from '../pages/Panel';
import { ChangePassword } from '../pages/Change-password';
import { Projects } from '../pages/Projects';
import { NewProject } from '../pages/NewProject';

export const Routing = () => {
  return (
    <Switch>
      <Route path="/" exact component={StartingPage} />
      <Route path="/panel" exact component={Panel} />
      <Route path="/change-password" exact component={ChangePassword} />
      <Route path="/projects" exact component={Projects} />
      <Route path="/new-project" exact component={NewProject} />
      {/* <Route path="/graphicCard" exact component={GrahpicCardPage} />
      <Route path="/CPU" exact component={CPUPage} />
      <Route path="/arrivals" exact component={NewArrivalsPage} />
      <Route path="/graphicCard/:id" component={ProductDetails} />
      <Route path="/CPU/:id" component={ProductDetails} />
      <Route path="/arrivals/:id" component={ProductDetails} />
      <Route path="/blog" component={Blog} />
      <Route path="/about" component={AboutUs} />
      <Route path="/login" component={Login} />
      <Route path="/forgotpass" component={RemainderPassword} />
      <Route path="/register" component={SignIn} />
      <Route path="/terms" component={Terms} />
      <Route path="/faq" component={FAQ} />
      <Route path="/contact" component={Contact} />
      <Route path="/card" component={CardPage} />
      <Route component={ErrorCatch} /> */}
    </Switch>
  );
};

//<Route path="/1" component={ProductDetails} />
