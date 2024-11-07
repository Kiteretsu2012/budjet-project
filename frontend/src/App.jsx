import { Redirect, Route, Router, Switch } from 'wouter';
import Login from '../src/components/login/Login';
import { getLocalStorageToken } from './utils/getLocalStorageToken';
import OrganisationDashboard from './views/OrganisationDashboard';
import UserDashboard from './views/UserDashboard';

function App() {
	return (
		<Router>
			<Switch>
				<Route
					exact
					path="/auth"
					component={() => {
						if (getLocalStorageToken()) {
							return <Redirect to="/user/dashboard" />;
						} else {
							return <Login />;
						}
					}}
				/>
				<Route
					exact
					path="/user/dashboard"
					component={() => {
						if (getLocalStorageToken()) {
							return <UserDashboard />;
						} else {
							return <Redirect to="/auth" />;
						}
					}}
					redirectTo="/auth"
				/>
				<Route path="/" component={() => <Redirect to="/auth" />} />
				<OrganisationDashboard />
				<Route path="/budget/:id" component={() => 'hi'} />
			</Switch>
		</Router>
	);
}

export default App;
