import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { internalErrorResponse } from '../utils/responses';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  logger.error({ err, path: req.path, method: req.method }, 'Unhandled error');

  const response = internalErrorResponse('Internal server error');
  res.status(500).json(response);
}
