import { ArrowUpRight } from "lucide-react";
import { Photo } from "../components/Photo";
import { Breadcrumb } from "../components/SiteLayout";
import { brand } from "../data/catalog";
import { whatsappUrl } from "../lib/briefing";

export default function About() {
  return (
    <>
      <section className="about-intro section-space">
        <Breadcrumb items={[["A ART"]]} />
        <h1>
          ART Móveis
          <br />
          Interiores
        </h1>
        <div className="about-lead">
          <p>
            Móveis planejados para cozinhas, quartos, salas, banheiros e
            escritórios.
          </p>
          <p>
            Este acervo reúne fotografias do projeto original da ART. Você pode
            ampliar os detalhes, selecionar referências e enviá-las junto ao
            pedido de orçamento.
          </p>
        </div>
      </section>
      <div className="about-photo">
        <Photo
          name="cozinha-aberta"
          alt="Cozinha e área de refeições do acervo ART"
          priority
          sizes="100vw"
        />
      </div>
      <section className="about-principles section-space">
        <h2>Contato</h2>
        <div>
          <a
            className="text-link"
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp {brand.phone}
            <ArrowUpRight size={18} />
          </a>
          <br />
          <a
            className="text-link"
            href={brand.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
            <ArrowUpRight size={18} />
          </a>
          <br />
          <a
            className="text-link"
            href={brand.maps}
            target="_blank"
            rel="noopener noreferrer"
          >
            Localização
            <ArrowUpRight size={18} />
          </a>
          <br />
          <a className="text-link" href="/orcamento">
            Solicitar orçamento
            <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
    </>
  );
}
