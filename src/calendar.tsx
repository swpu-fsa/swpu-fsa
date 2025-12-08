import clsx from 'clsx';
import {
  CalendarBody,
  CalendarDatePagination,
  CalendarDatePicker,
  CalendarItem,
  CalendarMonthPicker,
  CalendarProvider,
  CalendarYearPicker,
  type Feature,
  type Status,
} from './components/kibo-ui/calendar';
import Navbar from './components/navbar';

const projectStatus: Status = {
  id: 'project',
  name: '项目',
  color: 'var(--project-status-color, #5f536b)',
};

interface ProjectFrontmatter {
  title: string;
  order: number;
  seniorMessage: string;
  githubLink: string;
  startYear: number;
  startMonth: number;
  startDay: number;
}

interface Project {
  frontmatter: ProjectFrontmatter;
}

const projects: Record<string, Project> = import.meta.glob(
  './docs/coding/projects/*.mdx',
  {
    eager: true,
  },
);

const Features: Feature[] = Object.entries(projects).map(([, value], index) => {
  const { title, startYear, startMonth, startDay } = value.frontmatter;

  return {
    id: `project-${index + 1}`,
    name: title,
    startAt: new Date(startYear, startMonth - 1, startDay),
    endAt: new Date(startYear, startMonth - 1, startDay),
    status: projectStatus,
  };
});

export default function Calendar() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div
        className={clsx(
          'flex-1 flex flex-col items-center justify-center p-7 gap-7',
          'bg-[#e9dffd] dark:bg-[#161823]',
        )}
      >
        <div className="flex justify-center items-center">
          <CalendarDatePicker className="flex flex-row gap-3">
            <CalendarYearPicker start={2024} end={2030} />
            <CalendarMonthPicker />
            <CalendarDatePagination />
          </CalendarDatePicker>
        </div>

        <div className="w-full max-w-3xl">
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
                
                /* 年月选择器背景颜色 */
                .flex.flex-row.gap-3 button[class*="bg-background"] {
                  background-color: #ffe7ff !important;
                }
                .flex.flex-row.gap-3 button[class*="bg-background"]:is(.dark *) {
                  background-color: #12121e !important;
                }
                
                :root {
                  --project-status-color: #554c5e;
                }
                .dark {
                  --project-status-color: #77c1e4;
                }
              `}</style>
              <CalendarBody features={Features}>
                {({ feature }) => <CalendarItem feature={feature} />}
              </CalendarBody>
            </div>
          </CalendarProvider>
        </div>
      </div>
    </div>
  );
}
