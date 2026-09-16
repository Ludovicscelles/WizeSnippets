import { useLoaderData } from "react-router-dom";
import { SnippetsArray } from "../components/SnippetsArray";
import type { SnippetListItem } from "../types/Snippet";

export default function Snippets() {
  const snippets = useLoaderData() as SnippetListItem[];
  return <SnippetsArray snippets={snippets} />;
}
