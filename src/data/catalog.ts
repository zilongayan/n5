export type CatalogItem = {
  id: string;
  title: string;
  cover: string;
  tags: string[];
};

function generateMockItem(id: number): CatalogItem {
  return {
    id: String(id),
    title: `Sample Gallery #${id}`,
    cover: `https://picsum.photos/seed/${id}/300/400`,
    tags: ['tag' + (id % 5), 'artist' + (id % 7)]
  };
}

const MOCK_SIZE = 120;
const MOCK_DB: CatalogItem[] = Array.from({length: MOCK_SIZE}).map((_, i) =>
  generateMockItem(i + 1)
);

export async function getCatalogPage({
  page,
  pageSize = 24
}: {
  page: number;
  pageSize?: number;
}) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const recent = MOCK_DB.slice(start, end);
  // Popular is a shuffled slice
  const popular = [...MOCK_DB]
    .sort(() => Math.random() - 0.5)
    .slice(0, pageSize);
  return {recent, popular, total: MOCK_DB.length};
}

export async function getRandomItem(): Promise<CatalogItem> {
  return MOCK_DB[Math.floor(Math.random() * MOCK_DB.length)];
}

export async function getItemById(id: string): Promise<CatalogItem | null> {
  return MOCK_DB.find((x) => x.id === id) ?? null;
}

export async function searchCatalog(query: string): Promise<CatalogItem[]> {
  const q = query.toLowerCase();
  return MOCK_DB.filter(
    (x) => x.title.toLowerCase().includes(q) || x.tags.some((t) => t.includes(q))
  ).slice(0, 48);
}

export function searchItems({query = '', tags = '', artists = '', page = 1}: {
  query?: string;
  tags?: string;
  artists?: string;
  page?: number;
}) {
  let filtered = [...MOCK_DB];
  
  // Filter by search query
  if (query) {
    const searchTerm = query.toLowerCase();
    filtered = filtered.filter(item => 
      item.title.toLowerCase().includes(searchTerm) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }
  
  // Filter by tags
  if (tags) {
    const tagList = tags.toLowerCase().split(',').map(t => t.trim());
    filtered = filtered.filter(item =>
      tagList.some(tag => item.tags.some(itemTag => itemTag.toLowerCase().includes(tag)))
    );
  }
  
  // Filter by artists (simulated)
  if (artists) {
    const artistList = artists.toLowerCase().split(',').map(a => a.trim());
    filtered = filtered.filter(item =>
      artistList.some(artist => item.title.toLowerCase().includes(artist))
    );
  }
  
  // Pagination
  const itemsPerPage = 24;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  return filtered.slice(startIndex, endIndex);
}


