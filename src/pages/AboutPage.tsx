const AboutPage = () => {
  return (
    <main>
      <div className="about-container">
        <section className="about-section">
          <h1 className="about-title">Om dette prosjektet</h1>
          <p className="about-text">
            Denne lille React/Tailwind-applikasjonen viser et konsept-arkiv for
            Mittrommet. Du kan filtrere på faser, årstider, dager og tid på
            døgnet, og søke i beskrivelsene.
          </p>
          <p className="about-text">
            Fargene og stilene styres via CSS-variabler i{" "}
            <code className="about-code">index.css</code>, slik at det er enkelt
            å gjøre raske justeringer på tvers av hele løsningen.
          </p>
        </section>

        <section className="about-section">
          <h2 className="about-heading">Bakgrunn</h2>
          <p className="about-text">
            Mittrommet er et samarbeidsprosjekt mellom Rogaland Teater og
            Stavanger Museum. Prosjektet har som mål å utforske nye
            tjenestedesignkonsepter som kan forbedre brukeropplevelsen og
            engasjementet hos besøkende.
          </p>
          <p className="about-text">
            Gjennom omfattende research og brukerundersøkelser har vi
            identifisert flere områder hvor innovasjon kan skape verdi. Dette
            arkivet samler konseptene som er utviklet gjennom prosjektet.
          </p>
        </section>

        <section className="about-section">
          <h2 className="about-heading">Konseptkategorier</h2>
          <div className="about-categories">
            <div className="about-category">
              <h3 className="about-subheading">Faser</h3>
              <p className="about-text">
                Konseptene er organisert i tre faser: Nåtid, Mellomtid og Nytid.
                Dette gir en tidslinje for implementering og viser hvordan
                konseptene kan utvikle seg over tid.
              </p>
            </div>
            <div className="about-category">
              <h3 className="about-subheading">Årstider</h3>
              <p className="about-text">
                Mange konsepter er knyttet til spesifikke årstider. Dette
                reflekterer sesongvariasjoner i besøkstall og ulike behov
                gjennom året.
              </p>
            </div>
            <div className="about-category">
              <h3 className="about-subheading">Dager og tid</h3>
              <p className="about-text">
                Konseptene kan også filtreres basert på ukedager versus helg,
                samt tid på døgnet. Dette hjelper med å identifisere løsninger
                som passer best for ulike besøksmønstre.
              </p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2 className="about-heading">Teknisk informasjon</h2>
          <p className="about-text">
            Denne applikasjonen er bygget med React og TypeScript, og bruker
            Tailwind CSS for styling. Routing håndteres av React Router, og
            komponentene er designet for å være modulære og gjenbrukbare.
          </p>
          <p className="about-text">
            Alle konseptene er generert lokalt for demonstrasjonsformål. I en
            produksjonsversjon ville disse hentes fra en backend-tjeneste eller
            database.
          </p>
        </section>

        <section className="about-section">
          <h2 className="about-heading">Kontakt</h2>
          <p className="about-text">
            For spørsmål om prosjektet eller konseptene, vennligst ta kontakt
            med prosjektteamet. Vi setter pris på tilbakemeldinger og forslag
            til forbedringer.
          </p>
        </section>
      </div>
    </main>
  );
};

export default AboutPage;
