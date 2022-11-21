class DateService {
  getNow() {
    return Date.now();
  }

  format(ms: number) {
    return new Date(ms).toLocaleString("en-US");
  }
}

export const dateService = new DateService();
