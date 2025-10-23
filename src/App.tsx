import { useState, useEffect } from 'react';
import { Clock, Sun, Moon } from 'lucide-react';
import { deadlines, type Deadline } from './deadlines';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

function App() {
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const calculateTimeLeft = (deadline: Deadline): TimeLeft => {
    const target = new Date(`${deadline.date}T${deadline.time}`).getTime();
    const difference = target - currentTime;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      expired: false,
    };
  };

  const sortedDeadlines = [...deadlines].sort((a, b) => {
    const timeA = new Date(`${a.date}T${a.time}`).getTime();
    const timeB = new Date(`${b.date}T${b.time}`).getTime();
    return timeA - timeB;
  });

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
        : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'
    }`}>
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 max-w-7xl">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 relative">
          <button
            onClick={() => setIsDark(!isDark)}
            className={`absolute right-0 top-0 p-2 sm:p-2.5 md:p-3 rounded-full transition-all ${
              isDark
                ? 'bg-slate-700 hover:bg-slate-600 text-amber-400'
                : 'bg-white hover:bg-gray-100 text-amber-500 shadow-lg'
            }`}
          >
            {isDark ? <Sun className="w-5 h-5 sm:w-6 sm:h-6" /> : <Moon className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4 px-12 sm:px-0">
            <Clock className={`w-10 h-10 sm:w-12 sm:h-12 ${isDark ? 'text-amber-400' : 'text-amber-500'}`} />
            <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Deadline Tracker</h1>
          </div>
          <p className={`text-base sm:text-lg ${isDark ? 'text-slate-300' : 'text-gray-600'} px-4`}>Theo dõi và quản lý thời hạn của bạn</p>
        </div>

        {sortedDeadlines.length === 0 ? (
          <div className="text-center py-12 sm:py-16 md:py-20 px-4">
            <Clock className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 ${isDark ? 'text-slate-600' : 'text-gray-400'}`} />
            <p className={`text-lg sm:text-xl ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Chưa có deadline nào. Thêm deadline đầu tiên của bạn!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {sortedDeadlines.map((deadline) => {
              const timeLeft = calculateTimeLeft(deadline);
              return (
                <div
                  key={deadline.id}
                  className={`rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-xl sm:shadow-2xl border-2 transition-all hover:scale-105 ${
                    timeLeft.expired
                      ? isDark
                        ? 'bg-red-900 border-red-700'
                        : 'bg-red-100 border-red-300'
                      : isDark
                      ? 'bg-slate-800 border-slate-700'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="mb-3 sm:mb-4">
                    <h3 className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} break-words`}>{deadline.title}</h3>
                  </div>

                  <div className={`text-xs sm:text-sm mb-4 sm:mb-6 ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                    {new Date(`${deadline.date}T${deadline.time}`).toLocaleString('vi-VN', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>

                  {timeLeft.expired ? (
                    <div className="text-center py-4 sm:py-6">
                      <p className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-red-300' : 'text-red-600'}`}>ĐÃ HẾT HẠN</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                      <div className={`rounded-lg p-2 sm:p-3 text-center ${isDark ? 'bg-slate-700' : 'bg-blue-50'}`}>
                        <div className={`text-xl sm:text-2xl md:text-3xl font-bold ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>{timeLeft.days}</div>
                        <div className={`text-xs mt-0.5 sm:mt-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Ngày</div>
                      </div>
                      <div className={`rounded-lg p-2 sm:p-3 text-center ${isDark ? 'bg-slate-700' : 'bg-blue-50'}`}>
                        <div className={`text-xl sm:text-2xl md:text-3xl font-bold ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>{timeLeft.hours}</div>
                        <div className={`text-xs mt-0.5 sm:mt-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Giờ</div>
                      </div>
                      <div className={`rounded-lg p-2 sm:p-3 text-center ${isDark ? 'bg-slate-700' : 'bg-blue-50'}`}>
                        <div className={`text-xl sm:text-2xl md:text-3xl font-bold ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>{timeLeft.minutes}</div>
                        <div className={`text-xs mt-0.5 sm:mt-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Phút</div>
                      </div>
                      <div className={`rounded-lg p-2 sm:p-3 text-center ${isDark ? 'bg-slate-700' : 'bg-blue-50'}`}>
                        <div className={`text-xl sm:text-2xl md:text-3xl font-bold ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>{timeLeft.seconds}</div>
                        <div className={`text-xs mt-0.5 sm:mt-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Giây</div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
