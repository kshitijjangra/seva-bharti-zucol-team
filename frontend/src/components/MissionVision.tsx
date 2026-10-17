// "हमारा उद्देश्य" (with the Sewa Geet image) and "Vision" sections, copied
// from the live site (sewabhartirajasthan.org). Static content; assets live in
// public/home/.
import Image from "next/image";

const hl = "text-saffron-500";

export default function MissionVision() {
  return (
    <>
      {/* हमारा उद्देश्य + Sewa Geet image */}
      <section className="bg-[url('/home/bg-vission.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="container-page grid items-start gap-8 py-9 md:grid-cols-[7fr_5fr]">
          <div lang="hi" className="space-y-4 text-[17px] leading-relaxed text-ink-soft md:text-lg">
            <h2 className="mb-6 text-3xl font-bold text-ink">हमारा उद्देश्य</h2>
            <p>
              समाज के सामाजिक शैक्षणिक एवं आर्थिक रूप से पिछड़े वंचित एवं उपेक्षित बंधुओं का विकास कर
              उन्हें <span className={hl}>आत्मनिर्भर स्वाभिमानी, स्वावलंबी</span> बनाकर स्वस्थ समरस एवं
              संगठित समाज का निर्माण करना है
            </p>
            <p>
              सभी सेवा कार्य संप्रदाय, जाति, वर्ग, प्रांत, भाषा, मत-मतातर आदि बिना कोई भेदभाव से चलाकर,{" "}
              <span className={hl}>राष्ट्र भाव के प्रति आस्था एवं रुचि उत्पन्न करना ।</span> किसी भी प्रकार
              की देवीय आपदा जैसे बाढ़, भूकंप, अकाल, अग्निकांड, महामारी आदि में भी यथासंभव सहयोग करना
              सांगठनिक एवं प्रशासनिक संरचना
            </p>
            <p>
              सेवा भारती समिति राजस्थान का पंजीकृत कार्यालय सेवा सदन लालकोठी योजना, सहकार मार्ग, सहकार लैन,
              जयपुर-302015 है। राजस्थान के पंजीकरण विभाग के{" "}
              <span className={hl}>
                पंजीयन क्रमांक 106/राजस्थान 1987-88 दिनांक 16 जुलाई, 1987 के अंतर्गत पंजीकृत है।
              </span>{" "}
              आयकर विभाग से 80जी के अंतर्गत छूट आदेश क्रमांक आयुक्त (वसूली) 80जी/831/2007-2008 दिनांक
              24-8-2007 के द्वारा लगातार जारी है। संस्था का पैन नंबर AABTS4114N है।
            </p>
            <p>
              प्रशासन की दृष्टि से राजस्थान के 33 जिलों को 3 प्रांत 20 विभाग, 71 जिले 7 महानगर एवं सभी खंड
              तहसील केंद्रों में समितियों/उपसमितियां गठित है। संभाग एवं जिलों की सभी पंजीकृत समितियां सम्बद्ध
              है। नगरों में 1431 सेवा बस्ती है तथा ग्रामीण क्षेत्रों के प्रत्येक ग्राम को अंतिम कार्य स्थान
              की तरह निश्चित किया हुआ है।
            </p>
            <p>
              विभिन्न स्तरों पर नियमित अंतराल से होने वाली बैठक प्रशिक्षण वर्ग द्वारा एवं अधिकारियों के
              नियमित प्रवास से कार्य एवं कार्यकर्ताओं के समुचित सम्भाल हो रही है।
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm md:max-w-none">
            <Image
              src="/home/sewa-geet-bg-01.png"
              alt="सेवा गीत — सेवा भारती राजस्थान"
              width={1084}
              height={1109}
              className="h-auto w-full rounded-[10px]"
            />
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-6 md:py-8">
        <div className="container-page grid items-start gap-6 md:grid-cols-[1fr_2fr]">
          <Image
            src="/home/child-vision-2.jpg"
            alt="सेवा भारती के कार्यक्रम में बच्चे"
            width={330}
            height={295}
            className="mx-auto h-auto w-4/5 md:mx-0 md:w-[86%]"
          />
          <div className="text-[17px] leading-relaxed text-ink-soft md:text-lg">
            <h3 lang="hi" className="mb-4 text-3xl font-bold text-black">हमारी दृष्टि</h3>
            <p className="pt-2">
              The making of a strong and empowered society is possible only when each of its sections
              gets equal rights to growth and opportunity.{" "}
              <span className={hl}>
                A homogeneous society can be created by making educated, suppressed, and backward
                brethren self-supporting and empowered.
              </span>{" "}
              Sewa Bharati works tirelessly and relentlessly towards the realization of this vision
            </p>
            <p lang="hi" className="mt-4 text-xl font-bold text-saffron-500">
              सेवा” ईश्वर भक्ति का प्रथम सोपान एवं देशभक्ति का प्रकट स्वरूप है| इस कार्य में आप भी सामर्थ्य
              अनुसार सहयोग करें|
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
