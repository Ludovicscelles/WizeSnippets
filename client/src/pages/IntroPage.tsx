import logo from "../assets/logo.svg";

export default function IntroPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-black">Welcome to WizeSnippets</h1>
      <p>Your go-to platform for sharing and discovering code snippets.</p>
      <p>
        <a href="/inscription">Inscription</a> |{" "}
        <a href="/connexion">Connexion</a>
      </p>
      <img src={logo} />
    </div>
  );
}
