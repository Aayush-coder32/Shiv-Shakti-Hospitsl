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
  });
});

app.use((_request, response) => {
  response.status(404).json({ message: 'Route not found' });
});

app.listen(port, () => {
  console.log(`Shiv Shakti Hospital API listening on port ${port}`);
});
