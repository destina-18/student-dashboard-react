import { useMemo, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  MenuItem,
  Button,
  Paper,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import StudentTable from "../components/StudentTable";
import { students as initialStudents } from "../data/student";
import type { Student } from "../data/student";

type StatusFilter = "Semua" | "Aktif" | "Cuti" | "Nonaktif";

const statusFilters: StatusFilter[] = [
  "Semua",
  "Aktif",
  "Cuti",
  "Nonaktif",
];

export default function DataSiswaContent() {
  const [studentList, setStudentList] = useState<Student[]>(initialStudents);
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("Semua kelas");
  const [selectedStatus, setSelectedStatus] =
    useState<StatusFilter>("Semua");

  const classOptions = useMemo(() => {
    return [...new Set(studentList.map((student) => student.class))].sort();
  }, [studentList]);

  // Filter pencarian, kelas, dan status
  const filteredStudents = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return studentList.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(keyword) ||
        student.nis.toLowerCase().includes(keyword) ||
        student.class.toLowerCase().includes(keyword);

      const matchesClass =
        selectedClass === "Semua kelas" ||
        student.class === selectedClass;

      const matchesStatus =
        selectedStatus === "Semua" ||
        student.status === selectedStatus;

      return matchesSearch && matchesClass && matchesStatus;
    });
  }, [studentList, search, selectedClass, selectedStatus]);

  // validasi NISN
  const handleAddStudent = (newStudent: Omit<Student, "id">) => {
    const nisn = newStudent.nis.trim();

    // wajib diisi
    if (!nisn) {
      alert("NISN wajib diisi!");
      return;
    }

    // hanya boleh angka
    if (!/^\d+$/.test(nisn)) {
      alert("NISN hanya boleh berisi angka!");
      return;
    }

    // Cek NISN duplikat
    const isNisnExist = studentList.some(
      (student) => student.nis.trim() === nisn
    );

    if (isNisnExist) {
      alert("NISN sudah terdaftar! Gunakan NISN lain.");
      return;
    }

    // Simpan siswa baru
    setStudentList((prev) => {
      const nextId =
        prev.length > 0
          ? Math.max(...prev.map((student) => student.id)) + 1
          : 1;

      return [
        { ...newStudent, nis: nisn, id: nextId },
        ...prev,
      ];
    });
  };

  // Edit siswa
  const handleUpdateStudent = (updatedStudent: Student) => {
    const nisn = updatedStudent.nis.trim();

    if (!nisn) {
      alert("NISN wajib diisi!");
      return;
    }

    if (!/^\d+$/.test(nisn)) {
      alert("NISN hanya boleh berisi angka!");
      return;
    }

    // Cek duplikat, kecuali data siswa yang sedang diedit
    const isNisnExist = studentList.some(
      (student) =>
        student.nis.trim() === nisn &&
        student.id !== updatedStudent.id
    );

    if (isNisnExist) {
      alert("NISN sudah digunakan oleh siswa lain!");
      return;
    }

    setStudentList((prev) =>
      prev.map((student) =>
        student.id === updatedStudent.id
          ? { ...updatedStudent, nis: nisn }
          : student
      )
    );
  };

  // Hapus siswa
  const handleDeleteStudent = (id: number) => {
    setStudentList((prev) =>
      prev.filter((student) => student.id !== id)
    );
  };

  return (
    <Box className="data-siswa-content">
      {/* Judul halaman */}
      <Box sx={{ mb: 2.5 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, color: "#252525" }}
        >
          Data Siswa
        </Typography>

        <Typography
          variant="body2"
          sx={{ mt: 0.5, color: "#888", fontSize: 12 }}
        >
          Kelola dan lihat seluruh informasi siswa.
        </Typography>
      </Box>

      {/* Area pencarian dan filter */}
      <Paper
        elevation={0}
        sx={{
          p: 1.5,
          mb: 1.5,
          border: "1px solid #f1e4e4",
          borderRadius: "9px",
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <TextField
          size="small"
          placeholder="Cari nama, NISN, atau kelas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            flex: 1,
            minWidth: { xs: "100%", sm: 220 },
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#fffafa",
              fontSize: 11,
              borderRadius: "7px",
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 17, color: "#999" }} />
                </InputAdornment>
              ),
            },
          }}
        />

        <TextField
          select
          size="small"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          sx={{
            width: { xs: "100%", sm: 125 },
            "& .MuiOutlinedInput-root": {
              fontSize: 11,
              borderRadius: "7px",
            },
          }}
        >
          <MenuItem value="Semua kelas">Semua kelas</MenuItem>

          {classOptions.map((className) => (
            <MenuItem key={className} value={className}>
              {className}
            </MenuItem>
          ))}
        </TextField>

        <Box
          sx={{
            display: "flex",
            gap: 0.7,
            ml: { xs: 0, sm: "auto" },
            flexWrap: "wrap",
          }}
        >
          {statusFilters.map((status) => {
            const active = selectedStatus === status;

            return (
              <Button
                key={status}
                size="small"
                variant={active ? "contained" : "outlined"}
                onClick={() => setSelectedStatus(status)}
                sx={{
                  minWidth: "auto",
                  px: 1.3,
                  py: 0.55,
                  borderRadius: "20px",
                  fontSize: 10,
                  textTransform: "none",
                  boxShadow: "none",
                  backgroundColor: active ? "#feecec" : "#fff",
                  color: active ? "#b91c1c" : "#666",
                  borderColor: active ? "#f5d1d1" : "#eeeeee",
                  "&:hover": {
                    backgroundColor: "#fff0f0",
                    borderColor: "#efcaca",
                    boxShadow: "none",
                  },
                }}
              >
                {status}
              </Button>
            );
          })}
        </Box>
      </Paper>

      {/* Tabel dan fitur CRUD */}
      <StudentTable
        students={filteredStudents}
        onAddStudent={handleAddStudent}
        onUpdateStudent={handleUpdateStudent}
        onDeleteStudent={handleDeleteStudent}
      />

      {/* Jumlah data yang ditampilkan */}
      <Typography
        variant="caption"
        sx={{
          display: "block",
          mt: 1,
          color: "#999",
          fontSize: 10,
        }}
      >
        Menampilkan {filteredStudents.length} dari {studentList.length} siswa
      </Typography>
    </Box>
  );
}
