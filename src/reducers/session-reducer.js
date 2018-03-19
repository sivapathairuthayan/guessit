import { SIGN_IN, SIGN_OUT, SIGN_IN_FAILED, REGISTER, REGISTER_FAILED } from '../constants/session-constants';

const initState = {
	loggedIn: false,	
	email: '',
	errorMsg: ''
};

function sessionReducer(state = initState, action) {	
	const payload = action.payload;
	switch(action.type) {
		case SIGN_IN:			
			return { ...state, loggedIn: payload.loggedIn, email: payload.email, errorMsg: '' };
		case SIGN_OUT:			
			return { ...state, loggedIn: false, email: false, errorMsg: '' };
		case SIGN_IN_FAILED:		
			return { ...state, ...initState, errorMsg: payload };
		case REGISTER:			
			return { ...state, loggedIn: payload.loggedIn, email: payload.email };
		case REGISTER_FAILED:
			const errorMsg = payload || 'Please enter valid input';
			return { ...state, ...initState, errorMsg: errorMsg };
		default:
			return state;
	}
}

export default sessionReducer;