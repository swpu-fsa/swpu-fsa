import clsx from 'clsx';
import type { MDXContent } from 'mdx/types';
import Navbar from './components/navbar';

interface DocFrontmatter {
  title: string;
  category: string;
  order: number;
}

interface GlobDoc {
  default: MDXContent;
  frontmatter: DocFrontmatter;
}

const docs: Record<string, GlobDoc> = import.meta.glob('./docs/**/*.mdx', {
  eager: true,
});

export const docs_routes = Object.entries(docs).map(([key, value]) => ({
  path: key.replace('.', '').replace('.mdx', ''),
  element: <Document document={value.default} />,
}));

export interface DocumentProps {
  document: MDXContent;
}

export default function Document({ document }: DocumentProps) {
  return (
    <div
      className={clsx(
        'h-screen flex flex-col',
        'bg-[#e9dffd] dark:bg-[#161823]',
      )}
    >
      <Navbar />
      <div className="size-full flex flex-row overflow-hidden">
        <div className="sticky flex-3 h-full">
          <div className="flex flex-col px-12 w-full items-start">
            <div className="flex flex-col">
              <span>git</span>
            </div>
            <div className="flex flex-col">
              <span>frontend</span>
            </div>
            <div className="flex flex-col">
              <span>backend</span>
            </div>
          </div>
        </div>

        <div className="flex-10 flex flex-row overflow-y-auto">
          <article className="flex-7">
            {document({
              components: {
                code: ({ children }) => (
                  <div className="bg-[#f5f2ff] dark:bg-[#2a2d3a] p-4 rounded-md">
                    {children}
                  </div>
                ),
              },
            })}
          </article>

          <div className={clsx('sticky top-0 left-0', 'flex flex-3 flex-col')}>
            <div className="size-full ">
              {/* 小彩蛋 */}
              This page
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
