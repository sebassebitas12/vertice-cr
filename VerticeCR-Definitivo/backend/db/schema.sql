-- Vértice CR · Esquema Relacional 3FN (21 tablas) · PostgreSQL / Supabase
-- Sincronizado con migración Supabase: 001_vertice_cr_core_schema

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 01. users
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL CHECK (char_length(full_name) BETWEEN 2 AND 120),
  email TEXT NOT NULL UNIQUE CHECK (char_length(email) <= 160),
  password_hash TEXT,
  auth_provider TEXT NOT NULL DEFAULT 'LOCAL' CHECK (auth_provider IN ('LOCAL', 'GOOGLE')),
  oauth_sub TEXT UNIQUE,
  mfa_enabled BOOLEAN NOT NULL DEFAULT false,
  mfa_secret_enc TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  anonymized_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 02. roles
CREATE TABLE IF NOT EXISTS public.roles (
  id SMALLINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  code TEXT NOT NULL UNIQUE CHECK (code IN ('cliente', 'taller', 'admin', 'auditor')),
  label TEXT NOT NULL CHECK (char_length(label) <= 60),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 03. user_roles
CREATE TABLE IF NOT EXISTS public.user_roles (
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  role_id SMALLINT NOT NULL REFERENCES public.roles(id) ON DELETE RESTRICT,
  assigned_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, role_id)
);
CREATE INDEX IF NOT EXISTS user_roles_role_id_idx ON public.user_roles (role_id);
CREATE INDEX IF NOT EXISTS user_roles_assigned_by_idx ON public.user_roles (assigned_by);

-- 04. refresh_tokens
CREATE TABLE IF NOT EXISTS public.refresh_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  user_agent TEXT,
  expires_at TIMESTAMPTZ NOT NULL,
  revoked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS refresh_tokens_user_id_idx ON public.refresh_tokens (user_id);
CREATE INDEX IF NOT EXISTS refresh_tokens_expires_at_idx ON public.refresh_tokens (expires_at);

-- 05. password_reset_tokens
CREATE TABLE IF NOT EXISTS public.password_reset_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS password_reset_tokens_user_id_idx ON public.password_reset_tokens (user_id);

-- 06. products_3d
CREATE TABLE IF NOT EXISTS public.products_3d (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE CHECK (char_length(slug) <= 120),
  name TEXT NOT NULL CHECK (char_length(name) <= 140),
  description TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL CHECK (char_length(category) <= 60),
  default_polymer TEXT NOT NULL CHECK (default_polymer IN ('PLA', 'PLA+', 'PETG', 'ABS', 'ASA', 'TPU', 'RESINA')),
  base_price_crc NUMERIC(12,2) NOT NULL CHECK (base_price_crc >= 0),
  est_hours NUMERIC(5,2) NOT NULL CHECK (est_hours > 0),
  image_url TEXT,
  gallery_urls JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS products_3d_category_published_idx ON public.products_3d (category, is_published);

-- 07. supplies
CREATE TABLE IF NOT EXISTS public.supplies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku TEXT NOT NULL UNIQUE CHECK (char_length(sku) <= 40),
  name TEXT NOT NULL CHECK (char_length(name) <= 140),
  supply_type TEXT NOT NULL CHECK (supply_type IN ('FILAMENTO', 'BOQUILLA', 'CAMA_PEI', 'ADHESIVO', 'REPUESTO')),
  polymer TEXT,
  color_name TEXT,
  diameter_mm NUMERIC(4,2),
  price_crc NUMERIC(12,2) NOT NULL CHECK (price_crc >= 0),
  stock_qty INTEGER NOT NULL DEFAULT 0 CHECK (stock_qty >= 0),
  min_stock INTEGER NOT NULL DEFAULT 3 CHECK (min_stock >= 0),
  image_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS supplies_type_active_idx ON public.supplies (supply_type, is_active);

-- 08. inventory_movements
CREATE TABLE IF NOT EXISTS public.inventory_movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  supply_id UUID NOT NULL REFERENCES public.supplies(id) ON DELETE RESTRICT,
  movement_type TEXT NOT NULL CHECK (movement_type IN ('IN', 'OUT', 'ADJUST')),
  qty_delta INTEGER NOT NULL CHECK (qty_delta <> 0),
  reference_type TEXT NOT NULL,
  reference_id UUID,
  actor_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS inventory_movements_supply_id_idx ON public.inventory_movements (supply_id);
CREATE INDEX IF NOT EXISTS inventory_movements_actor_id_idx ON public.inventory_movements (actor_id);

-- 09. quote_requests
CREATE TABLE IF NOT EXISTS public.quote_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE CHECK (char_length(code) <= 24),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
  base_product_id UUID REFERENCES public.products_3d(id) ON DELETE SET NULL,
  description TEXT NOT NULL,
  desired_polymer TEXT,
  dimensions_cm JSONB NOT NULL DEFAULT '{}'::jsonb,
  ai_notes JSONB NOT NULL DEFAULT '{}'::jsonb,
  status TEXT NOT NULL DEFAULT 'RECIBIDA' CHECK (status IN ('RECIBIDA', 'EN_REVISION', 'COTIZADA', 'APROBADA', 'RECHAZADA', 'CANCELADA')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS quote_requests_user_id_idx ON public.quote_requests (user_id);
CREATE INDEX IF NOT EXISTS quote_requests_base_product_id_idx ON public.quote_requests (base_product_id);
CREATE INDEX IF NOT EXISTS quote_requests_status_idx ON public.quote_requests (status);

-- 10. request_attachments
CREATE TABLE IF NOT EXISTS public.request_attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL REFERENCES public.quote_requests(id) ON DELETE CASCADE,
  file_kind TEXT NOT NULL CHECK (file_kind IN ('PHOTO', 'MODEL_3D')),
  mime_type TEXT NOT NULL,
  size_bytes INTEGER NOT NULL CHECK (size_bytes > 0),
  storage_path TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS request_attachments_request_id_idx ON public.request_attachments (request_id);

-- 11. quotes
CREATE TABLE IF NOT EXISTS public.quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL REFERENCES public.quote_requests(id) ON DELETE CASCADE,
  version_num INTEGER NOT NULL DEFAULT 1 CHECK (version_num >= 1),
  material_cost_crc NUMERIC(12,2) NOT NULL CHECK (material_cost_crc >= 0),
  labor_cost_crc NUMERIC(12,2) NOT NULL CHECK (labor_cost_crc >= 0),
  total_crc NUMERIC(12,2) NOT NULL CHECK (total_crc >= 0),
  rate_used NUMERIC(10,4) NOT NULL CHECK (rate_used > 0),
  status TEXT NOT NULL DEFAULT 'BORRADOR' CHECK (status IN ('BORRADOR', 'ENVIADA', 'ACEPTADA', 'VENCIDA', 'RECHAZADA')),
  approved_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
  valid_until DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (request_id, version_num)
);
CREATE INDEX IF NOT EXISTS quotes_request_id_idx ON public.quotes (request_id);
CREATE INDEX IF NOT EXISTS quotes_approved_by_idx ON public.quotes (approved_by);

-- 12. orders
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_code TEXT NOT NULL UNIQUE CHECK (char_length(order_code) <= 24),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
  quote_id UUID REFERENCES public.quotes(id) ON DELETE SET NULL,
  delivery_method TEXT NOT NULL CHECK (delivery_method IN ('RETIRO_TALLER', 'CORREOS_CR', 'MENSAJERIA_GAM')),
  shipping_crc NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (shipping_crc >= 0),
  total_crc NUMERIC(12,2) NOT NULL CHECK (total_crc >= 0),
  total_usd NUMERIC(12,2) NOT NULL CHECK (total_usd >= 0),
  status TEXT NOT NULL DEFAULT 'PENDIENTE_PAGO' CHECK (status IN ('PENDIENTE_PAGO', 'PAGADO', 'EN_PRODUCCION', 'LISTO', 'ENVIADO', 'ENTREGADO', 'CANCELADO')),
  idempotency_key TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS orders_user_id_idx ON public.orders (user_id);
CREATE INDEX IF NOT EXISTS orders_quote_id_idx ON public.orders (quote_id);
CREATE INDEX IF NOT EXISTS orders_status_idx ON public.orders (status);

-- 13. order_items
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  item_kind TEXT NOT NULL CHECK (item_kind IN ('SUPPLY', 'PRODUCT_3D', 'CUSTOM')),
  supply_id UUID REFERENCES public.supplies(id) ON DELETE SET NULL,
  product_3d_id UUID REFERENCES public.products_3d(id) ON DELETE SET NULL,
  item_label TEXT NOT NULL,
  qty INTEGER NOT NULL CHECK (qty > 0),
  unit_price_crc NUMERIC(12,2) NOT NULL CHECK (unit_price_crc >= 0)
);
CREATE INDEX IF NOT EXISTS order_items_order_id_idx ON public.order_items (order_id);
CREATE INDEX IF NOT EXISTS order_items_supply_id_idx ON public.order_items (supply_id);
CREATE INDEX IF NOT EXISTS order_items_product_3d_id_idx ON public.order_items (product_3d_id);

-- 14. payments
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  method TEXT NOT NULL CHECK (method IN ('PAYPAL_SANDBOX', 'SINPE')),
  external_ref TEXT,
  amount_crc NUMERIC(12,2) NOT NULL CHECK (amount_crc >= 0),
  amount_usd NUMERIC(12,2) NOT NULL CHECK (amount_usd >= 0),
  proof_url TEXT,
  status TEXT NOT NULL DEFAULT 'PENDIENTE' CHECK (status IN ('PENDIENTE', 'VERIFICADO', 'CAPTURADO', 'RECHAZADO', 'REEMBOLSADO')),
  verified_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS payments_order_id_idx ON public.payments (order_id);
CREATE INDEX IF NOT EXISTS payments_verified_by_idx ON public.payments (verified_by);

-- 15. supplier_invoices
CREATE TABLE IF NOT EXISTS public.supplier_invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_name TEXT NOT NULL,
  supplier_tax_id TEXT,
  hacienda_verified BOOLEAN NOT NULL DEFAULT false,
  invoice_date DATE NOT NULL,
  subtotal_crc NUMERIC(12,2) NOT NULL CHECK (subtotal_crc >= 0),
  tax_crc NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (tax_crc >= 0),
  total_crc NUMERIC(12,2) NOT NULL CHECK (total_crc >= 0),
  extracted_items JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'BORRADOR' CHECK (status IN ('BORRADOR', 'VALIDADA', 'CONTABILIZADA', 'RECHAZADA')),
  file_url TEXT,
  created_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS supplier_invoices_created_by_idx ON public.supplier_invoices (created_by);

-- 16. exchange_rates
CREATE TABLE IF NOT EXISTS public.exchange_rates (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  source TEXT NOT NULL DEFAULT 'HACIENDA_CR',
  buy_rate NUMERIC(10,4) NOT NULL CHECK (buy_rate > 0),
  sell_rate NUMERIC(10,4) NOT NULL CHECK (sell_rate > 0),
  fetched_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  is_fallback BOOLEAN NOT NULL DEFAULT false
);
CREATE INDEX IF NOT EXISTS exchange_rates_fetched_at_idx ON public.exchange_rates (fetched_at DESC);

-- 17. campaigns
CREATE TABLE IF NOT EXISTS public.campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  target_type TEXT NOT NULL CHECK (target_type IN ('PRODUCT_3D', 'SUPPLY', 'GENERAL')),
  target_id UUID,
  objective TEXT NOT NULL,
  post_copy TEXT NOT NULL DEFAULT '',
  ad_copy TEXT NOT NULL DEFAULT '',
  story_copy TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'APPROVED', 'ARCHIVED')),
  created_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS campaigns_created_by_idx ON public.campaigns (created_by);

-- 18. ai_agent_logs
CREATE TABLE IF NOT EXISTS public.ai_agent_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_code TEXT NOT NULL,
  provider_model TEXT NOT NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  user_role TEXT NOT NULL,
  input_summary TEXT NOT NULL,
  output_summary TEXT NOT NULL,
  latency_ms INTEGER CHECK (latency_ms >= 0),
  status TEXT NOT NULL CHECK (status IN ('OK', 'BLOCKED', 'ERROR')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS ai_agent_logs_user_id_idx ON public.ai_agent_logs (user_id);
CREATE INDEX IF NOT EXISTS ai_agent_logs_created_at_idx ON public.ai_agent_logs (created_at DESC);

-- 19. n8n_webhook_logs
CREATE TABLE IF NOT EXISTS public.n8n_webhook_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_code TEXT NOT NULL CHECK (workflow_code IN ('WF-01', 'WF-02', 'WF-03')),
  event_name TEXT NOT NULL,
  http_status SMALLINT,
  retry_count SMALLINT NOT NULL DEFAULT 0,
  payload_meta JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS n8n_webhook_logs_created_at_idx ON public.n8n_webhook_logs (created_at DESC);

-- 20. legal_consents
CREATE TABLE IF NOT EXISTS public.legal_consents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  doc_type TEXT NOT NULL CHECK (doc_type IN ('PRIVACY', 'TERMS')),
  policy_version TEXT NOT NULL,
  accepted_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS legal_consents_user_id_idx ON public.legal_consents (user_id);

-- 21. account_deletion_requests
CREATE TABLE IF NOT EXISTS public.account_deletion_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'REQUESTED' CHECK (status IN ('REQUESTED', 'COMPLETED', 'CANCELLED')),
  confirmed_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  legal_note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS account_deletion_requests_user_id_idx ON public.account_deletion_requests (user_id);
