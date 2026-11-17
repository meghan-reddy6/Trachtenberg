import React, { useMemo } from 'react';
import katex from 'katex';

interface KaTeXViewProps {
  math: string;
  block?: boolean;
  className?: string;
}

export const KaTeXView: React.FC<KaTeXViewProps> = ({ math, block = false, className = '' }) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: block,
        throwOnError: false,
        strict: false
      });
    } catch (e) {
      console.warn('KaTeX render error:', e);
      return `<span class="katex-error font-mono">${math}</span>`;
    }
  }, [math, block]);

  return (
    <span
      className={`katex-container ${block ? 'block my-2 overflow-x-auto py-1 text-center' : 'inline-block'} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
