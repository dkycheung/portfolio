import { Plugin } from 'vite';

export default function debugUrl(): Plugin {
  return {
    name: 'debug-urls',
    transform(code, id) {
      // console.log({ code, id });
      if (code.includes('new URL(')) {
        console.log(`URL construction in ${id}:`, code.match(/new UR:\(.*?\)/g));
      }
    },
  };
}
