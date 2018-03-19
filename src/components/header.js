import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
	render() {
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