import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProjectsPage() {
  return (
    <>
      <h1>Em produção!</h1>
      <p>Ainda que eu tenha muitos projetos, ainda estou no processo de selecioná-los, escrever sobre eles e colocar aqui na página.</p>
      <p>Por enquanto, você pode ver alguns deles no meu <Link className=" underline" target="_blank" href="https://github.com/caiohvectora">GitHub</Link>.</p>
    </>
  );
}
