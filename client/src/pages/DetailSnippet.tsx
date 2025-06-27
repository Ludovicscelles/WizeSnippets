import { useLoaderData } from "react-router-dom";
import { DetailCardSnippet } from "../components/DetailCardSnippet";

export default function DetailSnippet() {

  const snippet = useLoaderData();

  console.log("Détail du Snippet:", snippet);

  return (
    <DetailCardSnippet snippet={snippet}/>
  );
}