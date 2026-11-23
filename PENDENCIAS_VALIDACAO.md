# Aurora — Pendências e Validações para Revisão Humana

Este documento consolida os itens técnicos, regulatórios e de privacidade do projeto **Aurora** que dependem de validação humana e decisões de governança antes da publicação em larga escala.

---

## 1. Revisão Ética e Regulatória (OAB)

- **Status atual no código:** A funcionalidade de "Advogada parceira (1h/mês)" e a comercialização direta do plano Aurora Pro foram **removidas da interface comercial** e marcadas como "Em desenvolvimento / Em breve".
- **Pontos a validar com assessoria jurídica:**
  1. Análise de conformidade com o **Provimento nº 205/2021** e com o **Código de Ética e Disciplina da OAB** (vedação à captação indevida de clientela, mercantilização da advocacia e intermediação de serviços jurídicos privativos por empresas que não sejam sociedades de advogados).
  2. Definição do modelo de parcerias: caso se decida oferecer indicação profissional ou convênio, avaliar se o formato deve ser estritamente de diretório informativo ou direcionamento via convênios institucionais sem cobrança de comissão sobre honorários.
  3. Enquanto não houver parecer jurídico conclusivo, manter as promessas de atendimento profissional individualizado desativadas na plataforma.

---

## 2. Privacidade e Conformidade LGPD (DPO / Encarregado de Dados)

- **Pontos a validar com o responsável por dados (DPO/Jurídico):**
  1. **Indicação formal do Encarregado de Dados (DPO):** O art. 41 da LGPD exige a disponibilização da identidade e dos meios de contato do encarregado de dados no portal. Recomenda-se definir um endereço específico (ex.: `privacidade@aurora...` ou `dpo@aurora...`) e um nome/entidade responsável.
  2. **CNPJ e Razão Social:** Incluir nos Termos de Uso e no rodapé a identificação formal da pessoa jurídica ou entidade mantenedora responsável pelo tratamento dos dados.
  3. **Procedimento interno para exercício de direitos:** Estabelecer o fluxo operacional interno (SLA e passos) para responder a pedidos de exclusão, acesso ou retificação de dados recebidos por e-mail, garantindo que o usuário seja atendido no prazo legal de 15 dias (art. 19 da LGPD).

---

## 3. Infraestrutura de Comunicação e Suporte Oficial

- **E-mail Institucional:**
  - O código e as páginas de `/contato` e `/privacidade` apontam para o domínio institucional de suporte. É necessário criar e testar a caixa postal (ex.: `contato@aurora...`) para garantir o recebimento e resposta das mensagens.
- **Configuração de SMTP no Supabase:**
  - Para que a nova tela de `/recuperar-senha` e a confirmação de cadastro (`signUp`) funcionem em produção, é necessário configurar um provedor de envio de e-mails transacionais (ex.: Resend, SendGrid, Amazon SES ou SMTP próprio) no painel do Supabase (`Authentication -> Email Settings`).
- **Canal WhatsApp:**
  - A promessa de triagem automática pelo WhatsApp foi removida da interface pública, pois a API (`app/api/webhook/whatsapp`) ainda está sem a integração bidirecional (Graph API). A ativação desse canal dependerá de aprovação da Meta (WhatsApp Business Cloud API) e configuração das credenciais `WHATSAPP_TOKEN` e `WHATSAPP_PHONE_ID`.

---

## 4. Diretório da Defensoria Pública

- **Expansão Gradual:**
  - A base atual cobre 12 unidades federativas (SP, RJ, PA, MG, RS, PR, BA, DF, PE, CE, SC, GO) com links oficiais e telefones checados em Novembro/2026.
  - Recomenda-se realizar uma rotina periódica (semestral) de verificação dos links e telefones oficiais das Defensorias Estaduais para evitar desatualização em caso de mudanças nas páginas governamentais.
