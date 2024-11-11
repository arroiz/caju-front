import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import { routes } from './routes';
import { DashboardPage } from '~/pages/Dashboard';
import { NewJobApplication } from '~/pages/NewJobApplication';

export const Router = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path={routes.dashboard} component={DashboardPage} />
        <Route exact path={routes.newJobApplication} component={NewJobApplication} />
        <Route exact path={routes.history} component={() => <div>History</div>} />
        <Route exact path="*">
          <Redirect to={routes.dashboard} />
        </Route>
      </Switch>
    </HashRouter>
  );
};
