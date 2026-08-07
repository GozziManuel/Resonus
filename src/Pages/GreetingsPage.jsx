import { useEffect } from "react";

export default function GreetingsPage() {
  useEffect(() => {
    return () => {
      localStorage.removeItem("order_access");
    };
  }, []);
  return (
    <>
      <h1>GRAZIE!</h1>
    </>
  );
}
