import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Routes from './routes';

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<div className="container">
  					<div className="row">
  						<div className="col-md-12">
							<Routes />
						</div>
					</div>
				</div>
			</Provider>
		)
	}
}

export default App;