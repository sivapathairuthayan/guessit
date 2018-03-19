import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Header from './components/header';
import Footer from './components/footer';
import SignIn from './components/signin';
import SignOut from './components/signout';
import Register from './components/register';
import GuessIt from './components/guessit';

class Routes extends Component {
	render() {
		return (
			<HashRouter>
				<div>
					<Header />
					<main role="main" className="container">					
						<Switch>					
							<Route exact path={"/"} component={SignIn} />
							<Route path={"/signin"} component={SignIn} />
							<Route path={"/signout"} component={SignOut} />
							<Route path={"/register"} component={Register} />
							<Route path={"/guessit"} component={GuessIt} />				
						</Switch>					
					</main>
					<Footer />
				</div>
			</HashRouter>
		)
	}
}

export default Routes;