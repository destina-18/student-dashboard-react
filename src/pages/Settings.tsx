import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

import BadgeIcon from "@mui/icons-material/Badge";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import SaveIcon from "@mui/icons-material/Save";
import SchoolIcon from "@mui/icons-material/School";
import VerifiedIcon from "@mui/icons-material/Verified";

const PRIMARY = "#b71c1c";
const PRIMARY_DARK = "#921616";

const cardSx = {
  p: { xs: 2.5, sm: 3.5 },
  borderRadius: 4,
  border: "1px solid #f1e3e3",
  boxShadow: "0 4px 20px rgba(183, 28, 28, 0.05)",
} as const;

const primaryButtonSx = {
  backgroundColor: PRIMARY,
  borderRadius: 2,
  px: 3,
  py: 1.2,
  textTransform: "none",
  fontWeight: 600,
  boxShadow: "none",
  "&:hover": {
    backgroundColor: PRIMARY_DARK,
    boxShadow: "none",
  },
} as const;

function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography sx={{ fontWeight: 700, fontSize: 17 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {subtitle}
      </Typography>
    </Box>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: 2,
          backgroundColor: "#fff5f5",
          color: PRIMARY,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>

      <Box sx={{ minWidth: 0 }}>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
        <Typography
          sx={{ fontWeight: 600, fontSize: 14, wordBreak: "break-word" }}
        >
          {value || "-"}
        </Typography>
      </Box>
    </Box>
  );
}

export default function ProfileContent() {
  const [profile, setProfile] = useState({
    nama: "Destina Amelia Sari, S.Pd",
    nip: "198905122015011003",
    jabatan: "Administrator Sekolah",
    email: "admin@siswaku.com",
    telepon: "0812-3456-7890",
    tanggalLahir: "2008-12-18",
    jenisKelamin: "Perempuan",
    alamat: "Jl. Danau Ranau No. 12, Sawojajar, Kota Malang, Jawa Timur",
    bio: "Mengelola data siswa, kelas, dan administrasi sekolah agar tetap rapi dan mudah diakses.",
    username: "admin_siswaku",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitProfile = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSnackbar({
      open: true,
      message: "Profil berhasil diperbarui!",
      severity: "success",
    });
  };

  const tanggalLahirText = profile.tanggalLahir
    ? new Date(profile.tanggalLahir).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "-";

  const stats = [
    { label: "Masa Kerja", value: "11 Tahun" },
    { label: "Data Dikelola", value: "10 Siswa" },
    { label: "Login Terakhir", value: "Hari ini" },
  ];

  return (
    <Box className="profile-content">
      {/* Judul */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Pengaturan Profil
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 0.5 }}>
          Kelola informasi akun dan profil pengguna.
        </Typography>
      </Box>

      {/* Kartu Profil */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          border: "1px solid #f1e3e3",
          boxShadow: "0 4px 20px rgba(183, 28, 28, 0.05)",
          overflow: "hidden",
          mb: 3,
        }}
      >
        {/* Banner */}
        <Box
          sx={{
            height: { xs: 100, sm: 130 },
            background: `linear-gradient(120deg, ${PRIMARY} 0%, #e53935 60%, #ff7961 100%)`,
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              right: -40,
              top: -40,
              width: 180,
              height: 180,
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.12)",
            },
          }}
        />

        <Box sx={{ px: { xs: 2.5, sm: 4 }, pb: 3 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "flex-start", sm: "flex-start" },
              justifyContent: "space-between",
              gap: 2,
              mt: { xs: -5, sm: -6 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 2.5,
                flexWrap: "wrap",
              }}
            >
              {/* Foto Profil */}
              <Box sx={{ position: "relative" }}>
                <Avatar
                  sx={{
                    width: { xs: 90, sm: 110 },
                    height: { xs: 90, sm: 110 },
                    bgcolor: PRIMARY_DARK,
                    border: "5px solid #ffffff",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
                  }}
                >
                  <PersonIcon sx={{ fontSize: 55 }} />
                </Avatar>

                <IconButton
                  size="small"
                  sx={{
                    position: "absolute",
                    right: 0,
                    bottom: 4,
                    backgroundColor: "#ffffff",
                    border: "1px solid #eeeeee",
                    "&:hover": { backgroundColor: "#fff5f5" },
                  }}
                >
                  <CameraAltIcon sx={{ fontSize: 16, color: PRIMARY }} />
                </IconButton>
              </Box>

              {/* Informasi Profil */}
              <Box sx={{ pt: { xs: 0, sm: 7 } }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.8,
                    flexWrap: "wrap",
                  }}
                >
                  <Typography sx={{ fontWeight: 700, fontSize: 21 }}>
                    {profile.nama}
                  </Typography>
                  <VerifiedIcon sx={{ color: "#1e88e5", fontSize: 20 }} />
                </Box>

                <Typography color="text.secondary" variant="body2">
                  @{profile.username} • {profile.email}
                </Typography>

                <Box sx={{ display: "flex", gap: 1, mt: 1, flexWrap: "wrap" }}>
                  <Chip
                    label={profile.jabatan}
                    size="small"
                    sx={{
                      fontWeight: 600,
                      backgroundColor: "#fdecea",
                      color: PRIMARY,
                    }}
                  />
                  <Chip
                    label="Akun Aktif"
                    size="small"
                    sx={{
                      fontWeight: 600,
                      backgroundColor: "#e5f6e9",
                      color: "#25813c",
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Statistik Profil */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 2,
              mt: 3,
              p: 2,
              borderRadius: 3,
              backgroundColor: "#fff8f8",
            }}
          >
            {stats.map((item) => (
              <Box key={item.label} sx={{ textAlign: "center" }}>
                <Typography
                  sx={{ fontWeight: 700, fontSize: { xs: 14, sm: 17 } }}
                  color="primary"
                >
                  {item.value}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Paper>

      {/* Informasi Profil dan Form */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={0} sx={cardSx}>
            <SectionTitle
              title="Tentang Saya"
              subtitle="Ringkasan informasi profil"
            />

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ lineHeight: 1.7, mb: 3 }}
            >
              {profile.bio || "Belum ada bio."}
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.2 }}>
              <InfoRow
                icon={<BadgeIcon fontSize="small" />}
                label="NIP"
                value={profile.nip}
              />

              <InfoRow
                icon={<EmailIcon fontSize="small" />}
                label="Email"
                value={profile.email}
              />

              <InfoRow
                icon={<PhoneIcon fontSize="small" />}
                label="Telepon"
                value={profile.telepon}
              />

              <InfoRow
                icon={<CalendarMonthIcon fontSize="small" />}
                label="Tanggal Lahir"
                value={tanggalLahirText}
              />

              <InfoRow
                icon={<SchoolIcon fontSize="small" />}
                label="Instansi"
                value="SMK Telkom Malang"
              />

              <InfoRow
                icon={<LocationOnIcon fontSize="small" />}
                label="Alamat"
                value={profile.alamat}
              />
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Informasi Pribadi */}
            <Paper elevation={0} sx={cardSx}>
              <SectionTitle
                title="Informasi Pribadi"
                subtitle="Perbarui data diri dan kontak kamu"
              />

              <Box component="form" onSubmit={handleSubmitProfile}>
                <Grid container spacing={2.5}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label="Nama Lengkap"
                      name="nama"
                      value={profile.nama}
                      onChange={handleChange}
                      required
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label="NIP"
                      name="nip"
                      value={profile.nip}
                      onChange={handleChange}
                      required
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={profile.email}
                      onChange={handleChange}
                      required
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label="No. Telepon"
                      name="telepon"
                      value={profile.telepon}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label="Tanggal Lahir"
                      name="tanggalLahir"
                      type="date"
                      value={profile.tanggalLahir}
                      onChange={handleChange}
                      slotProps={{ inputLabel: { shrink: true } }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      select
                      fullWidth
                      label="Jenis Kelamin"
                      name="jenisKelamin"
                      value={profile.jenisKelamin}
                      onChange={handleChange}
                    >
                      <MenuItem value="Laki-laki">Laki-laki</MenuItem>
                      <MenuItem value="Perempuan">Perempuan</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Alamat"
                      name="alamat"
                      value={profile.alamat}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      multiline
                      minRows={3}
                      label="Bio"
                      name="bio"
                      value={profile.bio}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: 3,
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<SaveIcon />}
                    sx={primaryButtonSx}
                  >
                    Simpan Perubahan
                  </Button>
                </Box>
              </Box>
            </Paper>

            {/* Informasi Akun */}
            <Paper elevation={0} sx={cardSx}>
              <SectionTitle
                title="Informasi Akun"
                subtitle="Username dan jabatan yang tampil di sistem"
              />

              <Box component="form" onSubmit={handleSubmitProfile}>
                <Grid container spacing={2.5}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label="Username"
                      name="username"
                      value={profile.username}
                      onChange={handleChange}
                      required
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label="Jabatan"
                      name="jabatan"
                      value={profile.jabatan}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                </Grid>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: 3,
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<SaveIcon />}
                    sx={primaryButtonSx}
                  >
                    Simpan Akun
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>

      {/* Notifikasi */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
