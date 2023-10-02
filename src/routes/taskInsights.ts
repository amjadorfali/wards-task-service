import express, { NextFunction, Request, Response } from 'express';
import { generateAuthHandler } from '../middlewares/authHandler';
import { validate } from '../utils/validations';
import { body, param } from 'express-validator';
import { taskInsightService } from '../services/TaskInsightsService';
import { getResponse } from '../utils';

export const taskInsightsRoute = express.Router();
const authHandler = generateAuthHandler({ includeCognitoEmail: true });

taskInsightsRoute.put(
  '/:id',
  validate([
    param('id', 'InvalidValue').isString(),
    body('sslIssuedBy', 'InvalidValue').isString(),
    body('sslExpiresOn', 'InvalidValue').isString(),
    body('status', 'InvalidValue').isNumeric(),
  ]),
  async (req: Request, res: Response, next: NextFunction) => {
    const { sslIssuedBy, sslExpiresOn, status } = req.body;
    taskInsightService
      .updateTaskInsights(req.params.id, sslIssuedBy, sslExpiresOn, status)
      .then((data) => {
        res.json(getResponse.success(data));
      })
      .catch((e) => {
        console.log(e);
        next(e);
      });
  },
);
