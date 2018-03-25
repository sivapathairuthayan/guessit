import { SIGN_IN, SIGN_OUT, SIGN_IN_FAILED, REGISTER, REGISTER_FAILED, UPDATE_AUTH_INFO } from '../constants/session-constants';
import makeRequest from '../services/mock-service';

export function signIn({ email, password }, history) {
	return (dispatch) => {
		makeRequest('/login', { email, password }, function(response) {
			if (response.success) {
				dispatch({
					type: SIGN_IN,
					payload: {
						loggedIn: true,
						email: email
					}
				});
				sessionStorage.setItem('loggedIn', true);
				sessionStorage.setItem('email', email);
				sessionStorage.removeItem('triesExpired');
				history.push('/guessit');
			} else {
				dispatch({
					type: SIGN_IN_FAILED, 
					payload: response.errorMsg
				});
			}
		})
	}
}

export function register({ email, password }, history) {
	return (dispatch) => {
		makeRequest('/register', { email, password }, function(response) {
			if (response.success) {
				dispatch({
					type: REGISTER,
					payload: {
						loggedIn: true,
						email: email
					}
				});
				sessionStorage.setItem('loggedIn', true);
				sessionStorage.setItem('email', email);
				history.push('/guessit');
			} else {
				dispatch({
					type: REGISTER_FAILED, 
					payload: response.errorMsg
				});
			}
		})
	}
}

export function signOut(dispatch) {
	dispatch({type: SIGN_OUT});
}

export function updateAuthInfo(dispatch) {
	if (sessionStorage.getItem('loggedIn') && sessionStorage.getItem('email')) {
		dispatch({
			type: UPDATE_AUTH_INFO, 
			payload: {
				email: sessionStorage.getItem('email'),
				loggedIn: sessionStorage.getItem('loggedIn'),
			}
		});
	}
}

/*
function loadMockUsers() {
	return [
		{
			"email": "test@test.com",
			"password": "test"
		},
		{
			"email": "user@user.com",
			"password": "user"
		}
	];
}

function addUser(email, password) {
	const users = JSON.parse(localStorage.getItem('users')) || [];	
	users.push({email, password});
	localStorage.setItem('users', JSON.stringify(users));
}
*/
