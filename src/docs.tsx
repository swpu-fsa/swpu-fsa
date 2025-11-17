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
}

interface GlobDoc {
  default: MDXContent;
  frontmatter: Frontmatter;
}

interface DocInfo {
  path: string;
  direction: string;
  title: string;
  order: number;
  document: MDXContent;
}

const docs: Record<string, GlobDoc> = import.meta.glob('./docs/**/*.mdx', {
  eager: true,
});

// 所有文档数据
const allDocs: DocInfo[] = Object.entries(docs).map(([key, value]) => {
  const pathParts = key.split('/');
  const docsIndex = pathParts.indexOf('docs');
  const direction =
    docsIndex !== -1 && pathParts.length > docsIndex + 1
      ? pathParts[docsIndex + 1]
      : '';

  return {
    path: key.replace('.', '').replace('.mdx', ''),
    direction,
    title: value.frontmatter.title,
    order: value.frontmatter.order,
    document: value.default,
  };
});

// 按照方向分组
const docsByDirection = allDocs.reduce(
  (acc, doc) => {
    if (!acc[doc.direction]) {
      acc[doc.direction] = [];
    }
    acc[doc.direction].push(doc);
    return acc;
  },
  {} as Record<string, DocInfo[]>,
);

// 方法本身排序
const directionOrder = ['git', 'frontend', 'backend'];

const sortedDirections = directionOrder
  .filter((direction) => docsByDirection[direction])
  .concat(
    Object.keys(docsByDirection).filter(
      (direction) => !directionOrder.includes(direction),
    ),
  );

// 方向内部排序
Object.keys(docsByDirection).forEach((direction) => {
  docsByDirection[direction].sort((a, b) => a.order - b.order);
});

export const docsRoutes = allDocs.map((doc) => ({
  path: doc.path,
  element: (
    <Document
      document={doc.document}
      docsByDirection={docsByDirection}
      sortedDirections={sortedDirections}
      currentPath={doc.path}
    />
  ),
}));

export interface DocumentProps {
  document: MDXContent;
  docsByDirection: Record<string, DocInfo[]>;
  sortedDirections: string[];
  currentPath: string;
}

export default function Document({
  document,
  docsByDirection,
  sortedDirections,
  currentPath,
}: DocumentProps) {
  const navigate = useNavigate();

  const handleSwitch = (docPath: string) => {
    if (docPath !== currentPath) {
      navigate(docPath);
    }
  };

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
            {sortedDirections.map((direction) => (
              <div key={direction} className="flex flex-col mb-4">
                <span
                  className={clsx(
                    'font-semibold capitalize',
                    'text-[#6a4e65] dark:text-violet-400',
                  )}
                >
                  {direction}
                </span>
                {docsByDirection[direction].map((doc) => (
                  <button
                    type="button"
                    key={doc.path}
                    onClick={() => handleSwitch(doc.path)}
                    className={clsx(
                      'ml-2 text-sm cursor-pointer',
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
                <div className="bg-[#f5f2ff] dark:bg-[#2a2d3a] p-4 rounded-md">
                  {children}
                </div>
              ),
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
                <CarouselItem>
                  <div
                    className={clsx(
                      'w-full max-w-full rounded-lg p-3 min-h-32',
                      'flex flex-col items-center justify-center gap-1',
                      'bg-linear-to-br from-[#d0a8d0] to-[#5596d3]',
                      'dark:from-[#ad86ae] dark:to-[#3182ce]',
                      'text-white text-center',
                    )}
                  >
                    <h3 className="font-bold">学长留言</h3>
                    <p className="text-xs">??</p>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div
                    className={clsx(
                      'w-full max-w-full rounded-lg p-4 min-h-32',
                      'flex flex-col items-center justify-center gap-1',
                      'bg-linear-to-br from-[#d0a8d0] to-[#5596d3]',
                      'dark:from-[#ad86ae] dark:to-[#3182ce]',
                      'text-white text-center',
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
