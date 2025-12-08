import clsx from 'clsx';
import { useNavigate } from 'react-router';
import Navbar from './components/navbar';

export default function Swpu() {
  const navigate = useNavigate();

  const inGuides = () => {
    navigate('/docs/guides/git/git-commands');
  };

  const inCoding = () => {
    navigate('/docs/coding/welcome/intro');
  };

  const inCalendar = () => {
    navigate('/calendar');
  };

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
          <span className="text-6xl font-bold text-[#7669ab] dark:text-[#6c8dae]">
            西南石油大学
          </span>
          <div className="flex flex-row items-center justify-center">
            <span className="text-6xl font-bold text-[#554c5e] dark:text-[#77c1e4]">
              开源
            </span>
            <span className="text-6xl font-bold text-[#7669ab] dark:text-[#6c8dae]">
              协会
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-2xl font-bold text-[#7d74b0] dark:text-[#404a8a]">
              Southwest Petroleum University
            </span>
            <span className="text-2xl font-bold text-[#7d74b0] dark:text-[#404a8a]">
              Free Source Association
            </span>
          </div>
          <div className="flex flex-row items-center justify-center gap-3">
            <button
              type="button"
              className={clsx(
                'px-4 py-2 text-white font-bold rounded-md cursor-pointer',
                'bg-[#7f68c0] dark:bg-[#787ebf]',
                'hover:bg-[#7761b4] dark:hover:bg-[#6a6fa9]',
                'active:bg-[#554c5e] dark:active:bg-[#77c1e4]',
              )}
              onClick={inGuides}
            >
              开源入门
            </button>
            <button
              type="button"
              className={clsx(
                'px-4 py-2 text-white font-bold rounded-md cursor-pointer',
                'bg-[#7f68c0] dark:bg-[#787ebf]',
                'hover:bg-[#7761b4] dark:hover:bg-[#6a6fa9]',
                'active:bg-[#554c5e] dark:active:bg-[#77c1e4]',
              )}
              onClick={inCoding}
            >
              项目参与
            </button>
            <button
              type="button"
              className={clsx(
                'px-4 py-2 text-white font-bold rounded-md cursor-pointer',
                'bg-[#7f68c0] dark:bg-[#787ebf]',
                'hover:bg-[#7761b4] dark:hover:bg-[#6a6fa9]',
                'active:bg-[#554c5e] dark:active:bg-[#77c1e4]',
              )}
              onClick={inCalendar}
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
