import { useMainContext } from "../context/MainContext";

export default function CartPage() {
  const { Cart } = useMainContext();
  console.log(Cart);

  return <>Cart</>;
}
