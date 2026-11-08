export type ApiVersion = 'v1' | 'v2';

// Per-endpoint API version. Default is v1; set to 'v2' only for endpoints
// that the backend has shipped and tested. Rollback = set back to 'v1'.
export const API_VERSIONS = {
  fruits: {
    list: 'v2',
    create: 'v1',
    patch: 'v1',
    delete: 'v1',
  },
} as const satisfies Record<string, Record<string, ApiVersion>>;

export const withApiVersion = (version: ApiVersion, path: string) =>
  version === 'v2' ? `/v2${path}` : path;
