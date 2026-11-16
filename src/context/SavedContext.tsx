import React, { createContext, useContext, useState, useEffect } from 'react';
import { CollectionFolder, SavedState } from '../types';

interface SavedContextType {
  savedState: SavedState;
  toggleSave: (itemId: string, folder?: CollectionFolder) => void;
  isSaved: (itemId: string, folder?: CollectionFolder) => boolean;
  getFoldersContaining: (itemId: string) => CollectionFolder[];
  moveToFolder: (itemId: string, targetFolder: CollectionFolder) => void;
  removeFromFolder: (itemId: string, folder: CollectionFolder) => void;
  clearCollection: (folder: CollectionFolder) => void;
  totalSavedCount: number;
}

const STORAGE_KEY = 'sisip_saved_collections_v1';

const DEFAULT_STATE: SavedState = {
  'places-to-visit': ['disc-1', 'disc-4'],
  'weekend-ideas': ['disc-7'],
  'creative-things': ['disc-3', 'disc-6'],
  'hidden-gems': ['disc-2', 'disc-10'],
};

const SavedContext = createContext<SavedContextType | undefined>(undefined);

export const SavedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedState, setSavedState] = useState<SavedState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed reading saved collection from localStorage', e);
    }
    return DEFAULT_STATE;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedState));
    } catch (e) {
      console.error('Failed saving to localStorage', e);
    }
  }, [savedState]);

  const isSaved = (itemId: string, folder?: CollectionFolder): boolean => {
    if (folder) {
      return savedState[folder]?.includes(itemId) || false;
    }
    return Object.values(savedState).some((arr) => arr.includes(itemId));
  };

  const getFoldersContaining = (itemId: string): CollectionFolder[] => {
    return (Object.keys(savedState) as CollectionFolder[]).filter((folder) =>
      savedState[folder].includes(itemId)
    );
  };

  const toggleSave = (itemId: string, targetFolder: CollectionFolder = 'places-to-visit') => {
    setSavedState((prev) => {
      const currentList = prev[targetFolder] || [];
      const alreadyInFolder = currentList.includes(itemId);

      const updatedFolderList = alreadyInFolder
        ? currentList.filter((id) => id !== itemId)
        : [...currentList, itemId];

      return {
        ...prev,
        [targetFolder]: updatedFolderList,
      };
    });
  };

  const moveToFolder = (itemId: string, targetFolder: CollectionFolder) => {
    setSavedState((prev) => {
      // remove from all, then add to target
      const newState: SavedState = {
        'places-to-visit': prev['places-to-visit'].filter((id) => id !== itemId),
        'weekend-ideas': prev['weekend-ideas'].filter((id) => id !== itemId),
        'creative-things': prev['creative-things'].filter((id) => id !== itemId),
        'hidden-gems': prev['hidden-gems'].filter((id) => id !== itemId),
      };
      newState[targetFolder] = [...newState[targetFolder], itemId];
      return newState;
    });
  };

  const removeFromFolder = (itemId: string, folder: CollectionFolder) => {
    setSavedState((prev) => ({
      ...prev,
      [folder]: prev[folder].filter((id) => id !== itemId),
    }));
  };

  const clearCollection = (folder: CollectionFolder) => {
    setSavedState((prev) => ({
      ...prev,
      [folder]: [],
    }));
  };

  const totalSavedCount = Array.from(
    new Set([
      ...savedState['places-to-visit'],
      ...savedState['weekend-ideas'],
      ...savedState['creative-things'],
      ...savedState['hidden-gems'],
    ])
  ).length;

  return (
    <SavedContext.Provider
      value={{
        savedState,
        toggleSave,
        isSaved,
        getFoldersContaining,
        moveToFolder,
        removeFromFolder,
        clearCollection,
        totalSavedCount,
      }}
    >
      {children}
    </SavedContext.Provider>
  );
};

export const useSaved = () => {
  const context = useContext(SavedContext);
  if (!context) {
    throw new Error('useSaved must be used within a SavedProvider');
  }
  return context;
};
