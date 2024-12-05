    import * as Sentry from "@sentry/node";
import env from "../../shared/utils/env";

export const initSentry = () => {
    Sentry.init({
        dsn: env.SENTRY_DSN,
        integrations: [
            Sentry.httpIntegration(),
        ],
        tracesSampleRate: 1.0,
    });
};
