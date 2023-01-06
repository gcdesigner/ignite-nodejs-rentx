class AppError {
  public readonly message;
  public readonly statusCode;

  constructor(message: string, statusCode = 401) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export { AppError };
