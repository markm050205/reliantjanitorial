import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.mjs";
import { Link, NavLink, useParams, Routes, Route, useLocation } from "react-router-dom";
const BIZ = {
  phone: "",
  // paste number here when ready, e.g. '(856) 555-0123'
  email: "quotes@reliantjanitorial.com",
  // REPLACE if different
  areaLabel: "Camden County & South Jersey"
};
const SERVICES = [
  {
    name: "Recurring janitorial service",
    desc: "Nightly, 3x weekly, or weekly cleaning on a schedule built around your hours. Same crew, same checklist, every visit."
  },
  {
    name: "Day porter service",
    desc: "Daytime coverage for lobbies, restrooms, and common areas in busier facilities."
  },
  {
    name: "Floor care",
    desc: "Vacuuming, mopping, buffing, and periodic strip and wax or carpet extraction to protect your flooring investment."
  },
  {
    name: "Restroom sanitation",
    desc: "Disinfection of all touchpoints, restocking of paper and soap, and odor control on every visit."
  },
  {
    name: "Disinfection and touchpoint cleaning",
    desc: "EPA registered disinfectants on door handles, light switches, counters, and shared equipment."
  },
  {
    name: "Trash and recycling",
    desc: "Emptied, relined, and taken to your dumpster or compactor on every visit."
  }
];
const CHECKLIST = [
  "Locked, verified entry and alarm procedures for after hours service",
  "Written scope of work signed off before the first clean",
  "Checklist completed and logged after every visit",
  "Supervisor inspections with photo reports",
  "Direct line to the owner, not a call center",
  "Insured and bonded before we touch your facility"
];
const TOWNS = [
  "Cherry Hill",
  "Voorhees",
  "Haddonfield",
  "Marlton",
  "Mount Laurel",
  "Moorestown",
  "Collingswood",
  "Pennsauken",
  "Gloucester Township",
  "Washington Township",
  "Deptford",
  "Haddon Heights",
  "Audubon",
  "Somerdale",
  "Stratford",
  "Berlin"
];
const LAST_UPDATED = "August 2026";
const FAQS = [
  {
    q: "How much does commercial cleaning cost in Camden County?",
    a: "Most facilities in our area fall between $0.05 and $0.20 per square foot per month, depending on size, frequency, and the level of detail your building needs. A dental office cleaned nightly prices differently than a church cleaned weekly. We give you an exact written price within 24 hours of a free walkthrough."
  },
  {
    q: "What areas do you serve?",
    a: "We serve Camden County and nearby South Jersey communities, including Cherry Hill, Voorhees, Haddonfield, Marlton, Mount Laurel, Moorestown, Washington Township, and surrounding towns. If you are within a reasonable drive of Camden County, reach out and we can usually make the route work."
  },
  {
    q: "What types of facilities do you clean?",
    a: "We specialize in dental and medical offices, daycares and childcare centers, gyms and fitness studios, banks and credit unions, law and professional offices, and churches. We also serve general commercial offices from roughly 5,000 to 30,000 square feet."
  },
  {
    q: "Do you clean after business hours?",
    a: "Yes. Most of our accounts are serviced in the evening, overnight, or early morning so cleaning never interrupts your patients, members, or staff. Day porter service is available for facilities that need daytime coverage."
  },
  {
    q: "How fast can service start?",
    a: "Typically within two weeks of your first call. We schedule a walkthrough, deliver a written quote within 24 hours, and set a start date once you approve the scope. If your current company just stopped showing up, tell us in the quote form and we can move faster."
  }
];
const TOWN_PAGES = [
  {
    slug: "cherry-hill-nj",
    town: "Cherry Hill",
    h1: "Commercial Cleaning Services in Cherry Hill, NJ",
    title: "Commercial Cleaning in Cherry Hill, NJ | Office & Medical | Reliant Janitorial",
    metaDesc: "Reliant Janitorial provides recurring commercial cleaning for offices, medical practices, and facilities in Cherry Hill, NJ. Free walkthrough, written quote in 24 hours.",
    intro: "Cherry Hill has more commercial square footage than any town we serve, and most of it is cleaned by companies too big to notice when quality slips.",
    body: [
      "From the office plazas along Route 70 and Marlton Pike to the medical and professional suites clustered around the hospital corridor, Cherry Hill is dense with exactly the buildings we specialize in: dental and medical practices, law and professional offices, fitness studios, and bank branches.",
      "Because Cherry Hill sits at the center of our service radius, accounts here get the tightest coverage we offer. Crews are minutes away, supervisors inspect frequently, and a missed detail gets corrected on the next visit, not after a formal complaint works its way through a regional office.",
      "If your Cherry Hill facility is stuck with a national janitorial vendor that treats your building like an account number, we would like to walk it. The walkthrough is free and the written quote arrives within 24 hours."
    ]
  },
  {
    slug: "voorhees-nj",
    town: "Voorhees",
    h1: "Commercial Cleaning Services in Voorhees, NJ",
    title: "Commercial Cleaning in Voorhees, NJ | Medical & Office | Reliant Janitorial",
    metaDesc: "Commercial cleaning for medical offices, professional suites, and facilities in Voorhees, NJ. Evening service, checklist verified visits, free walkthrough and quote.",
    intro: "Voorhees is a medical town. The buildings around the hospital campus and along Haddonfield-Berlin Road hold some of the highest cleaning standards in South Jersey.",
    body: [
      "A large share of the commercial space in Voorhees is healthcare adjacent: medical and dental practices, therapy and specialty clinics, and the professional offices that support them. That is our core specialty. Our crews are trained for clinical environments, from hospital grade restroom disinfection to staying clear of equipment and sterilization areas that are not ours to touch.",
      "We service Voorhees on evening schedules built around patient hours, with written scopes of work, logged visits, and supervisor inspections, so practice managers know the building was actually cleaned instead of assuming it was.",
      "We also clean the town's gyms, childcare centers, and professional suites. If your Voorhees facility needs a cleaning company that treats it like a clinical space instead of a generic office, schedule a free walkthrough."
    ]
  },
  {
    slug: "marlton-nj",
    town: "Marlton",
    h1: "Commercial Cleaning Services in Marlton, NJ",
    title: "Commercial Cleaning in Marlton, NJ | Route 73 Corridor | Reliant Janitorial",
    metaDesc: "Recurring janitorial service for offices, medical practices, and gyms in Marlton and Evesham Township, NJ. Free walkthrough, written quote within 24 hours.",
    intro: "The Route 73 corridor through Marlton is wall to wall commercial: office parks, medical suites, fitness studios, and banks, all competing on appearance.",
    body: [
      "Marlton and the wider Evesham Township sit just over the Camden County line, well inside our service radius. The office parks around Route 73 and Greentree hold the 5,000 to 30,000 square foot buildings we are built for: professional offices, dental and medical practices, and the gyms and studios that serve one of South Jersey's busiest retail corridors.",
      "Buildings in high traffic corridors show wear fast. Entry glass, lobby floors, and restrooms take a beating, and tenants notice. Our scopes for Marlton accounts weight those high visibility areas, and every visit is completed against a written checklist and logged.",
      "If you manage a Marlton facility and your current vendor has gone quiet, we will walk the building for free and put an itemized price in your hands within 24 hours."
    ]
  },
  {
    slug: "mount-laurel-nj",
    town: "Mount Laurel",
    h1: "Commercial Cleaning Services in Mount Laurel, NJ",
    title: "Commercial Cleaning in Mount Laurel, NJ | Office Parks | Reliant Janitorial",
    metaDesc: "Office and commercial cleaning for Mount Laurel, NJ business parks and professional buildings. Consistent crews, logged visits, free walkthrough and 24 hour quote.",
    intro: "Mount Laurel is corporate South Jersey: business parks, professional buildings, and branch offices where the cleaning vendor is invisible until something is wrong.",
    body: [
      "The office parks off Route 38, Midlantic Drive, and Fellowship Road make Mount Laurel one of the largest concentrations of professional space in our service area. These are buildings where facility managers juggle multiple vendors and the janitorial contract only gets attention when it fails.",
      "Our pitch to Mount Laurel facility managers is simple: verification. Written scope, checklist completed and logged every visit, supervisor inspections with photo reports, and the owner's direct number when something needs attention. It is the discipline national vendors promise in the proposal and lose by month three.",
      "We service Mount Laurel offices, law and professional suites, medical practices, banks, and fitness facilities on evening and overnight schedules. Walkthroughs are free and quotes are written, itemized, and delivered within 24 hours."
    ]
  },
  {
    slug: "haddonfield-nj",
    town: "Haddonfield",
    h1: "Commercial Cleaning Services in Haddonfield, NJ",
    title: "Commercial Cleaning in Haddonfield, NJ | Professional Offices | Reliant Janitorial",
    metaDesc: "Commercial cleaning for law firms, professional offices, and downtown businesses in Haddonfield, NJ. Discreet evening service, free walkthrough, 24 hour written quote.",
    intro: "Haddonfield's downtown is small offices with high standards: law firms, wealth managers, medical and dental practices, and boutiques where the building is part of the brand.",
    body: [
      "The professional offices along Kings Highway and the surrounding borough streets are a different kind of account. They are smaller than an office park suite, but the expectations are higher, because clients walk through the front door and judge everything they see.",
      "We clean Haddonfield's law and professional offices with the strictest version of our desk policy: papers, files, and workspaces are never moved or disturbed. Conference rooms are detailed for client meetings, entry glass and floors are kept spotless, and service runs discreetly after hours with documented access procedures.",
      "If you run a practice or firm in Haddonfield and the current cleaning does not match the caliber of the office, we would like to walk the space. The walkthrough is free and the quote is in writing within 24 hours."
    ]
  },
  {
    slug: "washington-township-nj",
    town: "Washington Township",
    h1: "Commercial Cleaning Services in Washington Township, NJ",
    title: "Commercial Cleaning in Washington Township, NJ | Medical & Office | Reliant Janitorial",
    metaDesc: "Commercial and medical office cleaning in Washington Township, Gloucester County, NJ. Evening service, checklist verified visits, free walkthrough and written quote.",
    intro: "Washington Township anchors the Gloucester County side of our service area, with a hospital campus and the medical and commercial corridors that grow around one.",
    body: [
      "The stretch along Route 42, Ganttown Road, and Egg Harbor Road holds a steady mix of medical and dental practices, professional offices, childcare centers, gyms, and bank branches. It is the same facility profile we serve across Camden County, one county over.",
      "Medical adjacent buildings are our specialty. Washington Township practices get clinical grade restroom disinfection, touchpoint protocols, evening scheduling around patient hours, and logged, checklist verified visits their office managers can actually audit.",
      "Reliant Janitorial keeps a deliberately tight service radius so crews and supervisors are never far from the buildings they clean, and Washington Township sits comfortably inside it. Schedule a free walkthrough and your written quote arrives within 24 hours."
    ]
  }
];
const INDUSTRIES = [
  {
    slug: "dental-medical-office-cleaning",
    short: "Dental & Medical Offices",
    h1: "Dental and Medical Office Cleaning in Camden County, NJ",
    title: "Dental & Medical Office Cleaning | Camden County, NJ | Reliant Janitorial",
    metaDesc: "Medical grade cleaning for dental practices and medical offices in Cherry Hill, Voorhees, and Camden County, NJ. OSHA aware protocols, evening service, free walkthrough.",
    intro: "Patients judge your practice the moment they sit down in the waiting room. A dusty vent, a streaked window, or a restroom that smells wrong undoes everything your front desk works for.",
    body: [
      "Reliant Janitorial cleans dental practices, medical offices, urgent care centers, and specialty clinics across Camden County on evening schedules that never interrupt patient hours. Our crews are trained on the difference between cleaning a break room and cleaning a treatment area, and on staying out of the way of sterilization workflows, sharps containers, and clinical equipment that is not ours to touch.",
      "Every account starts with a written scope of work. For medical and dental clients that typically covers waiting rooms and reception, exam and operatory floors and non clinical surfaces, restrooms with hospital grade disinfectants, high touchpoints like door handles and check in counters, and trash handling that respects your regulated waste separation. We use EPA registered disinfectants and color coded microfiber so restroom cloths never travel to any other room.",
      "If your current cleaning company no shows, skips corners, or sends different people every week, that is exactly the situation we are built to replace. We serve practices in Cherry Hill, Voorhees, Haddonfield, Marlton, and the rest of Camden County."
    ],
    scope: [
      "Waiting room, reception, and business office cleaning",
      "Non clinical surfaces in exam rooms and operatories",
      "Hospital grade restroom disinfection and restocking",
      "High touchpoint disinfection on every visit",
      "Floor care rated for clinical flooring",
      "Evening and weekend service around patient hours"
    ]
  },
  {
    slug: "daycare-cleaning",
    short: "Daycares & Childcare",
    h1: "Daycare and Childcare Center Cleaning in South Jersey",
    title: "Daycare & Childcare Center Cleaning | South Jersey | Reliant Janitorial",
    metaDesc: "Nightly cleaning and disinfection for daycares and childcare centers in Camden County, NJ. Child safe products, licensing inspection ready, free walkthrough and quote.",
    intro: "Parents notice everything, and so do state licensing inspectors. In a childcare center, cleaning is not about appearance. It is how you keep illness from tearing through a classroom.",
    body: [
      "Reliant Janitorial provides nightly cleaning and disinfection for daycares, preschools, and childcare centers across Camden County and South Jersey. We schedule after close so classrooms are reset, disinfected, and dry before the first drop off.",
      "Childcare cleaning has its own rules and we follow them. That means child safe, EPA registered disinfectants applied with correct dwell times, careful attention to cots, cubbies, changing stations, and toy storage surfaces, and restrooms and sinks disinfected at toddler height, not just adult height. We keep a completed checklist on file after every visit, which is documentation you can point to when licensing walks through.",
      "Directors usually call us for one of two reasons: their current company keeps missing nights, or a licensing visit is coming and the building is not where it needs to be. Either way, the next step is a free walkthrough and a written quote within 24 hours."
    ],
    scope: [
      "Classroom cleaning and full disinfection reset each night",
      "Changing stations and restroom disinfection at child height",
      "Kitchen and food prep area cleaning",
      "Entry, hallway, and pickup area floors every visit",
      "Child safe, EPA registered products with correct dwell times",
      "Visit logs you can show licensing inspectors"
    ]
  },
  {
    slug: "gym-fitness-cleaning",
    short: "Gyms & Fitness Studios",
    h1: "Gym and Fitness Studio Cleaning in Camden County, NJ",
    title: "Gym & Fitness Studio Cleaning | Camden County, NJ | Reliant Janitorial",
    metaDesc: "Overnight gym cleaning for fitness centers and studios in Cherry Hill and Camden County, NJ. Equipment disinfection, locker rooms, floors. Free walkthrough and quote.",
    intro: "Members can forgive an old treadmill. They will not forgive a locker room that smells like one. In fitness, cleanliness is the product.",
    body: [
      "Reliant Janitorial cleans gyms, boutique fitness studios, and training facilities across Camden County on overnight and early morning schedules, so the club opens spotless without a crew working around your 5 AM regulars.",
      "Gym cleaning is sweat, rubber flooring, and shared equipment, and each needs its own approach. We disinfect equipment touchpoints with products that will not degrade grips and upholstery, run proper procedures on rubber and turf flooring, and hit locker rooms and showers with hospital grade disinfectants that stop the odor and athlete's foot complaints that drive cancellations.",
      "If your current service is wiping mirrors and calling it a night, your Google reviews will eventually say so. We build the scope around the areas members actually touch, and we log every visit so you know it happened."
    ],
    scope: [
      "Equipment touchpoint disinfection every visit",
      "Locker room, shower, and sauna area disinfection",
      "Rubber, turf, and studio floor care",
      "Mirror and glass cleaning throughout",
      "Front desk, lobby, and retail area cleaning",
      "Overnight and early morning scheduling"
    ]
  },
  {
    slug: "bank-cleaning",
    short: "Banks & Credit Unions",
    h1: "Bank and Credit Union Cleaning in South Jersey",
    title: "Bank & Credit Union Cleaning Services | South Jersey | Reliant Janitorial",
    metaDesc: "Secure, insured janitorial service for bank branches and credit unions in Camden County, NJ. Background checked crews, strict access protocols, free walkthrough.",
    intro: "A branch is a trust business. The building has to look the part, and every person who enters after hours has to be accounted for.",
    body: [
      "Reliant Janitorial services bank branches and credit unions across Camden County with crews that understand a financial institution is not a normal cleaning account. Access is controlled, alarm procedures are followed exactly, and the same verified crew services your branch every visit. No rotating strangers with a key to your building.",
      "We are insured and bonded, our people are background checked, and we work from your security requirements, including restricted areas that we document and stay out of entirely. The cleaning itself covers the lobby and teller line your members see, offices and conference rooms, restrooms and break areas, entry glass, and floor care that keeps a high traffic branch looking like the institution it is.",
      "Branch and facilities managers usually reach out when the incumbent gets sloppy with either the cleaning or the security procedures. We are happy to be the replacement. Walkthroughs can be scheduled around branch hours and quotes are delivered in writing within 24 hours."
    ],
    scope: [
      "Lobby, teller line, and customer area cleaning",
      "Strict alarm, access, and restricted area protocols",
      "Background checked, consistent crews",
      "Office, conference room, and break room service",
      "Entry glass and floor care for high traffic",
      "Written visit logs for your facilities file"
    ]
  },
  {
    slug: "law-office-cleaning",
    short: "Law & Professional Offices",
    h1: "Law Office and Professional Office Cleaning in Cherry Hill, NJ",
    title: "Law Office & Professional Office Cleaning | Cherry Hill, NJ | Reliant Janitorial",
    metaDesc: "After hours office cleaning for law firms and professional offices in Cherry Hill and Camden County, NJ. Confidentiality first crews, consistent quality, free quote.",
    intro: "Clients pay professional fees and expect professional surroundings. A conference room with dusty blinds and yesterday's coffee rings quietly costs you credibility.",
    body: [
      "Reliant Janitorial cleans law firms, accounting practices, real estate offices, and professional suites across Cherry Hill, Haddonfield, and Camden County. Service runs after hours with a documented access procedure, and our crews are trained on the rule that matters most in a professional office: papers, files, and desks are never moved, read, or disturbed. We clean around your work, not through it.",
      "The standing scope typically covers reception and conference rooms detailed for client meetings, private offices dusted and trash pulled without touching desk contents, kitchens and break rooms reset, restrooms disinfected and restocked, and glass and floors maintained so the office photographs as well as it bills.",
      "Most firms that call us have the same complaint: quality slid, the crew changed monthly, and nobody answers when something is missed. With Reliant you get a written checklist, supervisor inspections, and the owner's cell number."
    ],
    scope: [
      "Conference room detailing before client days",
      "Private office cleaning with a strict desk contents policy",
      "Reception, lobby, and entry glass",
      "Kitchen and break room reset",
      "Restroom disinfection and restocking",
      "Evening service with documented access procedures"
    ]
  },
  {
    slug: "church-cleaning",
    short: "Churches & Worship Facilities",
    h1: "Church Cleaning Services in Camden County, NJ",
    title: "Church Cleaning Services | Camden County, NJ | Reliant Janitorial",
    metaDesc: "Weekly church and worship facility cleaning in Camden County, NJ. Sanctuaries, fellowship halls, classrooms, and restrooms ready for services. Free walkthrough.",
    intro: "A congregation notices the building even when no one says it out loud. Sunday morning should never start with someone finding a restroom that was not cleaned.",
    body: [
      "Reliant Janitorial provides weekly and event based cleaning for churches and worship facilities across Camden County. Most congregations schedule us late in the week so the sanctuary, restrooms, and gathering spaces are fresh for weekend services, with additional visits around holidays, funerals, weddings, and community events.",
      "Worship facilities combine several building types in one: a sanctuary with pews and hard to reach dust, a fellowship hall that hosts everything from coffee hour to community dinners, classrooms used by children's ministry, and offices for staff. We build the scope room by room and we treat the building with the respect a sacred space deserves.",
      "We also understand church budgets. Scope and frequency are flexible, quotes are written and itemized, and there is no charge for the walkthrough. If your facility is currently cleaned by volunteers who are stretched thin, we can take over the heavy recurring work and leave the light touch ups to your team."
    ],
    scope: [
      "Sanctuary cleaning including pews and platform areas",
      "Fellowship hall and kitchen cleaning",
      "Children's ministry classroom disinfection",
      "Restroom disinfection and restocking",
      "Office and entryway cleaning",
      "Flexible weekly and event based scheduling"
    ]
  }
];
const ROUTES = [
  {
    path: "/",
    title: "Commercial Cleaning & Janitorial Services | Camden County, NJ | Reliant Janitorial",
    metaDesc: "Commercial cleaning and janitorial services for offices, medical practices, daycares, gyms, banks, and churches in Cherry Hill, Voorhees, and Camden County, NJ. Free walkthrough and 24 hour written quote."
  },
  {
    path: "/services",
    title: "Commercial Janitorial Services in South Jersey | Reliant Janitorial",
    metaDesc: "Recurring janitorial service, day porter coverage, floor care, restroom sanitation, and disinfection for commercial facilities in Camden County and South Jersey."
  },
  ...INDUSTRIES.map((ind) => ({
    path: `/industries/${ind.slug}`,
    title: ind.title,
    metaDesc: ind.metaDesc
  })),
  {
    path: "/service-areas",
    title: "Service Areas | Commercial Cleaning in Cherry Hill, Voorhees & Camden County, NJ",
    metaDesc: "Reliant Janitorial provides commercial cleaning in Cherry Hill, Voorhees, Haddonfield, Marlton, Gloucester Township, and throughout Camden County and South Jersey."
  },
  ...TOWN_PAGES.map((t) => ({
    path: `/service-areas/${t.slug}`,
    title: t.title,
    metaDesc: t.metaDesc
  })),
  {
    path: "/about",
    title: "About Reliant Janitorial | Local Commercial Cleaning Company in South Jersey",
    metaDesc: "Reliant Janitorial is a locally owned commercial cleaning company serving Camden County, NJ with checklist driven service, supervisor inspections, and direct owner access."
  },
  {
    path: "/contact",
    title: "Get a Free Cleaning Quote | Reliant Janitorial | Camden County, NJ",
    metaDesc: "Request a free walkthrough and written commercial cleaning quote for your Camden County facility. Quotes delivered within 24 hours."
  }
];
function routeMeta(pathname) {
  return ROUTES.find((r) => r.path === pathname) || ROUTES[0];
}
function Header() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "topbar", children: /* @__PURE__ */ jsxs("div", { className: "wrap", children: [
      /* @__PURE__ */ jsxs("span", { children: [
        "Serving ",
        BIZ.areaLabel,
        " · Insured & Bonded"
      ] }),
      /* @__PURE__ */ jsx("a", { href: `mailto:${BIZ.email}`, children: BIZ.email })
    ] }) }),
    /* @__PURE__ */ jsx("header", { className: "site", children: /* @__PURE__ */ jsxs("div", { className: "wrap", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "logo", "aria-label": "Reliant Janitorial home", children: [
        /* @__PURE__ */ jsx("span", { className: "tick", "aria-hidden": "true", children: "✓" }),
        "Reliant Janitorial"
      ] }),
      /* @__PURE__ */ jsxs("nav", { className: "main", "aria-label": "Main", children: [
        /* @__PURE__ */ jsx(NavLink, { to: "/services", children: "Services" }),
        /* @__PURE__ */ jsx(NavLink, { to: "/industries/dental-medical-office-cleaning", children: "Industries" }),
        /* @__PURE__ */ jsx(NavLink, { to: "/service-areas", children: "Service Areas" }),
        /* @__PURE__ */ jsx(NavLink, { to: "/about", children: "About" }),
        BIZ.phone,
        /* @__PURE__ */ jsx(Link, { to: "/contact", className: "btn btn-amber", children: "Get a Free Quote" })
      ] })
    ] }) })
  ] });
}
function CtaBand() {
  return /* @__PURE__ */ jsx("section", { className: "cta-band", children: /* @__PURE__ */ jsxs("div", { className: "wrap", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { children: "Get a written quote within 24 hours of your walkthrough." }),
      /* @__PURE__ */ jsx("p", { children: "No pressure, no obligation. Just a clear scope and a clear price." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "hero-ctas", children: [
      /* @__PURE__ */ jsx("a", { className: "btn btn-amber", href: "/contact", children: "Request a Walkthrough" }),
      BIZ.phone
    ] })
  ] }) });
}
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "site", children: /* @__PURE__ */ jsxs("div", { className: "wrap", children: [
    /* @__PURE__ */ jsxs("div", { className: "cols", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { children: "Reliant Janitorial" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Commercial cleaning and janitorial services for ",
          BIZ.areaLabel,
          ". Checklist driven service, supervisor inspections, and a direct line to the owner."
        ] }),
        /* @__PURE__ */ jsxs("p", { style: { marginTop: 12 }, children: [
          BIZ.phone,
          /* @__PURE__ */ jsx("a", { href: `mailto:${BIZ.email}`, children: BIZ.email })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { children: "Industries" }),
        INDUSTRIES.map((i) => /* @__PURE__ */ jsx(Link, { to: `/industries/${i.slug}`, children: i.short }, i.slug))
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { children: "Company" }),
        /* @__PURE__ */ jsx(Link, { to: "/services", children: "Services" }),
        /* @__PURE__ */ jsx(Link, { to: "/service-areas", children: "Service Areas" }),
        /* @__PURE__ */ jsx(Link, { to: "/about", children: "About" }),
        /* @__PURE__ */ jsx(Link, { to: "/contact", children: "Get a Quote" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { children: "Top Service Areas" }),
        TOWNS.slice(0, 6).map((t) => /* @__PURE__ */ jsxs("span", { style: { display: "block", padding: "3px 0" }, children: [
          t,
          ", NJ"
        ] }, t))
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "legal", children: [
      /* @__PURE__ */ jsxs("span", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Reliant Janitorial. All rights reserved."
      ] }),
      /* @__PURE__ */ jsx("span", { children: "Commercial cleaning in Camden County, New Jersey" })
    ] })
  ] }) });
}
const SQFT = ["Under 5,000 sq ft", "5,000 to 15,000 sq ft", "15,000 to 30,000 sq ft", "Over 30,000 sq ft"];
const FREQ = ["Nightly (5x or more per week)", "2 to 3x per week", "Weekly", "One time or project"];
function QuoteForm() {
  const [status, setStatus] = useState(null);
  async function onSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const payload = {
      name: form.name.value.trim(),
      company: form.company.value.trim(),
      phone: form.phone.value.trim(),
      email: form.email.value.trim(),
      facility_type: form.facility.value,
      square_footage: form.sqft.value,
      frequency: form.frequency.value,
      town: form.town.value.trim(),
      message: form.message.value.trim(),
      source_page: typeof window !== "undefined" ? window.location.pathname : ""
    };
    setStatus("sending");
    try {
      const { getSupabase } = await import("./assets/supabaseClient-DiLbSfTO.js");
      const supabase = getSupabase();
      if (!supabase) throw new Error("not configured");
      const { error } = await supabase.from("quote_requests").insert(payload);
      if (error) throw error;
      setStatus("ok");
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "generate_lead", { form: "quote_request" });
      }
      form.reset();
    } catch (err) {
      setStatus("err");
    }
  }
  return /* @__PURE__ */ jsxs("form", { className: "quote", onSubmit, children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "q-name", children: "Your name" }),
      /* @__PURE__ */ jsx("input", { id: "q-name", name: "name", required: true, autoComplete: "name" })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "q-company", children: "Company / facility" }),
      /* @__PURE__ */ jsx("input", { id: "q-company", name: "company", required: true, autoComplete: "organization" })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "q-phone", children: "Phone" }),
      /* @__PURE__ */ jsx("input", { id: "q-phone", name: "phone", type: "tel", required: true, autoComplete: "tel" })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "q-email", children: "Email" }),
      /* @__PURE__ */ jsx("input", { id: "q-email", name: "email", type: "email", required: true, autoComplete: "email" })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "q-facility", children: "Facility type" }),
      /* @__PURE__ */ jsxs("select", { id: "q-facility", name: "facility", defaultValue: "", children: [
        /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: "Select one" }),
        INDUSTRIES.map((i) => /* @__PURE__ */ jsx("option", { value: i.short, children: i.short }, i.slug)),
        /* @__PURE__ */ jsx("option", { value: "Other commercial", children: "Other commercial" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "q-town", children: "Town" }),
      /* @__PURE__ */ jsx("input", { id: "q-town", name: "town", placeholder: "Cherry Hill, Voorhees..." })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "q-sqft", children: "Approximate size" }),
      /* @__PURE__ */ jsx("select", { id: "q-sqft", name: "sqft", defaultValue: SQFT[1], children: SQFT.map((s) => /* @__PURE__ */ jsx("option", { value: s, children: s }, s)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "q-frequency", children: "Cleaning frequency" }),
      /* @__PURE__ */ jsx("select", { id: "q-frequency", name: "frequency", defaultValue: FREQ[0], children: FREQ.map((f) => /* @__PURE__ */ jsx("option", { value: f, children: f }, f)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "full", children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "q-message", children: "Anything we should know?" }),
      /* @__PURE__ */ jsx("textarea", { id: "q-message", name: "message", placeholder: "Current cleaning situation, pain points, timing..." })
    ] }),
    status === "ok" && /* @__PURE__ */ jsx("p", { className: "form-status ok", role: "status", children: "Request received. We will call you within one business day to schedule your walkthrough." }),
    status === "err" && /* @__PURE__ */ jsxs("p", { className: "form-status err", role: "alert", children: [
      "Something went wrong sending the form. ",
      `Email us at ${BIZ.email}`,
      " and we will take care of you."
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "full", children: [
      /* @__PURE__ */ jsx("button", { className: "btn btn-spruce", type: "submit", disabled: status === "sending", children: status === "sending" ? "Sending..." : "Request My Free Quote" }),
      /* @__PURE__ */ jsx("p", { className: "form-note", style: { marginTop: 10 }, children: "Free walkthrough. Written quote within 24 hours. No obligation." })
    ] })
  ] });
}
function IndustryGrid() {
  return /* @__PURE__ */ jsx("div", { className: "grid-3", children: INDUSTRIES.map((i) => /* @__PURE__ */ jsxs(Link, { to: `/industries/${i.slug}`, className: "card", children: [
    /* @__PURE__ */ jsx("h3", { children: i.short }),
    /* @__PURE__ */ jsxs("p", { children: [
      i.intro.split(".")[0],
      "."
    ] }),
    /* @__PURE__ */ jsx("div", { className: "go", children: "See how we clean it →" })
  ] }, i.slug)) });
}
function LastUpdated() {
  return /* @__PURE__ */ jsxs("p", { className: "last-updated", children: [
    "Last updated: ",
    LAST_UPDATED
  ] });
}
function Steps() {
  return /* @__PURE__ */ jsxs("div", { className: "steps", children: [
    /* @__PURE__ */ jsxs("div", { className: "step", children: [
      /* @__PURE__ */ jsx("h3", { children: "Walkthrough" }),
      /* @__PURE__ */ jsx("p", { children: "We tour your facility, note problem areas, and build a scope of work around how the building is actually used." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "step", children: [
      /* @__PURE__ */ jsx("h3", { children: "Written quote in 24 hours" }),
      /* @__PURE__ */ jsx("p", { children: "A clear, itemized price for a clear, itemized scope. No vague line items and no surprise add ons later." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "step", children: [
      /* @__PURE__ */ jsx("h3", { children: "First clean and check in" }),
      /* @__PURE__ */ jsx("p", { children: "Your crew starts, a supervisor inspects the early visits, and the owner personally follows up in week one." })
    ] })
  ] });
}
function Home() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { className: "hero", children: /* @__PURE__ */ jsxs("div", { className: "wrap", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow", style: { color: "var(--amber)" }, children: "Commercial Cleaning · Camden County, NJ" }),
        /* @__PURE__ */ jsx("h1", { children: "The cleaning company that actually shows up." }),
        /* @__PURE__ */ jsx("p", { className: "lead", children: "Reliant Janitorial keeps offices, medical practices, daycares, gyms, banks, and churches across South Jersey clean on a checklist, on a schedule, every single visit." }),
        /* @__PURE__ */ jsxs("div", { className: "hero-ctas", children: [
          /* @__PURE__ */ jsx(Link, { className: "btn btn-amber", to: "/contact", children: "Get a Free Quote" }),
          BIZ.phone
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "hero-proof", children: [
          /* @__PURE__ */ jsx("span", { children: "Insured & bonded" }),
          /* @__PURE__ */ jsx("span", { children: "Locally owned" }),
          /* @__PURE__ */ jsx("span", { children: "24 hour written quotes" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "check-card", children: [
        /* @__PURE__ */ jsx("h3", { children: "Every visit, verified" }),
        /* @__PURE__ */ jsx("p", { className: "sub", children: "The standard your current company skips" }),
        /* @__PURE__ */ jsx("ul", { className: "ticks", children: CHECKLIST.map((c) => /* @__PURE__ */ jsx("li", { children: c }, c)) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "band", children: /* @__PURE__ */ jsxs("div", { className: "wrap", children: [
      /* @__PURE__ */ jsx("p", { className: "eyebrow", children: "Industries" }),
      /* @__PURE__ */ jsx("h2", { children: "Built for facilities where clean is non negotiable" }),
      /* @__PURE__ */ jsx("p", { className: "lead", style: { marginTop: 12 }, children: "We specialize in buildings where cleaning failures cost you patients, parents, members, or clients, not just appearances." }),
      /* @__PURE__ */ jsx(IndustryGrid, {})
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "band alt", children: /* @__PURE__ */ jsxs("div", { className: "wrap", children: [
      /* @__PURE__ */ jsx("p", { className: "eyebrow", children: "Why companies switch to Reliant" }),
      /* @__PURE__ */ jsx("h2", { children: "Most of our clients had a cleaning company. It stopped showing up." }),
      /* @__PURE__ */ jsxs("div", { className: "grid-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "card", children: [
          /* @__PURE__ */ jsx("h3", { children: "No shows end here" }),
          /* @__PURE__ */ jsx("p", { children: "Every visit is logged against a written checklist. If a visit ever gets missed, you know before we do the make up clean, not after you find the trash still full." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "card", children: [
          /* @__PURE__ */ jsx("h3", { children: "Same crew, every time" }),
          /* @__PURE__ */ jsx("p", { children: "Consistent, background checked cleaners who learn your building instead of a rotating cast of strangers with your key." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "card", children: [
          /* @__PURE__ */ jsx("h3", { children: "The owner answers the phone" }),
          /* @__PURE__ */ jsx("p", { children: "You get a direct line to the owner, not a ticket number. Issues get fixed on the next visit, not the next quarter." })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "band", children: /* @__PURE__ */ jsxs("div", { className: "wrap", children: [
      /* @__PURE__ */ jsx("p", { className: "eyebrow", children: "How it works" }),
      /* @__PURE__ */ jsx("h2", { children: "From first call to first clean in under two weeks" }),
      /* @__PURE__ */ jsx(Steps, {})
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "band", children: /* @__PURE__ */ jsxs("div", { className: "wrap", children: [
      /* @__PURE__ */ jsx("p", { className: "eyebrow", children: "Questions" }),
      /* @__PURE__ */ jsx("h2", { children: "Commercial cleaning questions, answered" }),
      /* @__PURE__ */ jsx("div", { className: "faq", children: FAQS.map((f) => /* @__PURE__ */ jsxs("details", { children: [
        /* @__PURE__ */ jsx("summary", { children: f.q }),
        /* @__PURE__ */ jsx("p", { children: f.a })
      ] }, f.q)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "band alt", children: /* @__PURE__ */ jsxs("div", { className: "wrap", children: [
      /* @__PURE__ */ jsx("p", { className: "eyebrow", children: "Where we work" }),
      /* @__PURE__ */ jsx("h2", { children: "Commercial cleaning across Camden County and South Jersey" }),
      /* @__PURE__ */ jsx("div", { className: "towns", children: TOWNS.map((t) => /* @__PURE__ */ jsx("span", { children: t }, t)) }),
      /* @__PURE__ */ jsx("p", { style: { marginTop: 20 }, children: /* @__PURE__ */ jsx(Link, { to: "/service-areas", children: "See all service areas →" }) })
    ] }) }),
    /* @__PURE__ */ jsx(CtaBand, {})
  ] });
}
function Services() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { className: "band", children: /* @__PURE__ */ jsxs("div", { className: "wrap", children: [
      /* @__PURE__ */ jsx("p", { className: "eyebrow", children: "Services" }),
      /* @__PURE__ */ jsx("h1", { children: "Commercial janitorial services in South Jersey" }),
      /* @__PURE__ */ jsx("p", { className: "lead", style: { marginTop: 14 }, children: "One provider for everything recurring: cleaning, floors, restrooms, and disinfection, delivered on a schedule that fits how your facility runs." }),
      /* @__PURE__ */ jsx(LastUpdated, {}),
      /* @__PURE__ */ jsx("div", { className: "grid-3", children: SERVICES.map((s) => /* @__PURE__ */ jsxs("div", { className: "card", children: [
        /* @__PURE__ */ jsx("h3", { children: s.name }),
        /* @__PURE__ */ jsx("p", { children: s.desc })
      ] }, s.name)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "band alt", children: /* @__PURE__ */ jsxs("div", { className: "wrap", children: [
      /* @__PURE__ */ jsx("p", { className: "eyebrow", children: "The Reliant standard" }),
      /* @__PURE__ */ jsx("h2", { children: "What comes with every account" }),
      /* @__PURE__ */ jsxs("div", { className: "grid-2", children: [
        /* @__PURE__ */ jsx("ul", { className: "ticks", style: { marginTop: 26 }, children: CHECKLIST.map((c) => /* @__PURE__ */ jsx("li", { children: c }, c)) }),
        /* @__PURE__ */ jsxs("div", { className: "prose", style: { marginTop: 26 }, children: [
          /* @__PURE__ */ jsx("p", { children: "Janitorial contracts fail for one reason: nobody is checking the work. So we built the company around verification. Every visit runs on a written checklist, supervisors inspect accounts with photo reports, and your feedback goes straight to the owner." }),
          /* @__PURE__ */ jsx("p", { children: "Scopes are customized per building during a free walkthrough, and pricing is delivered in writing within 24 hours." }),
          /* @__PURE__ */ jsx(Link, { className: "btn btn-amber", to: "/contact", children: "Schedule a Walkthrough" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(CtaBand, {})
  ] });
}
function IndustryPage() {
  const { slug } = useParams();
  const ind = INDUSTRIES.find((i) => i.slug === slug) || INDUSTRIES[0];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { className: "band", children: /* @__PURE__ */ jsxs("div", { className: "wrap", children: [
      /* @__PURE__ */ jsx("p", { className: "eyebrow", children: ind.short }),
      /* @__PURE__ */ jsx("h1", { children: ind.h1 }),
      /* @__PURE__ */ jsx("p", { className: "lead", style: { marginTop: 14 }, children: ind.intro }),
      /* @__PURE__ */ jsx(LastUpdated, {}),
      /* @__PURE__ */ jsxs("div", { className: "grid-2", style: { alignItems: "start" }, children: [
        /* @__PURE__ */ jsxs("div", { className: "prose", style: { marginTop: 10 }, children: [
          ind.body.map((p, idx) => /* @__PURE__ */ jsx("p", { children: p }, idx)),
          /* @__PURE__ */ jsx(Link, { className: "btn btn-amber", to: "/contact", children: "Get a Free Quote" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "check-card", style: { boxShadow: "none", border: "1px solid var(--line)" }, children: [
          /* @__PURE__ */ jsx("h3", { children: "Typical scope of work" }),
          /* @__PURE__ */ jsx("p", { className: "sub", children: "Finalized during your free walkthrough" }),
          /* @__PURE__ */ jsx("ul", { className: "ticks", children: ind.scope.map((s) => /* @__PURE__ */ jsx("li", { children: s }, s)) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "band alt", children: /* @__PURE__ */ jsxs("div", { className: "wrap", children: [
      /* @__PURE__ */ jsx("p", { className: "eyebrow", children: "Other facilities we clean" }),
      /* @__PURE__ */ jsx("h2", { children: "More industries" }),
      /* @__PURE__ */ jsx("div", { className: "grid-3", children: INDUSTRIES.filter((i) => i.slug !== ind.slug).slice(0, 3).map((i) => /* @__PURE__ */ jsxs(Link, { to: `/industries/${i.slug}`, className: "card", children: [
        /* @__PURE__ */ jsx("h3", { children: i.short }),
        /* @__PURE__ */ jsxs("p", { children: [
          i.intro.split(".")[0],
          "."
        ] }),
        /* @__PURE__ */ jsx("div", { className: "go", children: "Learn more →" })
      ] }, i.slug)) })
    ] }) }),
    /* @__PURE__ */ jsx(CtaBand, {})
  ] });
}
function ServiceAreas() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { className: "band", children: /* @__PURE__ */ jsxs("div", { className: "wrap", children: [
      /* @__PURE__ */ jsx("p", { className: "eyebrow", children: "Service Areas" }),
      /* @__PURE__ */ jsx("h1", { children: "Commercial cleaning in Cherry Hill, Voorhees, and across Camden County, NJ" }),
      /* @__PURE__ */ jsxs("div", { className: "prose", style: { marginTop: 18 }, children: [
        /* @__PURE__ */ jsx("p", { children: "Reliant Janitorial is based in Camden County and serves commercial facilities throughout South Jersey. Staying local is deliberate. Tight routes mean our crews are never more than a short drive from your building, supervisors can actually inspect accounts, and a missed detail gets corrected the same week, not shipped to a regional office." }),
        /* @__PURE__ */ jsx("p", { children: "We provide recurring janitorial service, floor care, restroom sanitation, and disinfection for offices, medical and dental practices, daycares, gyms, banks, and churches in the following communities:" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid-3", children: TOWN_PAGES.map((t) => /* @__PURE__ */ jsxs(Link, { to: `/service-areas/${t.slug}`, className: "card", children: [
        /* @__PURE__ */ jsxs("h3", { children: [
          t.town,
          ", NJ"
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          t.intro.split(".")[0],
          "."
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "go", children: [
          "Cleaning in ",
          t.town,
          " →"
        ] })
      ] }, t.slug)) }),
      /* @__PURE__ */ jsx("h2", { style: { marginTop: 44 }, children: "All communities we serve" }),
      /* @__PURE__ */ jsx("div", { className: "towns", children: TOWNS.map((t) => /* @__PURE__ */ jsxs("span", { children: [
        t,
        ", NJ"
      ] }, t)) }),
      /* @__PURE__ */ jsxs("div", { className: "prose", style: { marginTop: 26 }, children: [
        /* @__PURE__ */ jsx("p", { children: "Just outside these towns? Call us. If your facility is within a reasonable drive of Camden County, we can usually make the route work." }),
        /* @__PURE__ */ jsx(Link, { className: "btn btn-amber", to: "/contact", children: "Check Your Location" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(CtaBand, {})
  ] });
}
function About() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { className: "band", children: /* @__PURE__ */ jsxs("div", { className: "wrap", children: [
      /* @__PURE__ */ jsx("p", { className: "eyebrow", children: "About" }),
      /* @__PURE__ */ jsx("h1", { children: "A local cleaning company built on verification, not promises" }),
      /* @__PURE__ */ jsxs("div", { className: "prose", style: { marginTop: 18 }, children: [
        /* @__PURE__ */ jsx("p", { children: "Reliant Janitorial was started in Camden County after hearing the same story from facility managers over and over: the cleaning company was great for the first month, then the quality slid, the crew kept changing, visits got skipped, and nobody returned calls." }),
        /* @__PURE__ */ jsx("p", { children: "So we built the company around the fix. Every account runs on a written scope of work. Every visit is completed against a checklist and logged. Supervisors inspect buildings with photo reports, and every client has the owner's direct number. It is not complicated. It is just the discipline most janitorial companies lose once the contract is signed." }),
        /* @__PURE__ */ jsx("p", { children: "We are insured and bonded, our cleaners are background checked and consistently assigned, and we intentionally serve a tight radius around Camden County so we can actually stand behind the work." }),
        /* @__PURE__ */ jsx("h2", { children: "Who we serve" }),
        /* @__PURE__ */ jsx("p", { children: "We focus on facilities where cleanliness is tied directly to the business: dental and medical offices, daycares and childcare centers, gyms and fitness studios, banks and credit unions, law and professional offices, and churches. If that sounds like your building, we would like to walk it." }),
        /* @__PURE__ */ jsx(Link, { className: "btn btn-amber", to: "/contact", children: "Schedule a Free Walkthrough" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(CtaBand, {})
  ] });
}
function Contact() {
  return /* @__PURE__ */ jsx("section", { className: "band", children: /* @__PURE__ */ jsxs("div", { className: "wrap", children: [
    /* @__PURE__ */ jsx("p", { className: "eyebrow", children: "Get a Quote" }),
    /* @__PURE__ */ jsx("h1", { children: "Request your free walkthrough and quote" }),
    /* @__PURE__ */ jsxs("div", { className: "grid-2", style: { alignItems: "start" }, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "prose", style: { marginTop: 14 }, children: [
          /* @__PURE__ */ jsx("p", { children: "Tell us about your facility and we will call within one business day to schedule a walkthrough. Your written, itemized quote is delivered within 24 hours of the visit." }),
          /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsxs(Fragment, { children: [
            "Prefer email? Reach us directly at",
            " ",
            /* @__PURE__ */ jsx("a", { href: `mailto:${BIZ.email}`, children: BIZ.email }),
            "."
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "check-card", style: { boxShadow: "none", border: "1px solid var(--line)", marginTop: 22 }, children: [
          /* @__PURE__ */ jsx("h3", { children: "What happens next" }),
          /* @__PURE__ */ jsxs("ul", { className: "ticks", children: [
            /* @__PURE__ */ jsx("li", { children: "We call to schedule your walkthrough" }),
            /* @__PURE__ */ jsx("li", { children: "We tour the facility and build your scope" }),
            /* @__PURE__ */ jsx("li", { children: "You get a written quote within 24 hours" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(QuoteForm, {})
    ] })
  ] }) });
}
function TownPage() {
  const { slug } = useParams();
  const t = TOWN_PAGES.find((x) => x.slug === slug) || TOWN_PAGES[0];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { className: "band", children: /* @__PURE__ */ jsxs("div", { className: "wrap", children: [
      /* @__PURE__ */ jsx("p", { className: "eyebrow", children: "Service Area" }),
      /* @__PURE__ */ jsx("h1", { children: t.h1 }),
      /* @__PURE__ */ jsx("p", { className: "lead", style: { marginTop: 14 }, children: t.intro }),
      /* @__PURE__ */ jsx(LastUpdated, {}),
      /* @__PURE__ */ jsxs("div", { className: "grid-2", style: { alignItems: "start" }, children: [
        /* @__PURE__ */ jsxs("div", { className: "prose", style: { marginTop: 10 }, children: [
          t.body.map((par, idx) => /* @__PURE__ */ jsx("p", { children: par }, idx)),
          /* @__PURE__ */ jsxs(Link, { className: "btn btn-amber", to: "/contact", children: [
            "Get a Free Quote in ",
            t.town
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "check-card", style: { boxShadow: "none", border: "1px solid var(--line)" }, children: [
          /* @__PURE__ */ jsxs("h3", { children: [
            "Facilities we clean in ",
            t.town
          ] }),
          /* @__PURE__ */ jsx("ul", { className: "ticks", children: INDUSTRIES.map((i) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: `/industries/${i.slug}`, children: i.short }) }, i.slug)) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "band alt", children: /* @__PURE__ */ jsxs("div", { className: "wrap", children: [
      /* @__PURE__ */ jsx("p", { className: "eyebrow", children: "Nearby" }),
      /* @__PURE__ */ jsx("h2", { children: "Other towns we serve" }),
      /* @__PURE__ */ jsx("div", { className: "towns", children: TOWN_PAGES.filter((x) => x.slug !== t.slug).map((x) => /* @__PURE__ */ jsx(Link, { to: `/service-areas/${x.slug}`, style: { textDecoration: "none" }, children: /* @__PURE__ */ jsxs("span", { children: [
        x.town,
        ", NJ"
      ] }) }, x.slug)) })
    ] }) }),
    /* @__PURE__ */ jsx(CtaBand, {})
  ] });
}
function NotFound() {
  return /* @__PURE__ */ jsx("section", { className: "band", children: /* @__PURE__ */ jsxs("div", { className: "wrap", children: [
    /* @__PURE__ */ jsx("h1", { children: "Page not found" }),
    /* @__PURE__ */ jsxs("p", { className: "lead", style: { marginTop: 14 }, children: [
      "That page does not exist. Head back to the ",
      /* @__PURE__ */ jsx(Link, { to: "/", children: "homepage" }),
      " or",
      " ",
      /* @__PURE__ */ jsx(Link, { to: "/contact", children: "request a quote" }),
      "."
    ] })
  ] }) });
}
function MetaSync() {
  const { pathname } = useLocation();
  useEffect(() => {
    const meta = routeMeta(pathname);
    document.title = meta.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", meta.metaDesc);
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
function App() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(MetaSync, {}),
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsxs(Routes, { children: [
      /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Home, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/services", element: /* @__PURE__ */ jsx(Services, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/industries/:slug", element: /* @__PURE__ */ jsx(IndustryPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/service-areas", element: /* @__PURE__ */ jsx(ServiceAreas, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/service-areas/:slug", element: /* @__PURE__ */ jsx(TownPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/about", element: /* @__PURE__ */ jsx(About, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/contact", element: /* @__PURE__ */ jsx(Contact, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(NotFound, {}) })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
function render(url) {
  return renderToString(
    /* @__PURE__ */ jsx(StaticRouter, { location: url, children: /* @__PURE__ */ jsx(App, {}) })
  );
}
export {
  render
};
