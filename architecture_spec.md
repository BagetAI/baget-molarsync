# MolarSync System Architecture & Database Specification

## TL;DR
MolarSync is built on a **Security-First, Zero-IT** architecture. The core persistence layer uses PostgreSQL for relational integrity, supplemented by a real-time event layer for PMS synchronization. We have provisioned the initial schema for Practices, Patients, Appointments, and the critical Insurance Pre-Auth Tracker.

---

## 1. Relational Database Schema
The following schema defines our core relational model, designed to sync with legacy Practice Management Systems (PMS) like Open Dental and Dentrix via a FHIR-compliant bridge.

### Core Entities
*   **Practices**: Multi-tenant isolation for clinics.
*   **Patients**: Unified patient record with insurance metadata.
*   **Appointments**: Scheduling engine supporting both PMS-synced and self-booked visits.
*   **Insurance_Auths**: The Kanban-state engine for tracking pre-authorizations (The "Insurance Black Hole" solution).

### SQL Schema Definition
The full schema is available in `schema.sql`. Key highlights:
- **UUID Primary Keys**: Ensures data portability and security.
- **PMS Mapping**: `external_pms_id` fields allow seamless syncing without data duplication.
- **Auditability**: `created_at` and `updated_at` timestamps on every record.

---

## 2. API & Integration Strategy
MolarSync operates as a **Browser-Based Overlay**.

*   **PMS Sync**: A lightweight background worker (or browser extension) reads from the local PMS database and pushes incremental updates to our PostgreSQL instance.
*   **Insurance Verification**: Uses FHIR (Fast Healthcare Interoperability Resources) APIs to query payers in real-time during the booking process.
*   **SMS Engine**: Webhook-driven integration with Twilio for automated recall and authorization alerts.

---

## 3. Provisioned Infrastructure
We have initialized the following live database endpoints for the MolarSync application:

### Lead Capture & Waitlist
- **Database ID**: `molarsync_leads_v1`
- **Purpose**: Captures interested office managers and practices for the Alpha pilot.
- **Fields**: `name`, `email`, `practice_name`, `chair_count`, `current_pms`.

### Self-Booking Demo (Public)
- **Database ID**: `molarsync_bookings_v1`
- **Purpose**: Powers the patient-facing booking portal.
- **Fields**: `patient_name`, `email`, `phone`, `preferred_date`, `insurance_provider`, `status`.

---

## 4. Next Steps for Engineering
1.  **Browser Extension Prototype**: Develop the local bridge that reads the Open Dental MySQL database.
2.  **Kanban UI Integration**: Connect the `insurance_auths` table to the frontend React board.
3.  **HIPAA Compliance**: Implement row-level security (RLS) in PostgreSQL to ensure strict PHI isolation.
