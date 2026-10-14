import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { brand } from "../data/catalog";
import { whatsappUrl } from "../lib/briefing";
import { Photo } from "../components/Photo";
import { Logo, Breadcrumb } from "../components/SiteLayout";

export function Privacy() {
  return (
    <section className="policy section-space">
      <Breadcrumb items={[["Privacidade"]]} />
      <h1>
        Seus dados,
        <br />
        com clareza.
      </h1>
      <p>Atualizado em 14 de outubro de 2026.</p>
      <h2>Referências e rascunho</h2>
      <p>
        As referências salvas e o rascunho do briefing ficam no armazenamento
        local deste navegador. Eles não são enviados automaticamente à ART. O
        rascunho pode conter nome, cidade, telefone opcional e detalhes do
        projeto. Use “Apagar rascunho” na página do briefing para removê-lo.
      </p>
      <h2>Conversa pelo WhatsApp</h2>
      <p>
        Ao escolher “Abrir conversa no WhatsApp”, o site abre o serviço com o
        resumo preenchido. Você confere o texto e decide se quer enviá-lo. O
        recebimento pela equipe depende do envio no WhatsApp. O uso do serviço
        segue suas próprias políticas de privacidade.
      </p>
      <h2>Origem de campanhas</h2>
      <p>
        Parâmetros de campanha (UTM) podem ser guardados durante a sessão para
        identificar de onde veio a visita. Eles aparecem no resumo do briefing.
        Não utilizamos cookies de publicidade ou pixels de rastreamento nesta
        versão.
      </p>
      <h2>Arquivos e outros serviços</h2>
      <p>
        Você pode baixar o briefing em texto ou CSV. Esses arquivos são criados
        no navegador. Ao visitar Instagram, WhatsApp ou Maps, você acessa
        serviços externos, sujeitos às suas próprias políticas.
      </p>
      <h2>Remover informações deste navegador</h2>
      <p>
        Você pode remover todas as referências, o rascunho e a origem de
        campanha usando o controle abaixo. Arquivos já baixados e mensagens
        enviadas devem ser gerenciados nos respectivos dispositivos e serviços.
      </p>
      <ClearData />
      <h2>Contato</h2>
      <p>
        Para conversar sobre dados que você enviou à ART, use o{" "}
        <a
          href={whatsappUrl(
            "Olá! Gostaria de conversar sobre meus dados pessoais.",
          )}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp oficial {brand.phone}
        </a>
        .
      </p>
    </section>
  );
}
function ClearData() {
  const [cleared, setCleared] = useState(false);
  return (
    <div>
      <button
        className="button button-outline"
        onClick={() => {
          try {
            localStorage.removeItem("art-saved");
            localStorage.removeItem("art-draft");
            sessionStorage.removeItem("art-attribution");
            window.dispatchEvent(new Event("art-storage-clear"));
            setCleared(true);
          } catch {
            setCleared(false);
          }
        }}
      >
        Apagar dados deste navegador
      </button>
      {cleared && (
        <p role="status">
          Referências, rascunho e origem de campanha removidos.
        </p>
      )}
    </div>
  );
}
export function LinkBio() {
  return (
    <section className="link-bio">
      <Logo />
      <Photo name="cozinha-integrada" alt="Cozinha planejada ART" priority />
      <h1>
        Sua casa.
        <br />
        Do seu jeito.
      </h1>
      <p>Móveis planejados para os espaços e as histórias da sua vida.</p>
      {[
        ["Vamos planejar seu ambiente", "/orcamento"],
        ["Explore nosso acervo", "/ambientes"],
        ["Leia o journal", "/blog"],
        ["Converse no WhatsApp", whatsappUrl()],
        ["Instagram", brand.instagram],
        ["Como chegar", brand.maps],
      ].map(([label, href]) => (
        <a
          className="bio-link"
          href={href}
          key={label}
          {...(href.startsWith("https")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {label}
          <ArrowUpRight size={20} />
        </a>
      ))}
      <a className="text-link" href="/">
        Visitar o site <ArrowUpRight size={18} />
      </a>
    </section>
  );
}
export function NotFound() {
  return (
    <section className="not-found section-space">
      <span className="section-kicker">Página não encontrada</span>
      <h1>
        Vamos encontrar
        <br />
        um novo caminho.
      </h1>
      <p>
        Este endereço não está no nosso acervo. Você pode explorar os ambientes
        ou começar pela página inicial.
      </p>
      <a href="/" className="button">
        Voltar ao início <ArrowUpRight size={18} />
      </a>
    </section>
  );
}
