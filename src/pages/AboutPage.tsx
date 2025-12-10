const Circle = () => {
  return (
    <div className="w-3 h-3 rounded-full bg-[#ef4444] shrink-0 mr-3" />
  );
};

const AboutPage = () => {
  return (
    <main className="relative min-h-screen">
      <div
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-10 z-0"
        style={{
          backgroundImage: 'url("/Mittrommet Bakgrunn.png")',
          backgroundAttachment: "fixed",
        }}
      />
      <div className="about-container relative z-[1] mt-[180px]">
        <section className="about-section">
          <h1 className="about-title">Hva er Mittrommet?</h1>
          <p className="about-text">
            Mittrommet er det delte rommet mellom teatret og museet, ikke bare
            et fysisk rom, men en måte å tenke på hvordan de møter byen og
            menneskene som bor her. Det lever i bygningene deres i dag, skal ut
            i byen i morgen, og vil ta form i det nye kulturbygget i framtiden.
            Mittrommet senker terskelen for å være med. Du trenger ikke å kunne
            de «riktige» ordene, ha en spesiell bakgrunn eller være fast gjest.
            Det er et sted der du kan komme som du er, være nysgjerrig, prøve ut
            ting, møte andre, oppleve kunst og kunnskap på nye måter og kjenne
            at du hører til. Ved å knytte to sterke kulturinstitusjoner sammen
            og åpne dem mot byen, skaper Mittrommet rom for samarbeid,
            eksperimentering og nye idéer. Det er startpunktet for en langsiktig
            kulturell transformasjon, der teater, museum og by utvikler seg
            sammen.
          </p>
        </section>

        <section className="about-section">
          <div className="flex flex-row items-center gap-4">
            <Circle />
            <h2 className="about-heading m-0">
              Hvordan lese denne siden?
            </h2>
          </div>
          <p className="about-text">
            Denne siden gir en oversikt over hvordan Mittrommet kan vokse over
            tid – med start nå, ikke en gang langt fram i tid. I dette arbeidet
            har vi delt Mittrommet inn i tre utviklingsfaser: Nåtid (2026–2029),
            Mellomtid (2029–2034) og Nytid (fra 2034 og videre), og i tre
            hovedområder for utvikling: organisasjonen, «tredjerommet» og
            tjenestene og konseptene for ulike målgrupper.
          </p>
        </section>
        <div className="flex justify-center my-8">
          <img
            src="/images/RT&SM-Prosess.png"
            alt="Diagram som illustrerer utviklingsfaser for Mittrommet"
            className="max-w-full h-auto rounded-lg"
            style={{ boxShadow: "var(--card-shadow-soft)" }}
          />
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
