// Informational landing pages (no claims of quality/results - Bar Council of India rules).
const NOTE =
  'The information on this page is general and for awareness only. It is not legal advice and does not create an advocate-client relationship.'

const criminalLaws = {
  heading: 'New criminal laws in force',
  body: 'From 1 July 2024 the Bharatiya Nyaya Sanhita (BNS), the Bharatiya Nagarik Suraksha Sanhita (BNSS) and the Bharatiya Sakshya Adhiniyam (BSA) replaced the Indian Penal Code, the Code of Criminal Procedure and the Indian Evidence Act for offences committed on or after that date. Matters relating to earlier dates continue under the older laws. Which law applies to your case depends on the date of the alleged offence.',
}

const rights = {
  heading: 'Your basic rights on arrest',
  body: 'Under Article 22 of the Constitution, a person who is arrested has the right to be told the grounds of arrest, the right to consult and be defended by an advocate of their choice, and the right to be produced before a magistrate within 24 hours of arrest (excluding travel time). Knowing these rights early helps you act calmly and correctly.',
}

const bring = {
  heading: 'Documents that help at the first meeting',
  points: [
    'Copy of the FIR, complaint, notice or summons, if any',
    'Arrest memo, remand order or bail order, if any',
    'Any chargesheet, court order or previous case papers',
    'Identity proof and a short written timeline of events',
  ],
}

const officeNoida =
  'Our Greater Noida West (Noida Extension) office is at S-211, Gayatri Life Suites, Sector-1, Greater Noida West - 201302.'

export const landingPages = [
  {
    slug: 'criminal-lawyer-noida',
    order: 1,
    title: 'Criminal Lawyer in Noida',
    city: 'Noida / Greater Noida West',
    seoTitle: 'Criminal Lawyer in Noida & Greater Noida West | Verdict Nexus',
    seoDescription:
      'Advocates for criminal matters in Noida and Greater Noida West: FIR, bail, quashing, cheque bounce and trial defence before Gautam Buddh Nagar courts and the Allahabad High Court.',
    h1: 'Criminal Lawyer in Noida & Greater Noida West',
    intro:
      'Verdict Nexus is a law firm with an office in Greater Noida West (Noida Extension). Our advocates appear in criminal matters before the courts in Gautam Buddh Nagar, the Allahabad High Court and the Supreme Court of India.\n\n' +
      officeNoida,
    sections: [
      {
        heading: 'Criminal matters we appear in',
        points: [
          'FIR registration and quashing of FIR',
          'Regular bail, anticipatory bail and interim bail',
          'Cheque bounce cases under Section 138 of the Negotiable Instruments Act',
          'Cyber crime and financial offences',
          'Matrimonial offences such as Section 498A and domestic violence complaints',
          'Trial defence, appeals and revisions',
        ],
      },
      {
        heading: 'Courts we appear before',
        body: 'District and Sessions Court, Gautam Buddh Nagar (Surajpur, Greater Noida); the High Court of Judicature at Allahabad (Prayagraj); and the Supreme Court of India, New Delhi.',
      },
      criminalLaws,
      rights,
      bring,
    ],
    faqs: [
      {
        question: 'Can an FIR be quashed?',
        answer:
          'In certain situations, such as where no offence is disclosed on the face of the FIR or where parties have settled a private dispute that is not of a serious nature, the High Court can quash an FIR under its inherent powers (Section 528 BNSS, earlier Section 482 CrPC) or under Article 226 of the Constitution. Whether it is possible depends on the facts of each case.',
      },
      {
        question: 'What is the difference between regular bail and anticipatory bail?',
        answer:
          'Regular bail is sought after a person has been arrested. Anticipatory bail is sought before arrest, when a person apprehends arrest in a non-bailable offence. Both are decided by the court on the facts and the nature of the allegations.',
      },
      {
        question: 'Which court hears criminal cases from Greater Noida West?',
        answer:
          'Trial matters are heard by the courts at the Gautam Buddh Nagar District Court. Appeals, revisions, quashing and certain bail matters go to the Allahabad High Court.',
      },
    ],
  },
  {
    slug: 'bail-lawyer-noida',
    order: 2,
    title: 'Bail Lawyer in Noida',
    city: 'Noida / Greater Noida West',
    seoTitle: 'Bail Lawyer in Noida | Anticipatory & Regular Bail | Verdict Nexus',
    seoDescription:
      'Information on regular, anticipatory and default bail, and how advocates at Verdict Nexus appear in bail matters before courts in Noida, Greater Noida and the Allahabad High Court.',
    h1: 'Bail Lawyer in Noida & Greater Noida West',
    intro:
      'Bail is the temporary release of an accused person while the case is pending. This page explains the common kinds of bail in simple terms. Our advocates appear in bail applications before the Sessions Court, Gautam Buddh Nagar, and the Allahabad High Court.\n\n' +
      officeNoida,
    sections: [
      {
        heading: 'Types of bail',
        points: [
          'Regular bail - after arrest, under Sections 480 and 483 BNSS (earlier Sections 437 and 439 CrPC)',
          'Anticipatory bail - before arrest, under Section 482 BNSS (earlier Section 438 CrPC)',
          'Default (statutory) bail - where the investigation is not completed within the time allowed by law, under Section 187 BNSS (earlier Section 167(2) CrPC)',
          'Interim bail - short-term bail until the main application is decided',
        ],
      },
      {
        heading: 'Bailable and non-bailable offences',
        body: 'In a bailable offence, bail is a matter of right. In a non-bailable offence, bail is decided by the court after considering factors such as the nature and seriousness of the allegation, the role attributed to the accused, the likelihood of the accused appearing at trial, and the risk of tampering with evidence.',
      },
      criminalLaws,
      bring,
    ],
    faqs: [
      {
        question: 'Can I apply for anticipatory bail before an FIR is registered?',
        answer:
          'Anticipatory bail is sought when there is a reasonable apprehension of arrest for a non-bailable offence. Courts look at the facts, so an advocate should review the papers before an application is made.',
      },
      {
        question: 'How long does a bail application take?',
        answer:
          'The time depends on the court, the stage of the case and the nature of the offence. An advocate can tell you what to expect after reading the case papers.',
      },
    ],
  },
  {
    slug: 'family-lawyer-noida',
    order: 3,
    title: 'Family & Divorce Lawyer in Noida',
    city: 'Noida / Greater Noida West',
    seoTitle: 'Family & Divorce Lawyer in Noida | Verdict Nexus',
    seoDescription:
      'Family law information and advocates for divorce, maintenance, child custody and domestic violence matters in Noida and Greater Noida West, before the Family Court at Gautam Buddh Nagar.',
    h1: 'Family & Divorce Lawyer in Noida & Greater Noida West',
    intro:
      'Family disputes are sensitive and need careful handling. Our advocates appear in matrimonial and family matters before the Family Court and other courts at Gautam Buddh Nagar and before the Allahabad High Court.\n\n' +
      officeNoida,
    sections: [
      {
        heading: 'Family matters we appear in',
        points: [
          'Divorce - contested and by mutual consent',
          'Maintenance for wife, children and parents',
          'Child custody, guardianship and visitation',
          'Domestic violence complaints under the Protection of Women from Domestic Violence Act, 2005',
          'Restitution of conjugal rights and judicial separation',
          'Matters under the Hindu Marriage Act, the Special Marriage Act and personal laws',
        ],
      },
      {
        heading: 'Divorce by mutual consent',
        body: 'Under Section 13B of the Hindu Marriage Act, 1955, spouses who have lived separately for one year or more and have mutually agreed to dissolve the marriage can file a joint petition. The law provides a waiting period of six months between the two motions, which the Supreme Court has held can be waived by the court in suitable cases.',
      },
      {
        heading: 'Child custody',
        body: 'In custody matters the court treats the welfare of the child as the main consideration. The applicable laws include the Guardians and Wards Act, 1890 and the Hindu Minority and Guardianship Act, 1956.',
      },
      {
        heading: 'Documents that help at the first meeting',
        points: [
          'Marriage certificate and photographs, if available',
          'Address and income details of both parties',
          'Any earlier notices, complaints or court orders',
          'Details of children, if any',
        ],
      },
    ],
    faqs: [
      {
        question: 'How long does a divorce take?',
        answer:
          'A mutual consent divorce is usually faster than a contested one. The timeline depends on the court, whether the parties agree, and the issues involved.',
      },
      {
        question: 'Who can claim maintenance?',
        answer:
          'A wife, minor children and, in some situations, parents can claim maintenance under laws such as Section 144 BNSS (earlier Section 125 CrPC) and personal laws. The amount depends on the income and needs of the parties.',
      },
    ],
  },
  {
    slug: 'property-lawyer-noida',
    order: 4,
    title: 'Property Lawyer in Noida',
    city: 'Noida / Greater Noida West',
    seoTitle: 'Property Lawyer in Noida & Greater Noida West | Verdict Nexus',
    seoDescription:
      'Advocates for property matters in Noida and Greater Noida West: title verification, sale deed, builder-buyer disputes, RERA, partition and tenant disputes.',
    h1: 'Property Lawyer in Noida & Greater Noida West',
    intro:
      'Property transactions and disputes involve documents, registration and authority records. Our advocates assist with property matters in Noida, Greater Noida and Greater Noida West (Noida Extension).\n\n' +
      officeNoida,
    sections: [
      {
        heading: 'Property matters we assist with',
        points: [
          'Title verification and due diligence before purchase',
          'Drafting and review of sale deeds, agreements to sell and lease deeds',
          'Builder-buyer disputes, including delayed possession in group housing projects',
          'Complaints before the Uttar Pradesh Real Estate Regulatory Authority (UP RERA)',
          'Partition, possession and declaration suits',
          'Landlord-tenant disputes and eviction',
          'Matters relating to Noida and Greater Noida authority allotments and lease deeds',
        ],
      },
      {
        heading: 'Before you buy a property',
        body: 'It is usual to check the chain of title, the registration of the earlier deeds, the authority or builder approvals, encumbrances such as loans or litigation, and whether the project is registered with RERA. An advocate can review these documents with you.',
      },
      {
        heading: 'Forums for property disputes',
        body: 'Depending on the dispute, the matter may be taken to the civil court, UP RERA, the Consumer Commission or the High Court. Choosing the right forum early can save time.',
      },
    ],
    faqs: [
      {
        question: 'What is a title search?',
        answer:
          'A title search is a review of the documents showing who owns a property and whether there are any claims, loans or disputes on it. It is normally done before buying.',
      },
      {
        question: 'Can I complain about delayed possession by a builder?',
        answer:
          'Buyers can approach UP RERA or the Consumer Commission for delayed possession, depending on the facts and the project. An advocate can advise which forum fits your case.',
      },
    ],
  },
  {
    slug: 'civil-lawyer-noida',
    order: 5,
    title: 'Civil Lawyer in Noida',
    city: 'Noida / Greater Noida West',
    seoTitle: 'Civil Lawyer in Noida & Greater Noida West | Verdict Nexus',
    seoDescription:
      'Advocates for civil matters in Noida: recovery suits, injunctions, specific performance, partition and commercial disputes before the Gautam Buddh Nagar courts.',
    h1: 'Civil Lawyer in Noida & Greater Noida West',
    intro:
      'Civil cases cover disputes over money, property, contracts and rights. Our advocates appear in civil matters before the courts at Gautam Buddh Nagar and the Allahabad High Court.\n\n' +
      officeNoida,
    sections: [
      {
        heading: 'Civil matters we appear in',
        points: [
          'Recovery suits, including summary suits under Order XXXVII of the Code of Civil Procedure',
          'Specific performance of agreements under the Specific Relief Act, 1963',
          'Temporary and permanent injunctions',
          'Declaration, partition and possession suits',
          'Commercial disputes under the Commercial Courts Act, 2015',
          'Execution of decrees and appeals',
        ],
      },
      {
        heading: 'Limitation',
        body: 'The Limitation Act, 1963 sets time limits for filing suits and appeals. Claims filed after the limit can be dismissed, so it is important to check the time limit as early as possible.',
      },
      {
        heading: 'Legal notice',
        body: 'A legal notice is often the first step before filing a suit. It sets out the claim and gives the other side a chance to respond or settle.',
      },
    ],
    faqs: [
      {
        question: 'Do I have to send a legal notice before filing a case?',
        answer:
          'It is not required in every case, but it is required for some, for example certain suits against government bodies and cheque bounce complaints. An advocate can tell you whether it is needed in your matter.',
      },
    ],
  },
  {
    slug: 'criminal-lawyer-gurugram',
    order: 6,
    title: 'Criminal Lawyer in Gurugram',
    city: 'Gurugram',
    seoTitle: 'Criminal Lawyer in Gurugram | Verdict Nexus',
    seoDescription:
      'Advocates for criminal matters in Gurugram: FIR, bail, quashing, cheque bounce and trial defence before the Gurugram courts and the Punjab and Haryana High Court.',
    h1: 'Criminal Lawyer in Gurugram',
    intro:
      'Verdict Nexus has an office in Gurugram at House No. 238/18, Behind Ganga Apartment, Sector-11, Gurugram - 122001. Our advocates appear in criminal matters before the District Courts at Gurugram and the Punjab and Haryana High Court at Chandigarh.',
    sections: [
      {
        heading: 'Criminal matters we appear in',
        points: [
          'FIR registration and quashing of FIR',
          'Regular bail, anticipatory bail and interim bail',
          'Cheque bounce cases under Section 138 of the Negotiable Instruments Act',
          'Cyber crime and financial offences',
          'Matrimonial offences and domestic violence complaints',
          'Trial defence, appeals and revisions',
        ],
      },
      {
        heading: 'Courts we appear before',
        body: 'District and Sessions Courts at Gurugram; the Punjab and Haryana High Court at Chandigarh; and the Supreme Court of India, New Delhi.',
      },
      criminalLaws,
      rights,
      bring,
    ],
    faqs: [
      {
        question: 'Which High Court hears appeals from Gurugram courts?',
        answer: 'The Punjab and Haryana High Court at Chandigarh hears appeals, revisions and quashing petitions from Gurugram.',
      },
    ],
  },
  {
    slug: 'family-lawyer-gurugram',
    order: 7,
    title: 'Family & Divorce Lawyer in Gurugram',
    city: 'Gurugram',
    seoTitle: 'Family & Divorce Lawyer in Gurugram | Verdict Nexus',
    seoDescription:
      'Advocates for divorce, maintenance, child custody and domestic violence matters in Gurugram, before the Family Court and the Punjab and Haryana High Court.',
    h1: 'Family & Divorce Lawyer in Gurugram',
    intro:
      'Our Gurugram office is at House No. 238/18, Behind Ganga Apartment, Sector-11, Gurugram - 122001. Our advocates appear in family and matrimonial matters before the courts at Gurugram and the Punjab and Haryana High Court.',
    sections: [
      {
        heading: 'Family matters we appear in',
        points: [
          'Divorce - contested and by mutual consent',
          'Maintenance for wife, children and parents',
          'Child custody, guardianship and visitation',
          'Domestic violence complaints under the Protection of Women from Domestic Violence Act, 2005',
          'Matters under the Hindu Marriage Act, the Special Marriage Act and personal laws',
        ],
      },
      {
        heading: 'Divorce by mutual consent',
        body: 'Under Section 13B of the Hindu Marriage Act, 1955, spouses who have lived separately for one year or more and have mutually agreed to dissolve the marriage can file a joint petition. The statutory waiting period of six months between motions can be waived by the court in suitable cases.',
      },
    ],
    faqs: [
      {
        question: 'Can a divorce petition be filed in Gurugram?',
        answer:
          'The Hindu Marriage Act allows a petition to be filed where the marriage was solemnised, where the parties last resided together, or where the respondent resides, among other grounds. An advocate can tell you which court has jurisdiction in your case.',
      },
    ],
  },
  {
    slug: 'lawyer-in-mumbai',
    order: 8,
    title: 'Lawyer in Mumbai',
    city: 'Mumbai',
    seoTitle: 'Lawyer in Mumbai (Fort) | Verdict Nexus',
    seoDescription:
      'Verdict Nexus has an office in Fort, Mumbai. Advocates for civil, property, commercial, family and criminal matters before courts in Mumbai and the Bombay High Court.',
    h1: 'Lawyer in Mumbai',
    intro:
      'Verdict Nexus has an office at 9, 1st Floor, Western India House, Sir P. M. Road, Fort, Mumbai - 400001. Our advocates appear in civil, property, commercial, family and criminal matters before the courts in Mumbai and the Bombay High Court.',
    sections: [
      {
        heading: 'Matters we appear in',
        points: [
          'Civil suits and recovery',
          'Property and real estate matters, including complaints before MahaRERA',
          'Commercial and contractual disputes',
          'Family and matrimonial matters',
          'Criminal matters, bail and quashing',
          'Documentation - agreements, wills, legal notices and power of attorney',
        ],
      },
      {
        heading: 'Courts',
        body: 'Courts in Mumbai including the City Civil Court and Sessions Court, the Bombay High Court, and tribunals and regulatory authorities located in the city.',
      },
    ],
    faqs: [
      {
        question: 'Where is the Mumbai office?',
        answer: 'The office is at Western India House, Sir P. M. Road, Fort, Mumbai - 400001.',
      },
    ],
  },
  {
    slug: 'lawyer-in-noida',
    order: 0,
    title: 'Lawyer in Noida',
    city: 'Noida / Greater Noida West',
    seoTitle: 'Lawyer in Noida & Greater Noida West | Verdict Nexus',
    seoDescription:
      'Verdict Nexus is a law firm with an office in Greater Noida West (Noida Extension). Advocates for criminal, family, civil, property and corporate matters in Noida.',
    h1: 'Lawyer in Noida & Greater Noida West',
    intro:
      'Verdict Nexus is a law firm with offices in Greater Noida West, Gurugram and Mumbai. Our Greater Noida West (Noida Extension) office serves clients in Noida, Greater Noida and nearby areas.\n\n' +
      officeNoida,
    sections: [
      {
        heading: 'Areas of practice',
        points: [
          'Criminal law - FIR, bail, quashing, trial and appeals',
          'Family law - divorce, maintenance, custody and domestic violence',
          'Civil litigation - recovery, injunction, specific performance and partition',
          'Property and real estate - title, sale deeds, builder-buyer and RERA matters',
          'Corporate and commercial law',
          'Documentation - agreements, wills, legal notices and power of attorney',
          'Income tax return (ITR) services',
        ],
      },
      {
        heading: 'Courts',
        body: 'District Courts at Gautam Buddh Nagar, the High Court of Judicature at Allahabad, tribunals and the Supreme Court of India.',
      },
      {
        heading: 'Office hours',
        body: 'Monday to Friday, 9 AM to 6 PM, and Saturday, 10 AM to 2 PM.',
      },
    ],
    faqs: [
      {
        question: 'Where is the Greater Noida West office?',
        answer: 'S-211, Gayatri Life Suites, Sector-1, Greater Noida West - 201302.',
      },
    ],
  },
].map((p) => ({...p, note: NOTE}))
