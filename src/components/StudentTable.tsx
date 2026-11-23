import { useEffect, useState } from "react";
import type { ChangeEvent, MouseEvent } from "react";

import {
  Box,
  Card,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TablePagination,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Tooltip,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

import type { Student } from "../data/student";

type StudentTableProps = {
  students: Student[];
  onAddStudent: (student: Omit<Student, "id">) => void;
  onUpdateStudent: (student: Student) => void;
  onDeleteStudent: (id: number) => void;
};

type StudentForm = Omit<Student, "id">;

const emptyForm: StudentForm = {
  name: "",
  nis: "",
  class: "",
  gender: "Laki-laki",
  status: "Aktif",
};

export default function StudentTable({
  students,
  onAddStudent,
  onUpdateStudent,
  onDeleteStudent,
}: StudentTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [form, setForm] = useState<StudentForm>(emptyForm);
  const [error, setError] = useState("");

  // Menghindari halaman kosong setelah data dihapus atau difilter
  useEffect(() => {
    const lastPage = Math.max(
      0,
      Math.ceil(students.length / rowsPerPage) - 1
    );

    if (page > lastPage) {
      setPage(lastPage);
    }
  }, [students.length, rowsPerPage, page]);

  const visibleStudents = students.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (
    _event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  // Membuka modal tambah
  const handleOpenAdd = () => {
    setEditingStudent(null);
    setForm(emptyForm);
    setError("");
    setOpenDialog(true);
  };

  // Membuka modal edit
  const handleOpenEdit = (student: Student) => {
    setEditingStudent(student);

    setForm({
      name: student.name,
      nis: student.nis,
      class: student.class,
      gender: student.gender,
      status: student.status,
    });

    setError("");
    setOpenDialog(true);
  };

  // Menutup modal
  const handleClose = () => {
    setOpenDialog(false);
    setEditingStudent(null);
    setForm(emptyForm);
    setError("");
  };

  // ubah nilai form
  const handleFormChange = <K extends keyof StudentForm>(
    field: K,
    value: StudentForm[K]
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setError("");
  };

  // create update
  const handleSubmit = () => {
    if (
      !form.name.trim() ||
      !form.nis.trim() ||
      !form.class.trim()
    ) {
      setError("Semua kolom wajib diisi.");
      return;
    }

    // Validasi NIS 
    const duplicateNis = students.some(
      (student) =>
        student.nis === form.nis.trim() &&
        student.id !== editingStudent?.id
    );

    if (duplicateNis) {
      setError("NIS sudah digunakan oleh siswa lain.");
      return;
    }

    const studentData: StudentForm = {
      name: form.name.trim(),
      nis: form.nis.trim(),
      class: form.class.trim(),
      gender: form.gender,
      status: form.status,
    };

    if (editingStudent) {
      onUpdateStudent({
        ...studentData,
        id: editingStudent.id,
      });
    } else {
      onAddStudent(studentData);
      setPage(0);
    }

    handleClose();
  };

  // DELETE
  const handleDelete = (student: Student) => {
    const confirmed = window.confirm(
      `Apakah kamu yakin ingin menghapus data ${student.name}?`
    );

    if (confirmed) {
      onDeleteStudent(student.id);
    }
  };

  return (
    <>
      <Card className="student-card">
        <Box className="table-title">
          <Box>
            <Typography sx={{ fontWeight: 700 }}>
              Data Siswa
            </Typography>

            <Typography variant="caption" color="text.secondary">
              Daftar informasi siswa sekolah
            </Typography>
          </Box>

          <Button
            variant="contained"
            size="small"
            startIcon={<AddIcon />}
            onClick={handleOpenAdd}
            className="add-button"
          >
            Tambah Siswa
          </Button>
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
                <TableCell align="center">Aksi</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {visibleStudents.length > 0 ? (
                visibleStudents.map((student) => (
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
                      />
                    </TableCell>

                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 0.5,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Tooltip title="Edit siswa">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleOpenEdit(student)}
                          >
                            <EditOutlinedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Hapus siswa">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDelete(student)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Data siswa tidak ditemukan.
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
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[6, 10]}
          labelRowsPerPage="Baris:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} dari ${count}`
          }
        />
      </Card>

      {/* Modal Tambah dan Edit */}
      <Dialog
        open={openDialog}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontWeight: 700,
          }}
        >
          {editingStudent ? "Edit Data Siswa" : "Tambah Siswa Baru"}

          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2.5,
              pt: 1,
            }}
          >
            <TextField
              label="Nama Lengkap"
              placeholder="Masukkan nama siswa"
              fullWidth
              value={form.name}
              onChange={(e) =>
                handleFormChange("name", e.target.value)
              }
            />

            <TextField
              label="NIS"
              placeholder="Masukkan nomor induk siswa"
              fullWidth
              value={form.nis}
              onChange={(e) =>
                handleFormChange("nis", e.target.value)
              }
            />

            <TextField
              label="Kelas"
              placeholder="Contoh: XII-A"
              fullWidth
              value={form.class}
              onChange={(e) =>
                handleFormChange("class", e.target.value)
              }
            />

            <TextField
              select
              label="Jenis Kelamin"
              fullWidth
              value={form.gender}
              onChange={(e) =>
                handleFormChange(
                  "gender",
                  e.target.value as StudentForm["gender"]
                )
              }
            >
              <MenuItem value="Laki-laki">Laki-laki</MenuItem>
              <MenuItem value="Perempuan">Perempuan</MenuItem>
            </TextField>

            <TextField
              select
              label="Status Siswa"
              fullWidth
              value={form.status}
              onChange={(e) =>
                handleFormChange(
                  "status",
                  e.target.value as StudentForm["status"]
                )
              }
            >
              <MenuItem value="Aktif">Aktif</MenuItem>
              <MenuItem value="Cuti">Cuti</MenuItem>
              <MenuItem value="Nonaktif">Nonaktif</MenuItem>
            </TextField>

            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            onClick={handleClose}
            color="inherit"
            variant="outlined"
          >
            Batal
          </Button>

          <Button
            onClick={handleSubmit}
            variant="contained"
          >
            {editingStudent ? "Simpan Perubahan" : "Simpan Siswa"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
