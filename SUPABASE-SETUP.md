# Configuração do Supabase

1. Crie um projeto em https://supabase.com.
2. Abra **SQL Editor**, copie todo o conteúdo de `supabase/schema.sql` e execute.
3. Em **Project Settings → API**, copie a Project URL e a chave `service_role`.
4. Na Vercel, abra **Settings → Environment Variables** e crie:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Marque Production, Preview e Development e faça um novo deploy.
6. Abra o CRM no navegador que contém sua base atual. No primeiro carregamento, a base local será enviada ao Supabase automaticamente se o banco central ainda estiver vazio.

Nunca coloque a chave `service_role` no GitHub ou em variáveis iniciadas com `NEXT_PUBLIC_`.
