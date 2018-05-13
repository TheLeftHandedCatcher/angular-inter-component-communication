export class Task {
    isDone: boolean;
    title: string;

    constructor(isDone: boolean, title: string) {
        this.isDone = isDone;
        this.title = title;
    }
}
