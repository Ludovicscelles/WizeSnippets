export default function AddComment() {
  return (
    <div>
      <h2>Add Comment</h2>
      <form>
        <div>
          <label htmlFor="comment">Comment:</label>
          <textarea id="comment" name="comment" rows={4} cols={50} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}