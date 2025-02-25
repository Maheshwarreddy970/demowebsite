import Footer from "@/components/Footer";
import Desgines from "@/components/landingpage/Desgines";
import Exploresections from "@/components/landingpage/Exploresections";
import Heroserction from "@/components/landingpage/Heroserction";
import Team from "@/components/landingpage/Team";
import Worksections from "@/components/landingpage/Worksections";
import Navbar from "@/components/Navbar";

;

export default function Home() {
  return (
    <section>
      <Heroserction></Heroserction>
      <Worksections></Worksections>
      <Desgines></Desgines>
      <Exploresections></Exploresections>
      <Team></Team>
    </section>
  );
}
