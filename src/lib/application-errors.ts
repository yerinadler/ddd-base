import { StatusCodes } from 'http-status-codes';

export class ApplicationError extends Error {
  public readonly httpCode: number;
  public readonly statusCode: string;
  constructor(httpCode: number, statusCode: string, message: string) {
    super(message);
    this.httpCode = httpCode;
    this.statusCode = statusCode;
  }
}

export class NotFoundException extends ApplicationError {
  constructor(public readonly message: string) {
    super(StatusCodes.NOT_FOUND, '404', message || 'Entity not found');
  }
}

export class ConcurrencyException extends ApplicationError {
  constructor(public readonly message: string) {
    super(StatusCodes.CONFLICT, '409', message || 'Concurrency detected');
  }
}
