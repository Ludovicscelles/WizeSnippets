import { useLoaderData } from "react-router-dom";
import { SnippetsArray } from "../components/SnippetsArray";

export default function Snippets() {
  const snippets = useLoaderData();
  console.log("Snippets loaded:", snippets);
  return <SnippetsArray snippets={snippets} />;
}
