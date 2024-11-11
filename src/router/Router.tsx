import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import { routes } from './routes';
import { lazy, Suspense } from 'react';
import { Loading } from '~/components/Loading';

const DashboardPage = lazy(() =>
  import('~/pages/Dashboard').then(({ DashboardPage }) => ({
    default: DashboardPage,
  })),
);

const NewJobApplication = lazy(() =>
  import('~/pages/NewJobApplication').then(({ NewJobApplication }) => ({
    default: NewJobApplication,
  })),
);

export const Router = () => {
  return (
    <HashRouter>
      <Suspense fallback={<Loading isCentered />}>
        <Switch>
          <Route exact path={routes.dashboard} component={DashboardPage} />
          <Route exact path={routes.newJobApplication} component={NewJobApplication} />
          <Route exact path={routes.history} component={() => <div>History</div>} />
          <Route exact path="*">
            <Redirect to={routes.dashboard} />
          </Route>
        </Switch>
      </Suspense>
    </HashRouter>
  );
};
