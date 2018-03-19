import { LOG_GUESS, GET_GUESS_LOG, CLEAR_GUESS_LOG } from '../constants/guessit-constants';
import makeRequest from '../services/mock-service';

export function logTheGuess(email, guessNumber, wrongGuess) {
	return (dispatch) => {
		makeRequest('/logTheGuess', { email: email, guess: guessNumber }, function(response) {
			if (response.success) {
				dispatch({
					type: LOG_GUESS,
					payload:  {
						guess: response.guess,
						email: response.email
					}
				});

				if (!wrongGuess) {
					clearGuessLog(dispatch);
				}
			}
		})
		
	}
}

export function getGuessLog(email) {
	return (dispatch) => {
		makeRequest('/getGuessLog', { email }, function(response) {
			if (response.success) {				
				dispatch({
					type: GET_GUESS_LOG,
					payload: {
						guess: response.guess,
						email: response.email
					}
				});
			}
		})
		
	}
}

export function clearGuessLog(dispatch) {
	dispatch({ type: CLEAR_GUESS_LOG });
}

