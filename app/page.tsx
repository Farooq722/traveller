import { redirect } from "next/navigation";

export default function Home() {
  redirect("/globe");
  return <div></div>;
}
