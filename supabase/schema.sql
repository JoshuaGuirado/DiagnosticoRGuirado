-- Schema do Supabase para o Pré-Diagnóstico R.Guirado
-- Cole no Supabase: SQL Editor > New query > Run

create table if not exists public.diagnostics (
  id                  text primary key,
  type                text not null default 'franqueabilidade'
                        check (type in ('empresarial', 'franqueabilidade')),
  client_name         text not null,
  company_name        text,
  email               text,
  phone               text not null,
  city                text not null,
  segment             text,
  operation_time      text,
  own_units           integer,
  revenue             text,
  date                date not null default current_date,
  score               numeric(5,1) not null,
  category_scores     jsonb not null default '{}'::jsonb,
  category_max_scores jsonb not null default '{}'::jsonb,
  answers             jsonb not null default '{}'::jsonb,
  feedback_rating     smallint check (feedback_rating between 1 and 5),
  created_at          timestamptz not null default now()
);

create index if not exists diagnostics_date_idx on public.diagnostics (date desc);

-- O app acessa o banco com a chave anon (sem login do Supabase),
-- então as políticas liberam leitura, inserção, atualização e exclusão para anon.
alter table public.diagnostics enable row level security;

drop policy if exists "diagnostics_select" on public.diagnostics;
drop policy if exists "diagnostics_insert" on public.diagnostics;
drop policy if exists "diagnostics_update" on public.diagnostics;
drop policy if exists "diagnostics_delete" on public.diagnostics;

create policy "diagnostics_select" on public.diagnostics
  for select to anon, authenticated using (true);

create policy "diagnostics_insert" on public.diagnostics
  for insert to anon, authenticated with check (true);

create policy "diagnostics_update" on public.diagnostics
  for update to anon, authenticated using (true) with check (true);

create policy "diagnostics_delete" on public.diagnostics
  for delete to anon, authenticated using (true);

grant select, insert, update, delete on public.diagnostics to anon, authenticated;
