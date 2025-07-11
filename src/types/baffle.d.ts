declare module 'baffle' {
  export interface Baffle {
    once(): Baffle;
    start(): Baffle;
    stop(): Baffle;
    reveal(duration?: number, delay?: number): Baffle;
    set(opts: BaffleOptions): Baffle;
    text(fn: (text: string) => string): Baffle;
    reconfigure(options: { characters?: string; speed?: number }): Baffle;
  }

  export default function baffle(selector: string | HTMLElement, options?: BaffleOptions): Baffle;

  export type BaffleOptions = {
    characters?: string;
    speed?: number;
    exclude?: string[];
  };
}
