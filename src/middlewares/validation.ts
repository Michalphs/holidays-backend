import { NextFunction, Request, Response } from 'express';
import { Schema } from 'joi';

export default (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const { details } = error;
    const errorsDetail = details.map((i) => ({ message: i.message, type: i.type, key: i.context?.key }));

    res.status(422).json({ error: errorsDetail });
  } else next();
};
