import { AuthenticatedRequest } from './auth';

export function getBusinessId(req: AuthenticatedRequest): number {
  if (!req.user?.businessId) {
    throw new Error('Business ID not found in request');
  }
  return req.user.businessId;
}

export function ensureTenantIsolation(
  queryOptions: any,
  businessId: number
): any {
  return {
    ...queryOptions,
    where: {
      ...queryOptions.where,
      businessId,
    },
  };
}
