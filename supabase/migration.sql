-- Reliant Janitorial: quote_requests table + Pushover notification trigger
-- Run in the Supabase SQL editor (or via CLI migration).

create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  company text not null,
  phone text not null,
  email text not null,
  facility_type text,
  square_footage text,
  frequency text,
  town text,
  message text,
  source_page text,
  status text not null default 'new'
);

alter table public.quote_requests enable row level security;

-- Anonymous visitors may only INSERT. No select/update/delete from the anon key.
create policy "anon can insert quote requests"
  on public.quote_requests
  for insert
  to anon
  with check (true);

-- Trigger: call the pushover-notify Edge Function on every new row.
-- Requires the pg_net extension (Database > Extensions > enable pg_net)
-- REPLACE <PROJECT-REF> below and set PUSHOVER_TOKEN / PUSHOVER_USER as
-- Edge Function secrets before deploying.

create extension if not exists pg_net;

create or replace function public.notify_quote_request()
returns trigger
language plpgsql
security definer
as $$
begin
  perform net.http_post(
    url := 'https://<PROJECT-REF>.supabase.co/functions/v1/pushover-notify',
    headers := jsonb_build_object('Content-Type', 'application/json'),
    body := jsonb_build_object(
      'name', new.name,
      'company', new.company,
      'phone', new.phone,
      'email', new.email,
      'facility_type', new.facility_type,
      'square_footage', new.square_footage,
      'frequency', new.frequency,
      'town', new.town,
      'message', new.message,
      'source_page', new.source_page
    )
  );
  return new;
end;
$$;

drop trigger if exists on_quote_request_created on public.quote_requests;
create trigger on_quote_request_created
  after insert on public.quote_requests
  for each row execute function public.notify_quote_request();
