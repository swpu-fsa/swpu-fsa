import clsx from 'clsx';
import Navbar from './components/navbar';

export default function Swpu() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div
        className={clsx(
          'flex-1 flex flex-row items-center justify-center gap-5',
          'bg-[#e9dffd] dark:bg-[#161823]',
        )}
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <span className="text-6xl font-bold text-[#867ea7] dark:text-[#6c8dae]">
            西南石油大学
          </span>
          <div className="flex flex-row items-center justify-center">
            <span className="text-6xl font-bold text-[#5f536b] dark:text-[#77c1e4]">
              开源
            </span>
            <span className="text-6xl font-bold text-[#867ea7] dark:text-[#6c8dae]">
              协会
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-2xl font-bold text-[#5f5695] dark:text-[#404a8a]">
              Southwest Petroleum University
            </span>
            <span className="text-2xl font-bold text-[#5f5695] dark:text-[#404a8a]">
              Free Source Association
            </span>
          </div>
          <div className="flex flex-row items-center justify-center gap-3">
            <button
              type="button"
              className={clsx(
                'px-4 py-2 text-white font-bold rounded-md cursor-pointer',
                'bg-[#846fbe] dark:bg-[#787ebf]',
                'hover:bg-[#7d6bad] dark:hover:bg-[#6a6fa9]',
                'active:bg-[#5f536b] dark:active:bg-[#77c1e4]',
              )}
            >
              开源入门
            </button>
            <button
              type="button"
              className={clsx(
                'px-4 py-2 text-white font-bold rounded-md cursor-pointer',
                'bg-[#846fbe] dark:bg-[#787ebf]',
                'hover:bg-[#7d6bad] dark:hover:bg-[#6a6fa9]',
                'active:bg-[#5f536b] dark:active:bg-[#77c1e4]',
              )}
            >
              项目参与
            </button>
            <button
              type="button"
              className={clsx(
                'px-4 py-2 text-white font-bold rounded-md cursor-pointer',
                'bg-[#846fbe] dark:bg-[#787ebf]',
                'hover:bg-[#7d6bad] dark:hover:bg-[#6a6fa9]',
                'active:bg-[#5f536b] dark:active:bg-[#77c1e4]',
              )}
            >
              活动日历
            </button>
          </div>
        </div>
        {/* logo */}
      </div>
    </div>
  );
}
