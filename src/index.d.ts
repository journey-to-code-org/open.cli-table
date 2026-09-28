export interface TableOptions {
  padding?: number;
  border?: boolean;
  header?: boolean;
  align?: ("left"|"right"|"center")[];
}
export function table(rows: readonly (readonly unknown[])[], options?:TableOptions):string;
export function tableFromObjects<T extends Record<string,unknown>>(items:readonly T[],columns:string[]):unknown[][];

