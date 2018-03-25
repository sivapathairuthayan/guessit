import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateAuthInfo } from '../actions/session-actions';

class Header extends Component {
	componentWillMount() {
		updateAuthInfo(this.props.dispatch);
	}

	render() {
		console.log("this.props: ", this.props);
		return (
			<header>
				<nav className="navbar navbar-dark bg-dark">
					<h2 className="text-white">Guess It</h2>
					<p className='my-2 my-lg-0'>
					{
						this.props.loggedIn ? 
							<Link className="navbar-brand" to="/signout"><small>Logout</small></Link> :
							null 
					}
					<br /><span className="text-white">{this.props.email}</span>
					</p>
				</nav>
			</header>
		)
	}
}

function mapStateToProps(state) {
	return {
		loggedIn: state.sessionReducer.loggedIn,		
		email: state.sessionReducer.email
	}
}

export default connect(mapStateToProps)(Header);