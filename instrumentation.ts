import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { BatchLogRecordProcessor, LoggerProvider } from "@opentelemetry/sdk-logs";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST?.replace(/\/$/, "");
const missingPostHogVariable = !posthogKey ? "NEXT_PUBLIC_POSTHOG_KEY" : !posthogHost ? "NEXT_PUBLIC_POSTHOG_HOST" : null;

export const posthogLoggerProvider = posthogKey && posthogHost
  ? new LoggerProvider({
      resource: resourceFromAttributes({ "service.name": "vom-website" }),
      processors: [
        new BatchLogRecordProcessor({
          exporter: new OTLPLogExporter({
            url: `${posthogHost}/i/v1/logs`,
            headers: {
              Authorization: `Bearer ${posthogKey}`,
              "Content-Type": "application/json",
            },
            timeoutMillis: 2000,
          }),
          exportTimeoutMillis: 2000,
        }),
      ],
    })
  : undefined;

export const posthogLogger = posthogLoggerProvider?.getLogger("vom-website.posthog");

export async function flushPostHogLogs() {
  await posthogLoggerProvider?.forceFlush().catch(() => {});
}

export function register() {
  if (process.env.NEXT_RUNTIME === "nodejs" && missingPostHogVariable && process.env.NODE_ENV !== "production") {
    console.warn(
      `${missingPostHogVariable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missingPostHogVariable} is configured`,
    );
  }
}
