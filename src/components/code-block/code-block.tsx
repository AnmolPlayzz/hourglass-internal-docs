import { ReactElement } from 'react';
import styles from './code-block.module.css';

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export default function CodeBlock({ children, className, ...props }: CodeBlockProps): ReactElement {
  const language = className?.replace(/language-/, '') || '';
  
  return (
    <div className={styles.codeContainer}>
      {language && (
        <div className={styles.languageLabel}>
          {language}
        </div>
      )}
      <pre className={`${className} ${styles.codeBlock}`} {...props}>
        {children}
      </pre>
    </div>
  );
}
