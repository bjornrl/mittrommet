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
              Hva er MITTROMMET?
            </h2>
          </div>
          <p className="about-text">
            MITTROMMET representerer den overlappende sonen der institusjonene
            møtes. Det er et navn skildrer den samlede prosessen fremover, og
            rommene i det ferdige bygget som skal inneholde delte funksjoner
            mellom teateret, museet og Stavangers mangfoldige innbyggere.
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
            }}
          />
        </div>
        <section
          style={{
            backgroundColor: "#ef4444",
            padding: "1rem",
            color: "white",
            borderRadius: "8px",
            border: "1px solid white",
          }}
          className="about-section"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "8px",
              marginBottom: "16px",
            }}
          >
            <h2
              className="about-heading"
              style={{ color: "white", marginTop: 0 }}
            >
              <p>
                Podcast -
                <span style={{ fontStyle: "italic" }}>
                  Slik snur Stavanger byggeparadokset!
                </span>
              </p>
            </h2>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              margin: "16px",
            }}
          >
            <div style={{ width: "100%", maxWidth: 480, position: "relative" }}>
              {/* KI-merket sticker */}
              <img
                src="/images/ki-merket.png"
                alt="KI-merket"
                style={{
                  position: "absolute",
                  left: "-125px",
                  top: "42px",
                  width: "100px",
                  transform: "rotate(-18deg)",
                  zIndex: 2,
                  pointerEvents: "none",
                  userSelect: "none",
                  filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.23))",
                }}
              />
              <p className="about-text" style={{ color: "white" }}>
                Vi har KI-generert to podcaster, basert på presentasjonene om
                MITTROMMET. De kan du høre eller laste ned her!
              </p>
              <h3 style={{ marginBottom: 8, fontWeight: 600 }}>
                Slik snur Stavanger Byggeparadokset!
              </h3>
              <audio controls style={{ width: "100%" }}>
                <source
                  src="/podcast/Slik_Stavanger_snur_byggeparadokset_Mittrommet__Teater_og_museu.m4a"
                  type="audio/mp4"
                />
                Nettleseren din støtter ikke lydavspilling.
              </audio>
              <div
                style={{
                  marginTop: 6,
                  backgroundColor: "white",
                  width: "fit-content",
                  padding: "1rem",
                  borderRadius: "100px",
                }}
              >
                <a
                  href="/podcasts/podcast-1.mp3"
                  download
                  style={{
                    color: "#ef4444",
                    fontWeight: "bold",
                    textDecoration: "none",
                    fontSize: "0.98rem",
                  }}
                >
                  Last ned Podcast 1
                </a>
              </div>
            </div>
          </div>
        </section>
        <section
          id="kontakt"
          style={{
            backgroundColor: "#99E5F8",
            padding: "1rem",
            color: "#2F4335",
            borderRadius: "8px",
            border: "1px solid white",
          }}
          className="about-section"
        >
          <div
            style={{
              display: "flex",

              flexDirection: "row",
              alignItems: "center",
              gap: "8px",
              marginBottom: "16px",
            }}
          >
            <h2
              className="about-heading"
              style={{ color: "#2F4335", marginTop: 0 }}
            >
              <p>Kontakt</p>
            </h2>
          </div>

          <p
            className="about-text"
            style={{
              color: "#2F4335",
              marginBottom: "24px",
              textAlign: "center",
            }}
          >
            Hvis du har spørsmål eller tilbakemeldinger, ta kontakt med oss
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px",
              margin: "16px",
              color: "#2F4335",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "32px",
                width: "100%",
                maxWidth: "800px",
              }}
            >
              {/* Joana */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <img
                  src="/team-images/Joana.webp"
                  alt="Joana"
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "12px",
                    objectFit: "cover",
                    border: "1.5px solid white",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <div
                  style={{
                    color: "#2F4335",
                    fontWeight: 600,
                    fontSize: "1rem",
                  }}
                >
                  Joana
                </div>
                <a
                  href="mailto:joana@comte.no"
                  style={{
                    color: "#2F4335",
                    textDecoration: "none",
                    fontWeight: 500,
                    fontSize: "0.95rem",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.textDecoration = "underline";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.textDecoration = "none";
                  }}
                >
                  joana@comte.no
                </a>
              </div>

              {/* Herman */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <img
                  src="/team-images/Herman.webp"
                  alt="Herman"
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "12px",
                    objectFit: "cover",
                    border: "1.5px solid white",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <div
                  style={{
                    color: "#2F4335",
                    fontWeight: 600,
                    fontSize: "1rem",
                  }}
                >
                  Herman
                </div>
                <a
                  href="mailto:herman@comte.no"
                  style={{
                    color: "#2F4335",
                    textDecoration: "none",
                    fontWeight: 500,
                    fontSize: "0.95rem",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.textDecoration = "underline";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.textDecoration = "none";
                  }}
                >
                  herman@comte.no
                </a>
              </div>

              {/* Bjørn */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <img
                  src="/team-images/Bjørn.webp"
                  alt="Bjørn"
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "12px",
                    objectFit: "cover",
                    border: "1.5px solid white",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <div
                  style={{
                    color: "#2F4335",
                    fontWeight: 600,
                    fontSize: "1rem",
                  }}
                >
                  Bjørn
                </div>
                <a
                  href="mailto:bjorn@comte.no"
                  style={{
                    color: "#2F4335",
                    textDecoration: "none",
                    fontWeight: 500,
                    fontSize: "0.95rem",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.textDecoration = "underline";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.textDecoration = "none";
                  }}
                >
                  bjorn@comte.no
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AboutPage;
