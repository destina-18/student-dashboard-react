export type Student = {
  id: number;
  name: string;
  nis: string;
  class: string;
  gender: "Laki-laki" | "Perempuan";
  status: "Aktif" | "Cuti" | "Nonaktif";
};

export const students: Student[] = [
  {
    id: 1,
    name: "Andi Pratama",
    nis: "2024001",
    class: "XII-A",
    gender: "Laki-laki",
    status: "Aktif",
  },
  {
    id: 2,
    name: "Budi Santoso",
    nis: "2024002",
    class: "XII-B",
    gender: "Laki-laki",
    status: "Aktif",
  },
  {
    id: 3,
    name: "Citra Lestari",
    nis: "2024003",
    class: "XI-A",
    gender: "Perempuan",
    status: "Aktif",
  },
  {
    id: 4,
    name: "Dewi Anggraini",
    nis: "2024004",
    class: "XI-B",
    gender: "Perempuan",
    status: "Cuti",
  },
  {
    id: 5,
    name: "Eko Wijaya",
    nis: "2024005",
    class: "X-A",
    gender: "Laki-laki",
    status: "Aktif",
  },
  {
    id: 6,
    name: "Fahri Hidayat",
    nis: "2024006",
    class: "X-B",
    gender: "Laki-laki",
    status: "Nonaktif",
  },
  {
    id: 7,
    name: "Gita Maharani",
    nis: "2024007",
    class: "XII-A",
    gender: "Perempuan",
    status: "Aktif",
  },
  {
    id: 8,
    name: "Hendra Saputra",
    nis: "2024008",
    class: "XI-A",
    gender: "Laki-laki",
    status: "Aktif",
  },
  {
    id: 9,
    name: "Intan Permata",
    nis: "2024009",
    class: "XII-B",
    gender: "Perempuan",
    status: "Aktif",
  },
  {
    id: 10,
    name: "Joko Susilo",
    nis: "2024010",
    class: "X-B",
    gender: "Laki-laki",
    status: "Aktif",
  },
];