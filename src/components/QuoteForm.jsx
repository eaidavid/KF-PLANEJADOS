import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  Download,
  Heart,
  RotateCcw,
} from "lucide-react";
import { environments, projects } from "../data/catalog";
import {
  readStorage,
  writeStorage,
  captureAttribution,
  buildBriefing,
  whatsappUrl,
  downloadText,
  briefingCsv,
} from "../lib/briefing";
const blank = {
  environments: [],
  property: "Casa",
  timing: "Estou pesquisando",
  measurements: "",
  notes: "",
  name: "",
  city: "",
  phone: "",
};
export default function QuoteForm({ saved }) {
  const [data, setData] = useState(blank),
    [step, setStep] = useState(1),
    [error, setError] = useState(""),
    [status, setStatus] = useState(""),
    [attribution, setAttribution] = useState({}),
    [storageReady, setStorageReady] = useState(false);
  useEffect(() => {
    const draft = readStorage("art-draft", null);
    const restored =
      draft && typeof draft === "object"
        ? Object.fromEntries(
            Object.keys(blank).map((k) => [
              k,
              k === "environments"
                ? Array.isArray(draft[k])
                  ? draft[k].filter((v) =>
                      environments.some((e) => e.name === v),
                    )
                  : []
                : typeof draft[k] === "string"
                  ? draft[k].slice(0, 1200)
                  : blank[k],
            ]),
          )
        : { ...blank };
    const env = environments.find(
      (e) =>
        e.slug === new URLSearchParams(window.location.search).get("ambiente"),
    );
    if (env && !restored.environments.includes(env.name))
      restored.environments = [...restored.environments, env.name];
    setData(restored);
    setAttribution(captureAttribution());
    setStorageReady(true);
  }, []);
  const update = (key, value) => {
    const next = { ...data, [key]: value };
    setData(next);
    setError("");
    if (storageReady && !writeStorage("art-draft", next))
      setStatus(
        "O navegador não permitiu salvar o rascunho. Você pode continuar nesta página.",
      );
  };
  const next = (e) => {
    e.preventDefault();
    if (step === 1 && !data.environments.length) {
      setError("Selecione pelo menos um ambiente para continuar.");
      return;
    }
    if (step === 2 && data.phone && data.phone.replace(/\D/g, "").length < 10) {
      setError("Informe o telefone com DDD ou deixe esse campo vazio.");
      return;
    }
    if (step === 2 && (!data.name.trim() || !data.city.trim())) {
      setError("Preencha seu nome e a cidade para continuar.");
      return;
    }
    setError("");
    setStep(step + 1);
    requestAnimationFrame(() => document.getElementById("step-title")?.focus());
  };
  const text = buildBriefing(data, saved, attribution);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("Briefing copiado.");
    } catch {
      setStatus(
        "Não foi possível copiar. Use “Baixar briefing” para guardar o texto.",
      );
    }
  };
  return (
    <section className="briefing-page section-space">
      <div className="briefing-intro">
        <a href="/ambientes" className="text-link">
          <ArrowLeft size={16} /> Voltar aos ambientes
        </a>
        <span className="section-kicker">Vamos planejar</span>
        <h1>
          Comece contando.
          <br />A gente começa
          <br />
          escutando.
        </h1>
        <p>
          Um pequeno briefing para organizar suas ideias e levar a conversa
          adiante.
        </p>
        <ol className="steps" aria-label="Etapas do briefing">
          {["Seu espaço", "Os detalhes", "Revisar & conversar"].map((t, i) => (
            <li
              key={t}
              className={
                step === i + 1 ? "current" : step > i + 1 ? "complete" : ""
              }
              aria-current={step === i + 1 ? "step" : undefined}
            >
              <span>{step > i + 1 ? <Check size={16} /> : i + 1}</span>
              {t}
            </li>
          ))}
        </ol>
        <div className="briefing-help">
          <Heart size={18} />
          <p>
            {saved.length
              ? `${saved.length} referência${saved.length === 1 ? "" : "s"} salva${saved.length === 1 ? "" : "s"} acompanha${saved.length === 1 ? "" : "m"} seu briefing.`
              : "Você pode salvar ideias no acervo e voltar a este briefing."}
          </p>
        </div>
        <p className="draft-note">
          Rascunho salvo apenas neste navegador.{" "}
          <a href="/privacidade">Entenda sua privacidade.</a>
        </p>
      </div>
      <div className="briefing-form">
        <span className="step-counter">Etapa {step} de 3</span>
        <form onSubmit={next}>
          {step === 1 && (
            <>
              <h2 id="step-title" tabIndex={-1}>
                Qual espaço vamos planejar?
              </h2>
              <p className="form-description">
                Selecione um ou mais ambientes.
              </p>
              <fieldset className="choice-grid">
                <legend className="sr-only">Ambientes do projeto</legend>
                {environments.map((env) => (
                  <label
                    className={`choice ${data.environments.includes(env.name) ? "selected" : ""}`}
                    key={env.slug}
                  >
                    <input
                      type="checkbox"
                      checked={data.environments.includes(env.name)}
                      onChange={() =>
                        update(
                          "environments",
                          data.environments.includes(env.name)
                            ? data.environments.filter((x) => x !== env.name)
                            : [...data.environments, env.name],
                        )
                      }
                    />
                    <span>{env.name}</span>
                    <span className="choice-check">
                      <Check size={15} />
                    </span>
                  </label>
                ))}
              </fieldset>
              <label className="field-label" htmlFor="property">
                Seu imóvel é…
              </label>
              <select
                id="property"
                value={data.property}
                onChange={(e) => update("property", e.target.value)}
              >
                {["Casa", "Apartamento", "Espaço comercial", "Outro"].map(
                  (o) => (
                    <option key={o}>{o}</option>
                  ),
                )}
              </select>
              <label className="field-label" htmlFor="timing">
                Em que momento você está?
              </label>
              <select
                id="timing"
                value={data.timing}
                onChange={(e) => update("timing", e.target.value)}
              >
                {[
                  "Estou pesquisando",
                  "Estou reformando",
                  "Imóvel em construção",
                  "Imóvel pronto para planejar",
                ].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </>
          )}
          {step === 2 && (
            <>
              <h2 id="step-title" tabIndex={-1}>
                Os detalhes fazem diferença.
              </h2>
              <p className="form-description">
                O que você já sabe ajuda a primeira conversa.
              </p>
              <div className="field-row">
                <label>
                  Seu nome
                  <input
                    required
                    autoComplete="name"
                    name="name"
                    value={data.name}
                    onChange={(e) => update("name", e.target.value)}
                    maxLength={80}
                    placeholder="Como podemos chamar você?"
                  />
                </label>
                <label>
                  Cidade e estado
                  <input
                    required
                    name="city"
                    autoComplete="address-level2"
                    value={data.city}
                    onChange={(e) => update("city", e.target.value)}
                    maxLength={100}
                    placeholder="Ex.: Bauru, SP"
                  />
                </label>
              </div>
              <label>
                Telefone com DDD <span className="optional">(opcional)</span>
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={data.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  maxLength={20}
                  placeholder="(00) 00000-0000"
                />
              </label>
              <label>
                Medidas aproximadas <span className="optional">(se tiver)</span>
                <input
                  value={data.measurements}
                  onChange={(e) => update("measurements", e.target.value)}
                  maxLength={200}
                  placeholder="Ex.: parede de 3 m, pé-direito de 2,70 m"
                />
              </label>
              <label>
                O que não pode faltar?
                <textarea
                  rows={4}
                  value={data.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  maxLength={1200}
                  placeholder="Conte sobre sua rotina, o que precisa guardar ou o que quer mudar."
                />
              </label>
              <p className="input-help">
                Fotos e plantas podem ser compartilhadas diretamente na conversa
                com a equipe.
              </p>
            </>
          )}
          {step === 3 && (
            <>
              <h2 id="step-title" tabIndex={-1}>
                Sua ideia já tem um começo.
              </h2>
              <p className="form-description">
                Revise o resumo. Ao abrir o WhatsApp, você decide quando enviar
                a mensagem.
              </p>
              <dl className="briefing-summary">
                <div>
                  <dt>Nome</dt>
                  <dd>{data.name}</dd>
                </div>
                <div>
                  <dt>Cidade</dt>
                  <dd>{data.city}</dd>
                </div>
                <div>
                  <dt>Ambientes</dt>
                  <dd>{data.environments.join(", ")}</dd>
                </div>
                <div>
                  <dt>Imóvel</dt>
                  <dd>{data.property}</dd>
                </div>
                <div>
                  <dt>Momento</dt>
                  <dd>{data.timing}</dd>
                </div>
                <div>
                  <dt>Medidas</dt>
                  <dd>{data.measurements || "Ainda não tenho"}</dd>
                </div>
                {data.notes && (
                  <div>
                    <dt>Observações</dt>
                    <dd>{data.notes}</dd>
                  </div>
                )}
                {saved.length > 0 && (
                  <div>
                    <dt>Referências</dt>
                    <dd>
                      {projects
                        .filter((p) => saved.includes(p.id))
                        .map((p) => (
                          <a href={`/projetos/${p.id}`} key={p.id}>
                            {p.title}
                          </a>
                        ))}
                    </dd>
                  </div>
                )}
              </dl>
              {Object.keys(attribution).length > 0 && (
                <p className="input-help">
                  Origem da visita:{" "}
                  {Object.entries(attribution)
                    .map(([k, v]) => `${k}: ${v}`)
                    .join(" · ")}
                </p>
              )}
              <a
                className="button whatsapp-submit"
                href={whatsappUrl(text)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir conversa no WhatsApp <ArrowUpRight size={20} />
              </a>
              <p className="send-note">
                O pedido chega à equipe depois que você enviar a mensagem no
                WhatsApp.
              </p>
              <div className="briefing-exports">
                <button type="button" className="text-link" onClick={copy}>
                  <Copy size={16} /> Copiar resumo
                </button>
                <button
                  type="button"
                  className="text-link"
                  onClick={() => downloadText("meu-projeto-art.txt", text)}
                >
                  <Download size={16} /> Baixar briefing
                </button>
                <button
                  type="button"
                  className="text-link"
                  onClick={() =>
                    downloadText(
                      "art-lead.csv",
                      briefingCsv(data, text, attribution),
                      "text/csv;charset=utf-8",
                    )
                  }
                >
                  <Download size={16} /> Baixar CSV
                </button>
              </div>
            </>
          )}
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          {status && (
            <p className="form-status" role="status">
              {status}
            </p>
          )}
          <div className="form-actions">
            {step > 1 && (
              <button
                type="button"
                className="text-link"
                onClick={() => {
                  setStep(step - 1);
                  setStatus("");
                  requestAnimationFrame(() =>
                    document.getElementById("step-title")?.focus(),
                  );
                }}
              >
                <ArrowLeft size={17} /> Voltar
              </button>
            )}
            {step < 3 && (
              <button className="button" type="submit">
                Continuar <ArrowRight size={18} />
              </button>
            )}
          </div>
        </form>
        <button
          className="clear-draft"
          type="button"
          onClick={() => {
            setData({ ...blank });
            setStep(1);
            setError("");
            setStatus("Rascunho apagado.");
            try {
              localStorage.removeItem("art-draft");
            } catch {
              /* no persisted data available */
            }
          }}
        >
          <RotateCcw size={14} /> Apagar rascunho
        </button>
      </div>
    </section>
  );
}
