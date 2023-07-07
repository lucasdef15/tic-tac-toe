interface AbstractView {
  setTitle(title: string): void;
  getHTML(data: { name: string; ties: number }): Promise<string>;
}

export default class implements AbstractView {
  constructor() {}

  setTitle(title: string) {
    document.title = title;
  }

  async getHTML(data: { name: string; ties: number }) {
    return '';
  }
}
