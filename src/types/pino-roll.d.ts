declare module 'pino-roll' {
  interface RollOptions {
    file: string;
    size?: string;
    interval?: string;
    keep?: number;
    mkdir?: boolean;
    compress?: boolean;
  }
  
  export function roll(options: RollOptions): void;
} 