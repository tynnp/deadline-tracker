export interface Deadline {
  id: string;
  title: string;
  date: string;
  time: string;
  done: boolean;
}

export const deadlines: Deadline[] = [
  {
    id: '1',
    title: 'Cuối kỳ Công nghệ phần mềm',
    date: '2025-10-31',
    time: '23:59',
    done: false,
  },
  {
    id: '2',
    title: 'Giữa kỳ Lập trình PHP',
    date: '2025-12-26',
    time: '23:59',
    done: false,
  },
  {
    id: '3',
    title: 'Cuối kỳ Lập trình PHP',
    date: '2026-01-09',
    time: '23:59',
    done: false,
  },
  {
    id: '4',
    title: 'Làm VLE sinh hoạt công dân',
    date: '2025-10-23',
    time: '23:59',
    done: true,
  }
];
