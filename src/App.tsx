import { useState, useEffect } from 'react';
import { Clock, Sun, Moon, CheckCircle, Clock3 } from 'lucide-react';
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
    const interval = setInterval(() => setCurrentTime(Date.now()), 1000);
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
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
          : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'
      }`}
    >
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-10 relative">
          {/* <button
            onClick={() => setIsDark(!isDark)}
            className={`absolute right-0 top-0 p-3 rounded-full transition-all ${
              isDark
                ? 'bg-slate-700 hover:bg-slate-600 text-amber-400'
                : 'bg-white hover:bg-gray-100 text-amber-500 shadow-lg'
            }`}
          >
            {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button> */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <Clock className={`w-10 h-10 ${isDark ? 'text-amber-400' : 'text-amber-500'}`} />
            <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Deadline Tracker
            </h1>
          </div>
          <p className={`${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
            Theo dõi deadline của tynnp :)
          </p>
        </div>

        {sortedDeadlines.length === 0 ? (
          <div className="text-center py-16">
            <Clock
              className={`w-20 h-20 mx-auto mb-4 ${
                isDark ? 'text-slate-600' : 'text-gray-400'
              }`}
            />
            <p className={`${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
              Chưa có deadline nào!!!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedDeadlines.map((deadline) => {
              const timeLeft = calculateTimeLeft(deadline);

              return (
                <div
                  key={deadline.id}
                  className={`relative rounded-xl p-6 shadow-xl border-2 transition-all hover:scale-105 ${
                    timeLeft.expired
                      ? isDark
                        ? 'bg-red-900 border-red-700'
                        : 'bg-red-100 border-red-300'
                      : isDark
                      ? 'bg-slate-800 border-slate-700'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div
                    className="absolute top-3 right-3"
                    title={deadline.done ? 'Đã xong' : 'Chưa xong'}
                  >
                    {deadline.done ? (
                      <CheckCircle
                        className={`w-5 h-5 ${
                          isDark ? 'text-green-400' : 'text-green-600'
                        }`}
                      />
                    ) : (
                      <Clock3
                        className={`w-5 h-5 ${
                          isDark ? 'text-red-400' : 'text-red-500'
                        }`}
                      />
                    )}
                  </div>

                  <h3
                    className={`text-xl font-bold mb-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {deadline.title}
                  </h3>

                  <p
                    className={`text-sm mb-4 ${
                      isDark ? 'text-slate-400' : 'text-gray-600'
                    }`}
                  >
                    {new Date(`${deadline.date}T${deadline.time}`).toLocaleString('vi-VN', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>

                  {timeLeft.expired ? (
                    <p
                      className={`text-center text-2xl font-bold ${
                        isDark ? 'text-red-300' : 'text-red-600'
                      }`}
                    >
                      ĐÃ HẾT HẠN
                    </p>
                  ) : (
                    <div className="grid grid-cols-4 gap-2">
                      {['Ngày', 'Giờ', 'Phút', 'Giây'].map((label, i) => {
                        const values = [
                          timeLeft.days,
                          timeLeft.hours,
                          timeLeft.minutes,
                          timeLeft.seconds,
                        ];
                        return (
                          <div
                            key={label}
                            className={`rounded-lg p-3 text-center ${
                              isDark ? 'bg-slate-700' : 'bg-blue-50'
                            }`}
                          >
                            <div
                              className={`text-2xl font-bold ${
                                isDark ? 'text-amber-400' : 'text-amber-600'
                              }`}
                            >
                              {values[i]}
                            </div>
                            <div
                              className={`text-xs ${
                                isDark ? 'text-slate-400' : 'text-gray-600'
                              }`}
                            >
                              {label}
                            </div>
                          </div>
                        );
                      })}
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
