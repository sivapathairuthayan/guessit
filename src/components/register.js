import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../actions/session-actions';
import Message from './message';
import { Link } from 'react-router-dom';

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};

		this._changeHandler = this._changeHandler.bind(this);
		this._onSignUp 		= this._onSignUp.bind(this);
	}

	render() {
		const { email, password } = this.state;
		return (
			<form onSubmit={this._onSignUp} className="form-signin">
				{ this.props.errorMsg !== '' ? <Message text={this.props.errorMsg} cssClass="danger" /> : null }
				<div className="card">					
					<div className="card-header">
						<h3>Register</h3>
					</div>
					<div className="card-body">
						<div className="form-group">
							<input 
								type="email" 
								className="form-control"
								onChange={this._changeHandler}
								placeholder='Please enter email'
								name="email"
								value={email} />
						</div>
						<div className="form-group">
							<input 
								type="password"
								className="form-control"
								onChange={this._changeHandler}
								placeholder='Please enter password'
								name="password"
								value={password} />
						</div>
						<button type="submit" className="btn btn-primary">Register</button>&nbsp;
						<small><i> Existing user? please <Link to="/signin">Sign In</Link></i></small>
					</div>
				</div>
			</form>
		)
	}

	_changeHandler(e) {
		const { name, value } = e.target;
		this.setState({
			[name]:  value
		});
	}

	_onSignUp(e) {
		const { email, password } = this.state;
		const { dispatch, history } = this.props;
		e.preventDefault();
		dispatch(register({ email, password }, history));
	}
}

function mapStateToProps(state) {
	return {
		loggedIn: state.sessionReducer.loggedIn,
		token: state.sessionReducer.token,
		email: state.sessionReducer.email,
		errorMsg: state.sessionReducer.errorMsg,
	}
}

export default connect(mapStateToProps)(Register);