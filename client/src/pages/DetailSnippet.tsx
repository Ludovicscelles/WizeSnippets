import { useLoaderData } from "react-router-dom";
import { DetailCardSnippet } from "../components/DetailCardSnippet";

export default function DetailSnippet() {

  const snippet = useLoaderData();

  return (
    <DetailCardSnippet snippet={snippet}/>
  );
}