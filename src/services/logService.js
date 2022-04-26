import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

const init = () => {
  Sentry.init({
    dsn: 'https://4e10592223b84d86ad30d15ad342e449@o1208240.ingest.sentry.io/6342664',
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
};

const log = (error) => {
  Sentry.captureException(error);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  init,
  log,
};
