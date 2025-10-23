export interface Deadline {
  id: string;
  title: string;
  date: string;
  time: string;
}

export const deadlines: Deadline[] = [
  {
    id: '1',
    title: 'Cuối kỳ Công nghệ phần mềm',
    date: '2025-10-31',
    time: '23:59',
  },
  {
    id: '2',
    title: 'Giữa kỳ Lập trình PHP',
    date: '2025-12-26',
    time: '23:59',
  },
  {
    id: '3',
    title: 'Cuối kỳ Lập trình PHP',
    date: '2026-01-09',
    time: '23:59',
  },
];