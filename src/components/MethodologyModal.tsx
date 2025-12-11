interface MethodologyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MethodologyModal = ({ isOpen, onClose }: MethodologyModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: "900px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 className="modal-title">Metode for testing</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div style={{ padding: "24px", maxHeight: "80vh", overflowY: "auto" }}>
          <p className="about-text">
            For å gjøre hvert eksperiment nyttig, følger vi en enkel
            læringssyklus i fire trinn. Hver test, enten det er en liten
            aktivitet, et nytt format eller et pilotprosjekt i byen, blir
            behandlet som en mulighet til å lære noe konkret og omdanne denne
            læringen til bedre rom, programmer og måter å samarbeide på.
          </p>

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

                <p className="text-white">
                  <strong>Hva ønsker vi å lære?</strong>
                </p>
                <p className="text-white">
                  Vi bestemmer hvorfor vi gjennomfører denne testen: hvilke
                  målgrupper vi fokuserer på, hvilket rom eller hvilken
                  situasjon vi ønsker å utforske, og hvilke spørsmål vi ønsker
                  svar på. Hvis det er nyttig, skriver vi en enkel hypotese:
                  <ul>
                    <li>«Hvis vi gjør X, forventer vi at Y vil skje.»</li>
                    <li>
                      Hvilke målgrupper fokuserer vi på (familier, ungdom,
                      ikke-brukere, fagpersoner…)?
                    </li>
                    <li>
                      Hvilket rom eller hvilken situasjon er vi nysgjerrige på
                      (foaje, uteområde, byområde, digitalt…)?
                    </li>
                    <li>
                      Hva er det viktigste læringsspørsmålet i én setning?
                    </li>
                    <li>
                      Hva ville være en meningsfull endring i atferd hvis dette
                      fungerer (bli lenger, bevege seg annerledes, komme
                      tilbake, oppdage den andre institusjonen…)?
                    </li>
                  </ul>
                </p>
              </div>
              <div
                style={{
                  width: "50%",
                  padding: "20px",
                  color: "#ef4444",
                }}
              >
                <h1 style={{ fontSize: "80px" }}>1</h1>
              </div>
            </div>

            <div style={{ display: "flex", width: "100%" }}>
              <div
                style={{
                  width: "50%",
                  padding: "20px",
                  color: "#ef4444",
                  textAlign: "right",
                }}
              >
                <h1 style={{ fontSize: "80px" }}>2</h1>
              </div>
              <div
                style={{
                  backgroundColor: "#ef4444",
                  width: "50%",
                  padding: "20px",
                  color: "white",
                }}
              >
                <h2 style={{ color: "white" }}>Utform testen</h2>
                <p className="text-white">
                  <strong>Hvordan setter vi den opp?</strong>
                </p>
                <p className="text-white">
                  Vi velger konkret format (arrangement, aktivitet, prototype),
                  sted, tidspunkt og samarbeidspartnere, og blir enige om hvem
                  som gjør hva. Vi bestemmer også hva vi skal observere og måle
                  – for eksempel hvor mange som kommer, hvor lenge de blir,
                  hvordan de beveger seg og hvordan de opplever stedet.{" "}
                  <ul>
                    <li>
                      Hva er det beste formatet for å besvare spørsmålet vårt?{" "}
                    </li>
                    <li>
                      Hvor og når bør det skje for å nå de riktige personene
                      (tid på dagen, ukedag/helg, årstid)?
                    </li>{" "}
                    <li>
                      Hvem må være involvert fra museet, teatret og partnerne,
                      og hva er deres roller?
                    </li>{" "}
                    <li>
                      Hva må vi observere eller måle for å vite om det fungerte
                      (tall, bevegelser, stemning, tilbakemeldinger)?
                    </li>
                  </ul>
                </p>
              </div>
            </div>
            <div style={{ display: "flex", width: "100%" }}>
              <div
                style={{
                  backgroundColor: "#ef4444",
                  width: "50%",
                  padding: "20px",
                  color: "white",
                }}
              >
                <h2 style={{ color: "white" }}>Analyser dataene</h2>
                <p className="text-white">Hva har vi lært?</p>
                <p className="text-white">
                  Etter testen oppsummerer vi de viktigste fakta (tall,
                  observasjoner, kommentarer) og ser etter mønstre. Vi
                  sammenligner dette med intensjonen vår: hva fungerte, hva
                  fungerte ikke, og hva er de 3–5 viktigste tingene vi har lært.
                  <ul>
                    <li>
                      Hva er de grunnleggende fakta: hva gjorde vi, hvem kom,
                      hvor mange, hvor lenge ble de?
                    </li>
                    <li>
                      Se på publikum: hvem kom faktisk, og hvem mangler
                      fortsatt?
                    </li>
                    <li>
                      Se på organisasjonene: hva føltes enkelt eller vanskelig i
                      samarbeidet og logistikken?
                    </li>
                    <li>
                      Se på lokalet: hvordan ble stedet egentlig brukt
                      (strømmer, hotspots, døde soner, atmosfære)?
                    </li>
                    <li>Hva er de 3–5 viktigste innsiktene?</li>
                  </ul>
                </p>
              </div>
              <div
                style={{
                  width: "50%",
                  padding: "20px",
                  color: "#ef4444",
                }}
              >
                <h1 style={{ fontSize: "80px" }}>3</h1>
              </div>
            </div>
            <div style={{ display: "flex", width: "100%" }}>
              <div
                style={{
                  width: "50%",
                  padding: "20px",
                  color: "#ef4444",
                  textAlign: "right",
                }}
              >
                <h1 style={{ fontSize: "80px" }}>4</h1>
              </div>
              <div
                style={{
                  backgroundColor: "#ef4444",
                  width: "50%",
                  padding: "20px",
                  color: "white",
                }}
              >
                <h2 style={{ color: "white" }}>Oversett læringen</h2>
                <p className="text-white">
                  <strong>
                    Hva bør endres i arkitektur, programmer og organisering?
                  </strong>
                </p>
                <p className="text-white">
                  Vi omsetter innsiktene til konkrete neste trinn: hva de
                  innebærer for fremtidig bygnings- og romdesign, for innholdet
                  og programmeringen av MIDTROMMET, og for roller, rutiner og
                  partnerskap i organisasjonene. Disse beslutningene loggføres,
                  slik at hver test former det langsiktige prosjektet.
                  <ul
                    style={{
                      marginTop: "1em",
                      marginBottom: "1em",
                      textAlign: "left",
                    }}
                  >
                    <li>
                      <strong>For arkitektur:</strong> Hva betyr dette for
                      innganger, synlighet, terskler, sonering, sitteplasser,
                      lyd, forbindelser mellom inne og ute?
                    </li>
                    <li>
                      <strong>For programmer:</strong> Bør vi justere formater,
                      varighet, hyppighet, tidspunkt på dagen eller hvem vi
                      designer for?
                    </li>
                    <li>
                      <strong>For organisasjonen:</strong> Trenger vi nye
                      roller, rutiner, produkter eller partnerskapsmodeller for
                      å støtte dette?
                    </li>
                    <li>
                      Hva bør vi beholde, endre, skalere eller stoppe basert på
                      det vi har lært – for ulike demografiske grupper?
                    </li>
                  </ul>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MethodologyModal;
