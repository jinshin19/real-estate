'use client';

// NextJs Imports
import {
  BedRegular,
  MapRegular,
  StarRegular,
  GridRegular,
  HomeRegular,
  MoneyRegular,
  HeartRegular,
  GlobeRegular,
  FilterRegular,
  PersonRegular,
  LocationRegular,
  BuildingRegular,
  BookmarkRegular,
  ChevronDownRegular,
  ArrowUpRightRegular,
  CheckmarkCircleRegular,
} from '@fluentui/react-icons';
// Component
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
// Library
import {
  // Utils
  CnU,
} from '@clients/library';

// ─── Data ──────────────────────────────────────────────────────────────────

const heroImages = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=80',
];

const propertyCards = [
  {
    title: 'Villa Pondok Indah',
    image:
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=700&q=80',
    price: '$840 – $950',
    active: false,
  },
  {
    title: 'Villa Pondok Tanjung',
    image:
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=700&q=80',
    price: '$840 – $950',
    active: true,
  },
  {
    title: 'Bali Patriot Residence',
    image:
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=700&q=80',
    price: '$840 – $990',
    active: false,
  },
];

const featurePills = ['Cleanliness', 'Honest', 'Trusted', 'Luxury'];
const navTypeFilters = ['All', 'House', 'Residential', 'Apartment'];
const rentalPeriods = [
  'Long term rent',
  'Short term rent',
  'WPA',
  'Nota 19',
  'Expatriate',
  'Samsiyang',
];

// ─── Layout helpers ─────────────────────────────────────────────────────────

const wrap =
  'mx-auto w-[min(1340px,calc(100%-48px))] max-[720px]:w-[min(calc(100%-24px),1340px)]';

// ─── Sub-components ──────────────────────────────────────────────────────────

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={CnU(
        'flex items-center gap-1 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-150',
        active
          ? 'bg-foreground text-background'
          : 'text-foreground/70 hover:bg-surface-hover hover:text-foreground',
      )}
    >
      {children}
    </a>
  );
}

function SectionTitle({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      className={CnU(
        'text-[clamp(32px,3.5vw,52px)] font-semibold leading-[1.05] tracking-[-0.06em]',
        className,
      )}
    >
      {children}
    </h2>
  );
}

function PropertyCard({ card }: { card: (typeof propertyCards)[number] }) {
  return (
    <article
      className={CnU(
        'flex flex-col rounded-2xl p-3 transition-shadow duration-200',
        card.active
          ? 'bg-foreground text-background shadow-elevated'
          : 'bg-surface border border-border hover:shadow-float',
      )}
    >
      <div
        className="h-44 rounded-xl bg-cover bg-center"
        style={{ backgroundImage: `url(${card.image})` }}
      />
      <div className="mt-4 flex flex-1 flex-col gap-2 px-1">
        <h3 className="text-lg font-semibold leading-tight">{card.title}</h3>
        <p
          className={CnU(
            'text-[13px] leading-relaxed',
            card.active ? 'text-background/70' : 'text-muted',
          )}
        >
          A spacious home with three cozy bedrooms and a harmonious indoor
          outdoor flow.
        </p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-sm font-semibold">{card.price}</span>
          <Button
            variant={card.active ? 'secondary' : 'default'}
            size="pill-sm"
            className={CnU(
              card.active &&
                'bg-background/10 text-background border-background/20 hover:bg-background/20',
            )}
          >
            Book Now
            <ArrowUpRightRegular className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </article>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function Index() {
  return (
    <main className="min-h-screen bg-background pb-24">
      {/* ══════════ HERO SECTION ══════════ */}
      <section className={CnU(wrap, 'pt-8')}>
        {/* ── Header ── */}
        <header className="flex items-center justify-between gap-4">
          <a
            className="text-[26px] font-extrabold tracking-[0.12em]"
            href="#top"
            aria-label="Hooma home"
          >
            HOOMA
          </a>

          <nav
            className="flex items-center gap-1 rounded-full border border-border bg-surface p-1.5 shadow-card max-[1100px]:hidden"
            aria-label="Primary navigation"
          >
            <NavLink href="#top" active>
              Home
            </NavLink>
            <NavLink href="#properties">
              Properties
              <ChevronDownRegular className="h-3.5 w-3.5" />
            </NavLink>
            <NavLink href="#services">Services</NavLink>
            <NavLink href="#about">About Us</NavLink>
            <NavLink href="#blog">Blog</NavLink>
            <Button variant="ghost" size="icon-sm" aria-label="More menu">
              <GridRegular className="h-4 w-4" />
            </Button>
          </nav>

          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="icon-lg"
              aria-label="Select language"
            >
              <GlobeRegular className="h-5 w-5" />
            </Button>
            <Button variant="default" size="pill-lg">
              Sign In
              <ArrowUpRightRegular className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* ── Hero body ── */}
        <div className="mt-16 grid grid-cols-[0.87fr_1.13fr] items-start gap-14 max-[1100px]:grid-cols-1">
          {/* Left column */}
          <div>
            <h1 className="max-w-[560px] text-[clamp(44px,5vw,68px)] font-semibold leading-[0.98] tracking-[-0.07em]">
              Discover Fresh
              <span
                className="mx-2 inline-block h-[36px] w-[100px] rounded-full border-2 border-surface bg-cover bg-center align-middle shadow-card"
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=260&q=80)',
                }}
                aria-hidden="true"
              />
              Visions of Your Ideal
              <span className="mx-1.5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-foreground align-middle text-background">
                <ArrowUpRightRegular className="h-5 w-5" />
              </span>
              Home
            </h1>
            <p className="mt-8 max-w-[500px] text-lg leading-relaxed text-muted">
              Discover hand-picked properties, expert agents, and a seamless
              journey to your perfect place.
            </p>

            {/* Hero cards row */}
            <div className="mt-14 flex gap-6 max-[720px]:flex-col">
              <div
                className="h-52 w-52 shrink-0 rounded-2xl bg-cover bg-center max-[720px]:w-full"
                style={{ backgroundImage: `url(${heroImages[2]})` }}
              />
              <article className="relative w-72 shrink-0 rounded-2xl border border-border bg-surface p-5 shadow-card max-[720px]:w-full">
                <div className="flex items-center justify-between">
                  <Badge variant="default" size="lg">
                    Contact With Me
                  </Badge>
                  <Button variant="outline" size="icon-sm" aria-label="Message">
                    <PersonRegular className="h-4 w-4" />
                  </Button>
                </div>
                <a
                  className="mt-6 block text-sm text-muted underline underline-offset-2 hover:text-foreground transition-colors"
                  href="mailto:supportagent@hearthaven.com"
                >
                  supportagent@hearthaven.com
                </a>
                <div className="mt-10">
                  <strong className="block text-xl font-semibold">
                    Dianne Russell
                  </strong>
                  <small className="text-sm text-muted">Agent</small>
                </div>
                <a
                  href="https://linkedin.com"
                  aria-label="LinkedIn"
                  className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full bg-foreground text-background text-xs font-bold hover:bg-foreground/80 transition-colors"
                >
                  in
                </a>
              </article>
            </div>
          </div>

          {/* Right column – image gallery */}
          <div className="relative">
            {/* Floating rating badge */}
            <div className="absolute right-0 top-2 z-10 rounded-bl-2xl rounded-tl-none rounded-tr-xl bg-surface px-4 py-3 shadow-float">
              <div className="flex items-center gap-1">
                <span className="inline-block h-6 w-6 rounded-full border-2 border-surface bg-gradient-to-br from-amber-200 to-blue-400 -ml-1 first:ml-0" />
                <span className="inline-block h-6 w-6 rounded-full border-2 border-surface bg-gradient-to-br from-amber-200 to-blue-400 -ml-1" />
                <span className="inline-block h-6 w-6 rounded-full border-2 border-surface bg-gradient-to-br from-amber-200 to-blue-400 -ml-1" />
              </div>
              <p className="mt-1.5 flex items-center gap-1 text-sm font-bold text-green-600">
                <StarRegular className="h-4 w-4" />
                4.8
              </p>
              <p className="text-xs text-muted">(10k Reviews)</p>
            </div>

            {/* Main hero image */}
            <div
              className="h-[380px] rounded-2xl bg-cover bg-center"
              style={{ backgroundImage: `url(${heroImages[0]})` }}
            />

            {/* Thumbnail strip */}
            <div className="mt-4 grid grid-cols-3 gap-4 max-[720px]:grid-cols-1">
              {heroImages.slice(1).map((image, index) => (
                <div
                  className="h-28 rounded-2xl bg-cover bg-center overflow-hidden"
                  key={image}
                  style={{ backgroundImage: `url(${image})` }}
                  aria-label={`Property image ${index + 2}`}
                />
              ))}
            </div>

            {/* Pagination dots */}
            <div className="mt-3 flex items-center gap-1 overflow-hidden rounded-xl border border-border bg-surface text-center text-sm">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <span
                  key={item}
                  className={CnU(
                    'flex-1 py-3 text-xs font-medium transition-colors duration-150',
                    item === 2
                      ? 'rounded-lg bg-foreground text-background'
                      : 'text-muted hover:text-foreground',
                  )}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Search / Filter form ── */}
        <div className="mt-14 rounded-2xl border border-border bg-surface p-6 shadow-card">
          <div className="grid grid-cols-4 gap-5 max-[1100px]:grid-cols-2 max-[720px]:grid-cols-1">
            {(
              [
                ['Looking for', 'Enter property type', HomeRegular],
                ['Location', 'Search location', LocationRegular],
                ['Price range', 'Min – Max price', MoneyRegular],
                ['Bedrooms', 'Number of bedrooms', BedRegular],
              ] as const
            ).map(([label, placeholder, Icon]) => (
              <label key={label} className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                  {label}
                </span>
                <div className="relative">
                  <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                  <Input
                    className="pl-9 h-12 rounded-xl"
                    placeholder={placeholder}
                  />
                </div>
              </label>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3 max-[720px]:flex-col max-[720px]:items-stretch">
            {/* Buy/Sell/Rent toggle */}
            <div className="flex rounded-full bg-surface-hover p-1">
              {['Buy', 'Sell', 'Rent'].map((tab, i) => (
                <button
                  key={tab}
                  type="button"
                  className={CnU(
                    'rounded-full px-5 py-2 text-sm font-medium transition-colors duration-150',
                    i === 0
                      ? 'bg-foreground text-background'
                      : 'text-muted hover:text-foreground',
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Filter button */}
            <Button variant="outline" size="default">
              <FilterRegular className="h-4 w-4" />
              Filters
            </Button>

            {/* Property type pills */}
            <div className="flex flex-wrap gap-2">
              {navTypeFilters.map((filter, i) => (
                <button
                  key={filter}
                  type="button"
                  className={CnU(
                    'rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150',
                    i === 0
                      ? 'bg-foreground text-background'
                      : 'text-muted hover:text-foreground hover:bg-surface-hover',
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Search CTA */}
            <Button
              variant="default"
              size="lg"
              className="ml-auto max-[720px]:ml-0 rounded-xl"
            >
              Find Properties
              <ArrowUpRightRegular className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* ══════════ SERVICES SECTION ══════════ */}
      <section
        className={CnU(
          wrap,
          'mt-24 flex items-stretch gap-6 max-[1100px]:flex-col',
        )}
        id="services"
      >
        {/* Left – feature cards */}
        <div className="flex-[1.45] rounded-2xl bg-surface-hover p-8">
          <div className="flex flex-wrap justify-between gap-6">
            <SectionTitle className="max-w-[480px]">
              Discover and book Beautiful
              <span
                className="mx-2 inline-block h-[28px] w-[70px] rounded-full border-2 border-surface bg-cover bg-center align-middle shadow-card"
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=260&q=80)',
                }}
                aria-hidden="true"
              />
              City's
            </SectionTitle>

            {/* Feature pills */}
            <div className="grid grid-cols-2 gap-2 content-start">
              {featurePills.map((pill) => (
                <Badge key={pill} variant="secondary" size="lg">
                  <CheckmarkCircleRegular className="h-3.5 w-3.5 text-green-600" />
                  {pill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Translation notice */}
          <div className="mt-12 flex items-center gap-3 rounded-full bg-surface px-5 py-3.5 shadow-card">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-hover">
              <GlobeRegular className="h-4 w-4 text-muted" />
            </span>
            <span className="text-sm text-muted">
              Some info has been automatically translated
            </span>
            <Button variant="default" size="pill-sm" className="ml-auto">
              Show More
              <ArrowUpRightRegular className="h-3.5 w-3.5" />
            </Button>
          </div>

          {/* FAQ cards */}
          <div className="mt-6 grid grid-cols-3 gap-4 max-[720px]:grid-cols-1">
            {[
              {
                q: 'Can I sell my home?',
                a: 'Absolutely. We offer listing support, home valuation, and full agent assistance.',
              },
              {
                q: 'How do I rent a property?',
                a: 'Browse listings, contact an agent, and schedule a viewing in just a few clicks.',
              },
              {
                q: 'Is my data secure?',
                a: 'Yes. We use industry-standard encryption and never sell your personal data.',
              },
            ].map(({ q, a }) => (
              <article
                key={q}
                className="flex flex-col gap-3 rounded-xl bg-surface p-6 shadow-card"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted">
                  <CheckmarkCircleRegular className="h-4 w-4" />
                </span>
                <h3 className="text-base font-semibold leading-snug">{q}</h3>
                <p className="text-sm leading-relaxed text-muted">{a}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Right – feature property card */}
        <article
          className="relative flex min-h-[480px] flex-[0.85] items-end rounded-2xl bg-cover bg-center p-7"
          style={{ backgroundImage: `url(${heroImages[0]})` }}
        >
          <div className="w-full rounded-xl bg-surface p-6 shadow-float">
            <Button
              variant="outline"
              size="icon-sm"
              className="absolute right-5 top-5 bg-surface/80 backdrop-blur-sm"
              aria-label="Save property"
            >
              <BookmarkRegular className="h-4 w-4" />
            </Button>
            <h3 className="mb-3 max-w-[220px] text-2xl font-semibold leading-tight">
              Sunny Meadows Estate
            </h3>
            <div className="flex flex-wrap gap-4 text-sm text-muted">
              <span className="flex items-center gap-1.5">
                <BedRegular className="h-4 w-4" />4 Beds
              </span>
              <span className="flex items-center gap-1.5">
                <HomeRegular className="h-4 w-4" />2 Bathrooms
              </span>
              <span className="flex items-center gap-1.5">
                <BuildingRegular className="h-4 w-4" />
                250 m²
              </span>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <strong className="text-2xl font-bold">$10,000</strong>
              <Button variant="default" size="pill">
                Show more
                <ArrowUpRightRegular className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </article>
      </section>

      {/* ══════════ PROPERTIES SECTION ══════════ */}
      <section
        className={CnU(
          wrap,
          'mt-24 rounded-2xl bg-surface px-10 py-12 shadow-card max-[720px]:px-5 max-[720px]:py-7',
        )}
        id="properties"
      >
        <div className="mb-10 text-center">
          <SectionTitle>Discover Best Properties Tailored to You</SectionTitle>
          <p className="mt-3 text-muted">
            Explore our curated listings this month with options for every
            lifestyle.
          </p>
        </div>

        <div className="flex items-start gap-6 max-[1100px]:flex-col">
          {/* Sidebar filters */}
          <aside className="w-52 shrink-0 rounded-2xl bg-surface-hover p-5 max-[1100px]:w-full">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">256 Results</span>
              <button
                type="button"
                className="flex items-center gap-1 text-xs text-muted hover:text-foreground transition-colors"
              >
                <MapRegular className="h-3.5 w-3.5" />
                Map
              </button>
            </div>

            {/* Buy/Sell/Rent */}
            <div className="mt-4 grid grid-cols-3 gap-1">
              {['Buy', 'Sell', 'Rent'].map((tab, i) => (
                <button
                  key={tab}
                  type="button"
                  className={CnU(
                    'rounded-full py-1.5 text-xs font-medium transition-colors duration-150',
                    i === 2
                      ? 'bg-foreground text-background'
                      : 'bg-surface text-muted hover:text-foreground',
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Rental period */}
            <p className="mt-5 mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
              Rental Period
            </p>
            {rentalPeriods.map((item) => (
              <label
                key={item}
                className="my-2 flex items-center gap-2 text-sm"
              >
                <input
                  type="checkbox"
                  defaultChecked={item.length % 2 === 0}
                  className="h-3.5 w-3.5 accent-foreground"
                />
                {item}
              </label>
            ))}

            {/* Bedrooms */}
            <p className="mt-5 mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
              Bedrooms
            </p>
            <div className="flex flex-wrap gap-1.5">
              {[1, 2, 3, 4, '5+'].map((item) => (
                <button
                  key={item}
                  type="button"
                  className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-muted hover:bg-foreground hover:text-background transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* View */}
            <p className="mt-5 mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
              View
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['Any', 'Courtyard', 'Street'].map((item) => (
                <button
                  key={item}
                  type="button"
                  className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-muted hover:bg-foreground hover:text-background transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </aside>

          {/* Main listing */}
          <div className="flex-1 min-w-0">
            {/* Featured property */}
            <div className="flex items-stretch gap-6 max-[1100px]:flex-col">
              <div
                className="min-h-64 flex-[1.1] rounded-2xl bg-cover bg-center"
                style={{ backgroundImage: `url(${heroImages[1]})` }}
              />
              <div className="flex-[0.9] flex flex-col justify-center py-2">
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-bold">$512</span>
                  <span className="mb-1 text-sm text-muted">/month</span>
                </div>
                <h3 className="mt-4 text-xl font-semibold">
                  Villa Pondok Tanjung
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  We provide excellent service with the most secure system for
                  buying, selling, or renting property.
                </p>
                <div className="mt-5 flex gap-6 text-sm font-semibold">
                  <span>64 m²</span>
                  <span>3 beds</span>
                  <span>3 baths</span>
                </div>
                <Button
                  variant="default"
                  size="pill"
                  className="mt-6 self-start"
                >
                  Send a request
                  <ArrowUpRightRegular className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Property card grid */}
            <div className="mt-8 grid grid-cols-3 gap-4 max-[720px]:grid-cols-1">
              {propertyCards.map((card) => (
                <PropertyCard key={card.title} card={card} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ MAP CTA SECTION ══════════ */}
      <section
        className={CnU(
          wrap,
          'mt-20 flex items-center gap-10 rounded-2xl bg-surface-hover p-8 max-[1100px]:flex-col',
        )}
      >
        {/* Map illustration */}
        <div className="relative min-h-[220px] flex-1 overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_62%_43%,rgba(0,0,0,0.14)_0_18%,transparent_18.5%),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(135deg,#a9c5b5,#f0d0a9_45%,#7eb2bf)] bg-[length:auto,40px_40px,40px_40px,auto]">
          <span className="absolute right-10 top-9 rounded-full bg-foreground px-4 py-2 text-sm text-background shadow-float">
            $780,000
          </span>
          <i className="absolute inset-x-10 inset-y-8 rounded-full border-[3px] border-foreground/60" />
          <span className="absolute left-[48%] top-[47%] flex h-7 w-7 items-center justify-center rounded-full bg-surface text-xs font-bold shadow-card">
            1
          </span>
          <span className="absolute left-[64%] top-[64%] flex h-7 w-7 items-center justify-center rounded-full bg-surface text-xs font-bold shadow-card">
            2
          </span>
        </div>

        {/* Text + CTA */}
        <div className="flex-1">
          <SectionTitle className="max-w-[420px]">
            Discover Best Properties Tailored to You
          </SectionTitle>
          <p className="mt-4 mb-7 max-w-[360px] text-base leading-relaxed text-muted">
            Explore our listings this month, with options for every traveller
            and lifestyle.
          </p>
          <Button variant="default" size="pill-lg">
            Send request
            <ArrowUpRightRegular className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* ══════════ TESTIMONIALS SECTION ══════════ */}
      <section className={CnU(wrap, 'mt-20')} id="about">
        <div className="flex items-end justify-between gap-4">
          <div>
            <SectionTitle>What Our Clients Say</SectionTitle>
            <p className="mt-2 text-muted">
              Trusted by hundreds of happy homeowners and sellers.
            </p>
          </div>
          <Button variant="outline" size="pill">
            Show More
            <ArrowUpRightRegular className="h-4 w-4" />
          </Button>
        </div>

        {/* Top row */}
        <div className="mt-8 grid grid-cols-[260px_1fr] gap-4 max-[1100px]:grid-cols-1">
          {/* Stat card */}
          <article className="flex flex-col rounded-2xl bg-surface-hover p-7">
            <Badge variant="secondary" size="sm">
              Facts & Numbers
            </Badge>
            <strong className="mt-auto pt-16 text-[60px] font-bold leading-none">
              94%
            </strong>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              of clients would recommend Hooma to their friends and family.
            </p>
          </article>

          {/* Hero testimonial */}
          <article
            className="flex min-h-[280px] items-end rounded-2xl bg-cover bg-center p-7 text-background"
            style={{ backgroundImage: `url(${heroImages[1]})` }}
          >
            <div className="max-w-[520px]">
              <p className="text-[26px] font-semibold leading-snug [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]">
                &ldquo;Hooma made my first home purchase smooth and
                stress-free.&rdquo;
              </p>
              <span className="mt-3 block text-sm text-background/80">
                — Amanda Rizky, Jakarta
              </span>
            </div>
          </article>
        </div>

        {/* Bottom testimonials */}
        <div className="mt-4 grid grid-cols-3 gap-4 max-[720px]:grid-cols-1">
          {[
            {
              name: 'Lisa & Marcus T.',
              role: 'Couple Clients',
              dark: true,
            },
            { name: 'Kevin Miller', role: 'Investor', dark: false },
            { name: 'Amanda R.', role: 'First-time Buyer', dark: false },
          ].map(({ name, role, dark }) => (
            <article
              key={name}
              className={CnU(
                'flex flex-col gap-4 rounded-2xl p-6',
                dark
                  ? 'bg-foreground text-background'
                  : 'bg-surface border border-border',
              )}
            >
              <HeartRegular
                className={CnU(
                  'h-5 w-5',
                  dark ? 'text-background/60' : 'text-muted',
                )}
              />
              <p
                className={CnU(
                  'text-sm leading-relaxed',
                  dark ? 'text-background/80' : 'text-muted',
                )}
              >
                Professional, responsive, and genuinely helpful. They made
                relocating feel easy and exciting.
              </p>
              <div className="mt-auto">
                <strong className="block text-sm font-semibold">{name}</strong>
                <small
                  className={CnU(
                    'text-xs',
                    dark ? 'text-background/50' : 'text-muted',
                  )}
                >
                  {role}
                </small>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
