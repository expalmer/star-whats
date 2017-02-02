const constants = require('../constants');

var currentState = {
	user: {},
	contacts: [],
	messages: [],
	controls: {
    term: '',
    input: '',
    typing: '',
    emoji: false,
    options: false,
  }
};

var listeners = [];

function getState() {
	return currentState;
}

function subscribe(fn) {
	listeners.push(fn);
}

function dispatch(action) {

	switch(action.type) {

		case constants.INITIAL: {
			currentState = Object.assign({}, currentState, action.data);
			break;
		}

		case constants.USER_ONLINE: {
			currentState = Object.assign({}, currentState, {
				contacts: currentState.contacts
					.map(c => {
						if (c.username === action.username) {
							c.online = true;
						}
						return c;
					})
			});
			break;
		}

		case constants.USER_OFFLINE: {
			currentState = Object.assign({}, currentState, {
				contacts: currentState.contacts
					.map(c => {
						if (c.username === action.username) {
							c.online = false;
						}
						return c;
					})
			});
			break;
		}

		case constants.OPEN_CHAT: {
			let { controls, user } = currentState;
			let { typing } = controls;
			const { receiver } = action;
			if (user.currentUserChat !== receiver) {
    		typing = '';
  		}
			currentState = Object.assign({}, currentState, {
				controls: Object.assign({}, controls, { typing }),
				user: Object.assign({}, user, {
					currentUserChat: receiver,
					notifications: user.notifications
						.slice()
						.map(n => {
							if (n.username === receiver) {
								n.notSeen = 0;
							}
							return n;
						})
				})
			});
			break;
		}

		case constants.SEARCH_TERM: {
			let { controls } = currentState;
			currentState = Object.assign({}, currentState, {
				controls: Object.assign({}, controls, { term: action.term }),
			});
			break;
		}

		case constants.INPUT_VALUE: {
			let { controls } = currentState;
			currentState = Object.assign({}, currentState, {
				controls: Object.assign({}, controls, { input: action.value }),
			});
			break;
		}

		case constants.ADD_MESSAGE: {
			const { message } = action;
			let { controls, user, messages } = currentState;
			let { typing } = controls;
			if (user.username === message.to) {
				typing = '';
			}
			currentState = Object.assign({}, currentState, {
				messages: [ ...messages, action.message ],
				controls: Object.assign({}, controls, { typing }),
			});
			break;
		}

		case constants.MESSAGE_SEEN: {
			const { user, messages } = currentState;
			const { receiver } = action;
			const sender = user.username;
			currentState = Object.assign({}, currentState, {
				messages: messages.slice()
					.map(m => {
						if (m.from === sender && m.to === receiver) {
							m.seen = true;
						}
						return m;
					})
			});
			break;
		}

		case constants.MESSAGE_NOT_SEEN: {
			const { user } = currentState;
			const { notifications } = action;
			currentState = Object.assign({}, currentState, {
				user: Object.assign({}, user, {
					notifications
				})
			});
			break;
		}

		case constants.TOGGLE_OPTIONS: {
			const { controls } = currentState;
			currentState = Object.assign({}, currentState, {
				controls: Object.assign({}, controls, {
					options: !controls.options
				})
			});
			break;
		}

		case constants.TOGGLE_EMOJI: {
			const { controls } = currentState;
			currentState = Object.assign({}, currentState, {
				controls: Object.assign({}, controls, {
					emoji: !controls.emoji
				})
			});
			break;
		}

		case constants.SELECT_EMOJI: {
			let { controls } = currentState;
			const value = controls.input + action.value;
			currentState = Object.assign({}, currentState, {
				controls: Object.assign({}, controls, {
					input: value,
					emoji: '',
				}),
			});
		}

		case constants.USER_TYPING: {
			let { controls } = currentState;
			let { sender } = action;
			currentState = Object.assign({}, currentState, {
				controls: Object.assign({}, controls, {
					typing: sender,
				}),
			});
		}

	}
	listeners.slice().forEach(listener => listener());
}

module.exports = {
	getState,
	subscribe,
	dispatch,
};