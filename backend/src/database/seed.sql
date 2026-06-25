INSERT INTO clients (id, name, address, phone, document_number, plan_id, plan_name, status) VALUES
  ('1001', 'Juan Pérez', 'Av. Siempre Viva 742, La Plata', '2215550101', 'DNI 30123456', 'plan-a', 'NetSur 100Mb', 'active'),
  ('1002', 'María García', 'Calle 12 N° 345, La Plata', '2215550102', 'DNI 33456789', 'plan-b', 'NetSur 300Mb', 'active'),
  ('1003', 'Carlos López', 'Calle 8 N° 1234, Berisso', '2215550103', 'DNI 28765432', 'plan-c', 'NetSur 500Mb', 'active'),
  ('1004', 'Ana Martínez', 'Calle 50 N° 789, La Plata', '2215550104', 'DNI 31222333', 'plan-a', 'NetSur 100Mb', 'suspended'),
  ('1005', 'Pedro Rodríguez', 'Calle 7 N° 567, Ensenada', '2215550105', 'DNI 34888999', 'plan-b', 'NetSur 300Mb', 'active')
ON CONFLICT (id) DO NOTHING;

INSERT INTO plans (id, name, speed, price, description, features) VALUES
  ('plan-a', 'NetSur 100Mb', '100 Mbps', 8500, 'Ideal para hogares con hasta 3 dispositivos conectados', ARRAY['Fibra óptica', 'WiFi 5', 'Soporte 24/7', 'Instalación gratis']),
  ('plan-b', 'NetSur 300Mb', '300 Mbps', 12500, 'Perfecto para streaming y gaming', ARRAY['Fibra óptica', 'WiFi 6', 'Soporte 24/7', 'Instalación gratis', 'Netflix incluido']),
  ('plan-c', 'NetSur 500Mb', '500 Mbps', 18500, 'Para hogares con múltiples dispositivos', ARRAY['Fibra óptica', 'WiFi 6', 'Soporte prioritario 24/7', 'Instalación gratis', 'Netflix + Prime incluido']),
  ('plan-d', 'NetSur 1Gb', '1 Gbps', 25000, 'Experiencia extrema para usuarios avanzados', ARRAY['Fibra óptica', 'WiFi 6E', 'Soporte premium 24/7', 'Instalación gratis', 'Netflix + Prime + Disney+ incluido', 'IP fija'])
ON CONFLICT (id) DO NOTHING;

INSERT INTO bills (id, client_id, amount, due_date, paid, paid_at, period) VALUES
  ('fac-001', '1001', 8500, '2026-06-15', FALSE, NULL, 'Junio 2026'),
  ('fac-002', '1001', 8500, '2026-05-15', TRUE, '2026-05-13T10:00:00Z', 'Mayo 2026'),
  ('fac-003', '1001', 8500, '2026-04-15', TRUE, '2026-04-10T10:00:00Z', 'Abril 2026'),
  ('fac-004', '1002', 12500, '2026-06-20', FALSE, NULL, 'Junio 2026'),
  ('fac-005', '1002', 12500, '2026-05-20', TRUE, '2026-05-18T10:00:00Z', 'Mayo 2026'),
  ('fac-006', '1003', 18500, '2026-06-10', TRUE, '2026-06-08T10:00:00Z', 'Junio 2026'),
  ('fac-007', '1004', 8500, '2026-06-05', FALSE, NULL, 'Junio 2026'),
  ('fac-008', '1005', 12500, '2026-07-01', FALSE, NULL, 'Julio 2026')
ON CONFLICT (id) DO NOTHING;

INSERT INTO tickets (id, client_id, client_name, category, priority, status, description, created_at, updated_at) VALUES
  ('TK-1001', '1003', 'Carlos López', 'internet', 'high', 'in_progress', 'Sin conexión desde las 18hs', '2026-06-22T18:30:00Z', '2026-06-22T19:00:00Z'),
  ('TK-1002', '1001', 'Juan Pérez', 'billing', 'low', 'open', 'Consulta sobre factura duplicada', '2026-06-21T10:15:00Z', '2026-06-21T10:15:00Z'),
  ('TK-1003', '1005', 'Pedro Rodríguez', 'technical_visit', 'medium', 'resolved', 'Solicita visita técnica por avería en poste', '2026-06-20T09:00:00Z', '2026-06-22T11:30:00Z')
ON CONFLICT (id) DO NOTHING;

INSERT INTO outages (id, zone, description, start_time, estimated_end_time, status) VALUES
  ('out-001', 'La Plata - Centro', 'Corte programado por mantenimiento de red', '2026-06-25T02:00:00Z', '2026-06-25T06:00:00Z', 'active'),
  ('out-002', 'Berisso', 'Incidencia masiva por rotura de fibra óptica', '2026-06-22T15:30:00Z', '2026-06-22T20:00:00Z', 'active')
ON CONFLICT (id) DO NOTHING;
