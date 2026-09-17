export type SupportedLang = "en" | "id" | "es" | "pt" | "ru" | "hi" | "tr";

export interface LangConfig {
  code: SupportedLang;
  name: string;
  nativeName: string;
  flag: string;
  currencySymbol: string;
  currencyCode: string;
  oneWinBonusText: string;
  oneWinBonusSubtext: string;
  ogLocale: string;
}

export const SUPPORTED_LANGUAGES: Record<SupportedLang, LangConfig> = {
  en: {
    code: "en",
    name: "English",
    nativeName: "English (Global)",
    flag: "🌐",
    currencySymbol: "$",
    currencyCode: "USD",
    oneWinBonusText: "+500% Welcome Package up to $2,800",
    oneWinBonusSubtext: "4 Deposits + 30% Casino Cashback + 70 Free Spins",
    ogLocale: "en_US",
  },
  id: {
    code: "id",
    name: "Indonesian",
    nativeName: "Bahasa Indonesia",
    flag: "🇮🇩",
    currencySymbol: "Rp",
    currencyCode: "IDR",
    oneWinBonusText: "Bonus Selamat Datang +500% hingga Rp 45.000.000",
    oneWinBonusSubtext: "4 Deposit Pertama + 30% Cashback Kasino + 70 Spin Gratis",
    ogLocale: "id_ID",
  },
  es: {
    code: "es",
    name: "Spanish",
    nativeName: "Español (LatAm / ES)",
    flag: "🇪🇸",
    currencySymbol: "$",
    currencyCode: "USD",
    oneWinBonusText: "Paquete de Bienvenida +500% hasta $2.800 USD",
    oneWinBonusSubtext: "4 Depósitos + 30% Cashback Casino + 70 Giros Gratis",
    ogLocale: "es_ES",
  },
  pt: {
    code: "pt",
    name: "Portuguese",
    nativeName: "Português (Brasil)",
    flag: "🇧🇷",
    currencySymbol: "R$",
    currencyCode: "BRL",
    oneWinBonusText: "Bônus de Boas-Vindas +500% até R$ 14.000 (PIX)",
    oneWinBonusSubtext: "4 Depósitos + 30% Cashback Cassino + 70 Giros Grátis",
    ogLocale: "pt_BR",
  },
  ru: {
    code: "ru",
    name: "Russian",
    nativeName: "Русский (СНГ)",
    flag: "🇷🇺",
    currencySymbol: "₽",
    currencyCode: "RUB",
    oneWinBonusText: "Приветственный Бонус +500% до 200.000 ₽",
    oneWinBonusSubtext: "4 Депозита + Кэшбэк до 30% в казино + 70 Фриспинов",
    ogLocale: "ru_RU",
  },
  hi: {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी (भारत)",
    flag: "🇮🇳",
    currencySymbol: "₹",
    currencyCode: "INR",
    oneWinBonusText: "विशेष +500% स्वागत बोनस ₹200,000 तक",
    oneWinBonusSubtext: "4 डिपॉजिट पर + 30% कैसीनो कैशबैक + 70 फ्री स्पिन्स",
    ogLocale: "hi_IN",
  },
  tr: {
    code: "tr",
    name: "Turkish",
    nativeName: "Türkçe",
    flag: "🇹🇷",
    currencySymbol: "₺",
    currencyCode: "TRY",
    oneWinBonusText: "%500 Hoş Geldin Paketi 85.000 ₺'ye kadar",
    oneWinBonusSubtext: "4 Para Yatırma + %30 Casino Nakit İade + 70 Free Spin",
    ogLocale: "tr_TR",
  },
};

/**
 * High-accuracy utility to auto-detect the user's browser language on initial load
 * without requiring manual user switching.
 *
 * Evaluation Pipeline:
 * 1. Checks `navigator.languages` array (user's configured preference list in order)
 * 2. Checks `navigator.language` (primary UI language of client device)
 * 3. Checks vendor/legacy properties (`userLanguage`, `browserLanguage`, `systemLanguage`)
 * 4. Normalizes tags to primary subtag (e.g., 'pt-BR' -> 'pt', 'es-419' -> 'es', 'in-ID' -> 'id')
 * 5. Applies regional timezone heuristics for users whose OS default language is generic English
 * 6. Gracefully falls back to 'en'
 */
export function autoDetectBrowserLanguage(): SupportedLang {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return "en";
  }

  // 1. Gather all candidate locale identifiers from browser
  const candidates: string[] = [];

  if (Array.isArray(navigator.languages) && navigator.languages.length > 0) {
    candidates.push(...navigator.languages);
  }
  if (navigator.language) {
    candidates.push(navigator.language);
  }

  // Legacy vendor properties (IE/older mobile webviews)
  const nav = navigator as Record<string, any>;
  if (nav.userLanguage) candidates.push(nav.userLanguage);
  if (nav.browserLanguage) candidates.push(nav.browserLanguage);
  if (nav.systemLanguage) candidates.push(nav.systemLanguage);

  // 2. Iterate candidates by user preference order
  for (const raw of candidates) {
    if (!raw || typeof raw !== "string") continue;
    const clean = raw.trim().toLowerCase();
    const primary = clean.split(/[-_]/)[0];

    // Indonesian: 'id' or legacy ISO 639-1 'in'
    if (primary === "id" || primary === "in") return "id";
    // Portuguese: Brazilian or European ('pt')
    if (primary === "pt") return "pt";
    // Spanish: Latin America or Spain ('es')
    if (primary === "es") return "es";
    // Russian & CIS locales ('ru', 'be', 'uk', 'kk')
    if (primary === "ru" || primary === "be" || primary === "uk" || primary === "kk") return "ru";
    // Hindi ('hi')
    if (primary === "hi") return "hi";
    // Turkish ('tr')
    if (primary === "tr") return "tr";
    // English ('en')
    if (primary === "en") return "en";
  }

  // 3. Heuristic Timezone Fallback (if browser languages are unset or generic)
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone?.toLowerCase() || "";
    if (
      tz.includes("jakarta") ||
      tz.includes("makassar") ||
      tz.includes("jayapura") ||
      tz.includes("pontianak")
    ) {
      return "id";
    }
    if (
      tz.includes("sao_paulo") ||
      tz.includes("fortaleza") ||
      tz.includes("recife") ||
      tz.includes("rio_branco") ||
      tz.includes("belem") ||
      tz.includes("manaus") ||
      tz.includes("brasilia")
    ) {
      return "pt";
    }
    if (tz.includes("istanbul")) {
      return "tr";
    }
    if (tz.includes("kolkata") || tz.includes("calcutta")) {
      return "hi";
    }
    if (
      tz.includes("moscow") ||
      tz.includes("novosibirsk") ||
      tz.includes("yekaterinburg") ||
      tz.includes("almaty") ||
      tz.includes("minsk")
    ) {
      return "ru";
    }
    if (
      tz.includes("madrid") ||
      tz.includes("mexico") ||
      tz.includes("bogota") ||
      tz.includes("buenos_aires") ||
      tz.includes("santiago") ||
      tz.includes("lima") ||
      tz.includes("caracas")
    ) {
      return "es";
    }
  } catch {
    // ignore
  }

  return "en";
}

export interface ResolvedLangResult {
  lang: SupportedLang;
  source: "query" | "storage" | "browser" | "fallback";
  isAutoDetected: boolean;
}

/**
 * Resolves initial language on startup:
 * 1. Checks explicit URL query param ?lang=...
 * 2. Checks saved user manual preference in localStorage
 * 3. Automatically detects browser language via autoDetectBrowserLanguage()
 */
export function resolveInitialLanguage(): ResolvedLangResult {
  if (typeof window === "undefined") {
    return { lang: "en", source: "fallback", isAutoDetected: false };
  }

  // 1. Explicit URL Query Param (?lang=id)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get("lang")?.toLowerCase();
    if (urlLang && urlLang in SUPPORTED_LANGUAGES) {
      return {
        lang: urlLang as SupportedLang,
        source: "query",
        isAutoDetected: false,
      };
    }
  } catch {
    // ignore
  }

  // 2. Saved user preference from manual override
  try {
    const saved = localStorage.getItem("apex_user_lang");
    const wasManual = localStorage.getItem("apex_lang_manual_override") === "true";
    if (saved && saved in SUPPORTED_LANGUAGES && wasManual) {
      return {
        lang: saved as SupportedLang,
        source: "storage",
        isAutoDetected: false,
      };
    }
  } catch {
    // ignore
  }

  // 3. Auto-detect browser language on initial page load
  const browserDetected = autoDetectBrowserLanguage();
  return {
    lang: browserDetected,
    source: "browser",
    isAutoDetected: true,
  };
}

/**
 * Backwards-compatible detectUserLanguage function
 */
export function detectUserLanguage(): SupportedLang {
  return resolveInitialLanguage().lang;
}

export const I18N_TRANSLATIONS: Record<SupportedLang, Record<string, string>> = {
  en: {
    nav_home: "Home",
    nav_reviews: "Reviews",
    nav_guides: "Guides & Provably Fair",
    nav_launchpad: "Token Radar",
    nav_anti_scam: "Anti-Scam Hub",
    nav_about: "About Us",
    nav_seo: "SEO 100%",
    vip_offer_badge: "Official Verified #1 Partner of 2026",
    promo_code_label: "VIP Promo Code",
    copy_code_btn: "Copy Code & Claim +500%",
    code_copied: "CODE COPIED! REDIRECTING...",
    visit_1win_btn: "Claim +500% at 1win Now",
    official_review_1win: "1win Official Review 2026",
    hero_title: "Independent Crypto Gaming Intelligence & 1win VIP Analytics",
    hero_subtitle: "Real deposit tests, provably fair SHA-256 verification, and authentic +500% VIP Welcome Bonus on 1win with code winpro17 (T&Cs apply).",
    featured_partner: "Featured Premier Partner",
    rating_verified: "4.98/5.0 Verified",
    withdrawal_speed: "5 - 30 Mins (Crypto/Fast Rails)",
    sports_markets: "50+ Sports & Live Esports",
    games_count: "12,000+ Games & Lucky Jet",
    license_verified: "Curacao Lic. #8048/JAZ2018-040",
    provably_fair_badge: "Provably Fair Audited",
    claim_bonus_steps: "How to Activate Your +500% VIP Bonus",
    step_1: "1. Click 'Claim +500%' to visit the official verified 1win registration portal.",
    step_2: "2. During sign-up, ensure Promo Code winpro17 is entered in the promo field.",
    step_3: "3. Make your first deposit: Receive +200% bonus balance, up to +500% total over 4 deposits per bonus terms.",
    step_4: "4. Fast automated withdrawals to Crypto (USDT, BTC), Bank Transfer, UPI, or PIX.",
    why_1win_wins: "Why 1win Ranks #1 Globally",
    why_1win_desc: "Comparing deposit bonuses, cashbacks, and game variety across top crypto platforms:",
    comparison_bonus: "Welcome Bonus",
    comparison_cashback: "Casino Cashback",
    comparison_original: "Original Crash Games",
    disclaimer_18: "18+ Only. Gambling involves financial risk. Play responsibly. Official T&Cs apply.",
    live_traffic: "Active Global Players Online:",
    audit_score: "Apex Security Rating: 99/100",
  },
  id: {
    nav_home: "Beranda",
    nav_reviews: "Ulasan Kasino",
    nav_guides: "Panduan & Hash",
    nav_launchpad: "Radar Token",
    nav_anti_scam: "Hub Anti-Scam",
    nav_about: "Tentang Kami",
    nav_seo: "SEO 100%",
    vip_offer_badge: "Mitra Resmi Terverifikasi #1 Dunia 2026",
    promo_code_label: "Kode Promo VIP Resmi",
    copy_code_btn: "Salin Kode & Klaim +500%",
    code_copied: "KODE TERSALIN! MENGALIHKAN...",
    visit_1win_btn: "Klaim +500% di 1win Sekarang",
    official_review_1win: "Review Resmi 1win 2026",
    hero_title: "Intelijen Crypto Gaming Independen & Analisis VIP 1win",
    hero_subtitle: "Uji setoran riil, audit algoritma provably fair SHA-256, dan bonus selamat datang eksklusif +500% di 1win dengan kode winpro17 (S&K Berlaku).",
    featured_partner: "Mitra Utama Pilihan Redaksi",
    rating_verified: "4.98/5.0 Terakreditasi",
    withdrawal_speed: "5 - 30 Menit (Kripto & Gateway Lokal)",
    sports_markets: "50+ Cabang Olahraga & Judi Bola",
    games_count: "12.000+ Permainan & Lucky Jet",
    license_verified: "Lisensi Resmi Curacao #8048/JAZ2018-040",
    provably_fair_badge: "Audit Provably Fair Lolos",
    claim_bonus_steps: "Cara Klaim Bonus VIP +500% di 1win",
    step_1: "1. Klik tombol 'Klaim +500%' untuk masuk ke portal pendaftaran resmi 1win.",
    step_2: "2. Saat registrasi, pastikan kolom Kode Promo terisi kode winpro17.",
    step_3: "3. Lakukan deposit pertama: Anda menerima bonus +200%, hingga total +500% pada 4 deposit sesuai ketentuan.",
    step_4: "4. Penarikan aman dan otomatis ke Kripto (USDT, BTC) atau Bank Lokal (BCA, Mandiri, Dana, QRIS).",
    why_1win_wins: "Mengapa 1win Menjadi Pilihan #1 Global",
    why_1win_desc: "Perbandingan bonus deposit, cashback, dan variasi game dibanding platform kripto lain:",
    comparison_bonus: "Bonus Selamat Datang",
    comparison_cashback: "Cashback Kasino",
    comparison_original: "Game Original Crash",
    disclaimer_18: "18+ Saja. Perjudian mengandung risiko finansial. Bermainlah secara bijak dan bertanggung jawab. S&K berlaku.",
    live_traffic: "Pemain Aktif Global Saat Ini:",
    audit_score: "Skor Keamanan Apex: 99/100",
  },
  es: {
    nav_home: "Inicio",
    nav_reviews: "Reseñas",
    nav_guides: "Guías y Provably Fair",
    nav_launchpad: "Radar Tokens",
    nav_anti_scam: "Centro Anti-Estafas",
    nav_about: "Nosotros",
    nav_seo: "SEO 100%",
    vip_offer_badge: "Socio Oficial Verificado #1 Global 2026",
    promo_code_label: "Código Promocional VIP",
    copy_code_btn: "Copiar Código y Reclamar +500%",
    code_copied: "¡CÓDIGO COPIADO! REDIRIGIENDO...",
    visit_1win_btn: "Reclamar +500% en 1win Ahora",
    official_review_1win: "Reseña Oficial 1win 2026",
    hero_title: "Inteligencia Cripto Gaming Independiente y Análisis VIP 1win",
    hero_subtitle: "Pruebas de depósito reales, verificación criptográfica SHA-256 y bono exclusivo del +500% en 1win con el código winpro17.",
    featured_partner: "Socio Premier Destacado",
    rating_verified: "4.98/5.0 Verificado",
    withdrawal_speed: "5 - 30 Mins (Cripto / Pasarelas)",
    sports_markets: "50+ Deportes y Apuestas en Vivo",
    games_count: "12.000+ Juegos y Lucky Jet",
    license_verified: "Licencia Curazao #8048/JAZ2018-040",
    provably_fair_badge: "Auditado Provably Fair",
    claim_bonus_steps: "Cómo Activar tu Bono VIP del +500%",
    step_1: "1. Haz clic en 'Reclamar +500%' para acceder al portal oficial de 1win.",
    step_2: "2. Al registrarte, asegúrate de ingresar el código promocional winpro17.",
    step_3: "3. Realiza tu primer depósito: ¡Recibe +200% de inmediato y hasta +500% en 4 depósitos según términos!",
    step_4: "4. Retiros rápidos y seguros a Cripto (USDT, BTC) o métodos locales (SPEI, Oxxo, Transferencia).",
    why_1win_wins: "¿Por qué 1win es el #1 a Nivel Mundial?",
    why_1win_desc: "Comparación de bonos, cashback y catálogo frente a otros gigantes del sector:",
    comparison_bonus: "Bono de Bienvenida",
    comparison_cashback: "Cashback de Casino",
    comparison_original: "Juegos Crash Originales",
    disclaimer_18: "+18 Años. Juega con responsabilidad. Los juegos de azar implican riesgo. Términos aplicables.",
    live_traffic: "Jugadores Activos en Línea:",
    audit_score: "Puntuación de Seguridad: 99/100",
  },
  pt: {
    nav_home: "Início",
    nav_reviews: "Avaliações",
    nav_guides: "Guias & Provably Fair",
    nav_launchpad: "Radar de Tokens",
    nav_anti_scam: "Hub Anti-Golpe",
    nav_about: "Sobre Nós",
    nav_seo: "SEO 100%",
    vip_offer_badge: "Parceiro Oficial Verificado #1 Global 2026",
    promo_code_label: "Código Promocional VIP Oficial",
    copy_code_btn: "Copiar Código & Resgatar +500%",
    code_copied: "CÓDIGO COPIADO! REDIRECIONANDO...",
    visit_1win_btn: "Resgatar +500% na 1win Agora",
    official_review_1win: "Análise Oficial 1win Brasil 2026",
    hero_title: "Inteligência Cripto Gaming Independente & Auditoria VIP 1win",
    hero_subtitle: "Testes reais de depósito via PIX e Cripto, verificação SHA-256 e bônus de boas-vindas exclusivo de +500% até R$ 14.000 com o código winpro17.",
    featured_partner: "Parceiro Principal em Destaque",
    rating_verified: "4.98/5.0 Aprovado",
    withdrawal_speed: "5 - 30 Mins (PIX & Cripto)",
    sports_markets: "50+ Esportes e Brasileirão Série A",
    games_count: "12.000+ Jogos, Lucky Jet e Aviator",
    license_verified: "Licença Curacao #8048/JAZ2018-040",
    provably_fair_badge: "Provably Fair Verificado",
    claim_bonus_steps: "Como Ativar seu Bônus VIP de +500%",
    step_1: "1. Clique em 'Resgatar +500%' para acessar o site oficial de cadastro da 1win.",
    step_2: "2. No formulário de registro, digite o código promocional winpro17 no campo correspondente.",
    step_3: "3. Faça seu primeiro depósito via PIX: Ganhe +200% na hora, até +500% no total de 4 depósitos!",
    step_4: "4. Aproveite saques rápidos por PIX e Criptomoedas com segurança.",
    why_1win_wins: "Por Que a 1win é Líder Absoluta no Brasil",
    why_1win_desc: "Comparativo de bônus, agilidade no PIX e jogos originais em relação a concorrentes:",
    comparison_bonus: "Bono de Boas-Vindas",
    comparison_cashback: "Cashback no Cassino",
    comparison_original: "Jogos Crash Originais",
    disclaimer_18: "+18 Apenas. Jogue com responsabilidade. Jogos de azar envolvem risco financeiro. Termos aplicáveis.",
    live_traffic: "Apostadores Conectados Agora:",
    audit_score: "Índice de Confiança: 99/100",
  },
  ru: {
    nav_home: "Главная",
    nav_reviews: "Обзоры",
    nav_guides: "Гайды и Provably Fair",
    nav_launchpad: "Радар токенов",
    nav_anti_scam: "Анти-Скам Центр",
    nav_about: "О нас",
    nav_seo: "SEO 100%",
    vip_offer_badge: "Официальный проверенный партнер №1 в 2026 году",
    promo_code_label: "VIP Промокод 1win",
    copy_code_btn: "Скопировать промокод и получить +500%",
    code_copied: "ПРОМОКОД СКОПИРОВАН! ПЕРЕХОД...",
    visit_1win_btn: "Получить +500% в 1win прямо сейчас",
    official_review_1win: "Официальный обзор 1win 2026",
    hero_title: "Независимая аналитика крипто-гейминга и VIP-бонусы 1win",
    hero_subtitle: "Тесты реальных выплат, аудит алгоритма Provably Fair SHA-256 и эксклюзивный приветственный бонус +500% до 200.000 ₽ по промокоду winpro17.",
    featured_partner: "Главный рекомендуемый партнер",
    rating_verified: "4.98/5.0 Проверено",
    withdrawal_speed: "5 - 30 минут (Крипта и карты)",
    sports_markets: "50+ видов спорта и лайв-ставки",
    games_count: "12.000+ игр, Lucky Jet и Speed & Cash",
    license_verified: "Лицензия Кюрасао #8048/JAZ2018-040",
    provably_fair_badge: "Provably Fair подтвержден",
    claim_bonus_steps: "Как активировать бонус +500% в 1win",
    step_1: "1. Нажмите кнопку «Получить +500%» для перехода на официальное зеркало 1win.",
    step_2: "2. При регистрации обязательно укажите промокод winpro17 в специальном поле.",
    step_3: "3. Сделайте первый депозит: получите +200% сразу, до +500% суммарно на 4 пополнения по правилам акции!",
    step_4: "4. Быстрый вывод на карты МИР, СБП, Piastrix и криптовалюту (USDT, BTC).",
    why_1win_wins: "Почему 1win занимает 1-е место",
    why_1win_desc: "Сравнение бонусов, кэшбэка и выбора игр с другими популярными платформами:",
    comparison_bonus: "Приветственный бонус",
    comparison_cashback: "Кэшбэк в казино",
    comparison_original: "Оригинальные краш-игры",
    disclaimer_18: "Только 18+. Азартные игры сопряжены с финансовым риском. Играйте ответственно. Действуют правила.",
    live_traffic: "Активных игроков онлайн:",
    audit_score: "Рейтинг безопасности: 99/100",
  },
  hi: {
    nav_home: "होम",
    nav_reviews: "समीक्षाएं",
    nav_guides: "गाइड और निष्पक्षता",
    nav_launchpad: "टोकन रडार",
    nav_anti_scam: "एंटी-स्कैम हब",
    nav_about: "हमारे बारे में",
    nav_seo: "SEO 100%",
    vip_offer_badge: "2026 का आधिकारिक सत्यापित #1 पार्टनर",
    promo_code_label: "VIP प्रोमो कोड",
    copy_code_btn: "कोड कॉपी करें और +500% पाएं",
    code_copied: "कोड कॉपी हो गया! रीडायरेक्ट हो रहा है...",
    visit_1win_btn: "1win पर +500% बोनस तुरंत पाएं",
    official_review_1win: "1win आधिकारिक समीक्षा 2026",
    hero_title: "स्वतंत्र क्रिप्टो गेमिंग इंटेलिजेंस और 1win VIP समीक्षा",
    hero_subtitle: "असली डिपॉजिट टेस्ट, SHA-256 निष्पक्षता सत्यापन और कोड winpro17 के साथ 1win पर ₹200,000 तक का +500% एक्सक्लूसिव बोनस।",
    featured_partner: "मुख्य अनुशंसित प्लेटफॉर्म",
    rating_verified: "4.98/5.0 प्रमाणित",
    withdrawal_speed: "5 - 30 मिनट (क्रिप्टो/UPI)",
    sports_markets: "IPL क्रिकेट और 50+ स्पोर्ट्स",
    games_count: "12,000+ गेम्स और Lucky Jet",
    license_verified: "कुराकाओ लाइसेंस #8048/JAZ2018-040",
    provably_fair_badge: "Provably Fair सत्यापित",
    claim_bonus_steps: "1win पर +500% बोनस कैसे प्राप्त करें",
    step_1: "1. 1win के आधिकारिक रजिस्ट्रेशन पोर्टल पर जाने के लिए 'क्लेम +500%' पर क्लिक करें।",
    step_2: "2. साइनअप करते समय प्रोमो कोड फ़ील्ड में winpro17 दर्ज करें।",
    step_3: "3. पहला डिपॉजिट करें: तुरंत +200% प्राप्त करें, 4 डिपॉजिट पर कुल +500% तक नियमानुसार!",
    step_4: "4. UPI, PayTM, PhonePe और क्रिप्टो (USDT) के जरिए सुरक्षित निकासी करें।",
    why_1win_wins: "1win भारत और दुनिया में #1 क्यों है",
    why_1win_desc: "डिपॉजिट बोनस, कैशबैक और गेम्स की तुलना:",
    comparison_bonus: "स्वागत बोनस",
    comparison_cashback: "कैसीनो कैशबैक",
    comparison_original: "ओरिजिनल क्रैश गेम्स",
    disclaimer_18: "केवल 18+ के लिए। जुआ वित्तीय जोखिम से भरा है। जिम्मेदारी से खेलें। नियम व शर्तें लागू।",
    live_traffic: "वर्तमान में सक्रिय खिलाड़ी:",
    audit_score: "सुरक्षा रेटिंग: 99/100",
  },
  tr: {
    nav_home: "Ana Sayfa",
    nav_reviews: "İncelemeler",
    nav_guides: "Kılavuzlar ve Doğrulama",
    nav_launchpad: "Token Radarı",
    nav_anti_scam: "Dolandırıcılık Önleme",
    nav_about: "Hakkımızda",
    nav_seo: "SEO %100",
    vip_offer_badge: "2026 Resmi Doğrulanmış 1 Numaralı Küresel Ortak",
    promo_code_label: "VIP Promosyon Kodu",
    copy_code_btn: "Kodu Kopyala & %500 Kazan",
    code_copied: "KOD KOPYALANDI! YÖNLENDİRİLİYOR...",
    visit_1win_btn: "1win'de %500 Bonusu Şimdi Al",
    official_review_1win: "1win Resmi İnceleme 2026",
    hero_title: "Bağımsız Kripto Oyun İstihbaratı ve 1win VIP Analizi",
    hero_subtitle: "Gerçek para yatırma testleri, SHA-256 provably fair denetimi ve winpro17 koduyla 1win'de 85.000 ₺'ye kadar %500 Hoş Geldin Bonusu.",
    featured_partner: "Öne Çıkan Başlıca Ortak",
    rating_verified: "4.98/5.0 Doğrulandı",
    withdrawal_speed: "5 - 30 Dakika (Kripto & Havale)",
    sports_markets: "Süper Lig & 50+ Spor Branşı",
    games_count: "12.000+ Oyun ve Lucky Jet",
    license_verified: "Curacao Lisansı #8048/JAZ2018-040",
    provably_fair_badge: "Provably Fair Onaylı",
    claim_bonus_steps: "%500 VIP Bonusunu Nasıl Aktif Edersiniz?",
    step_1: "1. Resmi 1win kayıt portalına gitmek için '%500 Bonusu Al' butonuna tıklayın.",
    step_2: "2. Kayıt esnasında Promosyon Kodu alanına winpro17 yazıldığından emin olun.",
    step_3: "3. İlk para yatırma işleminizi yapın: Anında %200 kazanın, 4 yatırımda toplam %500!",
    step_4: "4. Kripto (USDT, BTC) veya Papara, Havale ile güvenli ve hızlı çekim yapın.",
    why_1win_wins: "1win Neden Küresel Lider?",
    why_1win_desc: "Para yatırma bonusları, nakit iade ve oyun çeşitliliği karşılaştırması:",
    comparison_bonus: "Hoş Geldin Bonusu",
    comparison_cashback: "Casino Nakit İade",
    comparison_original: "Orijinal Crash Oyunları",
    disclaimer_18: "+18 Yaş. Şans oyunları finansal risk içerir. Sorumlu oynayınız. Şartlar geçerlidir.",
    live_traffic: "Şu Anda Çevrimiçi Oyuncu:",
    audit_score: "Apex Güvenlik Skoru: 99/100",
  },
};
