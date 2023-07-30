import ShortUniqueId from 'short-unique-id';

const uid = new ShortUniqueId();

export function generateUniqueId(length = 10): string {
  return uid.randomUUID(length);
}
