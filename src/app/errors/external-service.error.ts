export class ExternalServiceError extends Error {
  constructor(service: string, message?: string) {
    super(`Error calling ${service} service. ${message}`);
  }
}