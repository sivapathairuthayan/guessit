import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signOut } from '../actions/session-actions';
import { Link } from 'react-router-dom';

class Signout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			triesExpired: false
		};
	}
	componentWillMount() {
		signOut(this.props.dispatch);

		if (sessionStorage.getItem('triesExpired')) {
			this.setState({
				triesExpired: true
			});			
		}		
	}

	render() {		
		const triesExpired = this.state.triesExpired;
		return (
			<div className="form-signin">
				<div className="card">
					<div className="card-header">
						<h3>Auto Signed Out</h3>
					</div>
					<div className="card-body">
						<p>{triesExpired ? "Sorry! You failed to guess the number. Please try again!." : "You are successfully logged out."} 
						Click here to <Link to="/signin">sign in</Link> again.</p>

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