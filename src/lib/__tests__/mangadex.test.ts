import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  fetchMangaList,
  fetchMangaById,
  fetchRandomManga,
  getCoverUrl,
  extractCoverFileName,
  resolveTitle,
  resolveTags,
  resolveDescription
} from '../mangadex';

// Mock fetch globally
global.fetch = vi.fn();

describe('MangaDex Client', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchMangaList', () => {
    it('should fetch manga list with default parameters', async () => {
      const mockResponse = {
        data: [],
        total: 0,
        offset: 0,
        limit: 24
      };

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await fetchMangaList();
      
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/manga?limit=24&offset=0')
      );
      expect(result).toEqual(mockResponse);
    });

    it('should fetch manga list with custom parameters', async () => {
      const mockResponse = {
        data: [],
        total: 0,
        offset: 24,
        limit: 12
      };

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await fetchMangaList({
        limit: 12,
        offset: 24,
        title: 'test',
        includedTags: ['tag1', 'tag2']
      });
      
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('limit=12')
        && expect.stringContaining('offset=24')
        && expect.stringContaining('title=test')
        && expect.stringContaining('includedTags[]=tag1')
        && expect.stringContaining('includedTags[]=tag2')
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle API errors', async () => {
      (fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request'
      });

      await expect(fetchMangaList()).rejects.toThrow('MangaDex request failed: 400');
    });
  });

  describe('fetchMangaById', () => {
    it('should fetch manga by ID', async () => {
      const mockResponse = {
        data: {
          id: 'test-id',
          type: 'manga',
          attributes: {},
          relationships: []
        }
      };

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await fetchMangaById('test-id');
      
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/manga/test-id')
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('fetchRandomManga', () => {
    it('should fetch random manga', async () => {
      const mockResponse = {
        data: [{
          id: 'random-id',
          type: 'manga',
          attributes: {},
          relationships: []
        }]
      };

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await fetchRandomManga();
      
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/manga/random')
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getCoverUrl', () => {
    it('should generate cover URL', () => {
      const fileName = 'test-cover.jpg';
      const result = getCoverUrl(fileName);
      
      expect(result).toContain('uploads.mangadex.org');
      expect(result).toContain(fileName);
    });
  });

  describe('extractCoverFileName', () => {
    it('should extract cover file name from relationships', () => {
      const relationships = [
        {
          id: 'cover-id',
          type: 'cover_art',
          attributes: {
            fileName: 'test-cover.jpg'
          }
        }
      ];

      const result = extractCoverFileName(relationships);
      expect(result).toBe('test-cover.jpg');
    });

    it('should return undefined if no cover found', () => {
      const relationships = [
        {
          id: 'author-id',
          type: 'author',
          attributes: {}
        }
      ];

      const result = extractCoverFileName(relationships);
      expect(result).toBeUndefined();
    });
  });

  describe('resolveTitle', () => {
    it('should resolve title from attributes', () => {
      const attributes = {
        title: {
          en: 'English Title',
          fr: 'Titre Français'
        }
      };

      const result = resolveTitle(attributes);
      expect(result).toBe('English Title');
    });

    it('should fallback to first available title', () => {
      const attributes = {
        title: {
          fr: 'Titre Français',
          ja: '日本語タイトル'
        }
      };

      const result = resolveTitle(attributes);
      expect(result).toBe('Titre Français');
    });

    it('should return empty string if no title', () => {
      const attributes = {};
      const result = resolveTitle(attributes);
      expect(result).toBe('');
    });
  });

  describe('resolveTags', () => {
    it('should resolve tags from attributes', () => {
      const attributes = {
        tags: [
          {
            id: 'tag1',
            type: 'tag',
            attributes: {
              name: {
                en: 'Action'
              }
            }
          }
        ]
      };

      const result = resolveTags(attributes);
      expect(result).toContain('Action');
    });

    it('should return empty array if no tags', () => {
      const attributes = {};
      const result = resolveTags(attributes);
      expect(result).toEqual([]);
    });
  });

  describe('resolveDescription', () => {
    it('should resolve description from attributes', () => {
      const attributes = {
        description: {
          en: 'English description',
          fr: 'Description française'
        }
      };

      const result = resolveDescription(attributes);
      expect(result).toBe('English description');
    });

    it('should fallback to first available description', () => {
      const attributes = {
        description: {
          fr: 'Description française'
        }
      };

      const result = resolveDescription(attributes);
      expect(result).toBe('Description française');
    });

    it('should return empty string if no description', () => {
      const attributes = {};
      const result = resolveDescription(attributes);
      expect(result).toBe('');
    });
  });
});
