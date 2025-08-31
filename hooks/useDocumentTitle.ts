import { useEffect } from 'react';

export function useDocumentTitle(title: string) {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = `${title} | Xploreon - Space Innovation`;
    
    return () => {
      document.title = originalTitle;
    };
  }, [title]);
}