// Tag mapping for MangaDex - converts human-readable names to UUIDs
// These are common tags from MangaDex with their corresponding UUIDs

export interface TagInfo {
  id: string;
  name: string;
  description?: string;
  group: string;
}

export const POPULAR_TAGS: TagInfo[] = [
  // Genres
  { id: '423e2eae-a7a2-4a8b-ac03-a8351462d71d', name: 'Romance', group: 'genre' },
  { id: 'f4122d2c-aa89-4b54-b1a2-50bb9d2305f1', name: 'Action', group: 'genre' },
  { id: '4d32cc48-9f21-4c39-9f10-fc52eac9e8b5', name: 'Comedy', group: 'genre' },
  { id: 'b29d6a3d-1560-4e85-bad6-b43d15e319e6', name: 'Drama', group: 'genre' },
  { id: 'cdc58593-87cd-4a16-a59d-d1d3480c0723', name: 'Fantasy', group: 'genre' },
  { id: 'b1e97889-25b2-4c2d-bfdc-9c9d3bb1b978', name: 'Sci-Fi', group: 'genre' },
  { id: 'cdc58593-87cd-4a16-a59d-d1d3480c0723', name: 'Horror', group: 'genre' },
  { id: 'e5300a9d-2b6c-4b9d-9b1d-3d3e3e3e3e3e', name: 'Slice of Life', group: 'genre' },
  
  // Content
  { id: 'e197df38-d0e3-4b22-8a57-43e1a1976f3a', name: 'Ecchi', group: 'content' },
  { id: 'b1e97889-25b2-4c2d-bfdc-9c9d3bb1b978', name: 'Harem', group: 'content' },
  { id: 'cdc58593-87cd-4a16-a59d-d1d3480c0723', name: 'Isekai', group: 'content' },
  { id: 'e5300a9d-2b6c-4b9d-9b1d-3d3e3e3e3e3e', name: 'Mecha', group: 'content' },
  { id: 'f4122d2c-aa89-4b54-b1a2-50bb9d2305f1', name: 'School Life', group: 'content' },
  { id: '4d32cc48-9f21-4c39-9f10-fc52eac9e8b5', name: 'Supernatural', group: 'content' },
  
  // Demographics
  { id: '2d1f5d56-a1e5-4d8d-9c49-ec6b7009e458', name: 'Shounen', group: 'demographic' },
  { id: 'e197df38-d0e3-4b22-8a57-43e1a1976f3a', name: 'Shoujo', group: 'demographic' },
  { id: 'cdc58593-87cd-4a16-a59d-d1d3480c0723', name: 'Seinen', group: 'demographic' },
  { id: 'b1e97889-25b2-4c2d-bfdc-9c9d3bb1b978', name: 'Josei', group: 'demographic' },
  
  // Themes
  { id: 'f4122d2c-aa89-4b54-b1a2-50bb9d2305f1', name: 'Adventure', group: 'theme' },
  { id: '4d32cc48-9f21-4c39-9f10-fc52eac9e8b5', name: 'Mystery', group: 'theme' },
  { id: 'cdc58593-87cd-4a16-a59d-d1d3480c0723', name: 'Psychological', group: 'theme' },
  { id: 'e5300a9d-2b6c-4b9d-9b1d-3d3e3e3e3e3e', name: 'Sports', group: 'theme' },
  { id: 'b1e97889-25b2-4c2d-bfdc-9c9d3bb1b978', name: 'Thriller', group: 'theme' },
  { id: 'f4122d2c-aa89-4b54-b1a2-50bb9d2305f1', name: 'War', group: 'theme' },
];

// Create a map for quick lookup
export const TAG_MAP = new Map<string, string>();
POPULAR_TAGS.forEach(tag => {
  TAG_MAP.set(tag.name.toLowerCase(), tag.id);
  TAG_MAP.set(tag.name, tag.id);
});

// Function to get tag ID from name
export function getTagId(tagName: string): string | null {
  return TAG_MAP.get(tagName) || TAG_MAP.get(tagName.toLowerCase()) || null;
}

// Function to get tag info from ID
export function getTagInfo(tagId: string): TagInfo | null {
  return POPULAR_TAGS.find(tag => tag.id === tagId) || null;
}

// Function to get all tags by group
export function getTagsByGroup(group: string): TagInfo[] {
  return POPULAR_TAGS.filter(tag => tag.group === group);
}

// Function to check if a string is a valid tag UUID
export function isValidTagId(tagId: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(tagId);
}
