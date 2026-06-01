import cors from 'cors';
import { corsOrigins } from '#config';

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || corsOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(null, false);
  },
  credentials: true,
};

export const corsMiddleware = cors(corsOptions);

