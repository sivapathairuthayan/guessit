import React, { Component } from 'react';
import { connect } from 'react-redux';

import Message from './message';
import { START_NUMBER, END_NUMBER, MAX_ATTEMPTS } from '../constants/guessit-constants';
import { logTheGuess, clearGuessLog } from '../actions/guessit-actions';

class GuessIt extends Component {
	constructor(props) {
		super(props);
		this.state = {
			guessNumber: '',
			guessTimes: 0,
			randomNumber: 0,
			cssClass: 'warning',
			message: ''
		};

		this._changeHandler = this._changeHandler.bind(this);
		this._checkAnswer = this._checkAnswer.bind(this);
		this._generateRandomNumber = this._generateRandomNumber.bind(this);
	}

	componentWillMount() {		
		this._generateRandomNumber();
	}
	
	render() {
		const guessNumber = this.state.guessNumber;
		const guessLeft = MAX_ATTEMPTS - this.state.guessTimes;
		const guesses = this.props.guesses || [];

		return (
			<form className="form-signin"  onSubmit={this._checkAnswer}>
				<div className="card">					
					<div className="card-header">
						<h3>Guess the number</h3>
					</div>
					<div className="card-body">
						<div>
							{this.state.message !== '' ? <Message text={this.state.message} cssClass={this.state.cssClass} /> : null}
						</div>
						<label>Input a number between {START_NUMBER} and {END_NUMBER}.</label>
						<div className="form-group">
							<input
								type="text"
								className="form-control"
								value={guessNumber}
								onChange={this._changeHandler}
								placeholder='Input number'
								name="guessNumber" />
						</div>						
						<div className="text-left">	
							<button type="submit" className="btn btn-primary">Submit Guess</button>
						</div><br />
						<label>You Guesses: {guesses.join(' ')}</label>				
					</div>
					
					<div className="card-footer text-right">
						Guesses Left: <span className="badge badge-warning">{guessLeft}</span>
					</div>
				</div>
			</form>
		)
	}

	_changeHandler(e) {		
		this.setState({
			guessNumber: e.target.value
		});
	}

	_checkAnswer(e) {		
		e.preventDefault();
		let message;
		let wrongGuess = true;		
		const guessTimes = this.state.guessTimes		
		const guessNumber = parseInt(this.state.guessNumber,10);

		if (guessNumber === this.state.randomNumber) {
			wrongGuess = false;
			message = 'Congrats!, successfully guessed the number!';
		} else if (guessNumber > this.state.randomNumber) {			
			message = 'Guessed number is bigger than the actual number.';
		} else  {
			message = 'Guessed number is smaller than the actual number.';
		}

		if ((guessTimes +1) >= MAX_ATTEMPTS && wrongGuess) {
			sessionStorage.setItem('triesExpired', true);
			clearGuessLog(this.props.dispatch);
			this.props.history.push('/signout');
			return ;
		}

		if (!wrongGuess) {
			this._generateRandomNumber();			
			this.setState({
				guessNumber: ''
			});
		}

		this.setState({
			message: message,
			cssClass: wrongGuess ? 'danger' : 'success',
			guessTimes: wrongGuess ? guessTimes + 1 : 0
		});

		this.props.dispatch(logTheGuess(this.props.email, this.state.guessNumber, wrongGuess));
	}

	_generateRandomNumber() {
		const randomNumber = parseInt((Math.random() * START_NUMBER) + (END_NUMBER - START_NUMBER), 10);
		this.setState({
			randomNumber: randomNumber
		})
	}
}

function mapStateToProps(state) {
	return {
		loggedIn: state.sessionReducer.loggedIn,
		email: state.sessionReducer.email,
		guesses: state.guessItReducer.guesses
	}
}

export default connect(mapStateToProps)(GuessIt);