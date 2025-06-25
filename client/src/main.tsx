import { Helmet } from "react-helmet-async";

function Home() {
  return (
    <div>
      <Helmet>
        <title>Home - Colégio OSE</title>
        <meta
          name="description"
          content="Bem-vindo ao novo site do Colégio OSE"
        />
      </Helmet>
      <h1>Bem-vindo ao Colégio OSE</h1>
      <div
        id="uchat-widget"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
        }}
      ></div>
    </div>
  );
}

export default Home;
