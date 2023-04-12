class Exception {
  constructor(message, name) {
    this.name = name;
    this.message = message;
  }
}

export class UnauthenticatedException extends Exception {
  constructor(message, name = "UnauthenticatedException") {
    super(message, name);
  }
}
