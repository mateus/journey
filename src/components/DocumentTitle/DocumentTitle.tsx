import {useEffect} from 'react';

interface DocumentTitleProps {
  title: string;
  source?: string;
}

export function DocumentTitle({title, source}: DocumentTitleProps) {
  useEffect(() => {
    const newTitle = createDocumentTitle(title, source);
    if (newTitle !== document.title) {
      document.title = newTitle;
    }
  }, [source, title]);

  return null;
}

export function createDocumentTitle(title: string, source = 'Journey') {
  return [source, title].join(' - ');
}
