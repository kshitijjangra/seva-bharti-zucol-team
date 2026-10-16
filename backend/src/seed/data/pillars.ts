// The four pillars (chaar aayam) of Sewa Bharti.
// Content summarised faithfully from the official About / pillar pages.
// Each pillar's activities are real programmes described by the organisation.
//
// NOTE: `aayaam` tiles, `successStories` and per-pillar `stats` are SEED /
// SAMPLE data so the layout is demo-ready. Replace with verified figures,
// real beneficiary stories and photos before going live.

export interface PillarActivity {
  titleHi: string;
  titleEn: string;
  descHi: string;
}

// One "aayaam" (area of work) tile in the 5x4 grid.
export interface PillarAayaam {
  titleHi: string;
  titleEn: string;
}

export interface SuccessStory {
  nameHi: string;
  nameEn: string;
  photo: string; // path under /public
  age?: number;
  bioHi: string;
  storyHi: string;
}

// One animated number in the per-pillar counter strip.
export interface PillarStat {
  value: number;
  suffix?: string;
  labelHi: string;
}

export interface Pillar {
  slug: "shiksha" | "swavalamban" | "samajik" | "swasthya";
  nameEn: string;
  nameHi: string;
  summaryEn: string;
  summaryHi: string;
  // Accent key maps to a token defined in globals.css.
  accent: "saffron" | "blue";
  // Hero banner image shown at the very top of the page (path under /public).
  // SEED image for now — replace with a real pillar banner later.
  banner: string;
  // Long-form content shown below the aayaam grid (one entry = one paragraph).
  contentHi: string[];
  // Areas of work — rendered as the card grid (seed names padded to 20).
  aayaam: PillarAayaam[];
  // Real, described programmes — shown as highlighted cards inside Content.
  activities: PillarActivity[];
  successStories: SuccessStory[];
  stats: PillarStat[];
}

// Pads a pillar's real activity titles out to 20 aayaam tiles with seed
// placeholders, so the grid reads as 5x4 until real data arrives.
function buildAayaam(real: PillarActivity[]): PillarAayaam[] {
  const items: PillarAayaam[] = real.map((a) => ({
    titleHi: a.titleHi,
    titleEn: a.titleEn,
  }));
  for (let i = items.length; i < 20; i++) {
    items.push({
      titleHi: `सेवा आयाम ${i + 1}`,
      titleEn: `Sewa Aayaam ${i + 1}`,
    });
  }
  return items;
}

const rawPillars: Omit<Pillar, "aayaam">[] = [
  {
    slug: "shiksha",
    nameEn: "Shiksha",
    nameHi: "शिक्षा",
    summaryEn:
      "Free education for children of underserved settlements, from early learning and value education to libraries and coaching support.",
    summaryHi:
      "अभावग्रस्त बस्तियों के बच्चों के लिए निशुल्क शिक्षा — बाल संस्कार से लेकर पुस्तकालय एवं कोचिंग सहयोग तक।",
    accent: "saffron",
    banner: "/events/event-balsanskar.jpg",
    contentHi: [
      "सेवा भारती समिति राजस्थान, शिक्षा के क्षेत्र में वंचित एवं अभावग्रस्त बस्तियों के बच्चों तक निशुल्क शिक्षा पहुँचाने का कार्य करती है। प्रारंभिक बाल शिक्षा से लेकर संस्कार, पुस्तकालय एवं कोचिंग सहयोग तक — प्रत्येक बालक को मुख्यधारा की शिक्षा से जोड़ना संस्था का ध्येय है।",
      "बालवाड़ी एवं बाल संस्कार केंद्रों से लेकर निशुल्क विद्यालय एवं झोला पुस्तकालय तक, शिक्षा के अनेक आयामों के माध्यम से हजारों बच्चे शिक्षा की मुख्यधारा से जुड़ रहे हैं।",
    ],
    activities: [
      {
        titleHi: "बालवाड़ी एवं बाल संस्कार केंद्र",
        titleEn: "Balwadi & Bal Sanskar Kendra",
        descHi:
          "छोटे बच्चों के लिए प्रारंभिक शिक्षा एवं संस्कार केंद्र, जहाँ खेल-खेल में पढ़ाई, गीत-प्रार्थना एवं अच्छे संस्कार सिखाए जाते हैं।",
      },
      {
        titleHi: "निशुल्क शिक्षा — सेवा भारती बाल विद्यालय",
        titleEn: "Free Education — Sewa Bharti Bal Vidyalaya",
        descHi:
          "वंचित वर्ग के विद्यार्थियों को निशुल्क शिक्षा दी जाती है, जिससे वे मुख्यधारा की शिक्षा से जुड़ सकें।",
      },
      {
        titleHi: "पुस्तकालय एवं वाचनालय",
        titleEn: "Library & Reading Room",
        descHi:
          "सेवा सदन में हजारों पुस्तकों का पुस्तकालय एवं वाचनालय। अन्य सेवा बस्तियों में झोला पुस्तकालय एवं कोचिंग सेंटर भी चलाए जाते हैं।",
      },
    ],
    successStories: [
      {
        nameHi: "आरती वाल्मीकि",
        nameEn: "Aarti Valmiki",
        photo: "/events/gallery-1.png",
        age: 14,
        bioHi: "लालकोठी बस्ती · कक्षा 9",
        storyHi:
          "बालवाड़ी से पढ़ाई आरंभ करने वाली आरती आज कक्षा 9 में है और अपनी बस्ती की पहली बालिका है जो विद्यालय की टॉपर बनी। वह आगे चलकर शिक्षिका बनना चाहती है।",
      },
      {
        nameHi: "रोहित सेन",
        nameEn: "Rohit Sen",
        photo: "/events/gallery-2.png",
        age: 12,
        bioHi: "सेवा बस्ती · कक्षा 7",
        storyHi:
          "कोचिंग सेंटर एवं झोला पुस्तकालय की सहायता से रोहित की पढ़ाई में निरंतर सुधार हुआ और उसे छात्रवृत्ति परीक्षा में सफलता मिली।",
      },
    ],
    stats: [
      { value: 450, suffix: "+", labelHi: "सेवा कार्य" },
      { value: 12000, suffix: "+", labelHi: "लाभार्थी" },
      { value: 37, suffix: "+", labelHi: "वर्ष" },
      { value: 85, suffix: "+", labelHi: "सेवा बस्ती" },
    ],
  },
  {
    slug: "swavalamban",
    nameEn: "Swavalamban",
    nameHi: "स्वावलंबन",
    summaryEn:
      "Skill development and self-reliance through vocational training, computer education and self-help groups.",
    summaryHi:
      "कौशल विकास, कंप्यूटर प्रशिक्षण एवं स्वयं सहायता समूहों के माध्यम से आत्मनिर्भरता की ओर।",
    accent: "blue",
    banner: "/events/gallery-9.png",
    contentHi: [
      "स्वावलंबन के क्षेत्र में संस्था कौशल विकास, कंप्यूटर प्रशिक्षण एवं स्वयं सहायता समूहों के माध्यम से बस्तियों के युवाओं एवं महिलाओं को आत्मनिर्भर बनाने का कार्य करती है।",
      "सिलाई, फैशन डिज़ाइनिंग एवं कंप्यूटर प्रशिक्षण केंद्रों से प्रशिक्षित होकर सैकड़ों महिलाएँ एवं युवा स्वरोज़गार से जुड़ चुके हैं।",
    ],
    activities: [
      {
        titleHi: "कौशल विकास केंद्र",
        titleEn: "Kaushal Vikas Kendra (Skill Development)",
        descHi:
          "सिलाई एवं फैशन डिजाइनिंग प्रशिक्षण। सेवा सदन सहित बस्तियों में 15 से अधिक सिलाई केंद्र संचालित हैं।",
      },
      {
        titleHi: "कंप्यूटर प्रशिक्षण",
        titleEn: "Computer Training",
        descHi:
          "टैली, बेसिक कंप्यूटर एवं ग्राफिक्स के पाठ्यक्रम। अन्य सेवा बस्तियों में भी कंप्यूटर प्रशिक्षण केंद्र चलाए जाते हैं।",
      },
      {
        titleHi: "स्वयं सहायता समूह",
        titleEn: "Self-Help Groups",
        descHi:
          "पिछड़ी बस्तियों की महिलाओं एवं पुरुषों में बचत के माध्यम से लघु उद्योग एवं आत्मनिर्भरता को प्रोत्साहन।",
      },
    ],
    successStories: [
      {
        nameHi: "सुनीता देवी",
        nameEn: "Sunita Devi",
        photo: "/events/gallery-3.png",
        age: 28,
        bioHi: "सिलाई केंद्र · स्वयं सहायता समूह",
        storyHi:
          "सिलाई केंद्र में प्रशिक्षण पूरा करने के बाद सुनीता ने अपना छोटा बुटीक आरंभ किया और आज अपने परिवार की आय में मुख्य योगदान देती हैं।",
      },
      {
        nameHi: "मनोज कुमार",
        nameEn: "Manoj Kumar",
        photo: "/events/gallery-4.png",
        age: 22,
        bioHi: "कंप्यूटर प्रशिक्षण केंद्र",
        storyHi:
          "टैली एवं बेसिक कंप्यूटर प्रशिक्षण के बाद मनोज को एक स्थानीय फर्म में अकाउंट्स सहायक की नौकरी मिली।",
      },
    ],
    stats: [
      { value: 120, suffix: "+", labelHi: "सेवा कार्य" },
      { value: 5000, suffix: "+", labelHi: "लाभार्थी" },
      { value: 30, suffix: "+", labelHi: "वर्ष" },
      { value: 45, suffix: "+", labelHi: "सेवा बस्ती" },
    ],
  },
  {
    slug: "samajik",
    nameEn: "Samajik",
    nameHi: "सामाजिक समरसता",
    summaryEn:
      "Building social harmony through yoga and satsang centres, community festivals and service at fairs.",
    summaryHi:
      "योग एवं सत्संग केंद्र, उत्सव-जयंतियों एवं मेलों में सेवा के माध्यम से सामाजिक समरसता का निर्माण।",
    accent: "saffron",
    banner: "/events/event-vivah.png",
    contentHi: [
      "सामाजिक समरसता के क्षेत्र में संस्था योग एवं सत्संग केंद्र, उत्सव-जयंतियों एवं मेलों में सेवा के माध्यम से समाज में सद्भाव एवं एकता का भाव सुदृढ़ करती है।",
      "विभिन्न पर्वों एवं जयंतियों के आयोजन तथा मेलों में सेवा व्यवस्था से बस्तियों में सामूहिकता एवं आत्मीयता का वातावरण बनता है।",
    ],
    activities: [
      {
        titleHi: "योग एवं सत्संग केंद्र",
        titleEn: "Yoga & Satsang Centres",
        descHi:
          "सेवा बस्तियों में सामाजिक सद्भाव एवं समरसता हेतु साप्ताहिक योग एवं सत्संग केंद्र संचालित किए जाते हैं।",
      },
      {
        titleHi: "उत्सव एवं जयंतियाँ",
        titleEn: "Festivals & Jayantis",
        descHi:
          "महर्षि वाल्मीकि जयंती, मकर संक्रांति एवं रक्षाबंधन जैसे पर्व सामाजिक समरसता के भाव से मनाए जाते हैं।",
      },
      {
        titleHi: "मेलों में सेवा कार्य एवं ‘सेवा सरोज’ पत्रिका",
        titleEn: "Service at Fairs & 'Sewa Saroj' Magazine",
        descHi:
          "बाबा रामदेव जी एवं खाटू श्याम जी जैसे मेलों में सेवा व्यवस्था। संस्था विगत 35 वर्षों से ‘सेवा सरोज’ पत्रिका प्रकाशित करती है।",
      },
    ],
    successStories: [
      {
        nameHi: "रामप्रसाद जी",
        nameEn: "Ramprasad Ji",
        photo: "/events/gallery-5.png",
        age: 52,
        bioHi: "योग एवं सत्संग केंद्र · स्वयंसेवक",
        storyHi:
          "योग केंद्र से जुड़ने के बाद रामप्रसाद जी ने स्वयं एक स्वयंसेवक के रूप में अपनी बस्ती में साप्ताहिक सत्संग एवं योग सत्र आरंभ किए।",
      },
      {
        nameHi: "गीता शर्मा",
        nameEn: "Geeta Sharma",
        photo: "/events/gallery-6.png",
        age: 40,
        bioHi: "उत्सव आयोजन समिति",
        storyHi:
          "उत्सव एवं जयंती आयोजनों में सक्रिय भागीदारी से गीता जी बस्ती की महिलाओं को सामाजिक कार्यों से जोड़ने में अग्रणी बनीं।",
      },
    ],
    stats: [
      { value: 200, suffix: "+", labelHi: "सेवा कार्य" },
      { value: 8000, suffix: "+", labelHi: "लाभार्थी" },
      { value: 35, suffix: "+", labelHi: "वर्ष" },
      { value: 60, suffix: "+", labelHi: "सेवा बस्ती" },
    ],
  },
  {
    slug: "swasthya",
    nameEn: "Swasthya",
    nameHi: "स्वास्थ्य",
    summaryEn:
      "Accessible healthcare through consultation centres, mobile clinics, medical camps and patient assistance.",
    summaryHi:
      "परामर्श केंद्र, चल चिकित्सालय, चिकित्सा शिविर एवं रुग्ण सहायता के माध्यम से सुलभ स्वास्थ्य सेवा।",
    accent: "blue",
    banner: "/events/event-health.jpg",
    contentHi: [
      "स्वास्थ्य के क्षेत्र में संस्था परामर्श केंद्र, चल चिकित्सालय, चिकित्सा शिविर एवं रुग्ण सहायता के माध्यम से वंचित वर्ग तक सुलभ एवं निशुल्क स्वास्थ्य सेवा पहुँचाती है।",
      "चल चिकित्सालय एवं नियमित चिकित्सा शिविरों से हजारों रोगियों को समय पर उपचार एवं परामर्श उपलब्ध हो रहा है।",
    ],
    activities: [
      {
        titleHi: "स्वास्थ्य परामर्श एवं जांच केंद्र",
        titleEn: "Health Consultation & Diagnostic Centre",
        descHi:
          "सेवा सदन के प्रथम तल पर आधुनिक जांच केंद्र, जहाँ वरिष्ठ चिकित्सकों द्वारा परामर्श एवं उपचार किया जाता है। माह के अंतिम रविवार को चिकित्सा शिविर भी लगाए जाते हैं।",
      },
      {
        titleHi: "चल चिकित्सालय",
        titleEn: "Mobile Clinic (Chal Chikitsalaya)",
        descHi:
          "एंबुलेंस वैन में एक डॉक्टर एवं एक कंपाउंडर के साथ ग्रामीण एवं नगरीय क्षेत्रों में नियमित चिकित्सा सेवा उपलब्ध कराई जाती है।",
      },
      {
        titleHi: "रुग्ण सहायता एवं नेत्र शिविर",
        titleEn: "Patient Assistance & Eye Camps",
        descHi:
          "गरीब रोगियों के लिए रुग्ण सहायता केंद्र, मनोरोग चिकित्सालय में भोजनशाला एवं समय-समय पर नेत्र चिकित्सा शिविर आयोजित किए जाते हैं।",
      },
    ],
    successStories: [
      {
        nameHi: "कमला बाई",
        nameEn: "Kamla Bai",
        photo: "/events/gallery-7.png",
        age: 60,
        bioHi: "नेत्र चिकित्सा शिविर",
        storyHi:
          "नेत्र शिविर में मोतियाबिंद की निशुल्क शल्य चिकित्सा के बाद कमला बाई की दृष्टि पुनः लौट आई और वे फिर से आत्मनिर्भर जीवन जी रही हैं।",
      },
      {
        nameHi: "इमरान खान",
        nameEn: "Imran Khan",
        photo: "/events/gallery-8.png",
        age: 8,
        bioHi: "चल चिकित्सालय · बाल रोगी",
        storyHi:
          "चल चिकित्सालय द्वारा समय पर उपचार मिलने से इमरान गंभीर संक्रमण से उबर सका और अब स्वस्थ होकर विद्यालय जा रहा है।",
      },
    ],
    stats: [
      { value: 180, suffix: "+", labelHi: "सेवा कार्य" },
      { value: 25000, suffix: "+", labelHi: "लाभार्थी" },
      { value: 32, suffix: "+", labelHi: "वर्ष" },
      { value: 70, suffix: "+", labelHi: "सेवा बस्ती" },
    ],
  },
];

export const pillars: Pillar[] = rawPillars.map((p) => ({
  ...p,
  aayaam: buildAayaam(p.activities),
}));

export function getPillar(slug: string): Pillar | undefined {
  return pillars.find((p) => p.slug === slug);
}
