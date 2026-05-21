// MolarSync API Architecture & Environment Config
// This file defines the core environment variables and API endpoint structures.

export const DB_CONFIG = {
  TABLES: {
    PRACTICES: 'practices',
    PATIENTS: 'patients',
    APPOINTMENTS: 'appointments',
    INSURANCE_AUTHS: 'insurance_auths',
  }
};

export const API_ROUTES = {
  BOOKING: '/api/v1/booking',
  INSURANCE: {
    VERIFY: '/api/v1/insurance/verify',
    TRACK: '/api/v1/insurance/track',
  },
  PMS_SYNC: '/api/v1/sync',
};

// Security Middleware Definitions
export const SECURITY_POLICY = {
  ENCRYPTION_ALGORITHM: 'aes-256-gcm',
  SESSION_TIMEOUT: '15m', // Strict timeout for clinical environments
  RATE_LIMIT: 100, // Requests per minute
};
