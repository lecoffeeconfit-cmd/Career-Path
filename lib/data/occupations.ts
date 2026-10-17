import type {
  CareerField,
  Competency,
  EducationPathway,
  Occupation,
} from "../domain/occupation";
import snapshot from "./bls-snapshot.json";
import { normalizeBlsRecord } from "./normalize";

export const careerFields: CareerField[] = [
  {
    id: "technology",
    name: "Technology",
    description: "Turn ideas into tools people use.",
    icon: "code",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Make a difference in people’s lives.",
    icon: "heart",
  },
  {
    id: "trades",
    name: "Skilled trades",
    description: "Build a future with hands-on expertise.",
    icon: "tool",
  },
  {
    id: "engineering",
    name: "Engineering",
    description: "Design solutions for the real world.",
    icon: "gear",
  },
  {
    id: "creative",
    name: "Arts & design",
    description: "Bring a fresh perspective to life.",
    icon: "pen",
  },
  {
    id: "finance",
    name: "Business & finance",
    description: "Help organizations make better decisions.",
    icon: "chart",
  },
];

type Profile = Omit<
  Occupation,
  "classification" | "wage" | "employment" | "projection" | "sources"
> & { soc: string };

function pathway(
  soc: string,
  id: string,
  title: string,
  level: EducationPathway["level"],
  kind: EducationPathway["kind"],
  description: string,
  steps: string[],
  credentialNote: string,
): EducationPathway {
  return {
    id,
    title,
    level,
    kind,
    description,
    steps,
    credentialNote,
    sourceId: `bls-${soc}`,
  };
}

function knowledge(
  prefix: string,
  subjects: [string[], string[], string[]],
): Competency[] {
  return subjects.flatMap((names, stageIndex) =>
    names.map((name, index) => ({
      id: `${prefix}-${stageIndex}-${index}`,
      name,
      kind: "knowledge" as const,
      stage: (["foundation", "intermediate", "advanced"] as const)[stageIndex],
      importance:
        stageIndex === 2 ? ("optional" as const) : ("recommended" as const),
      prerequisiteIds:
        stageIndex === 0 ? [] : [`${prefix}-${stageIndex - 1}-0`],
      basis: "editorial-suggestion" as const,
    })),
  );
}

const profiles: Profile[] = [
  {
    id: "software-developer",
    slug: "software-developer",
    title: "Software Developer",
    pluralTitle: "Software Developers",
    soc: "15-1252",
    fieldId: "technology",
    alternateTitles: [
      "Software engineer",
      "Application developer",
      "Systems developer",
    ],
    summary:
      "Create the applications and systems that turn everyday problems into useful digital experiences.",
    overview:
      "Software developers translate people’s needs into applications and systems. The work combines technical problem solving with collaboration, testing, and continuous learning.",
    tasks: [
      "Understand user needs and define a solution.",
      "Design, develop, and maintain software.",
      "Test behavior and investigate problems.",
      "Explain technical decisions to teammates.",
    ],
    workEnvironment: "office",
    workLife:
      "Typically full-time, collaborative work in offices or other employer-approved settings. Deadlines and team practices vary.",
    physicalDemands:
      "Often computer-based work; workstation accessibility and accommodations depend on the employer.",
    interests: ["Problem solving", "Building things", "Technology"],
    majors: ["Computer science", "Software engineering", "Mathematics"],
    typicalEducation: "bachelor",
    pathways: [
      pathway(
        "15-1252",
        "software-degree",
        "Computer science or a related degree",
        "bachelor",
        "typical",
        "A bachelor’s degree is the typical entry route reported by BLS.",
        [
          "Study computing foundations.",
          "Gain practical development experience.",
          "Build and explain working software.",
        ],
        "Employer requirements vary; a portfolio supplements rather than replaces stated requirements.",
      ),
      pathway(
        "15-1252",
        "software-specialization",
        "Further study and specialization",
        "graduate",
        "specialization",
        "Some employers prefer a master’s degree for developer positions.",
        [
          "Establish a computing foundation.",
          "Explore a focused area of study.",
          "Apply advanced knowledge to projects.",
        ],
        "Graduate study is an employer preference for some roles, not a universal license requirement.",
      ),
    ],
    competencies: knowledge("software", [
      ["Programming fundamentals", "Computational thinking"],
      ["Data structures", "Databases & testing"],
      ["System design", "Security engineering"],
    ]),
    related: [
      {
        occupationId: "mechanical-engineer",
        reason:
          "Both turn requirements into tested technical systems; mechanical engineering focuses on physical devices.",
      },
      {
        occupationId: "graphic-designer",
        reason:
          "Both create useful experiences; design emphasizes visual communication.",
      },
    ],
  },
  {
    id: "registered-nurse",
    slug: "registered-nurse",
    title: "Registered Nurse",
    pluralTitle: "Registered Nurses",
    soc: "29-1141",
    fieldId: "healthcare",
    alternateTitles: ["RN", "Staff nurse", "Clinical nurse"],
    summary:
      "Combine scientific knowledge and human connection to care for patients and support their health.",
    overview:
      "Registered nurses coordinate care, monitor patients, and explain treatment. Their work combines clinical judgment, careful documentation, and communication with patients and care teams.",
    tasks: [
      "Assess and monitor patient needs.",
      "Coordinate care with a clinical team.",
      "Deliver prescribed treatments.",
      "Explain care and maintain records.",
    ],
    workEnvironment: "clinical",
    workLife:
      "Hospitals may require nights, weekends, or rotating shifts. Some schools and outpatient settings have regular business hours.",
    physicalDemands:
      "Some roles involve standing, moving patients, and exposure to illness. Requirements differ by clinical setting.",
    interests: ["Helping people", "Science", "Health"],
    majors: ["Nursing", "Biology", "Health sciences"],
    typicalEducation: "bachelor",
    pathways: [
      pathway(
        "29-1141",
        "nursing-bsn",
        "Bachelor of Science in Nursing",
        "bachelor",
        "typical",
        "Complete an approved nursing program with supervised clinical education.",
        [
          "Complete nursing coursework.",
          "Complete supervised clinical training.",
          "Meet licensing and examination requirements.",
        ],
        "Registered nurses must be licensed. Check your state board’s current requirements.",
      ),
      pathway(
        "29-1141",
        "nursing-adn",
        "Associate degree or approved diploma",
        "associate",
        "alternative",
        "BLS also identifies associate-degree and approved diploma routes.",
        [
          "Select a state-approved program.",
          "Complete coursework and clinical practice.",
          "Meet licensing requirements.",
        ],
        "Some employers prefer a bachelor’s degree. Verify program approval and state eligibility.",
      ),
    ],
    competencies: knowledge("nursing", [
      ["Anatomy & physiology", "Communication"],
      ["Patient assessment", "Pharmacology"],
      ["Clinical specialization", "Care coordination"],
    ]),
    related: [
      {
        occupationId: "software-developer",
        reason:
          "Health technology connects clinical workflows with software, although these occupations require different preparation.",
      },
    ],
  },
  {
    id: "electrician",
    slug: "electrician",
    title: "Electrician",
    pluralTitle: "Electricians",
    soc: "47-2111",
    fieldId: "trades",
    alternateTitles: [
      "Journeyman electrician",
      "Electrical installer",
      "Maintenance electrician",
    ],
    summary:
      "Keep homes, businesses, and communities running with safe, reliable electrical systems.",
    overview:
      "Electricians install and troubleshoot wiring and electrical equipment. Precision, practical reasoning, and safe working practices are central to the occupation.",
    tasks: [
      "Interpret electrical plans.",
      "Install wiring and equipment.",
      "Diagnose and repair faults.",
      "Follow electrical codes and safety practices.",
    ],
    workEnvironment: "hands-on",
    workLife:
      "Worksites vary, with indoor and outdoor tasks. Full-time schedules may include overtime, evenings, and weekends.",
    physicalDemands:
      "May involve climbing, kneeling, confined spaces, and electrical hazards. Proper training and protective equipment matter.",
    interests: ["Hands-on work", "Troubleshooting", "Building things"],
    majors: ["Electrical technology", "Construction", "Applied mathematics"],
    typicalEducation: "high-school",
    pathways: [
      pathway(
        "47-2111",
        "electrical-apprenticeship",
        "Apprenticeship",
        "high-school",
        "typical",
        "Most electricians learn through supervised on-the-job and classroom training.",
        [
          "Meet apprenticeship entry requirements.",
          "Complete supervised work and classes.",
          "Meet local licensing requirements.",
        ],
        "Most states require a license. Requirements and apprenticeship terms vary by location.",
      ),
      pathway(
        "47-2111",
        "electrical-technical",
        "Technical school, then supervised training",
        "certificate",
        "alternative",
        "Some electricians start in technical school before further practical training.",
        [
          "Check how a program connects to local training.",
          "Study electrical fundamentals.",
          "Complete supervised experience and licensing.",
        ],
        "A school certificate alone may not qualify you for independent electrical work.",
      ),
    ],
    competencies: knowledge("electrical", [
      ["Applied algebra", "Electrical fundamentals"],
      ["Blueprint reading", "Codes & safe practices"],
      ["Control systems", "Renewable energy systems"],
    ]),
    related: [
      {
        occupationId: "mechanical-engineer",
        reason:
          "Both work with technical systems; electricians focus on installation and maintenance.",
      },
    ],
  },
  {
    id: "mechanical-engineer",
    slug: "mechanical-engineer",
    title: "Mechanical Engineer",
    pluralTitle: "Mechanical Engineers",
    soc: "17-2141",
    fieldId: "engineering",
    alternateTitles: [
      "Mechanical design engineer",
      "Product engineer",
      "Mechanical systems engineer",
    ],
    summary:
      "Bring physical ideas to life, from energy systems and machines to the next generation of products.",
    overview:
      "Mechanical engineers develop and evaluate machines and thermal systems. They use science, modeling, and experimentation to improve how physical products work.",
    tasks: [
      "Analyze a mechanical challenge.",
      "Model and design a solution.",
      "Build and evaluate prototypes.",
      "Improve designs using test results.",
    ],
    workEnvironment: "office",
    workLife:
      "Often office-based with visits to laboratories, manufacturing facilities, or worksites. Some projects require more than a standard workweek.",
    physicalDemands:
      "Site visits may require protective equipment; physical requirements depend on the role.",
    interests: ["Design", "Science", "Building things"],
    majors: ["Mechanical engineering", "Engineering technology", "Physics"],
    typicalEducation: "bachelor",
    pathways: [
      pathway(
        "17-2141",
        "mechanical-degree",
        "Mechanical engineering degree",
        "bachelor",
        "typical",
        "BLS identifies a bachelor’s in mechanical engineering or engineering technology as typical.",
        [
          "Study mathematics and physical science.",
          "Complete engineering and design coursework.",
          "Gain project, internship, or co-op experience.",
        ],
        "Engineers who sell services to the public must be licensed. Entry-level roles have different requirements.",
      ),
      pathway(
        "17-2141",
        "mechanical-technology",
        "Engineering technology degree",
        "bachelor",
        "alternative",
        "Engineering technology emphasizes practical applications and may include co-ops.",
        [
          "Compare program curricula and accreditation.",
          "Develop applied engineering skills.",
          "Check eligibility for your target roles.",
        ],
        "Check state licensure rules and employer requirements before choosing a program.",
      ),
    ],
    competencies: knowledge("mechanical", [
      ["Calculus", "Physics"],
      ["Mechanics & materials", "Computer-aided design"],
      ["Thermal systems", "Robotics & controls"],
    ]),
    related: [
      {
        occupationId: "electrician",
        reason:
          "Both solve physical-system problems through technical knowledge.",
      },
      {
        occupationId: "software-developer",
        reason:
          "Software and mechanical systems meet in simulation, robotics, and controls.",
      },
    ],
  },
  {
    id: "graphic-designer",
    slug: "graphic-designer",
    title: "Graphic Designer",
    pluralTitle: "Graphic Designers",
    soc: "27-1024",
    fieldId: "creative",
    alternateTitles: [
      "Visual designer",
      "Brand designer",
      "Communication designer",
    ],
    summary:
      "Give ideas a visual voice through thoughtful typography, imagery, and design.",
    overview:
      "Graphic designers shape visual communications for clients and organizations. They develop concepts, refine layouts, and use feedback to make messages clearer.",
    tasks: [
      "Understand a communication brief.",
      "Develop visual concepts and layouts.",
      "Present and refine design work.",
      "Prepare final visual materials.",
    ],
    workEnvironment: "office",
    workLife:
      "Work may be in studios, in-house teams, or self-employment. Deadlines and client needs influence schedules.",
    physicalDemands:
      "Often computer-based work, with requirements varying by studio or assignment.",
    interests: ["Creativity", "Design", "Communication"],
    majors: ["Graphic design", "Visual communication", "Fine arts"],
    typicalEducation: "bachelor",
    pathways: [
      pathway(
        "27-1024",
        "design-degree",
        "Design degree and portfolio",
        "bachelor",
        "typical",
        "A bachelor’s in graphic design or a related field is the usual entry preparation.",
        [
          "Study visual and design foundations.",
          "Develop and critique design projects.",
          "Assemble a portfolio.",
        ],
        "Employers assess portfolios; there is no single universal professional license.",
      ),
      pathway(
        "27-1024",
        "design-retraining",
        "Related degree plus technical preparation",
        "certificate",
        "alternative",
        "People with a degree in another field may pursue technical design training.",
        [
          "Review gaps in design foundations.",
          "Choose relevant technical coursework.",
          "Build a portfolio for target roles.",
        ],
        "This route is not a guarantee of employment; requirements differ by employer.",
      ),
    ],
    competencies: knowledge("design", [
      ["Visual composition", "Typography"],
      ["Digital design tools", "Design critique"],
      ["Brand systems", "Information design"],
    ]),
    related: [
      {
        occupationId: "software-developer",
        reason:
          "Both build digital experiences, with different emphasis on visuals and software behavior.",
      },
    ],
  },
  {
    id: "accountant",
    slug: "accountant",
    title: "Accountant & Auditor",
    pluralTitle: "Accountants and Auditors",
    soc: "13-2011",
    fieldId: "finance",
    alternateTitles: [
      "Accountant",
      "Auditor",
      "Staff accountant",
      "Cost accountant",
    ],
    summary:
      "Make complex financial information clear, reliable, and useful for better decisions.",
    overview:
      "Accountants and auditors examine financial information and communicate what it means. The work combines quantitative reasoning with professional judgment and attention to detail.",
    tasks: [
      "Prepare and examine financial records.",
      "Evaluate records and controls.",
      "Identify financial risks or discrepancies.",
      "Explain findings to clients or colleagues.",
    ],
    workEnvironment: "office",
    workLife:
      "Usually full-time office work. Audits, reporting deadlines, and tax season can require overtime.",
    physicalDemands:
      "Often computer-based analytical work, sometimes with travel to client sites.",
    interests: ["Numbers", "Business", "Problem solving"],
    majors: ["Accounting", "Finance", "Business administration"],
    typicalEducation: "bachelor",
    pathways: [
      pathway(
        "13-2011",
        "accounting-degree",
        "Accounting or related degree",
        "bachelor",
        "typical",
        "A bachelor’s in accounting or a related subject is typically required.",
        [
          "Study accounting and business foundations.",
          "Build practical financial analysis skills.",
          "Gain relevant work experience.",
        ],
        "Role requirements vary; CPA licensure is distinct from a general accounting degree.",
      ),
      pathway(
        "13-2011",
        "accounting-cpa",
        "CPA preparation and licensure",
        "bachelor",
        "specialization",
        "CPA licensure can support specific professional roles and improve prospects.",
        [
          "Check your state board’s requirements.",
          "Complete required education and experience.",
          "Meet examination and licensing requirements.",
        ],
        "Requirements vary by state and can change. Verify them with the relevant board.",
      ),
    ],
    competencies: knowledge("accounting", [
      ["Financial accounting", "Business mathematics"],
      ["Auditing & controls", "Financial analysis"],
      ["Tax specialization", "Forensic accounting"],
    ]),
    related: [
      {
        occupationId: "software-developer",
        reason:
          "Both use analytical thinking; financial systems connect accounting expertise with technology.",
      },
    ],
  },
];

export const occupations: Occupation[] = profiles.map(({ soc, ...profile }) => {
  const raw = snapshot.records.find((record) => record.soc === soc);
  if (!raw) throw new Error(`Missing BLS snapshot for ${soc}`);
  const normalized = normalizeBlsRecord(raw, snapshot);
  return {
    ...profile,
    classification: { system: "SOC", code: normalized.soc },
    wage: normalized.wage,
    employment: normalized.employment,
    projection: normalized.projection,
    sources: [normalized.source],
  };
});

export function getOccupation(slug: string) {
  return occupations.find((occupation) => occupation.slug === slug);
}

export function getField(id: string) {
  return careerFields.find((field) => field.id === id)!;
}
