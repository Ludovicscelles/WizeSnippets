import { useLoaderData } from "react-router-dom";
import { DetailCardSnippet } from "../components/DetailCardSnippet";
import type { Snippet } from "../types/Snippet";

export default function DetailSnippet() {
  const snippet = useLoaderData() as Snippet;

  return <DetailCardSnippet snippet={snippet} />;
}
