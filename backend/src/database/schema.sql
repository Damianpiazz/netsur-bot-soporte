CREATE TABLE IF NOT EXISTS clients (
  id VARCHAR(20) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address TEXT,
  phone VARCHAR(50),
  document_number VARCHAR(50),
  plan_id VARCHAR(50),
  plan_name VARCHAR(100),
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bills (
  id VARCHAR(50) PRIMARY KEY,
  client_id VARCHAR(20) REFERENCES clients(id),
  amount DECIMAL(10,2) NOT NULL,
  due_date DATE NOT NULL,
  paid BOOLEAN DEFAULT FALSE,
  paid_at TIMESTAMPTZ,
  period VARCHAR(50),
  download_url TEXT
);

CREATE TABLE IF NOT EXISTS plans (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  speed VARCHAR(50),
  price DECIMAL(10,2),
  description TEXT,
  features TEXT[]
);

CREATE TABLE IF NOT EXISTS tickets (
  id VARCHAR(50) PRIMARY KEY,
  client_id VARCHAR(20) REFERENCES clients(id),
  client_name VARCHAR(255),
  category VARCHAR(50),
  priority VARCHAR(20) DEFAULT 'medium',
  status VARCHAR(20) DEFAULT 'open',
  description TEXT,
  resolution TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS outages (
  id VARCHAR(50) PRIMARY KEY,
  zone VARCHAR(255),
  description TEXT,
  start_time TIMESTAMPTZ DEFAULT NOW(),
  estimated_end_time TIMESTAMPTZ,
  status VARCHAR(20) DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS surveys (
  id VARCHAR(50) PRIMARY KEY,
  client_id VARCHAR(20) REFERENCES clients(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS technical_visits (
  id VARCHAR(50) PRIMARY KEY,
  client_id VARCHAR(20) REFERENCES clients(id),
  client_name VARCHAR(255),
  address TEXT,
  time_slot VARCHAR(50),
  description TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS operator_escalations (
  id VARCHAR(50) PRIMARY KEY,
  client_id VARCHAR(20) REFERENCES clients(id),
  client_name VARCHAR(255),
  category VARCHAR(50),
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
