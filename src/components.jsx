import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BIZ, INDUSTRIES, TOWNS } from './data.js';

export function Header() {
  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <span>Serving {BIZ.areaLabel} · Insured & Bonded</span>
          {BIZ.phone ? (
            <a href={BIZ.phoneHref}>Call {BIZ.phone}</a>
          ) : (
            <a href={`mailto:${BIZ.email}`}>{BIZ.email}</a>
          )}
        </div>
      </div>
      <header className="site">
        <div className="wrap">
          <Link to="/" className="logo" aria-label="Reliant Janitorial home">
            <span className="tick" aria-hidden="true">✓</span>
            Reliant Janitorial
          </Link>
          <nav className="main" aria-label="Main">
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/industries/dental-medical-office-cleaning">Industries</NavLink>
            <NavLink to="/service-areas">Service Areas</NavLink>
            <NavLink to="/resources">Resources</NavLink>
            <NavLink to="/about">About</NavLink>
            {BIZ.phone && <a className="call-inline" href={BIZ.phoneHref}>{BIZ.phone}</a>}
            <Link to="/contact" className="btn btn-amber">Get a Free Quote</Link>
          </nav>
        </div>
      </header>
    </>
  );
}

export function CtaBand() {
  return (
    <section className="cta-band">
      <div className="wrap">
        <div>
          <h2>Get a written quote within 24 hours of your walkthrough.</h2>
          <p>No pressure, no obligation. Just a clear scope and a clear price.</p>
        </div>
        <div className="hero-ctas">
          <a className="btn btn-amber" href="/contact">Request a Walkthrough</a>
          {BIZ.phone && <a className="btn btn-ghost" href={BIZ.phoneHref}>Call {BIZ.phone}</a>}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="site">
      <div className="wrap">
        <div className="cols">
          <div>
            <h3>Reliant Janitorial</h3>
            <p>
              Commercial cleaning and janitorial services for {BIZ.areaLabel}.
              Checklist driven service, supervisor inspections, and a direct line
              to the owner.
            </p>
            <p style={{ marginTop: 12 }}>
              {BIZ.phone && <a href={BIZ.phoneHref}>{BIZ.phone}</a>}
              <a href={`mailto:${BIZ.email}`}>{BIZ.email}</a>
            </p>
          </div>
          <div>
            <h3>Industries</h3>
            {INDUSTRIES.map((i) => (
              <Link key={i.slug} to={`/industries/${i.slug}`}>{i.short}</Link>
            ))}
          </div>
          <div>
            <h3>Company</h3>
            <Link to="/services">Services</Link>
            <Link to="/service-areas">Service Areas</Link>
            <Link to="/resources">Resources</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Get a Quote</Link>
          </div>
          <div>
            <h3>Top Service Areas</h3>
            {TOWNS.slice(0, 6).map((t) => (
              <span key={t} style={{ display: 'block', padding: '3px 0' }}>{t}, NJ</span>
            ))}
          </div>
        </div>
        <div className="legal">
          <span>© {new Date().getFullYear()} Reliant Janitorial. All rights reserved.</span>
          <span>Commercial cleaning in Camden County, New Jersey</span>
        </div>
      </div>
    </footer>
  );
}

const SQFT = ['Under 5,000 sq ft', '5,000 to 15,000 sq ft', '15,000 to 30,000 sq ft', 'Over 30,000 sq ft'];
const FREQ = ['Nightly (5x or more per week)', '2 to 3x per week', 'Weekly', 'One time or project'];

export function QuoteForm() {
  const [status, setStatus] = useState(null); // null | 'sending' | 'ok' | 'err'

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
      source_page: typeof window !== 'undefined' ? window.location.pathname : '',
    };
    setStatus('sending');
    try {
      const { getSupabase } = await import('./supabaseClient.js');
      const supabase = getSupabase();
      if (!supabase) throw new Error('not configured');
      const { error } = await supabase.from('quote_requests').insert(payload);
      if (error) throw error;
      setStatus('ok');
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'generate_lead', { form: 'quote_request' });
      }
      form.reset();
    } catch (err) {
      setStatus('err');
    }
  }

  return (
    <form className="quote" onSubmit={onSubmit}>
      <div>
        <label htmlFor="q-name">Your name</label>
        <input id="q-name" name="name" required autoComplete="name" />
      </div>
      <div>
        <label htmlFor="q-company">Company / facility</label>
        <input id="q-company" name="company" required autoComplete="organization" />
      </div>
      <div>
        <label htmlFor="q-phone">Phone</label>
        <input id="q-phone" name="phone" type="tel" required autoComplete="tel" />
      </div>
      <div>
        <label htmlFor="q-email">Email</label>
        <input id="q-email" name="email" type="email" required autoComplete="email" />
      </div>
      <div>
        <label htmlFor="q-facility">Facility type</label>
        <select id="q-facility" name="facility" defaultValue="">
          <option value="" disabled>Select one</option>
          {INDUSTRIES.map((i) => (
            <option key={i.slug} value={i.short}>{i.short}</option>
          ))}
          <option value="Other commercial">Other commercial</option>
        </select>
      </div>
      <div>
        <label htmlFor="q-town">Town</label>
        <input id="q-town" name="town" placeholder="Cherry Hill, Voorhees..." />
      </div>
      <div>
        <label htmlFor="q-sqft">Approximate size</label>
        <select id="q-sqft" name="sqft" defaultValue={SQFT[1]}>
          {SQFT.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="q-frequency">Cleaning frequency</label>
        <select id="q-frequency" name="frequency" defaultValue={FREQ[0]}>
          {FREQ.map((f) => <option key={f} value={f}>{f}</option>)}
        </select>
      </div>
      <div className="full">
        <label htmlFor="q-message">Anything we should know?</label>
        <textarea id="q-message" name="message" placeholder="Current cleaning situation, pain points, timing..." />
      </div>
      {status === 'ok' && (
        <p className="form-status ok" role="status">
          Request received. We will call you within one business day to schedule your walkthrough.
        </p>
      )}
      {status === 'err' && (
        <p className="form-status err" role="alert">
          Something went wrong sending the form. {BIZ.phone ? `Call us at ${BIZ.phone}` : `Email us at ${BIZ.email}`} and we will take care of you.
        </p>
      )}
      <div className="full">
        <button className="btn btn-spruce" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending...' : 'Request My Free Quote'}
        </button>
        <p className="form-note" style={{ marginTop: 10 }}>
          Free walkthrough. Written quote within 24 hours. No obligation.
        </p>
      </div>
    </form>
  );
}
