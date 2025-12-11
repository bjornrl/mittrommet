import { MaskEffect } from "@/components/MaskEffect";

export default function LandingPage() {
  return (
    <main
      style={{
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        position: "relative",
        width: "100%",
        // height: "100vh",
        overflow: "hidden",
      }}
    >
      <MaskEffect
        revealText={
          <div
            style={{
              textAlign: "center",
              color: "#ffffff",
            }}
          >
            <h1
              style={{
                fontSize: "6rem",
                fontWeight: 700,
                margin: 0,
                padding: 0,
                color: "#ffffff",
                textAlign: "center",
              }}
            >
              MITTROMMET
            </h1>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  margin: 0,
                  padding: 0,
                  color: "#ffffff",
                  textAlign: "center",
                  width: "50%",
                  justifyContent: "center",
                }}
              >
                Denne siden består av en idébank og presentasjoner, samt
                KI-genererte podcaster om MITTROMMET. Sammen er de verktøy som
                skal hjelpe deg og å forstå hvordan vi ønsker å utforme
                MITTROMMET slik at det enkelt kan leses og forstås. MITTROMMET
                er den overordnede startegien og føringene for hvordan vi skal
                sørge for at sammenslåingen av Rogaland Teater og Stavanger
                Museum blir en suksess.
                {/* Sambruk, samhandling og samskaping av nytt bygg for Rogaland
              Teater og Stavanger Museum. */}
              </p>
            </div>
          </div>
        }
      >
        <h2
          style={{
            fontSize: "3rem",
            fontWeight: 600,
            margin: 0,
            padding: 0,
            color: "#ffffff",
            textAlign: "center",
          }}
        >
          Nye Rogaland superteater og Stavanger Museum
        </h2>
        {/* <p
          style={{
            fontSize: "1.5rem",
            marginTop: "1rem",
            color: "#ffffff",
            textAlign: "center",
          }}
        >
          Velkommen til Mittrommet
        </p> */}
      </MaskEffect>
      {/* <div>
        <p>aåweodiuabnf oinfasåof nszgnf s </p>
        <p>aidjbawodnbaodb</p>
      </div> */}
    </main>
  );
}
