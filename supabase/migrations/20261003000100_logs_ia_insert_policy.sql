-- RLS: o cliente autenticado precisa conseguir INSERIR em logs_ia.
-- A política existente ("logs_own") só permitia SELECT, então todo insert
-- feito pela aplicação falhava silenciosamente e nenhum log era gravado.

drop policy if exists "logs_insert_own" on public.logs_ia;
create policy "logs_insert_own" on public.logs_ia
  for insert with check (
    caso_id is null
    or exists (
      select 1 from public.casos c
      where c.id = logs_ia.caso_id and c.usuario_id = auth.uid()
    )
  );
