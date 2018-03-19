import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import App from './App';
import SignIn from './components/signin';
import Register from './components/register';
import GuessIt from './components/guessit';


it('app component renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('register component renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(GetComponentToTest(Register), div);
  ReactDOM.unmountComponentAtNode(div);
});

it('signin component renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(GetComponentToTest(SignIn), div);
  ReactDOM.unmountComponentAtNode(div);
});

it('guessit component renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(GetComponentToTest(GuessIt), div);
  ReactDOM.unmountComponentAtNode(div);
});



function GetComponentToTest(Component) {
	return (
		<Provider store={store}>
			<HashRouter><Component /></HashRouter>
		</Provider>
	);
}