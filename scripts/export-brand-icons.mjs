import { mkdir, writeFile } from 'node:fs/promises';
import { siCoreldraw, siSketch, siFigma, siClaude, siCursor } from 'simple-icons';

const icons = [siCoreldraw, siSketch, siFigma, siClaude, siCursor];
const output = new URL('../public/assets/logos/', import.meta.url);

await mkdir(output, { recursive: true });

for (const icon of icons) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>${icon.title}</title><path fill="#${icon.hex}" d="${icon.path}"/></svg>`;
  await writeFile(new URL(`${icon.slug}.svg`, output), svg);
}
