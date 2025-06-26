export default function DetailSnippet() {
  return (
    <div>
      <h2>Détail du Snippet</h2>
      <p>Voici les détails du snippet sélectionné.</p>
      <form>
        <div>
          <label htmlFor="title">Titre:</label>
          <input type="text" id="title" name="title" required />
        </div>
        <div>
          <label htmlFor="content">Contenu:</label>
          <textarea id="content" name="content" rows={4} cols={50} required />
        </div>
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
}