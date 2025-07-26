declare module 'rollup/parseAst' {
  export function parseAst(input: string, options?: { allowReturnOutsideFunction?: boolean; jsx?: boolean }): any;
  export function parseAstAsync(
    input: string,
    options?: { allowReturnOutsideFunction?: boolean; jsx?: boolean; signal?: AbortSignal },
  ): Promise<any>;
}
