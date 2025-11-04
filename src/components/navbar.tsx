import clsx from 'clsx';
import { FaGithub, FaQq } from 'react-icons/fa';
import GitCode from '../assets/gitcode.svg?react';
import Theme from './theme';

export default function Navbar() {
  return (
    <div
      className={clsx(
        'sticky top-0 left-0 w-full z-10 shrink-0',
        'px-12 h-15 flex flex-row items-center justify-between',
        'bg-[#c9bfeb] dark:bg-[#090d10]',
      )}
    >
      <div className="flex flex-row items-center gap-3">
        {/* logo */}
        <span className="text-xl font-bold dark:text-[#d8d9a8]">SWPU-FSA</span>
      </div>
      <div className="flex flex-row items-center gap-3">
        <div className="h-5 w-px mx-1 bg-[#ffe7ff]/50 dark:bg-gray-500/50" />
        <Theme />
        <div className="h-5 w-px mx-1 bg-[#ffe7ff]/50 dark:bg-gray-500/50" />
        <a
          href="https://gitcode.com/swpu-fsa"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitCode className="size-5 text-[#8d89b7] dark:text-[#8c85a9]" />
        </a>
        <a
          href="https://github.com/swpu-fsa"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="size-5 text-[#8d89b7] dark:text-[#8c85a9]" />
        </a>
        <a
          href="https://qm.qq.com/q/O59fvcoi4u"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaQq className="size-5 text-[#8d89b7] dark:text-[#8c85a9]" />
        </a>
      </div>
    </div>
  );
}
