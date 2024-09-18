// app/page.tsx
import PopularProducts from "@/components/PopularProducts";
import Image from "next/image";
import img from "../assets/maybach.png";
import classy from '../assets/classy2.jpg'
import classy2 from '../assets/classy.jpg'
import heroLogo from '../assets/logo-white.png'

const Home = () => {
  return (
    <main>
      <div className="hero relative">
        <div className="hero-wrapper font-bold absolute top-[40%] w-full">
          <div className="container">
            <h1 className="text-white max-w-[50%]">
              <Image className="logo-icon max-w-[380px] mb-4 block w-full" src={heroLogo} alt="" />
              Your Biggest<br /> Authorized Dealer
            </h1>
          </div>
        </div>
        <Image className="w-full" src={img} alt={""} />
      </div>
      <div className="container overflow-hidden">
        <div className="two-col-component">
          <div className="w-[50%]"><Image src={classy} alt={""} /></div>
          <div className="w-[50%] flex flex-col items-start justify-center p-10">
            <h3 className="ml-0 align-left">DEFINING CLASS since 1886.</h3>
            <p>Multe lucruri s-au schimbat de la inventarea automobilului în 1886.
              Cu fiecare deceniu, am reușit să dezvoltăm în continuare tehnologia care a început cu noi - și o facem și astăzi.
              Astfel a devenit un autovehicul mai mult decât un autovehicul.</p>
          </div>
        </div>
        <div className="two-col-component two-col-reverse">
          <div className="w-[50%]"><Image src={classy2} alt={""} /></div>
          <div className="w-[50%] flex flex-col items-start justify-center p-10">
            <h3 className="ml-0 align-left">MBUX Hyperscreen.</h3>
            <p>Display-ul mare și curbat acoperă aproape întreaga lățime de la stâlpul
              A din stânga până la cel din dreapta. La acesta se adaugă și inteligența artificială (AI):
              prin software-ul adaptiv, conceptul de afișare și de operare se adaptează complet fiecărui utilizator.</p>
          </div>
        </div>
        <PopularProducts />
      </div>
    </main>
  );
}

export default Home;
