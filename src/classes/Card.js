export default class Card {
	constructor(q, a) {
		this._question = q;
		this._answer = a;
	}

	get question() {
		return this._question;
	}

	get answer() {
		return this._answer;
	}

	set question(value) {
		this._question = value;
	}

	set answer(value) {
		this._answer = value;
	}
}
