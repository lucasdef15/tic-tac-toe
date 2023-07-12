import { State } from '../store/store';

interface AbstractView {
  setTitle(title: string): void;
  getHTML(state: any): Promise<string>;
}

export default class implements AbstractView {
  constructor() {}

  setTitle(title: string) {
    document.title = title;
  }

  async getHTML(state: State) {
    return '';
  }
}
