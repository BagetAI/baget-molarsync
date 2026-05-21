-- MolarSync Core Database Schema
-- Optimized for 1-4 chair dental practices with legacy PMS sync requirements.

-- Practices Table: The root entity for the SaaS
CREATE TABLE practices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    office_manager_name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    address_line1 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(50),
    zip_code VARCHAR(20),
    chair_count INTEGER DEFAULT 1,
    pms_provider VARCHAR(50), -- e.g., 'Open Dental', 'Dentrix', 'Eaglesoft'
    subscription_tier VARCHAR(20) DEFAULT 'basic', -- 'basic', 'pro'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Patients Table: Synced from PMS or created via self-booking
CREATE TABLE patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    practice_id UUID REFERENCES practices(id) ON DELETE CASCADE,
    external_pms_id VARCHAR(100), -- ID from the clinic's local system
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    date_of_birth DATE,
    insurance_carrier VARCHAR(255),
    insurance_member_id VARCHAR(100),
    insurance_group_number VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(practice_id, external_pms_id)
);

-- Appointments Table: Primary scheduling data
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    practice_id UUID REFERENCES practices(id) ON DELETE CASCADE,
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    external_appointment_id VARCHAR(100),
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(50) DEFAULT 'scheduled', -- scheduled, confirmed, arrived, completed, cancelled, no-show
    treatment_description TEXT,
    cdt_codes TEXT[], -- Array of CDT codes for the planned procedures
    is_self_booked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Appointment_Reminders Table: Logic for automated SMS/Email triggers
CREATE TABLE appointment_reminders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id UUID REFERENCES appointments(id) ON DELETE CASCADE,
    reminder_type VARCHAR(20) NOT NULL, -- '24h', '2h', 'confirmation'
    status VARCHAR(20) DEFAULT 'queued', -- queued, sent, failed
    message_body TEXT NOT NULL,
    scheduled_for TIMESTAMP WITH TIME ZONE,
    sent_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insurance_Auths Table: The "Insurance Black Hole" tracker (Kanban Foundation)
CREATE TABLE insurance_auths (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    practice_id UUID REFERENCES practices(id) ON DELETE CASCADE,
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
    procedure_codes TEXT[], -- Array of CDT codes
    status VARCHAR(50) DEFAULT 'draft', -- draft, submitted, pending, authorized, denied, expired
    auth_number VARCHAR(100),
    requested_date DATE DEFAULT CURRENT_DATE,
    authorized_date DATE,
    expiry_date DATE,
    estimated_patient_portion NUMERIC(10, 2),
    estimated_insurance_portion NUMERIC(10, 2),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_patients_practice ON patients(practice_id);
CREATE INDEX idx_appointments_practice_time ON appointments(practice_id, start_time);
CREATE INDEX idx_insurance_auths_status ON insurance_auths(status);
CREATE INDEX idx_insurance_auths_practice ON insurance_auths(practice_id);
CREATE INDEX idx_reminders_appointment ON appointment_reminders(appointment_id);
CREATE INDEX idx_reminders_status ON appointment_reminders(status);
