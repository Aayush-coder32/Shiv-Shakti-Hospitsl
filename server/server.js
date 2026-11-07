import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const app = express();
const port = Number(process.env.PORT || 5000);

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 200, standardHeaders: true, legacyHeaders: false }));

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'shiv-shakti-hospital-api' });
});

app.get('/api/dashboard/overview', (_request, response) => {
  response.json({
    source: 'demo',
    generatedAt: new Date().toISOString(),
    metrics: {
      totalPatients: 248,
      totalDoctors: 18,
      totalStaff: 42,
      totalAppointments: 1264,
      todaysAppointments: 24,
      pendingAppointments: 17,
      completedAppointments: 1138,
      cancelledAppointments: 109,
      totalRevenue: 1842500,
      monthlyRevenue: 326400,
      availableBeds: 34,
      occupiedBeds: 86,
    },
    charts: {
      monthlyPatients: [{ month: 'Jan', patients: 142 }, { month: 'Feb', patients: 158 }, { month: 'Mar', patients: 176 }, { month: 'Apr', patients: 164 }, { month: 'May', patients: 198 }, { month: 'Jun', patients: 214 }, { month: 'Jul', patients: 228 }, { month: 'Aug', patients: 248 }],
      appointmentTrends: [{ month: 'Jan', appointments: 118 }, { month: 'Feb', appointments: 136 }, { month: 'Mar', appointments: 151 }, { month: 'Apr', appointments: 143 }, { month: 'May', appointments: 178 }, { month: 'Jun', appointments: 192 }, { month: 'Jul', appointments: 207 }, { month: 'Aug', appointments: 224 }],
      revenueAnalytics: [{ month: 'Jan', revenue: 218000 }, { month: 'Feb', revenue: 242000 }, { month: 'Mar', revenue: 258000 }, { month: 'Apr', revenue: 247000 }, { month: 'May', revenue: 281000 }, { month: 'Jun', revenue: 294000 }, { month: 'Jul', revenue: 312000 }, { month: 'Aug', revenue: 326400 }],
      departmentPatients: [{ department: 'General Medicine', patients: 412 }, { department: 'Cardiology', patients: 286 }, { department: 'Orthopedics', patients: 224 }, { department: 'Pediatrics', patients: 198 }, { department: 'Gynecology', patients: 176 }],
      admissionDischarge: [{ month: 'Jan', admissions: 54, discharges: 48 }, { month: 'Feb', admissions: 62, discharges: 57 }, { month: 'Mar', admissions: 68, discharges: 61 }, { month: 'Apr', admissions: 64, discharges: 60 }, { month: 'May', admissions: 72, discharges: 66 }, { month: 'Jun', admissions: 78, discharges: 71 }, { month: 'Jul', admissions: 84, discharges: 76 }, { month: 'Aug', admissions: 89, discharges: 82 }],
    },
  });
});

app.use((_request, response) => {
  response.status(404).json({ message: 'Route not found' });
});

app.listen(port, () => {
  console.log(`Shiv Shakti Hospital API listening on port ${port}`);
});
