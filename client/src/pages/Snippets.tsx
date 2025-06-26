export default function Snippets() {
  return (
    <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1>Snippets</h1>
      <p>Here you can find a collection of code snippets.</p>
      <p>
        <a href="/snippets/add">Add a new snippet</a>
      </p>
      {/* List of snippets would go here */}
    </div>
  );
}