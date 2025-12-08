import clsx from 'clsx';
import {
  CalendarBody,
  CalendarItem,
  CalendarProvider,
} from './components/kibo-ui/calendar';
import Navbar from './components/navbar';

const sampleFeatures = [
  {
    id: '1',
    name: '项目会议',
    startAt: new Date(2025, 12, 15),
    endAt: new Date(2025, 12, 15),
    status: { id: '1', name: '进行中', color: '#3b82f6' },
  },
  {
    id: '2',
    name: '代码审查',
    startAt: new Date(2025, 12, 20),
    endAt: new Date(2025, 12, 20),
    status: { id: '2', name: '待处理', color: '#ef4444' },
  },
  {
    id: '3',
    name: '功能发布',
    startAt: new Date(2025, 12, 25),
    endAt: new Date(2025, 12, 25),
    status: { id: '3', name: '已完成', color: '#10b981' },
  },
];

export default function Calendar() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div
        className={clsx(
          'flex-1 flex flex-col items-center justify-center',
          'bg-[#e9dffd] dark:bg-[#161823]',
        )}
      >
        <div className="w-full max-w-4xl p-6">
          <CalendarProvider locale="zh-CN" startDay={1}>
            <div
              className={clsx(
                'rounded-lg overflow-hidden',
                "[&_div[class*='border-']]:border-black [&_div[class*='border-']]:dark:border-white",
              )}
            >
              <style>{`
                [class*="bg-secondary"] {
                  background-color: #d4c7f7 !important;
                }
                [class*="bg-secondary"]:is(.dark *) {
                  background-color: #000000 !important;
                }
                [class*="text-muted-foreground"] {
                  color: #000000 !important;
                }
                [class*="text-muted-foreground"]:is(.dark *) {
                  color: #ffffff !important;
                }
              `}</style>
              <CalendarBody features={sampleFeatures}>
                {({ feature }) => <CalendarItem feature={feature} />}
              </CalendarBody>
            </div>
          </CalendarProvider>
        </div>
      </div>
    </div>
  );
}
