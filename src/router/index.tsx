import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import { routes } from './routes';
import DashboardPage from '~/pages/Dashboard';
import { NewJobApplication } from '~/pages/NewJobApplication';

const Router = () => {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route exact path={routes.dashboard} component={DashboardPage} />
          <Route exact path={routes.newUser} component={NewJobApplication} />
          <Route exact path={routes.history} component={() => <div>History</div>} />
          <Route exact path="*">
            <Redirect to={routes.dashboard} />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
};

export default Router;
