import React from "react";
import { SeoHeadManager } from "./SeoHeadManager";
import {
  Users,
  Award,
  ShieldCheck,
  CheckCircle,
  FileCheck2,
  HeartHandshake,
  Lock,
} from "lucide-react";

export const AboutPage: React.FC = () => {
  const aboutSchema = {
    "@type": "AboutPage",
    "name": "Tentang Kami & Pedoman Editorial E-E-A-T - ApexLaunch.io",
    "description": "Profil tim analis kriptografi, metodologi pengujian independen, dan standar etika ApexLaunch.io.",
    "url": "https://apexlaunch.io/about-editorial-eeat"
  };

  return (
    <div id="about-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SeoHeadManager
        title="Tentang Kami & Standar Editorial E-E-A-T - ApexLaunch.io"
        description="Kenali tim peneliti, metodologi pengujian deposit nyata, dan komitmen independensi ApexLaunch dalam mengaudit platform crypto gaming."
        canonicalPath="/about-editorial-eeat"
        pageType="about"
        schemaJson={aboutSchema}
      />

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium mb-3">
          <Users className="w-3.5 h-3.5" />
          <span>Profil Tim Riset &amp; Transparansi</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Tentang ApexLaunch &amp; Standar Editorial E-E-A-T
        </h1>
        <p className="text-sm text-slate-400 mt-2 max-w-2xl">
          Komitmen independensi tanpa kompromi. Kami membangun media audit kasino kripto dengan dasar matematika sains, bukan sekadar janji pemasaran.
        </p>
      </div>

      {/* Mission Statement Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 mb-10">
        <h2 className="text-xl font-bold text-white mb-3">
          Misi Utama Kami: Transparansi Mutlak di Dunia Crypto Gaming
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
          Industri perjudian berbasis cryptocurrency berkembang pesat, namun sering kali diwarnai oleh klaim palsu, kasino tanpa lisensi yang membekukan dana pemain, dan maraknya situs kloning phishing.
        </p>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          ApexLaunch didirikan untuk menjadi mercusuar kebenaran: setiap kasino yang kami ulas wajib lulus uji setoran riil, audit kecepatan penarikan otomatis, dan bukti verifikasi algoritma Provably Fair SHA-256.
        </p>
      </div>

      {/* 3 Pillars of Methodology */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 font-bold font-mono">
            01
          </div>
          <h3 className="text-base font-bold text-white mb-2">Deposit &amp; Penarikan Nyata</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Tim kami mendepositkan aset kripto riil (Bitcoin, Tether, Solana) ke akun anonim untuk mengukur kecepatan konfirmasi blockchain dan membuktikan ketiadaan syarat penarikan jebakan.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 font-bold font-mono">
            02
          </div>
          <h3 className="text-base font-bold text-white mb-2">Audit Kriptografi SHA-256</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Kami menguji setidaknya 10.000 putaran game original (Crash, Dice, Mines) menggunakan skrip simulasi otomatis untuk memverifikasi kesesuaian House Edge teoritis dengan hasil aktual.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4 font-bold font-mono">
            03
          </div>
          <h3 className="text-base font-bold text-white mb-2">Kebijakan 0% Suap Rating</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Tidak ada platform yang dapat membayar untuk menaikkan skor peringkat di ApexLaunch. Jika sebuah platform bermasalah atau menahan dana pemain, peringatan merah akan langsung diterbitkan.
          </p>
        </div>
      </div>

      {/* Editorial Board Profiles (Crucial for Google E-E-A-T) */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 mb-10">
        <h3 className="text-lg font-bold text-white mb-1">
          Dewan Peneliti &amp; Auditor Redaksi (E-E-A-T Certified)
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          Para spesialis yang bertanggung jawab langsung atas validitas data dan analisis di ApexLaunch.io.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center font-mono font-black text-cyan-400 text-sm">
                AH
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Dr. Adrian Hartanto</h4>
                <span className="text-[11px] text-cyan-400 font-mono block">Lead Cryptographic Auditor</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              M.Sc. in Cryptography dari TU Delft. Berpengalaman 8 tahun dalam audit smart contract dan analisis RNG kuantum pada protokol terdesentralisasi.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center font-mono font-black text-emerald-400 text-sm">
                RW
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Rian Wijaya, CAMS</h4>
                <span className="text-[11px] text-emerald-400 font-mono block">Senior iGaming Analyst</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Certified Anti-Money Laundering Specialist. Mantan konsultan kepatuhan lisensi Curacao &amp; Malta Gaming Authority.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center font-mono font-black text-purple-400 text-sm">
                BS
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Bambang Sudiro</h4>
                <span className="text-[11px] text-purple-400 font-mono block">Cyber Security Investigator</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pakar forensik digital &amp; CISSP. Fokus pada investigasi sindikat phishing Web3, typosquatting, dan skema penipuan ponzi kripto.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
