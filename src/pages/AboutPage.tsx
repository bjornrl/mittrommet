const AboutPage = () => {
  return (
    <main>
      <div className="about-container">
        <section className="about-section">
          <h1 className="about-title">Hva er Mittrommet?</h1>
          <p className="about-text">Introduksjon</p>
          <p className="about-text">Idebank</p>
        </section>

        <section className="about-section">
          <h2 className="about-heading">Hvordan lese denne siden?</h2>
          <p className="about-text">
            Leveransen fra prosjektgruppa til nye Rogaland Teater og Stavanger
            Museum er delt opp i tre deler:{" "}
            <ul>
              <li>1: Idebank</li>
              <li>2: Metode for testing</li>
              <li>3: Feedback loop for participation</li>
            </ul>
            Denne siden er er del 1: Idebanken, en samling med alle
            tjenestekonseptene som er samlet inn til nå i prosjektet. Konsptene
            er resultatet av individuelle og gruppevise samtaler med ansatte i
            Rogaland Teater og Stavanger Museum, samt barneskolebarn fra
            Stavanger.
          </p>
          <p className="about-text">
            Konseptene er organisert i tre faser: Nåtid, Mellomtid og Nytid.
            Dette gir en tidslinje for implementering og viser hvordan
            konseptene kan utvikle seg over tid.
          </p>
        </section>

        <section className="about-section">
          <h2 className="about-heading">Methodology for testing</h2>
          <p className="about-text">
            For å gjøre hvert eksperiment nyttig, følger vi en enkel
            læringssyklus i fire trinn. Hver test, enten det er en liten
            aktivitet, et nytt format eller et pilotprosjekt i byen, blir
            behandlet som en mulighet til å lære noe konkret og omdanne denne
            læringen til bedre rom, programmer og måter å samarbeide på.
          </p>
          <p>Include the picture of the methodology</p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0px",
              marginTop: "24px",
            }}
          >
            <div style={{ display: "flex", width: "100%" }}>
              <div
                style={{
                  backgroundColor: "#ef4444",
                  width: "50%",
                  padding: "20px",
                  color: "white",
                }}
              >
                <h2 style={{ color: "white" }}>Definer intensjon</h2>
                <p className="text-white">Hva ønsker vi å lære?</p>
                <p className="text-white">
                  Vi bestemmer hvorfor vi gjennomfører denne testen: hvilke
                  målgrupper vi fokuserer på, hvilket rom eller hvilken
                  situasjon vi ønsker å utforske, og hvilke spørsmål vi ønsker
                  svar på. Hvis det er nyttig, skriver vi en enkel hypotese:
                  «Hvis vi gjør X, forventer vi at Y vil skje.» Hvilke
                  målgrupper fokuserer vi på (familier, ungdom, ikke-brukere,
                  fagpersoner…)? Hvilket rom eller hvilken situasjon er vi
                  nysgjerrige på (foaje, uteområde, byområde, digitalt…)? Hva er
                  det viktigste læringsspørsmålet i én setning? Hva ville være
                  en meningsfull endring i atferd hvis dette fungerer (bli
                  lenger, bevege seg annerledes, komme tilbake, oppdage den
                  andre institusjonen…)?
                </p>
              </div>
              <div
                style={{
                  backgroundColor: "white",
                  width: "50%",
                  padding: "20px",
                  color: "#ef4444",
                }}
              >
                <h1>1</h1>
              </div>
            </div>
          </div>
          {/* <div className="about-categories">
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
          </div>*/}
        </section>
        <div
          className="about-div w-1/2 flex justify-center items-center h-full"
          style={{ backgroundColor: "#ef4444" }}
        >
          <p className="w-1/2 text-white">
            Include the picture of the methodologyInclude the picture of the
            methodologyInclude the picture of the methodologyInclude the picture
            of the methodology
          </p>
        </div>
        {/* <section className="about-section">
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
        </section> */}

        {/* <section className="about-section">
          <h2 className="about-heading">Kontakt</h2>
          <p className="about-text">
            For spørsmål om prosjektet eller konseptene, vennligst ta kontakt
            med prosjektteamet. Vi setter pris på tilbakemeldinger og forslag
            til forbedringer.
          </p>
        </section> */}
        {/* <section>
          <h2>Feedback loop for participation</h2>
        </section> */}
      </div>
    </main>
  );
};

export default AboutPage;
