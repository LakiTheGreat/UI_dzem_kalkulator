export type ApiVersion = "v1" | "v2";

// Per-endpoint API version. Default is v1; set to 'v2' only for endpoints
// that the backend has shipped and tested. Rollback = set back to 'v1'.
export const API_VERSIONS = {
  fruits: {
    list: "v2",
    create: "v2",
    patch: "v2",
    delete: "v2",
  },
  cups: {
    list: "v2",
  },
  cupCosts: {
    list: "v2",
    put: "v2",
  },
  cupValues: {
    list: "v2",
    put: "v2",
  },
  tomatoes: {
    cups: "v2",
    totals: "v2",
    orderList: "v2",
    orderById: "v2",
    orderCreate: "v2",
    orderUpdate: "v2",
    orderDelete: "v2",
    transactionList: "v2",
    transactionById: "v2",
    transactionCreate: "v2",
    transactionUpdate: "v2",
    transactionDelete: "v2",
  },
} as const satisfies Record<string, Record<string, ApiVersion>>;

export const withApiVersion = (version: ApiVersion, path: string) =>
  version === "v2" ? `/v2${path}` : path;
