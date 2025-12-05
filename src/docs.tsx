import clsx from 'clsx';
import type { MDXContent } from 'mdx/types';
import { useNavigate } from 'react-router';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Navbar from './components/navbar';

interface Frontmatter {
  title: string;
  order: number;
  seniorMessage: string;
  githubLink: string;
}

interface GlobDoc {
  default: MDXContent;
  frontmatter: Frontmatter;
}

interface DocInfo {
  path: string;
  group: string;
  entry: string;
  title: string;
  order: number;
  document: MDXContent;
  seniorMessage: string;
  githubLink: string;
}

const docs: Record<string, GlobDoc> = import.meta.glob('./docs/**/*.mdx', {
  eager: true,
});

const allDocs: DocInfo[] = Object.entries(docs).map(([key, value]) => {
  const pathParts = key.split('/');
  const docsIndex = pathParts.indexOf('docs');

  const group =
    docsIndex !== -1 && pathParts.length > docsIndex + 1
      ? pathParts[docsIndex + 1]
      : '';

  const entry =
    docsIndex !== -1 && pathParts.length > docsIndex + 2
      ? pathParts[docsIndex + 2]
      : '';

  return {
    path: key.replace('.', '').replace('.mdx', ''),
    group,
    entry,
    title: value.frontmatter.title,
    order: value.frontmatter.order,
    document: value.default,
    seniorMessage: value.frontmatter.seniorMessage,
    githubLink: value.frontmatter.githubLink,
  };
});

const docsStruct = allDocs.reduce(
  (acc, doc) => {
    if (!acc[doc.group]) {
      acc[doc.group] = {};
    }
    if (!acc[doc.group][doc.entry]) {
      acc[doc.group][doc.entry] = [];
    }
    acc[doc.group][doc.entry].push(doc);
    return acc;
  },
  {} as Record<string, Record<string, DocInfo[]>>,
);

const groupOrder = ['guides', 'coding'];

const entryOrder = {
  guides: ['git', 'frontend', 'backend'],
  coding: ['welcome', 'projects'],
};

const sortedGroups = groupOrder
  .filter((group) => docsStruct[group])
  .concat(
    Object.keys(docsStruct).filter((group) => !groupOrder.includes(group)),
  );

const sortedEntries: Record<string, string[]> = {};
sortedGroups.forEach((group) => {
  const entries = Object.keys(docsStruct[group]);
  const order = entryOrder[group as keyof typeof entryOrder] || [];

  sortedEntries[group] = order
    .filter((entry) => entries.includes(entry))
    .concat(entries.filter((entry) => !order.includes(entry)));
});

Object.keys(docsStruct).forEach((group) => {
  Object.keys(docsStruct[group]).forEach((entry) => {
    docsStruct[group][entry].sort((a, b) => a.order - b.order);
  });
});

export const docsRoutes = allDocs.map((doc) => ({
  path: doc.path,
  element: (
    <Document
      currentPath={doc.path}
      document={doc.document}
      seniorMessage={doc.seniorMessage}
      githubLink={doc.githubLink}
      docsStruct={docsStruct}
      sortedEntries={sortedEntries}
    />
  ),
}));

export interface DocumentProps {
  currentPath: string;
  document: MDXContent;
  seniorMessage: string;
  githubLink: string;
  docsStruct: Record<string, Record<string, DocInfo[]>>;
  sortedEntries: Record<string, string[]>;
}

export default function Document({
  currentPath,
  document,
  seniorMessage,
  githubLink,
  docsStruct,
  sortedEntries,
}: DocumentProps) {
  const navigate = useNavigate();

  const handleSwitch = (docPath: string) => {
    if (docPath !== currentPath) {
      navigate(docPath);
    }
  };

  const currentGroup = currentPath.split('/')[2];

  return (
    <div
      className={clsx(
        'h-screen flex flex-col',
        'bg-[#e9dffd] dark:bg-[#161823]',
      )}
    >
      <Navbar />
      <div className="size-full flex flex-row overflow-auto">
        {/* 侧边栏 */}
        <div
          className={clsx(
            'sticky top-0 left-0',
            'h-full flex-3 flex items-center',
          )}
        >
          <div className="w-full px-12 flex flex-col items-start">
            {currentGroup &&
              sortedEntries[currentGroup]?.map((entry) => (
                <div key={entry} className="flex flex-col mb-2">
                  <span
                    className={clsx(
                      'font-medium capitalize mb-1',
                      'text-[#6a4e65] dark:text-violet-400',
                    )}
                  >
                    {entry}
                  </span>
                  {docsStruct[currentGroup]?.[entry]?.map((doc) => (
                    <button
                      type="button"
                      key={doc.path}
                      onClick={() => handleSwitch(doc.path)}
                      className={clsx(
                        'ml-2 mb-1 text-sm cursor-pointer inline-block w-fit',
                        doc.path === currentPath
                          ? 'text-[#6c59a9] dark:text-violet-300 font-medium'
                          : 'text-[#9c91c0] hover:text-[#8775c0] dark:text-gray-400 dark:hover:text-gray-200',
                      )}
                    >
                      {doc.title}
                    </button>
                  ))}
                </div>
              ))}
          </div>
        </div>

        <article className="flex-8">
          {document({
            components: {
              code: ({ children }) => (
                <div className="mt-1 bg-[#f5f2ff] dark:bg-[#2a2d3a] p-4 rounded-lg">
                  {children}
                </div>
              ),
              h1: ({ children }) => (
                <h1 className="mt-8 text-3xl font-bold text-[#6a4e65] dark:text-violet-400">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="mt-6 text-xl font-bold text-[#6c59a9] dark:text-violet-300">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="mt-4 text-lg font-bold">{children}</h3>
              ),
              p: ({ children }) => <p className="mt-2 text-base">{children}</p>,
            },
          })}
        </article>

        <div className="sticky top-0 left-0 flex-3">
          <div className="size-full p-12 flex items-center justify-center">
            <Carousel className="w-full max-w-[62%]">
              <CarouselPrevious
                className={clsx(
                  'bg-opacity-100 dark:bg-opacity-100',
                  'border border-solid border-[#c8bdeb] dark:border-[#9c91c0]',
                  'hover:bg-[#c8bdeb]/80 dark:hover:bg-[#9c91c0]/20',
                )}
              />
              <CarouselContent>
                {seniorMessage && (
                  <CarouselItem>
                    <div
                      className={clsx(
                        'w-full max-w-full rounded-lg p-3 min-h-32',
                        'flex flex-col items-center justify-center gap-1.5',
                        'bg-linear-to-br from-[#ceabce] to-[#5c98d1]',
                        'dark:from-[#ad86ae] dark:to-[#3182ce]',
                        'text-white/90 dark:text-white/80 text-center',
                      )}
                    >
                      <h3 className="font-bold">学长留言</h3>
                      <p className="text-xs font-medium text-[#fff7cc] dark:text-[#ebe2fd]">
                        {seniorMessage}
                      </p>
                      {githubLink && (
                        <a
                          href={githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-white/70 hover:text-white hover:underline"
                        >
                          @Github
                        </a>
                      )}
                    </div>
                  </CarouselItem>
                )}
                <CarouselItem>
                  <div
                    className={clsx(
                      'w-full max-w-full rounded-lg p-4 min-h-32',
                      'flex flex-col items-center justify-center gap-1',
                      'bg-linear-to-br from-[#d0a8d0] to-[#5596d3]',
                      'dark:from-[#ad86ae] dark:to-[#3182ce]',
                      'text-white/90 dark:text-white/80 text-center',
                    )}
                  >
                    <h3 className="font-bold">SWPU-FSA</h3>
                    <p className="text-md">开源精神</p>
                    <p className="text-md">薪火相传</p>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselNext
                className={clsx(
                  'bg-opacity-100 dark:bg-opacity-100',
                  'border border-solid border-[#c8bdeb] dark:border-[#9c91c0]',
                  'hover:bg-[#c8bdeb]/80 dark:hover:bg-[#9c91c0]/20',
                )}
              />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}
