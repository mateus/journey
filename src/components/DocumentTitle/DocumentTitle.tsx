import {useEffect} from 'react';

export interface DocumentTitleProps {
  title: string;
  source?: string;
}

export const DEFAULT_SOURCE = 'Journey';

export function DocumentTitle({title, source}: DocumentTitleProps) {
  useEffect(() => {
    const newTitle = createDocumentTitle(title, source);
    if (newTitle !== document.title) {
      document.title = newTitle;
    }
  }, [source, title]);

  return null;
}

export function createDocumentTitle(title: string, source = DEFAULT_SOURCE) {
  return [source, title].join(' - ');
}
