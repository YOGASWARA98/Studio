import React, { useState } from "react";
import { SeoHeadManager } from "./SeoHeadManager";
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Lock,
  Search,
  Send,
  HelpCircle,
  FileText,
} from "lucide-react";

export const AntiScamTrustHubPage: React.FC = () => {
  const [reportUrl, setReportUrl] = useState("");
  const [reportNote, setReportNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportUrl) return;
    setSubmitted(true);
  };

  const trustHubSchema = {
    "@type": "WebPage",
    "name": "Hub Verifikasi & Anti-Scam Resmi - ApexLaunch.io",
    "description": "Klarifikasi resmi entitas domain ApexLaunch.io, mitigasi domain phishing tiruan, dan verifikasi sertifikat independen.",
    "url": "https://apexlaunch.io/anti-scam-trust-hub"
  };

  return (
    <div id="anti-scam-hub-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SeoHeadManager
        title="Hub Keamanan & Klarifikasi Anti-Scam Resmi - ApexLaunch.io"
        description="Pernyataan transparansi resmi ApexLaunch.io mengenai pemisahan dari domain terdahulu primelaunch.vip dan perlindungan pengguna terhadap penipuan task scam."
        canonicalPath="/anti-scam-trust-hub"
        pageType="anti-scam"
        schemaJson={trustHubSchema}
      />

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Integritas Brand &amp; Perlindungan Komunitas</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Hub Keamanan, Integritas Brand, &amp; Klarifikasi Resmi
        </h1>
        <p className="text-sm text-slate-400 mt-2 max-w-2xl">
          Transparansi penuh mengenai perpindahan domain ke <strong>ApexLaunch.io</strong> demi membersihkan reputasi pencarian Google SERP dari situs kloning penipu.
        </p>
      </div>

      {/* Official Clarification Banner */}
      <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 mb-10 shadow-xl relative overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-cyan-400" />
          </div>
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white">
              Pernyataan Resmi: Mengapa Kami Menggunakan Domain ApexLaunch.io?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Sebelumnya, nama &quot;primelaunch&quot; (seperti pada <code>primelaunch.vip</code>) mengalami benturan merek parah (brand collision) di hasil pencarian Google dengan jaringan sindikat penipuan yang memanfaatkan domain serupa (misalnya <code>primelaunching.com</code> dan <code>prime-launch.com</code>). Sindikat tersebut mengoperasikan modus &quot;task commission recharge&quot; yang dilaporkan di ScamAdviser dan Reddit.
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Untuk melindungi integritas pembaca, memastikan skor SEO 100% tanpa beban reputasi negatif, dan memberikan layanan audit kasino yang objektif, seluruh operasional platform kami sekarang resmi dan eksklusif berada di bawah domain <strong>ApexLaunch.io</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Domain Verification Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-slate-900/70 border border-emerald-500/30 rounded-2xl p-6">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-4">
            <CheckCircle className="w-5 h-5" />
            <span>Karakteristik Resmi ApexLaunch.io</span>
          </div>
          <ul className="space-y-3 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>Hanya satu domain resmi:</strong> Selalu periksa URL di peramban Anda adalah <code>https://apexlaunch.io</code>.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>Tanpa biaya keanggotaan VIP:</strong> Kami tidak pernah memungut biaya pendaftaran atau meminta deposit tugas.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>Open Source Verifier:</strong> Perhitungan matematis provably fair kami terbuka dan dapat diverifikasi independen.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>Sertifikat SSL Asli:</strong> Dilengkapi enkripsi TLS SHA-256 Cloudflare dengan HSTS ketat.</span>
            </li>
          </ul>
        </div>

        <div className="bg-slate-900/70 border border-rose-500/30 rounded-2xl p-6">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm mb-4">
            <AlertTriangle className="w-5 h-5" />
            <span>Ciri-Ciri Situs Penipuan Tiruan (Blacklist)</span>
          </div>
          <ul className="space-y-3 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-rose-400 font-bold">✗</span>
              <span>Domain dengan imbuhan aneh seperti <code>primelaunching-app.vip</code>, <code>prime-task.top</code>, atau <code>primelaunch.cc</code>.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400 font-bold">✗</span>
              <span>Menjanjikan profit harian 20-50% hanya dengan menyelesaikan tugas menonton video atau likes e-commerce.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400 font-bold">✗</span>
              <span>Meminta transfer USDT ke alamat dompet pribadi anonim melalui grup Telegram / WhatsApp tertutup.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400 font-bold">✗</span>
              <span>Membekukan saldo saat pengguna ingin menarik modal dengan alasan &quot;kena pajak VIP&quot;.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Community Phishing Report Form */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <h3 className="text-lg font-bold text-white mb-2">
          Laporkan Situs Palsu / Copycat Mencurigakan
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          Jika Anda menemukan situs yang meniru nama ApexLaunch atau menjanjikan skema ponzi tugas harian, laporkan kepada tim forensik kami untuk dimasukkan ke daftar peringatan komunitas.
        </p>

        {submitted ? (
          <div className="p-4 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center gap-3">
            <CheckCircle className="w-5 h-5 shrink-0 text-emerald-400" />
            <span>
              Terima kasih! Laporan Anda telah dicatat oleh sistem intelijen keamanan kami untuk investigasi whois &amp; hosting.
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmitReport} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                URL Situs yang Dilaporkan:
              </label>
              <input
                type="text"
                required
                placeholder="https://contoh-situs-palsu.com"
                value={reportUrl}
                onChange={(e) => setReportUrl(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Kronologi / Bukti Singkat:
              </label>
              <textarea
                rows={3}
                placeholder="Jelaskan modus penipuan atau grup Telegram terkait..."
                value={reportNote}
                onChange={(e) => setReportNote(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs tracking-wide shadow-md transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-slate-950" />
              <span>Kirim Laporan Forensik</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
