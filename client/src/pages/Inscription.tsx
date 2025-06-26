export default function Inscription() {
  return (
    <div>
      <h2>Inscription</h2>
      <form>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Mot de passe:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}