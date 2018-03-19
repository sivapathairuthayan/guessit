import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signOut } from '../actions/session-actions';

class Signout extends Component {
	componentWillMount() {
		signOut(this.props.dispatch);
		localStorage.removeItem('gusess');
	}

	render() {		
		return (
			<div className="form-signin">
				<div className="card">
					<div className="card-header">
						<h3>Auto Signed Out</h3>
					</div>
					<div className="card-body">
						<p>Sorry! You failed to guess the number. Please try again!.</p>
					</div>
				</div>
			</div>
			
		)
	}
}

function mapStateToProps(state) {
	return {
		loggedIn: state.sessionReducer.loggedIn		
	}
}

export default connect(mapStateToProps)(Signout);