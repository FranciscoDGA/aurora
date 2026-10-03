-- Rebrand: Clara -> Aurora
-- Renomeia os slugs de plano e o CHECK constraint da tabela perfis.
-- Compatível tanto com bancos novos (init já com aurora_*) quanto com
-- bancos antigos (init aplicado com clara_*).
-- Rodar com: npm run db:push

update public.perfis set plano = 'aurora_plus' where plano = 'clara_plus';
update public.perfis set plano = 'aurora_pro'  where plano = 'clara_pro';

alter table public.perfis drop constraint if exists perfis_plano_check;
alter table public.perfis add constraint perfis_plano_check
  check (plano in ('gratuito', 'aurora_plus', 'aurora_pro'));
