const Circle = () => {
  return (
    <div
      style={{
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        backgroundColor: "#ef4444",
        flexShrink: 0,
        marginRight: "12px",
      }}
    />
  );
};

const AboutPage = () => {
  return (
    <main
      style={{
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: 'url("/Mittrommet Bakgrunn.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          opacity: 0.1,
          zIndex: 0,
        }}
      />
      <div
        className="about-container"
        style={{ position: "relative", zIndex: 1, marginTop: "180px" }}
      >
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <Circle />
            <h2 className="about-heading" style={{ margin: 0 }}>
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "32px 0",
          }}
        >
          <img
            src="/images/RT&SM-Prosess.png"
            alt="Diagram som illustrerer utviklingsfaser for Mittrommet"
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: "8px",
              boxShadow: "var(--card-shadow-soft)",
            }}
          />
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
