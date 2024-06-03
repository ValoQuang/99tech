export interface ErrorHandler extends Error  {
    statusCode: number;
}

export const errorHandler = (statusCode: number, message: string) => {
    const error = new Error() as ErrorHandler;
    error.statusCode = statusCode;
    error.message = message;
    return error;
  };