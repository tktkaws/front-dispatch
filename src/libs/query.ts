export const TAGS_KEY = 'tags';

export function parseTags(param: string | null): string[] {
  return (param ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

export function setTags(search: string, tags: string[]): string {
  const usp = new URLSearchParams(search);
  if (tags.length) usp.set(TAGS_KEY, tags.join(','));
  else usp.delete(TAGS_KEY);

  const qs = usp.toString();
  return qs ? `/?${qs}` : '/';
}

