import { Photo } from "../components/Photo";
import { Breadcrumb, ContactBand } from "../components/SiteLayout";

export default function About() {
  return (
    <>
      <section className="about-intro section-space">
        <Breadcrumb items={[["A ART"]]} />
        <span className="section-kicker">Art Móveis Interiores</span>
        <h1>
          A casa tem histórias.
          <br />
          Os móveis fazem parte.
        </h1>
        <div className="about-lead">
          <p>
            Planejar um móvel é entender o que precisa caber. No ambiente, na
            rotina, na vida.
          </p>
          <p>
            A ART trabalha com móveis planejados para cozinhas, quartos, salas,
            banheiros e espaços de trabalho. Nosso ponto de partida é a
            conversa: o que você precisa, o que valoriza e como quer usar cada
            espaço.
          </p>
        </div>
      </section>
      <div className="about-photo">
        <Photo
          name="cozinha-aberta"
          alt="Cozinha e espaço de refeições do acervo ART"
          priority
          sizes="100vw"
        />
      </div>
      <section className="about-principles section-space">
        <h2>
          O que orienta
          <br />
          cada escolha.
        </h2>
        <div>
          {[
            [
              "Escutar antes de desenhar.",
              "Nenhuma referência substitui entender a sua rotina. O projeto começa com os hábitos, os objetos e as pessoas que vão usar o espaço.",
            ],
            [
              "Aproveitar com intenção.",
              "Uma gaveta, uma porta e um nicho precisam ter uma função. Organizar não é ocupar cada centímetro; é fazer o espaço funcionar.",
            ],
            [
              "Combinar cada detalhe.",
              "Materiais, medidas, acabamentos e execução devem fazer parte de uma conversa clara antes de seguir com o projeto.",
            ],
          ].map(([t, p]) => (
            <section key={t}>
              <h3>{t}</h3>
              <p>{p}</p>
            </section>
          ))}
        </div>
      </section>
      <ContactBand />
    </>
  );
}
