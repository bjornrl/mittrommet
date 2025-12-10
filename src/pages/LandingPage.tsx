import { MaskEffect } from "@/components/MaskEffect";

export default function LandingPage() {
  return (
    <main className="m-0 p-0 box-border relative w-full overflow-hidden">
      <MaskEffect
        revealText={
          <div className="text-center text-white">
            <h1 className="text-[6rem] font-bold m-0 p-0 text-white text-center">
              MITTROMMET
            </h1>
            <div className="flex justify-center w-full items-center">
              <p className="text-base font-bold m-0 p-0 text-white text-center w-1/2 justify-center">
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
        <h2 className="text-[3rem] font-semibold m-0 p-0 text-white text-center">
          Nye Rogaland teater og Stavanger Museum
        </h2>
        {/* <p className="text-2xl mt-4 text-white text-center">
          Velkommen til Mittrommet
        </p> */}
      </MaskEffect>
      <div>
        <p>aåweodiuabnf oinfasåof nszgnf s </p>
        <p>aidjbawodnbaodb</p>
      </div>
    </main>
  );
}
