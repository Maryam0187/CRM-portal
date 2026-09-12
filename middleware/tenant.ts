import { AuthenticatedRequest } from './auth';

export function getOrganizationId(req: AuthenticatedRequest): number {
  if (!req.user?.organizationId) {
    throw new Error('Organization ID not found in request');
  }
  return req.user.organizationId;
}

export function ensureTenantIsolation(
  queryOptions: any,
  organizationId: number
): any {
  return {
    ...queryOptions,
    where: {
      ...queryOptions.where,
      organizationId,
    },
  };
}
