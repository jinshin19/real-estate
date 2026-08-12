declare module 'trim-request' {
  import type { RequestHandler } from 'express';

  const trim: {
    all: RequestHandler;
  };

  export default trim;
}
