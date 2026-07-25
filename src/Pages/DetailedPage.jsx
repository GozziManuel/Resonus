import { useParams } from "react-router-dom";

export default function DetailedPage() {
  const { slug } = useParams();
  console.log(slug);

  return <>{slug}</>;
}
