import { useState } from "react";
import {
  Box,
  Card,
  Typography,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import ClassIcon from "@mui/icons-material/Class";

import StatCard from "../components/StatCard";

import { students } from "../data/student";

// tingkat 
const GRADE_ORDER: Record<string, number> = {
  X: 1,
  XI: 2,
  XII: 3,
};

const sortClass = (a: string, b: string) => {
  const [gradeA, sectionA = ""] = a.split("-");
  const [gradeB, sectionB = ""] = b.split("-");

  const diff =
    (GRADE_ORDER[gradeA] ?? 99) - (GRADE_ORDER[gradeB] ?? 99);

  return diff !== 0 ? diff : sectionA.localeCompare(sectionB);
};

const CIRCUMFERENCE = 2 * Math.PI * 40;

const statusStyle = {
  Aktif: { bg: "#dcfce7", color: "#15803d" },
  Cuti: { bg: "#fef3c7", color: "#b45309" },
  Nonaktif: { bg: "#eeeeee", color: "#666666" },
} as const;

export default function DashboardContent() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const totalStudents = students.length;

  const maleStudents = students.filter(
    (student) => student.gender === "Laki-laki"
  ).length;

  const femaleStudents = students.filter(
    (student) => student.gender === "Perempuan"
  ).length;

  const totalClasses = new Set(
    students.map((student) => student.class)
  ).size;

  // data per kelas
  const classData = Array.from(
    new Set(students.map((student) => student.class))
  )
    .sort(sortClass)
    .map((className) => ({
      name: className,
      total: students.filter(
        (student) => student.class === className
      ).length,
    }));

  const maxStudents = Math.max(
    ...classData.map((item) => item.total),
    1
  );

  const malePercent = totalStudents
    ? (maleStudents / totalStudents) * 100
    : 0;

  const femalePercent = totalStudents
    ? 100 - malePercent
    : 0;

  const maleArc = (malePercent / 100) * CIRCUMFERENCE;

  // pagination tabel dashboard
  const displayedStudents = students.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box className="dashboard-content">
      {/* Judul */}
      <Box className="dashboard-heading">
        <Typography variant="h5">Dashboard</Typography>

        <Typography variant="body2" color="text.secondary">
          Selamat datang! Berikut ringkasan data siswa sekolah.
        </Typography>
      </Box>

      {/* Statistik */}
      <Box className="stats-container">
        <StatCard
          title="Total Siswa"
          tone="red"
          value={totalStudents}
          icon={<PeopleIcon />}
        />

        <StatCard
          title="Laki-laki"
          tone="blue"
          value={maleStudents}
          icon={<MaleIcon />}
        />

        <StatCard
          title="Perempuan"
          tone="pink"
          value={femaleStudents}
          icon={<FemaleIcon />}
        />

        <StatCard
          title="Jumlah Kelas"
          tone="amber"
          value={totalClasses}
          icon={<ClassIcon />}
        />
      </Box>

      {/* Tabel dan panel samping */}
      <Box className="dashboard-grid">
        {/* Tabel siswa - hanya untuk melihat data */}
        <Card className="student-card" elevation={0}>
          <Box className="table-title">
            <Box>
              <Typography sx={{ fontWeight: 700 }}>
                Data Siswa
              </Typography>

              <Typography variant="caption" color="text.secondary">
                Daftar informasi siswa sekolah
              </Typography>
            </Box>
          </Box>

          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Nama Siswa</TableCell>
                  <TableCell>NIS</TableCell>
                  <TableCell>Kelas</TableCell>
                  <TableCell>Jenis Kelamin</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {displayedStudents.length > 0 ? (
                  displayedStudents.map((student) => (
                    <TableRow key={student.id} hover>
                      <TableCell>
                        <Box className="student-name">
                          <Avatar className="student-avatar">
                            {student.name.charAt(0).toUpperCase()}
                          </Avatar>

                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 600 }}
                          >
                            {student.name}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell>{student.nis}</TableCell>

                      <TableCell>{student.class}</TableCell>

                      <TableCell>{student.gender}</TableCell>

                      <TableCell>
                        <Chip
                          label={student.status}
                          size="small"
                          className={`status-chip status-${student.status.toLowerCase()}`}
                          sx={{
                            backgroundColor:
                              statusStyle[student.status].bg,
                            color: statusStyle[student.status].color,
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      Belum ada data siswa.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={students.length}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(Number(event.target.value));
              setPage(0);
            }}
            rowsPerPageOptions={[6, 10]}
            labelRowsPerPage="Baris:"
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} dari ${count}`
            }
          />
        </Card>

        {/* Panel samping */}
        <Box className="dashboard-side">
          {/* Siswa per kelas */}
          <Card className="class-card" elevation={0}>
            <Typography className="card-title">
              Siswa per Kelas
            </Typography>

            <Typography variant="caption" color="text.secondary">
              Jumlah siswa berdasarkan kelas
            </Typography>

            <Box className="class-list">
              {classData.length > 0 ? (
                classData.map((item) => (
                  <Box className="class-item" key={item.name}>
                    <Typography
                      variant="caption"
                      className="class-name"
                    >
                      {item.name}
                    </Typography>

                    <Box className="class-progress">
                      <Box
                        className={`class-progress-fill${
                          item.total < maxStudents ? " is-low" : ""
                        }`}
                        sx={{
                          width: `${
                            (item.total / maxStudents) * 100
                          }%`,
                        }}
                      />
                    </Box>

                    <Typography
                      variant="caption"
                      className="class-count"
                    >
                      {item.total}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Belum ada data kelas.
                </Typography>
              )}
            </Box>

            <Box className="class-total">
              <Typography variant="caption" color="text.secondary">
                Total seluruh siswa
              </Typography>

              <Typography color="primary" sx={{ fontWeight: 700 }}>
                {totalStudents} Siswa
              </Typography>
            </Box>
          </Card>

          {/* Komposisi gender */}
          <Card className="class-card" elevation={0}>
            <Typography className="card-title">
              Komposisi Gender
            </Typography>

            <Typography variant="caption" color="text.secondary">
              Dari total {totalStudents} siswa
            </Typography>

            <Box className="gender-body">
              <svg
                width="104"
                height="104"
                viewBox="0 0 104 104"
                role="img"
                aria-label={`${Math.round(
                  malePercent
                )} persen laki-laki, ${Math.round(
                  femalePercent
                )} persen perempuan`}
              >
                <circle
                  cx="52"
                  cy="52"
                  r="40"
                  fill="none"
                  stroke={totalStudents ? "#BE185D" : "#EFEAE8"}
                  strokeWidth="16"
                />

                {totalStudents > 0 && (
                  <circle
                    cx="52"
                    cy="52"
                    r="40"
                    fill="none"
                    stroke="#1D4ED8"
                    strokeWidth="16"
                    strokeDasharray={`${maleArc} ${CIRCUMFERENCE}`}
                    transform="rotate(-90 52 52)"
                  />
                )}
              </svg>

              <Box className="gender-legend">
                <Box>
                  <span className="dot dot-male" />
                  Laki-laki · {maleStudents} ({Math.round(malePercent)}%)
                </Box>

                <Box>
                  <span className="dot dot-female" />
                  Perempuan · {femaleStudents} (
                  {Math.round(femalePercent)}%)
                </Box>
              </Box>
            </Box>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
