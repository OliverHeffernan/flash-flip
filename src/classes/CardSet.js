export default class CardSet {
	static instance = null;

	constructor() {
		if (CardSet.instance) {
			return CardSet.instance;
		}

		this.cards = [];
		CardSet.instance = this;
	}

	addCard(card) {
		this.cards.push(card);
	}

	editCard(index, newCard) {
		this.cards[index] = newCard;
	}

	removeCard(index) {
		this.cards.splice(index, 1);
	}

	getCard(index) {
		return this.cards[index];
	}

	get cards() {
		return this.cards;
	}
}
