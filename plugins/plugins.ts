import { Plugin } from 'vite';
import debugUrl from './debugUrl';
import shareResource from './shareResource';

const plugins: Plugin[] = [shareResource(), debugUrl()];
export default plugins;
