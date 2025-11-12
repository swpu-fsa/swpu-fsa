import clsx from 'clsx';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Switch } from '@/components/ui/switch';

export default function Theme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode =
      localStorage.getItem('darkMode') === 'true' ||
      (!localStorage.getItem('darkMode') &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    localStorage.setItem('darkMode', newIsDark.toString());
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div>
      <div className="relative flex items-center">
        <Switch
          checked={isDark}
          onCheckedChange={toggleDarkMode}
          className={clsx(
            'h-5.5 w-10 data-[state=checked]:bg-[#959bb5] data-[state=unchecked]:bg-[#fcf8ef]',
            '**:data-[slot=switch-thumb]:size-4.5 **:data-[slot=switch-thumb]:data-[state=checked]:translate-x-5',
          )}
        />
        {/* 太阳图标 */}
        <div
          className={clsx(
            'absolute left-[3.5px] top-1/2 transform -translate-y-1/2 pointer-events-none',
            isDark ? 'opacity-0' : 'opacity-100',
          )}
        >
          <Sun className="w-3 h-3 text-yellow-400" />
        </div>
        {/* 月亮图标 */}
        <div
          className={clsx(
            'absolute right-[3.5px] top-1/2 transform -translate-y-1/2 pointer-events-none',
            isDark ? 'opacity-100' : 'opacity-0',
          )}
        >
          <Moon className="w-3 h-3 text-gray-400" />
        </div>
      </div>
    </div>
  );
}
