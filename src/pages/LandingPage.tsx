import { MaskEffect } from "@/components/MaskEffect";
// import { ArrowDownIcon } from "lucide-react";

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
          <div className="flex flex-col items-center justify-center">
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
            {/* <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                zIndex: 100,
                pointerEvents: "none",
                color: "#ffffff",

                height: "100px",
                position: "fixed",
                left: "50%",
                bottom: "30px",
                transform: "translateX(-50%)",
              }}
            >
              <ArrowDownIcon
                className="w-10 h-10"
                style={{ pointerEvents: "auto" }}
              />
            </div> */}
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
          Nye Rogaland teater og Stavanger Museum
        </h2>
      </MaskEffect>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "blue",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            backgroundColor: "#ef4444",
            color: "white",
            width: "25%",
            height: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            flexDirection: "column",
            border: "1px solid white",

            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        >
          <p>
            Dette er jo allerede landingssiden. Denne knappen kan du trykke på
            så mye du vil uten at noe skjer.
          </p>
        </div>
        <div
          style={{
            backgroundColor: "#ef4444",
            color: "white",
            width: "25%",
            height: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            flexDirection: "column",
            border: "1px solid white",

            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        >
          <p>
            Her kan du lese om prosessen som har ført til MITTROMMET og hvordan
            det skal utformes framover.
          </p>
        </div>
        <div
          style={{
            backgroundColor: "#ef4444",
            color: "white",
            width: "25%",
            height: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            flexDirection: "column",
            border: "1px solid white",

            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        >
          <p>
            Her finner du samlingen med ideer til tjeneester, arrangementer og
            fasiliteter som vil utgjøre MITTROMMET nå, under konstruksjon og når
            det er bygget ferdig.
          </p>
        </div>
        <div
          style={{
            backgroundColor: "#ef4444",
            color: "white",
            width: "25%",
            height: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            flexDirection: "column",
            border: "1px solid white",

            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        >
          <p>
            Her kan du laste ned presentasjoner om de ulike delene av
            MITTROMMET-konseptet
          </p>
        </div>
      </div>
    </main>
  );
}
