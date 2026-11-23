'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/inputs'
import { AlertTriangle, ExternalLink, PhoneCall, CheckCircle2, Building2 } from 'lucide-react'
import defensoriaData from '@/lib/data/defensoria.json'

type UF = keyof typeof defensoriaData

const CHECKLIST = [
  'Documentos pessoais: RG, CPF e comprovante de residência atualizado (originais e cópias ou arquivos digitais legíveis).',
  'Comprovação de hipossuficiência: holerite recente, extrato bancário, carteira de trabalho ou comprovante de benefício social (CadÚnico/Bolsa Família) para requerer gratuidade de justiça.',
  'Provas e registros da situação: mensagens, fotografias, áudios, extratos, relatórios médicos, boletim de ocorrência (se houver) e nomes de testemunhas.',
  'Minutas e anotações: leve o resumo e documentos-base organizados na Aurora para facilitar a explicação dos fatos à defensora ou advogada.',
  'Verificação prévia: confirme com a unidade da Defensoria do seu município se o atendimento exige agendamento pela internet ou se há triagem presencial por ordem de chegada.',
  'No atendimento: solicite o comprovante de atendimento/protocolo, anote o número de acompanhamento e verifique os prazos e próximos passos informados pela equipe.',
]

export default function ChecklistPage() {
  const [estado, setEstado] = useState<UF>('SP')
  const dados = defensoriaData[estado]

  return (
    <div className="min-h-screen bg-aurora-50 px-4 py-8">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* NAVEGAÇÃO */}
        <div className="flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold text-aurora-700 hover:underline">
            ← Voltar para a página inicial
          </Link>
          <Link href="/triagem">
            <Button size="sm" variant="outline">Fazer triagem informativa</Button>
          </Link>
        </div>

        {/* ALERTA DE EMERGÊNCIA */}
        <div className="bg-rose-950 text-white rounded-2xl p-6 shadow-md border border-rose-900 space-y-3">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-amber-400 shrink-0 mt-0.5" size={22} aria-hidden="true" />
            <div>
              <p className="font-bold text-base">Você está em perigo agora?</p>
              <p className="text-sm text-rose-100 mt-0.5">
                Se puder fazer isso com segurança, ligue <strong>190</strong> (Polícia Militar). Para orientação e acolhimento sobre a rede de atendimento à mulher, ligue <strong>180</strong>. A Aurora não é um canal de emergência.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 pt-1 font-semibold text-sm">
            <a href="tel:190" className="inline-flex items-center gap-1.5 text-white underline hover:text-rose-200">
              <PhoneCall size={16} aria-hidden="true" /> Ligar 190
            </a>
            <a href="tel:180" className="inline-flex items-center gap-1.5 text-white underline hover:text-rose-200">
              <PhoneCall size={16} aria-hidden="true" /> Ligar 180
            </a>
          </div>
        </div>

        {/* CHECKLIST DE DOCUMENTOS E ATENDIMENTO */}
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2 text-aurora-700 font-semibold text-sm">
              <CheckCircle2 size={18} aria-hidden="true" /> Passo a passo preparatório
            </div>
            <CardTitle className="text-xl">Checklist para atendimento na Defensoria Pública ou com Advogada</CardTitle>
            <CardDescription>
              O procedimento judicial depende de avaliação técnica, documentos específicos e regras locais da sua comarca. Reúna com antecedência os itens abaixo para orientar seu atendimento:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal ml-5 space-y-3 text-sm text-neutral-700 leading-relaxed">
              {CHECKLIST.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
            <div className="mt-5 p-3.5 bg-neutral-100 rounded-xl text-xs text-neutral-700">
              <strong>Importante:</strong> Os documentos preparados pela Aurora são minutas-base informativas. A petição oficial e o ajuizamento da ação devem ser realizados pela defensora pública ou advogada responsável, que avaliará as particularidades do caso.
            </div>
          </CardContent>
        </Card>

        {/* DIRETÓRIO OFICIAL DA DEFENSORIA */}
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2 text-aurora-700 font-semibold text-sm">
              <Building2 size={18} aria-hidden="true" /> Canais oficiais e fontes governamentais
            </div>
            <CardTitle className="text-xl">Diretório da Defensoria Pública por Estado</CardTitle>
            <CardDescription>
              Selecione o estado para consultar portais oficiais, centrais de atendimento telefônico e endereços verificados.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* SELETOR DE ESTADOS */}
            <div>
              <p className="text-xs font-semibold text-neutral-600 mb-2">Estados cadastrados nesta base:</p>
              <div className="flex flex-wrap gap-1.5">
                {(Object.keys(defensoriaData) as UF[]).map((uf) => (
                  <Button
                    key={uf}
                    size="sm"
                    variant={uf === estado ? 'default' : 'outline'}
                    onClick={() => setEstado(uf)}
                    className="font-medium"
                    aria-pressed={uf === estado}
                  >
                    {uf}
                  </Button>
                ))}
              </div>
            </div>

            {/* DETALHES DO ESTADO SELECIONADO */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
                <div>
                  <h3 className="text-lg font-bold text-neutral-900">
                    Defensoria Pública do Estado de {dados.nome_estado} ({estado})
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Informações conferidas em fontes oficiais em: <strong>{dados.verificado_em}</strong>
                  </p>
                </div>
                <a
                  href={dados.link_oficial}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-aurora-700 hover:text-aurora-800 underline shrink-0"
                >
                  Visitar portal oficial ({estado}) <ExternalLink size={14} aria-hidden="true" />
                </a>
              </div>

              {/* TELEFONES OFICIAIS */}
              <div>
                <p className="text-xs font-bold text-neutral-800 uppercase tracking-wide">Centrais de atendimento telefônico oficiais:</p>
                <ul className="list-disc ml-5 mt-1 text-sm text-neutral-700 space-y-0.5">
                  {dados.telefones.map((tel) => (
                    <li key={tel}>{tel}</li>
                  ))}
                </ul>
              </div>

              {/* ENDEREÇOS E UNIDADES */}
              <div>
                <p className="text-xs font-bold text-neutral-800 uppercase tracking-wide">Unidade Central e Atendimento:</p>
                <ul className="list-disc ml-5 mt-1 text-sm text-neutral-700 space-y-1">
                  {dados.enderecos.map((end) => (
                    <li key={end}>{end}</li>
                  ))}
                </ul>
              </div>

              {/* HORÁRIOS E REGRAS */}
              <div>
                <p className="text-xs font-bold text-neutral-800 uppercase tracking-wide">Horários e agendamento:</p>
                <p className="text-sm text-neutral-700 mt-1">{dados.horarios}</p>
              </div>

              {/* MUNICÍPIOS COBERTOS NESTA BASE */}
              <div>
                <p className="text-xs font-bold text-neutral-800 uppercase tracking-wide mb-1.5">Regiões e polos de referência:</p>
                <div className="flex flex-wrap gap-1.5">
                  {dados.municipios_cobertos.map((m) => (
                    <Badge key={m} className="bg-white text-neutral-700 border-neutral-300 text-xs">
                      {m}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  ⚠️ <strong>Orientações para o atendimento:</strong> Confirme previamente com a unidade indicada os documentos exigidos, as regras de agendamento presencial ou remoto e os próximos passos processuais. Em cidades sem sede própria da Defensoria estadual, verifique convênios locais com a OAB ou a Defensoria Pública da União (DPU).
                </p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              A Aurora não possui cobertura municipal exaustiva em todo o território nacional. Sempre consulte o portal oficial da Defensoria do seu estado para conferir a unidade judiciária correspondente à sua comarca.
            </p>
          </CardContent>
        </Card>

        {/* AÇÕES */}
        <div className="flex flex-wrap gap-3">
          <Link href="/triagem">
            <Button>Fazer triagem informativa</Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline">Consultar meus casos</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
