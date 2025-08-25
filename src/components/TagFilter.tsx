'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { POPULAR_TAGS, getTagsByGroup, TagInfo } from '@/lib/tagMapping';
import { useTranslations } from '@/hooks/useTranslations';

interface TagFilterProps {
  className?: string;
}

export function TagFilter({ className = '' }: TagFilterProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { locale } = useTranslations();

  // Initialize selected tags from URL params
  useEffect(() => {
    const tagsParam = searchParams.get('tags');
    if (tagsParam) {
      setSelectedTags(tagsParam.split(',').map(t => t.trim()));
    }
  }, [searchParams]);

  const handleTagToggle = (tagId: string) => {
    const newTags = selectedTags.includes(tagId)
      ? selectedTags.filter(t => t !== tagId)
      : [...selectedTags, tagId];
    
    setSelectedTags(newTags);
    
    // Update URL
    const params = new URLSearchParams(searchParams);
    if (newTags.length > 0) {
      params.set('tags', newTags.join(','));
    } else {
      params.delete('tags');
    }
    
    router.push(`/${locale}/search?${params.toString()}`);
  };

  const clearAllTags = () => {
    setSelectedTags([]);
    const params = new URLSearchParams(searchParams);
    params.delete('tags');
    router.push(`/${locale}/search?${params.toString()}`);
  };

  const renderTagGroup = (groupName: string, groupLabel: string) => {
    const tags = getTagsByGroup(groupName);
    if (tags.length === 0) return null;

    return (
      <div key={groupName} className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
          {groupLabel}
        </h4>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => handleTagToggle(tag.id)}
              className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                selectedTags.includes(tag.id)
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Selected Tags Display */}
      {selectedTags.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Tags sélectionnés ({selectedTags.length})
            </span>
            <button
              onClick={clearAllTags}
              className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              Effacer tout
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tagId) => {
              const tagInfo = POPULAR_TAGS.find(t => t.id === tagId);
              return (
                <span
                  key={tagId}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm flex items-center gap-2"
                >
                  {tagInfo?.name || tagId}
                  <button
                    onClick={() => handleTagToggle(tagId)}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                  >
                    ×
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Tag Categories */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Filtrer par tags
          </h3>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {isExpanded ? 'Réduire' : 'Développer'}
          </button>
        </div>

        {isExpanded && (
          <div className="space-y-4">
            {renderTagGroup('genre', 'Genres')}
            {renderTagGroup('content', 'Contenu')}
            {renderTagGroup('demographic', 'Démographie')}
            {renderTagGroup('theme', 'Thèmes')}
          </div>
        )}
      </div>
    </div>
  );
}
