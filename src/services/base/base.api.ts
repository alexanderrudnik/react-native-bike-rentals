export default class BaseAPI {
  getPath(path: string) {
    return `http://localhost:4444${path}`;
  }
}
