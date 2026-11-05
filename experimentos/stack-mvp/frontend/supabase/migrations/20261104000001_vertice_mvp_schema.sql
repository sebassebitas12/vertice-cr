-- =============================================================================
-- Vértice CR — Esquema PostgreSQL y Políticas RLS para el MVP (vertice-cr-mvp)
-- Reglas de negocio:
-- 1. Solo los 5 polímeros autorizados: ASA, PETG, PLA, ABS, TPU
-- 2. Solicitudes sin cotizar permanecen en PENDING_QUOTE (nunca a monto 0)
-- 3. RLS habilitado en todas las tablas con políticas explícitas TO authenticated / TO anon
-- =============================================================================

create type public.fdm_material as enum ('ASA', 'PETG', 'PLA', 'ABS', 'TPU');
create type public.request_status as enum ('PENDING_QUOTE', 'NEEDS_INFO', 'QUOTED', 'APPROVED');
create type public.field_origin as enum ('Cliente', 'IA aceptada');

-- 1. Catálogo de modelos fabricados bajo pedido
create table public.catalog_products (
  id text primary key,
  code text not null unique,
  name text not null,
  category text not null,
  layer_height text not null default '0.20 mm',
  perimeters text not null default '4 perímetros',
  infill_pattern text not null default '35% Gyroid',
  materials public.fdm_material[] not null,
  approved_colors text[] not null,
  short_quote text not null,
  description text not null,
  use_cases text[] not null default '{}',
  images text[] not null default '{}',
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.catalog_products enable row level security;

create policy "catalog_products_select_public"
  on public.catalog_products
  for select
  to anon, authenticated
  using (true);

-- 2. Solicitudes de cotización bajo pedido
create table public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  idempotency_key text not null unique,
  user_id uuid references auth.users(id) on delete set null,
  mode text not null check (mode in ('catalogo', 'medida')),
  catalog_product_id text references public.catalog_products(id) on delete set null,
  description text not null,
  material public.fdm_material not null,
  material_origin public.field_origin not null default 'Cliente',
  environment text not null,
  color_id text not null,
  color_name text not null,
  quantity integer not null check (quantity >= 1 and quantity <= 500),
  client_name text not null,
  client_email text not null,
  status public.request_status not null default 'PENDING_QUOTE',
  workshop_question text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_quote_requests_user_id on public.quote_requests(user_id);
create index idx_quote_requests_status on public.quote_requests(status);
create index idx_quote_requests_catalog_product_id on public.quote_requests(catalog_product_id);

alter table public.quote_requests enable row level security;

create policy "quote_requests_select_owner_or_workshop"
  on public.quote_requests
  for select
  to authenticated
  using (
    (select auth.uid()) = user_id
    or ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'workshop_admin')
  );

create policy "quote_requests_insert_authenticated"
  on public.quote_requests
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "quote_requests_update_owner_or_workshop"
  on public.quote_requests
  for update
  to authenticated
  using (
    (select auth.uid()) = user_id
    or ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'workshop_admin')
  )
  with check (
    (select auth.uid()) = user_id
    or ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'workshop_admin')
  );

-- 3. Versiones de cotización emitidas por el taller (Prohibido monto <= 0)
create table public.quote_versions (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.quote_requests(id) on delete cascade,
  version integer not null check (version >= 1),
  amount_crc integer not null check (amount_crc > 0),
  estimated_print_hours numeric(5,2) not null check (estimated_print_hours > 0),
  layer_height text not null,
  perimeters text not null,
  workshop_notes text not null,
  valid_until date not null,
  created_at timestamptz not null default now(),
  unique (request_id, version)
);

create index idx_quote_versions_request_id on public.quote_versions(request_id);

alter table public.quote_versions enable row level security;

create policy "quote_versions_select_owner_or_workshop"
  on public.quote_versions
  for select
  to authenticated
  using (
    exists (
      select 1 from public.quote_requests r
      where r.id = quote_versions.request_id
        and (
          r.user_id = (select auth.uid())
          or ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'workshop_admin')
        )
    )
  );

-- 4. Historial de eventos del expediente
create table public.request_events (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.quote_requests(id) on delete cascade,
  actor text not null check (actor in ('Cliente', 'Taller Vértice', 'Asistente IA (n8n)')),
  title text not null,
  detail text not null,
  created_at timestamptz not null default now()
);

create index idx_request_events_request_id on public.request_events(request_id);

alter table public.request_events enable row level security;

create policy "request_events_select_owner_or_workshop"
  on public.request_events
  for select
  to authenticated
  using (
    exists (
      select 1 from public.quote_requests r
      where r.id = request_events.request_id
        and (
          r.user_id = (select auth.uid())
          or ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'workshop_admin')
        )
    )
  );

