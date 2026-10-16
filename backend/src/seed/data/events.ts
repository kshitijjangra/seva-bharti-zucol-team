// Events / seva activities.
// Real events are summarised from the official site. Longer `content`, per-event
// `photos`, and `guests` below are SEED DATA for the static build — clearly
// sample content to be replaced when the section is made dynamic later.

// अतिथिगण — dignitaries / guests present at a specific event.
// SEED DATA (sample names, designations, testimonials, placeholder photos).
// Replace with real, approved details before relying on this.
export interface Guest {
  name: string;
  designation: string;
  testimonial: string;
  initials: string;
  photo?: string; // optional headshot; falls back to a placeholder avatar
}

export interface EventItem {
  id: string;
  titleHi: string;
  titleEn?: string;
  date: string; // as published by the organisation
  location?: string;
  summaryHi: string;
  image?: string;
  imageAlt?: string; // describes the photo category, not a specific-event claim
  // --- detail-page fields (seed) ---
  content?: string[]; // paragraphs shown on the event's own page
  photos?: string[]; // photo gallery shown on the event's own page
  guests?: Guest[]; // अतिथिगण for this event (seed)
}

// Real activity photographs from the organisation's photo gallery.
// Generic alt text only — we do not claim a photo depicts a specific event.
export const galleryImages: { src: string; alt: string }[] = [
  { src: "/events/gallery-1.png", alt: "सेवा भारती सामाजिक कार्यक्रम" },
  { src: "/events/gallery-3.png", alt: "सेवा भारती सामाजिक समरसता कार्यक्रम" },
  { src: "/events/gallery-4.png", alt: "सेवा भारती गतिविधि" },
  { src: "/events/gallery-6.png", alt: "सेवा भारती सेवा कार्य" },
  { src: "/events/gallery-7.png", alt: "सेवा भारती कार्यक्रम" },
  { src: "/events/gallery-8.png", alt: "सेवा भारती गतिविधि" },
  { src: "/events/gallery-9.png", alt: "सेवा भारती सेवा कार्य" },
  { src: "/events/gallery-10.png", alt: "सेवा भारती कार्यक्रम" },
  { src: "/events/gallery-11.png", alt: "सेवा भारती गतिविधि" },
];

export const events: EventItem[] = [
  {
    id: "kishangarh-chikitsa-shivir",
    titleHi: "सेवा भारती किशनगढ़ चिकित्सा शिविर",
    titleEn: "Sewa Bharti Kishangarh Medical Camp",
    date: "Published Jan 2, 2021",
    location: "Kishangarh / Jaipur, Rajasthan",
    summaryHi:
      "सेवा भारती किशनगढ़ एवं आयुष क्लिनिक जयपुर के संयुक्त तत्वावधान में निशुल्क आयुर्वेदिक चिकित्सा शिविर आयोजित किया गया, जिसमें लगभग 80 रोगी लाभान्वित हुए।",
    image: "/events/event-health.jpg",
    imageAlt: "सेवा भारती स्वास्थ्य एवं जागरूकता गतिविधि",
    content: [
      "सेवा भारती किशनगढ़ एवं आयुष क्लिनिक जयपुर के संयुक्त तत्वावधान में एक विशाल निशुल्क आयुर्वेदिक चिकित्सा शिविर का आयोजन किया गया। शिविर का शुभारंभ भगवान धन्वंतरी के पूजन एवं दीप प्रज्वलन के साथ हुआ।",
      "शिविर में वरिष्ठ चिकित्सकों द्वारा रोगियों की जाँच कर निशुल्क परामर्श एवं औषधि वितरण किया गया। इस अवसर पर लगभग 80 रोगी लाभान्वित हुए।",
      "सेवा भारती का उद्देश्य समाज के प्रत्येक वर्ग तक सुलभ एवं निशुल्क स्वास्थ्य सेवा पहुँचाना है, जिससे कोई भी आवश्यक चिकित्सा से वंचित न रहे।",
    ],
    photos: ["/events/event-health.jpg", "/events/gallery-9.png", "/events/gallery-10.png"],
    guests: [
      {
        name: "श्री मोहनलाल शर्मा",
        designation: "मुख्य अतिथि",
        initials: "मो",
        testimonial:
          "सेवा भारती द्वारा आयोजित यह निशुल्क चिकित्सा शिविर समाज के वंचित वर्ग के लिए वरदान है। ऐसे सेवा कार्य अनुकरणीय एवं प्रेरणादायक हैं।",
      },
      {
        name: "डॉ. प्रकाश वैद्य",
        designation: "वरिष्ठ चिकित्सक",
        initials: "प्र",
        testimonial:
          "निशुल्क आयुर्वेदिक परामर्श से अनेक रोगियों को लाभ मिला। सेवा भारती का यह प्रयास स्वास्थ्य सेवा को जन-जन तक पहुँचाने की दिशा में सराहनीय है।",
      },
    ],
  },
  {
    id: "kesarpura-bal-sanskar-kendra",
    titleHi: "बाल संस्कार केंद्र अवलोकन — केसरपुरा (शिवगंज), सिरोही",
    titleEn: "Bal Sanskar Kendra Observation — Kesarpura, Sirohi",
    date: "Published Feb 4, 2021",
    location: "Kesarpura (Shivganj), Sirohi, Rajasthan",
    summaryHi:
      "रानीवाड़ा द्वारा संचालित बाल संस्कार केंद्र का अधिकारियों द्वारा अवलोकन किया गया। बालकों को गीत, प्रार्थना एवं खेलों का अभ्यास कराया गया।",
    image: "/events/event-balsanskar.jpg",
    imageAlt: "सेवा भारती बाल संस्कार केंद्र, सिरोही",
    content: [
      "सेवा भारती समिति द्वारा संचालित बाल संस्कार केंद्र, केसरपुरा (शिवगंज), सिरोही का अधिकारियों द्वारा अवलोकन किया गया।",
      "इस अवसर पर बालकों को गीत, प्रार्थना एवं खेलों का अभ्यास कराया गया तथा उन्हें अच्छे संस्कार एवं शिक्षा के महत्व से अवगत कराया गया।",
      "बाल संस्कार केंद्र वंचित बस्तियों के बच्चों को प्रारंभिक शिक्षा एवं संस्कार प्रदान कर उन्हें मुख्यधारा से जोड़ने का कार्य करते हैं।",
    ],
    photos: ["/events/event-balsanskar.jpg", "/events/gallery-4.png", "/events/gallery-8.png"],
    guests: [
      {
        name: "डॉ. सुनीता अग्रवाल",
        designation: "विशिष्ट अतिथि",
        initials: "सु",
        testimonial:
          "निशुल्क शिक्षा एवं बाल संस्कार के माध्यम से जिस निष्ठा से कार्यकर्ता सेवा कर रहे हैं, वह अनुकरणीय है। मुझे इस आयोजन का हिस्सा बनकर प्रसन्नता हुई।",
      },
      {
        name: "श्री गोपाल सिंह",
        designation: "मुख्य अतिथि",
        initials: "गो",
        testimonial:
          "बाल संस्कार केंद्र वंचित बच्चों के उज्ज्वल भविष्य की नींव रखते हैं। सेवा भारती के कार्यकर्ताओं का समर्पण प्रेरणादायक है।",
      },
    ],
  },
  {
    id: "samoohik-vivah-samajik-samrasta",
    titleHi: "सामाजिक समरसता — सामूहिक विवाह आयोजन",
    titleEn: "Social Harmony — Community Weddings",
    date: "Published Feb 4, 2021",
    location: "Rajasthan",
    summaryHi:
      "सामाजिक समरसता के भाव से आयोजित सामूहिक विवाह कार्यक्रम, जिनमें समाज के सभी वर्गों की भागीदारी एवं समरसता देखने को मिली।",
    image: "/events/event-vivah.png",
    imageAlt: "सेवा भारती सामूहिक विवाह सम्मेलन",
    content: [
      "सामाजिक समरसता के भाव से सेवा भारती द्वारा सामूहिक विवाह सम्मेलन का आयोजन किया गया, जिसमें समाज के सभी वर्गों की सहभागिता रही।",
      "इन आयोजनों के माध्यम से समाज में समरसता, सहयोग एवं एकता का संदेश दिया जाता है तथा सादगीपूर्ण विवाह को प्रोत्साहन मिलता है।",
      "सेवा भारती ऐसे आयोजनों के द्वारा सामाजिक भेदभाव को समाप्त कर समरस एवं संगठित समाज के निर्माण हेतु प्रयासरत है।",
    ],
    photos: ["/events/event-vivah.png", "/events/gallery-1.png", "/events/gallery-6.png", "/events/gallery-7.png"],
    guests: [
      {
        name: "श्री रमेश चंद्र",
        designation: "मुख्य अतिथि",
        initials: "रम",
        testimonial:
          "सेवा परमो धर्मः के भाव से संचालित ये सामूहिक विवाह आयोजन समाज में समरसता एवं एकता का संदेश देते हैं। सेवा भारती की टीम को हार्दिक बधाई।",
      },
      {
        name: "श्रीमती कमला देवी",
        designation: "विशिष्ट अतिथि",
        initials: "कम",
        testimonial:
          "सादगीपूर्ण सामूहिक विवाह से अनेक परिवारों को सहारा मिलता है। यह आयोजन सामाजिक समरसता का उत्तम उदाहरण है।",
      },
    ],
  },
];

export function getEvent(id: string): EventItem | undefined {
  return events.find((e) => e.id === id);
}

// अतिथिगण shown on the main events page — a SEPARATE, standalone list,
// independent of the per-event guests on each blog/detail page.
// SEED DATA (sample names, designations, testimonials). Replace with real,
// approved details before relying on this.
export const mainGuests: Guest[] = [
  {
    name: "श्री ओमप्रकाश गुप्ता",
    designation: "संरक्षक",
    initials: "ओम",
    testimonial:
      "सेवा भारती वर्षों से समाज के वंचित वर्ग की निःस्वार्थ सेवा कर रही है। इनका प्रत्येक सेवा कार्य समाज के लिए प्रेरणा का स्रोत है।",
  },
  {
    name: "डॉ. अनिल माहेश्वरी",
    designation: "मुख्य अतिथि",
    initials: "अ",
    testimonial:
      "शिक्षा, स्वास्थ्य एवं स्वावलंबन के क्षेत्र में सेवा भारती का योगदान सराहनीय है। ऐसे संगठन समरस समाज की नींव मजबूत करते हैं।",
  },
  {
    name: "श्रीमती सरोज देवी",
    designation: "विशिष्ट अतिथि",
    initials: "स",
    testimonial:
      "सेवा परमो धर्मः के भाव से कार्य करते हुए कार्यकर्ता जिस समर्पण से सेवा करते हैं, वह अत्यंत प्रशंसनीय एवं अनुकरणीय है।",
  },
];
