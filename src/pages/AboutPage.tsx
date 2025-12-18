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

// interface ContactCardProps {
//   name: string;
//   email: string;
//   imageSrc: string;
//   imageWidth?: string;
//   imageHeight?: string;
//   backgroundColor?: string;
//   buttonColor?: string;
// }

// const ContactCard = ({
//   name,
//   email,
//   imageSrc,
//   imageWidth = "15rem",
//   imageHeight = "10rem",
//   backgroundColor = "white",
//   buttonColor = "white",
// }: ContactCardProps) => {
//   return (
//     <div
//       style={{
//         backgroundColor: backgroundColor,
//         borderRadius: "12px",
//         padding: "16px",
//         display: "flex",
//         flexDirection: "row",
//         alignItems: "center",
//         gap: "16px",
//         width: "100%",
//       }}
//     >
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "flex-start",
//           gap: "8px",
//           flex: 1,
//         }}
//       >
//         <div
//           style={{
//             color: "#2F4335",
//             fontWeight: 600,
//             fontSize: "3rem",
//           }}
//         >
//           {name}
//         </div>
//         <a
//           href={`mailto:${email}`}
//           style={{
//             color: "#2F4335",
//             textDecoration: "none",
//             fontWeight: 500,
//             fontSize: "0.95rem",
//             padding: "0.5rem",
//             borderRadius: "full",
//             backgroundColor: buttonColor,
//             // border: "1px solid white",
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.textDecoration = "underline";
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.textDecoration = "none";
//           }}
//         >
//           {email}
//         </a>
//       </div>
//       <img
//         src={imageSrc}
//         alt={name}
//         style={{
//           width: imageWidth,
//           height: imageHeight,
//           borderRadius: "12px",
//           objectFit: "cover",
//           // border: "1.5px solid white",
//           boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//           flexShrink: 0,
//         }}
//       />
//     </div>
//   );
// };

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
                  Last ned
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* <section
          id="kontakt"
          style={{
            backgroundColor: "#99E5F8",
            padding: "1rem",
            color: "#2F4335",
            borderRadius: "8px",
            // border: "1px solid white",
          }}
          className="about-section"
        >
          <div
            style={{
              display: "flex",

              flexDirection: "column",
              alignItems: "start",
              gap: "8px",
              marginBottom: "16px",
            }}
          >
            <h2
              className="about-heading"
              style={{ color: "#2F4335", marginTop: 0, fontSize: "3rem" }}
            >
              Kontakt
            </h2>
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
          </div>

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
                flexDirection: "column",
                alignItems: "center",
                gap: "2px",
                width: "100%",
                maxWidth: "800px",
              }}
            >
              <ContactCard
                name="Joana"
                email="joana@comte.no"
                imageSrc="/team-images/Joana.webp"
                backgroundColor="#FEE05F"
                buttonColor="#E9504C"
              />
              <ContactCard
                name="Herman"
                email="herman@comte.no"
                imageSrc="/team-images/Herman.webp"
                backgroundColor="#F5B3C4"
                buttonColor="#A7D8F7"
              />
              <ContactCard
                name="Bjørn"
                email="bjorn@comte.no"
                imageSrc="/team-images/Bjørn.webp"
                backgroundColor="#E9504C"
                buttonColor="#FEE05F"
              />
            </div>
          </div>
        </section> */}
      </div>
    </main>
  );
};

export default AboutPage;
