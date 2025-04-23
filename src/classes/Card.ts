export default class Card {
	private question: string;
	private answer: string;

	constructor(question: string, answer: string) {
		this.question = question;
		this.answer = answer;
	}

	public getQuestion(): string {
		return this.question;
	}

	public getAnswer(): string {
		return this.answer;
	}
}
