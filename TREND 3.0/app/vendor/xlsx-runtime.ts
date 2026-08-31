// O motor XLSX é distribuído junto do CRM para não depender do instalador da hospedagem.
import * as runtime from "./xlsx.mjs";

export const read = runtime.read as (data: ArrayBuffer, options?: Record<string, unknown>) => {
  SheetNames: string[];
  Sheets: Record<string, unknown>;
};

export const utils = runtime.utils as {
  sheet_to_json<T>(sheet: unknown, options?: Record<string, unknown>): T[];
};
