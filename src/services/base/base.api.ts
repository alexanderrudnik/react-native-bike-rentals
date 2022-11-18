export default class BaseAPI {
  getPath(path: string) {
    return `http://192.168.0.102:4444${path}`;
  }
}
