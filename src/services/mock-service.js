function makeRequest(endPoint, data, callBack) {
	setTimeout(() => {
		switch(endPoint) {
			case '/login':
				login(data.email, data.password, callBack);
				break;
			case '/register':
				register(data.email, data.password, callBack);
				break;
			case '/logTheGuess':
				logTheGuess(data.email, data.guess, callBack);
				break;
			case '/getGuessLog':
				getGuessLog(data.email, callBack);
				break;
			default:
				break;
				
		}
	}, ((Math.random() * 2000) + 100));
}

function login(email, password, callBack) {
	let isVerified = false;
	let errorMsg = 'Please input credentials';

	if (email !== '' && password !== '') {
		const users = JSON.parse(localStorage.getItem('users')) || [];
		const user = users.find((user) => user.email === email);		
		isVerified = user !== undefined && user.email === email && user.password === password;
		
		if (!isVerified) {
			errorMsg = 'Invalid credentials';
		}		
	}

	if (callBack) {
		callBack({
			success: isVerified,
			errorMsg: errorMsg
		});
	}
}

function register(email, password, callBack) {
	const users = JSON.parse(localStorage.getItem('users')) || [];
	const user = users.find((user) => user.email === email);	

	if (!user && callBack) {
		addUser(email, password);
		callBack({
			email: email,			
			success: true
		});
	} else {		
		callBack({
			email: email,			
			success: false,
			errorMsg: (email === '' || password === '') ? 'Please input valid data' : 'The user already exists!'
		});
	}
}

function addUser(email, password) {
	const users = JSON.parse(localStorage.getItem('users')) || [];	
	users.push({email, password});
	localStorage.setItem('users', JSON.stringify(users));
}

function logTheGuess(email, guess, callBack) {
	const guessArr = sessionStorage.getItem('gusess') ? JSON.parse(sessionStorage.getItem('gusess')) : [];	
	guessArr.push(guess);
	sessionStorage.setItem('gusess', JSON.stringify(guessArr));

	if (callBack) {
		callBack({
			email: email,
			guess: guess,
			success: true
		});
	}
}

function getGuessLog(email, callBack) {
	const guess = JSON.parse(sessionStorage.getItem(email)) || [];	

	if (callBack) {		
		callBack({
			email: email,
			guess: guess,			
			success: true
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
*/

export default makeRequest;