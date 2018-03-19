import { LOG_GUESS, CLEAR_GUESS_LOG } from '../constants/guessit-constants';

const initState = {
	guesses: [],	
};

function guessItReducer(state = initState, action) {	
	const payload = action.payload;
	switch(action.type) {
		case LOG_GUESS:
			return { 
				...state, 
				guesses: [
					...state.guesses, payload.guess
				]
			};
		case CLEAR_GUESS_LOG:
			return { 
				...state, ...initState
			};

		default:
			return state;
	}
}

export default guessItReducer;