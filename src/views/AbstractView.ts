import Data from '../logic/data';

interface AbstractView {
  setTitle(title: string): void;
  getHTML(data: Data): Promise<string>;
}

export default class implements AbstractView {
  constructor() {}

  setTitle(title: string) {
    document.title = title;
  }

  async getHTML(data: Data) {
    return '';
  }
}
