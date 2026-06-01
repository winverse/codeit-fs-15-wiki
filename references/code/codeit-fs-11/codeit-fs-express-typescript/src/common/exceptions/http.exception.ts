export class HttpException extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = new.target.name;
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string, details?: unknown) {
    super(400, message, details);
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string, details?: unknown) {
    super(404, message, details);
  }
}

export class ConflictException extends HttpException {
  constructor(message: string, details?: unknown) {
    super(409, message, details);
  }
}
