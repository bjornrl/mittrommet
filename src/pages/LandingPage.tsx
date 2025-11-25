const LandingPage = () => {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
        backgroundColor: "#ef4444",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        position: "relative",
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
      <p>Nye Rogaland teater og Stavanger Museum</p>
    </main>
  );
};

export default LandingPage;
