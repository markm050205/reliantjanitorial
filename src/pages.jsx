import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { BIZ, SERVICES, CHECKLIST, INDUSTRIES, TOWNS, FAQS, TOWN_PAGES, LAST_UPDATED } from './data.js';
import { CtaBand, QuoteForm } from './components.jsx';

function IndustryGrid() {
  return (
    <div className="grid-3">
      {INDUSTRIES.map((i) => (
        <Link key={i.slug} to={`/industries/${i.slug}`} className="card">
          <h3>{i.short}</h3>
          <p>{i.intro.split('.')[0]}.</p>
          <div className="go">See how we clean it →</div>
        </Link>
      ))}
    </div>
  );
}

function LastUpdated() {
  return <p className="last-updated">Last updated: {LAST_UPDATED}</p>;
}

function Steps() {
  return (
    <div className="steps">
      <div className="step">
        <h3>Walkthrough</h3>
        <p>We tour your facility, note problem areas, and build a scope of work around how the building is actually used.</p>
      </div>
      <div className="step">
        <h3>Written quote in 24 hours</h3>
        <p>A clear, itemized price for a clear, itemized scope. No vague line items and no surprise add ons later.</p>
      </div>
      <div className="step">
        <h3>First clean and check in</h3>
        <p>Your crew starts, a supervisor inspects the early visits, and the owner personally follows up in week one.</p>
      </div>
    </div>
  );
}

export function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div>
            <p className="eyebrow" style={{ color: 'var(--amber)' }}>Commercial Cleaning · Camden County, NJ</p>
            <h1>The cleaning company that actually shows up.</h1>
            <p className="lead">
              Reliant Janitorial keeps offices, medical practices, daycares, gyms,
              banks, and churches across South Jersey clean on a checklist, on a
              schedule, every single visit.
            </p>
            <div className="hero-ctas">
              <Link className="btn btn-amber" to="/contact">Get a Free Quote</Link>
              {BIZ.phone && <a className="btn btn-ghost" href={BIZ.phoneHref}>Call {BIZ.phone}</a>}
            </div>
            <div className="hero-proof">
              <span>Insured &amp; bonded</span>
              <span>Locally owned</span>
              <span>24 hour written quotes</span>
            </div>
          </div>
          <div className="check-card">
            <h3>Every visit, verified</h3>
            <p className="sub">The standard your current company skips</p>
            <ul className="ticks">
              {CHECKLIST.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <p className="eyebrow">Industries</p>
          <h2>Built for facilities where clean is non negotiable</h2>
          <p className="lead" style={{ marginTop: 12 }}>
            We specialize in buildings where cleaning failures cost you patients,
            parents, members, or clients, not just appearances.
          </p>
          <IndustryGrid />
        </div>
      </section>

      <section className="band alt">
        <div className="wrap">
          <p className="eyebrow">Why companies switch to Reliant</p>
          <h2>Most of our clients had a cleaning company. It stopped showing up.</h2>
          <div className="grid-3">
            <div className="card">
              <h3>No shows end here</h3>
              <p>Every visit is logged against a written checklist. If a visit ever gets missed, you know before we do the make up clean, not after you find the trash still full.</p>
            </div>
            <div className="card">
              <h3>Same crew, every time</h3>
              <p>Consistent, background checked cleaners who learn your building instead of a rotating cast of strangers with your key.</p>
            </div>
            <div className="card">
              <h3>The owner answers the phone</h3>
              <p>You get a direct line to the owner, not a ticket number. Issues get fixed on the next visit, not the next quarter.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <p className="eyebrow">How it works</p>
          <h2>From first call to first clean in under two weeks</h2>
          <Steps />
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <p className="eyebrow">Questions</p>
          <h2>Commercial cleaning questions, answered</h2>
          <div className="faq">
            {FAQS.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="band alt">
        <div className="wrap">
          <p className="eyebrow">Where we work</p>
          <h2>Commercial cleaning across Camden County and South Jersey</h2>
          <div className="towns">
            {TOWNS.map((t) => <span key={t}>{t}</span>)}
          </div>
          <p style={{ marginTop: 20 }}>
            <Link to="/service-areas">See all service areas →</Link>
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

export function Services() {
  return (
    <>
      <section className="band">
        <div className="wrap">
          <p className="eyebrow">Services</p>
          <h1>Commercial janitorial services in South Jersey</h1>
          <p className="lead" style={{ marginTop: 14 }}>
            One provider for everything recurring: cleaning, floors, restrooms,
            and disinfection, delivered on a schedule that fits how your
            facility runs.
          </p>
          <LastUpdated />
          <div className="grid-3">
            {SERVICES.map((s) => (
              <div className="card" key={s.name}>
                <h3>{s.name}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="band alt">
        <div className="wrap">
          <p className="eyebrow">The Reliant standard</p>
          <h2>What comes with every account</h2>
          <div className="grid-2">
            <ul className="ticks" style={{ marginTop: 26 }}>
              {CHECKLIST.map((c) => <li key={c}>{c}</li>)}
            </ul>
            <div className="prose" style={{ marginTop: 26 }}>
              <p>
                Janitorial contracts fail for one reason: nobody is checking the
                work. So we built the company around verification. Every visit
                runs on a written checklist, supervisors inspect accounts with
                photo reports, and your feedback goes straight to the owner.
              </p>
              <p>
                Scopes are customized per building during a free walkthrough,
                and pricing is delivered in writing within 24 hours.
              </p>
              <Link className="btn btn-amber" to="/contact">Schedule a Walkthrough</Link>
            </div>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

export function IndustryPage() {
  const { slug } = useParams();
  const ind = INDUSTRIES.find((i) => i.slug === slug) || INDUSTRIES[0];
  return (
    <>
      <section className="band">
        <div className="wrap">
          <p className="eyebrow">{ind.short}</p>
          <h1>{ind.h1}</h1>
          <p className="lead" style={{ marginTop: 14 }}>{ind.intro}</p>
          <LastUpdated />
          <div className="grid-2" style={{ alignItems: 'start' }}>
            <div className="prose" style={{ marginTop: 10 }}>
              {ind.body.map((p, idx) => <p key={idx}>{p}</p>)}
              <Link className="btn btn-amber" to="/contact">Get a Free Quote</Link>
            </div>
            <div className="check-card" style={{ boxShadow: 'none', border: '1px solid var(--line)' }}>
              <h3>Typical scope of work</h3>
              <p className="sub">Finalized during your free walkthrough</p>
              <ul className="ticks">
                {ind.scope.map((s) => <li key={s}>{s}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="band alt">
        <div className="wrap">
          <p className="eyebrow">Other facilities we clean</p>
          <h2>More industries</h2>
          <div className="grid-3">
            {INDUSTRIES.filter((i) => i.slug !== ind.slug).slice(0, 3).map((i) => (
              <Link key={i.slug} to={`/industries/${i.slug}`} className="card">
                <h3>{i.short}</h3>
                <p>{i.intro.split('.')[0]}.</p>
                <div className="go">Learn more →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

export function ServiceAreas() {
  return (
    <>
      <section className="band">
        <div className="wrap">
          <p className="eyebrow">Service Areas</p>
          <h1>Commercial cleaning in Cherry Hill, Voorhees, and across Camden County, NJ</h1>
          <div className="prose" style={{ marginTop: 18 }}>
            <p>
              Reliant Janitorial is based in Camden County and serves commercial
              facilities throughout South Jersey. Staying local is deliberate.
              Tight routes mean our crews are never more than a short drive from
              your building, supervisors can actually inspect accounts, and a
              missed detail gets corrected the same week, not shipped to a
              regional office.
            </p>
            <p>
              We provide recurring janitorial service, floor care, restroom
              sanitation, and disinfection for offices, medical and dental
              practices, daycares, gyms, banks, and churches in the following
              communities:
            </p>
          </div>
          <div className="grid-3">
            {TOWN_PAGES.map((t) => (
              <Link key={t.slug} to={`/service-areas/${t.slug}`} className="card">
                <h3>{t.town}, NJ</h3>
                <p>{t.intro.split('.')[0]}.</p>
                <div className="go">Cleaning in {t.town} →</div>
              </Link>
            ))}
          </div>
          <h2 style={{ marginTop: 44 }}>All communities we serve</h2>
          <div className="towns">
            {TOWNS.map((t) => <span key={t}>{t}, NJ</span>)}
          </div>
          <div className="prose" style={{ marginTop: 26 }}>
            <p>
              Just outside these towns? Call us. If your facility is within a
              reasonable drive of Camden County, we can usually make the route
              work.
            </p>
            <Link className="btn btn-amber" to="/contact">Check Your Location</Link>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

export function About() {
  return (
    <>
      <section className="band">
        <div className="wrap">
          <p className="eyebrow">About</p>
          <h1>A local cleaning company built on verification, not promises</h1>
          <div className="prose" style={{ marginTop: 18 }}>
            <p>
              Reliant Janitorial was started in Camden County after hearing the
              same story from facility managers over and over: the cleaning
              company was great for the first month, then the quality slid, the
              crew kept changing, visits got skipped, and nobody returned calls.
            </p>
            <p>
              So we built the company around the fix. Every account runs on a
              written scope of work. Every visit is completed against a
              checklist and logged. Supervisors inspect buildings with photo
              reports, and every client has the owner's direct number. It is not
              complicated. It is just the discipline most janitorial companies
              lose once the contract is signed.
            </p>
            <p>
              We are insured and bonded, our cleaners are background checked and
              consistently assigned, and we intentionally serve a tight radius
              around Camden County so we can actually stand behind the work.
            </p>
            <h2>Who we serve</h2>
            <p>
              We focus on facilities where cleanliness is tied directly to the
              business: dental and medical offices, daycares and childcare
              centers, gyms and fitness studios, banks and credit unions, law
              and professional offices, and churches. If that sounds like your
              building, we would like to walk it.
            </p>
            <Link className="btn btn-amber" to="/contact">Schedule a Free Walkthrough</Link>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

export function Contact() {
  return (
    <section className="band">
      <div className="wrap">
        <p className="eyebrow">Get a Quote</p>
        <h1>Request your free walkthrough and quote</h1>
        <div className="grid-2" style={{ alignItems: 'start' }}>
          <div>
            <div className="prose" style={{ marginTop: 14 }}>
              <p>
                Tell us about your facility and we will call within one business
                day to schedule a walkthrough. Your written, itemized quote is
                delivered within 24 hours of the visit.
              </p>
              <p>
                {BIZ.phone ? (
                  <>Prefer to talk now? Call <a href={BIZ.phoneHref}>{BIZ.phone}</a>{' '}
                  or email <a href={`mailto:${BIZ.email}`}>{BIZ.email}</a>.</>
                ) : (
                  <>Prefer email? Reach us directly at{' '}
                  <a href={`mailto:${BIZ.email}`}>{BIZ.email}</a>.</>
                )}
              </p>
            </div>
            <div className="check-card" style={{ boxShadow: 'none', border: '1px solid var(--line)', marginTop: 22 }}>
              <h3>What happens next</h3>
              <ul className="ticks">
                <li>We call to schedule your walkthrough</li>
                <li>We tour the facility and build your scope</li>
                <li>You get a written quote within 24 hours</li>
              </ul>
            </div>
          </div>
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}

export function TownPage() {
  const { slug } = useParams();
  const t = TOWN_PAGES.find((x) => x.slug === slug) || TOWN_PAGES[0];
  return (
    <>
      <section className="band">
        <div className="wrap">
          <p className="eyebrow">Service Area</p>
          <h1>{t.h1}</h1>
          <p className="lead" style={{ marginTop: 14 }}>{t.intro}</p>
          <LastUpdated />
          <div className="grid-2" style={{ alignItems: 'start' }}>
            <div className="prose" style={{ marginTop: 10 }}>
              {t.body.map((par, idx) => <p key={idx}>{par}</p>)}
              <Link className="btn btn-amber" to="/contact">Get a Free Quote in {t.town}</Link>
            </div>
            <div className="check-card" style={{ boxShadow: 'none', border: '1px solid var(--line)' }}>
              <h3>Facilities we clean in {t.town}</h3>
              <ul className="ticks">
                {INDUSTRIES.map((i) => (
                  <li key={i.slug}>
                    <Link to={`/industries/${i.slug}`}>{i.short}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="band alt">
        <div className="wrap">
          <p className="eyebrow">Nearby</p>
          <h2>Other towns we serve</h2>
          <div className="towns">
            {TOWN_PAGES.filter((x) => x.slug !== t.slug).map((x) => (
              <Link key={x.slug} to={`/service-areas/${x.slug}`} style={{ textDecoration: 'none' }}>
                <span>{x.town}, NJ</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

export function NotFound() {
  return (
    <section className="band">
      <div className="wrap">
        <h1>Page not found</h1>
        <p className="lead" style={{ marginTop: 14 }}>
          That page does not exist. Head back to the <Link to="/">homepage</Link> or{' '}
          <Link to="/contact">request a quote</Link>.
        </p>
      </div>
    </section>
  );
}
