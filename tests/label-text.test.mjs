import assert from 'node:assert/strict';
import { test } from 'node:test';
import { labelText } from '../src/components/homepage-prototype/label-text.ts';

test('outputs actual Mtavruli while leaving Latin for CSS', () => {
  assert.equal(labelText('აირჩიე თემა — UI 10-13'), 'ᲐᲘᲠᲩᲘᲔ ᲗᲔᲛᲐ — UI 10-13');
  assert.equal(labelText('ყველა რესურსი / View all'), 'ᲧᲕᲔᲚᲐ ᲠᲔᲡᲣᲠᲡᲘ / View all');
});
test('covers the full alphabet, is idempotent, and preserves punctuation', () => {
  const lower = Array.from({length: 46}, (_, i) => String.fromCharCode(i < 43 ? 0x10d0+i : 0x10fd+i-43)).join('');
  assert.equal(labelText(lower), lower.toUpperCase());
  assert.equal(labelText(labelText(lower)), labelText(lower));
  for (const value of ['', 'ᲐᲑᲒ', '10–13 · 4:30', '🙂', '\u10fb\u10fc']) assert.equal(labelText(value), value);
});
