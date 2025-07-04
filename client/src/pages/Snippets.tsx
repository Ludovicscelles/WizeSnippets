import { useLoaderData } from "react-router-dom";
import { SnippetsArray } from "../components/SnippetsArray";

export default function Snippets() {
  
  const snippets = useLoaderData();
  return <SnippetsArray snippets={snippets} />;
}
