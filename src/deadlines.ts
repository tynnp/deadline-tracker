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
    title: 'BT biểu diễn tri thức',
    date: '2025-11-09',
    time: '23:59',
    done: false,
  },
  {
    id: '5',
    title: 'BT CSDL nâng cao',
    date: '2025-10-30',
    time: '23:59',
    done: false,
  },
  {
    id: '6',
    title: 'Giữa kỳ CSDL nâng cao',
    date: '2025-12-11',
    time: '23:59',
    done: false,
  },
];
