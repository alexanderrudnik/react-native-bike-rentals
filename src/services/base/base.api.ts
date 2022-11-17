export default class BaseAPI {
  getPath(path: string) {
    return `http://localhost:444${path}`;
  }
}
