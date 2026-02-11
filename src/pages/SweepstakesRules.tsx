import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './SweepstakesRules.module.css';

export default function SweepstakesRules() {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}sweepstakesrules/sweepstakesrules.md`)
      .then(res => res.text())
      .then(setContent)
      .catch(() => setContent('# Error\nFailed to load sweepstakes rules.'));
  }, []);

  return (
    <>
      <Helmet><title>Sweepstakes Rules - Visual Studio Wallpapers</title></Helmet>
      <article className={styles.rules}>
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            table: ({ children, ...props }) => (
              <div className={styles.tableWrapper} role="region" aria-label="Data table" tabIndex={0}>
                <table {...props}>{children}</table>
              </div>
            ),
          }}
        >
          {content}
        </Markdown>
      </article>
    </>
  );
}
