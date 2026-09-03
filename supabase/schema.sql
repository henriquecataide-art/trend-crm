create extension if not exists pgcrypto;

create table if not exists crm_state (
  id text primary key,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  label text not null,
  starts_at timestamptz not null,
  sales_open_at timestamptz,
  venue text,
  city text,
  lifecycle text not null default 'active' check (lifecycle in ('active','paused','archived')),
  created_at timestamptz not null default now()
);

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  cpf text,
  email text,
  phone text,
  birth_date date,
  city text,
  neighborhood text,
  gender text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index if not exists uq_customers_cpf on customers(cpf) where cpf is not null and cpf <> '';
create unique index if not exists uq_customers_email on customers(lower(email)) where email is not null and email <> '';
create index if not exists idx_customers_phone on customers(phone);

create table if not exists commissioners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  main_code text not null unique,
  phone text,
  email text,
  status text not null default 'active',
  goal numeric not null default 0,
  commission_rate numeric not null default 0,
  notes text
);
create table if not exists commissioner_codes (
  id uuid primary key default gen_random_uuid(),
  commissioner_id uuid not null references commissioners(id) on delete cascade,
  code text not null unique
);

create table if not exists imports (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references events(id) on delete cascade,
  file_name text not null,
  imported_at timestamptz not null default now(),
  status text not null,
  totals jsonb not null default '{}'::jsonb
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  external_id text,
  event_id uuid not null references events(id) on delete cascade,
  customer_id uuid not null references customers(id) on delete restrict,
  commissioner_id uuid references commissioners(id) on delete set null,
  coupon text,
  status text not null check (status in ('approved','denied','cancelled','courtesy')),
  purchased_at timestamptz not null,
  gross_value numeric not null default 0,
  discount_value numeric not null default 0,
  paid_value numeric not null default 0,
  payment_method text,
  installments integer,
  is_internal boolean not null default false,
  is_pdv boolean not null default false,
  import_id uuid references imports(id) on delete set null,
  unique(event_id, external_id)
);
create index if not exists idx_orders_event_status on orders(event_id,status);
create index if not exists idx_orders_customer_date on orders(customer_id,purchased_at);
create index if not exists idx_orders_commissioner on orders(commissioner_id);

create table if not exists participants (
  id uuid primary key default gen_random_uuid(),
  name text,
  cpf text,
  email text,
  phone text
);
create table if not exists tickets (
  id uuid primary key default gen_random_uuid(),
  external_id text,
  order_id uuid not null references orders(id) on delete cascade,
  event_id uuid not null references events(id) on delete cascade,
  participant_id uuid references participants(id) on delete set null,
  product text,
  lot text,
  sector text,
  value numeric not null default 0,
  status text not null check (status in ('approved','denied','cancelled','courtesy')),
  checked_in_at timestamptz,
  import_id uuid references imports(id) on delete set null,
  unique(event_id, external_id)
);
create index if not exists idx_tickets_order on tickets(order_id);
create index if not exists idx_tickets_event_status on tickets(event_id,status);

alter table crm_state enable row level security;
alter table events enable row level security;
alter table customers enable row level security;
alter table commissioners enable row level security;
alter table commissioner_codes enable row level security;
alter table imports enable row level security;
alter table orders enable row level security;
alter table participants enable row level security;
alter table tickets enable row level security;
