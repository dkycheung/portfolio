import { glob } from 'glob';

const components = glob.sync(['src/components/**/*.vue', 'src/views/**/*.vue']);
console.log('Found components:', components);
