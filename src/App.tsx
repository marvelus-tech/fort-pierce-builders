import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Copy,
  Check,
  Phone,
  MapPin,
  Home,
  Building2,
  Globe,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';
import './index.css';

interface Builder {
  name: string;
  homes: number;
  phone?: string;
  address?: string;
  website?: string;
  type: 'national' | 'local' | 'custom';
  notes: string;
  contactMethod?: string;
}

const builders: Builder[] = [
  {
    name: 'LGI Homes',
    homes: 74,
    phone: '(844) 866-0738',
    address: '5601 Imagination Dr, Fort Pierce, FL 34947',
    website: 'https://www.lgihomes.com/florida/fort-pierce',
    type: 'national',
    notes: 'Celebration Pointe community. Move-in-ready inventory. Corporate land team via website.',
    contactMethod: 'Call (844) 866-0738 or use website form',
  },
  {
    name: 'Lennar',
    homes: 39,
    website: 'https://www.lennar.com/new-homes/florida/treasure-coast',
    type: 'national',
    notes: 'Massive national builder. Always buying land for communities. Contact via corporate for land acquisition.',
    contactMethod: 'Contact via lennar.com — ask for land acquisition',
  },
  {
    name: 'Adams Homes',
    homes: 32,
    phone: '(772) 242-9173',
    address: '5470 Lugo St, Fort Pierce, FL 34951',
    website: 'https://www.adamshomes.com',
    type: 'national',
    notes: 'Waterstone 62 & Waterstone Villas. 11 homes available now. Active in St. Lucie County.',
    contactMethod: '(772) 242-9173 or (772) 291-1141',
  },
  {
    name: 'D.R. Horton',
    homes: 32,
    website: 'https://www.drhorton.com/florida/east-florida/fort-pierce',
    type: 'national',
    notes: 'Has a land submission portal on their website. East Florida division actively developing.',
    contactMethod: 'Use "Property Submittal" form at drhorton.com/contact',
  },
  {
    name: 'Meritage Homes',
    homes: 22,
    website: 'https://www.meritagehomes.com',
    type: 'national',
    notes: 'Energy-efficient homes. Publicly traded (MTH). Contact corporate for land opportunities.',
    contactMethod: 'Contact via meritagehomes.com corporate office',
  },
  {
    name: 'Holiday Builders',
    homes: 15,
    phone: '(772) 297-3626',
    address: '18 Las Casitas Ct, Fort Pierce, FL 34951',
    website: 'https://holidaybuilders.com',
    type: 'national',
    notes: 'Spanish Lakes Sales Center. Active adult communities. Strong in Southeast FL.',
    contactMethod: '(772) 297-3626 or (321) 610-5180',
  },
  {
    name: 'Century Complete',
    homes: 14,
    type: 'national',
    notes: 'Entry-level homes. Part of Century Communities. Contact corporate for land acquisition.',
    contactMethod: 'Contact via centurycommunities.com',
  },
  {
    name: 'Renar Homes',
    homes: 8,
    type: 'local',
    notes: 'Local/regional builder in Treasure Coast area. Custom and semi-custom homes.',
    contactMethod: 'Search local listings for current contact',
  },
  {
    name: 'Ryan Homes',
    homes: 7,
    website: 'https://www.ryanhomes.com',
    type: 'national',
    notes: 'NVR Inc. subsidiary. Has a "Sell Land" portal on their website.',
    contactMethod: 'Use land.nvrinc.com to submit land opportunities',
  },
  {
    name: 'INB Homes',
    homes: 4,
    type: 'custom',
    notes: 'Luxury homes ($1.5M+). Custom builder — may be interested in premium lots.',
    contactMethod: 'Contact via local real estate channels',
  },
  {
    name: 'Taylor Morrison',
    homes: 1,
    website: 'https://www.taylormorrison.com',
    type: 'national',
    notes: 'Premium homes from $491K. Contact corporate for land development inquiries.',
    contactMethod: 'Contact via taylormorrison.com',
  },
  {
    name: 'RJM Custom Homes',
    homes: 0,
    phone: 'Contact via website',
    website: 'https://www.rjmhomes.net',
    type: 'custom',
    notes: 'Builds on your lot (BOYL) in Fort Pierce since 1995. 1/4 to multi-acre lots.',
    contactMethod: 'Contact via rjmhomes.net',
  },
  {
    name: 'LSH Custom Builders',
    homes: 2,
    type: 'custom',
    notes: 'Custom homes. Contact for price. Likely builds on customer lots.',
    contactMethod: 'Search local listings for current contact',
  },
  {
    name: 'South Florida Select Homes',
    homes: 0,
    phone: '(786) 420-6838',
    address: '85 Queens Rd, Fort Pierce, FL 34949',
    type: 'local',
    notes: 'BuildZoom score 104. Active in Fort Pierce area. May acquire land for projects.',
    contactMethod: '(786) 420-6838 ext. 29028',
  },
];

const emailTemplate = `Good afternoon my name is ____

I see that you're building homes in ____

I bring builders like yourself off market deals, and I'm gonna save you money versus paying for them on the market.

Is there anything specific that you're looking for right now and how much you willing to pay?`;

export default function App() {
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(emailTemplate);
      setCopied(true);
      setShowToast(true);
      setTimeout(() => setCopied(false), 2500);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <div>
      {/* Header */}
      <header className="header">
        <motion.div
          className="header-badge"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <TrendingUp size={14} />
          <span>Fort Pierce / St. Lucie County</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Builder Hit List
        </motion.h1>

        <motion.p
          className="header-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Active builders near 2520 S Ocean Dr, Fort Pierce, FL 34949. Sorted by activity level — most inventory means most likely buying land.
        </motion.p>
      </header>

      {/* Email Template Card */}
      <motion.div
        className="email-template-card"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="email-template-header">
          <div className="email-template-title">
            <div className="email-template-icon">
              <Mail size={18} strokeWidth={2.5} />
            </div>
            <span>Email Outreach Template</span>
          </div>
          <button
            className={`copy-button ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
            aria-label={copied ? 'Copied to clipboard' : 'Copy email template'}
          >
            {copied ? (
              <>
                <Check size={16} strokeWidth={2.5} />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy size={16} strokeWidth={2} />
                <span>Copy to Clipboard</span>
              </>
            )}
          </button>
        </div>

        <div className="email-template-body">
          <p>
            Good afternoon my name is{' '}
            <span className="email-placeholder">____</span>
          </p>
          <p>
            I see that you're building homes in{' '}
            <span className="email-placeholder">____</span>
          </p>
          <p>
            I bring builders like yourself off market deals, and I'm gonna save
            you money versus paying for them on the market.
          </p>
          <p>
            Is there anything specific that you're looking for right now and how
            much you willing to pay?
          </p>
        </div>
      </motion.div>

      {/* Builders List */}
      <section className="builders-section">
        <div className="section-header">
          <h2 className="section-title">14 Active Builders</h2>
          <p className="section-desc">
            Contact directly. National builders buy land in bulk. Local builders may partner on specific deals.
          </p>
        </div>

        <div className="tier-label">
          <TrendingUp size={14} />
          Tier 1 — Most Active (14+ homes)
        </div>

        <div className="builders-grid">
          {builders.slice(0, 7).map((builder, i) => (
            <motion.div
              key={builder.name}
              className="builder-card"
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <div className="builder-card-header">
                <div className="builder-name">{builder.name}</div>
                <span className={`builder-badge ${builder.type}`}>
                  {builder.type}
                </span>
              </div>

              <div className="builder-info">
                {builder.phone && (
                  <div className="builder-info-row">
                    <Phone size={16} />
                    <a href={`tel:${builder.phone.replace(/\D/g, '')}`}>
                      {builder.phone}
                    </a>
                  </div>
                )}
                {builder.address && (
                  <div className="builder-info-row">
                    <MapPin size={16} />
                    <span>{builder.address}</span>
                  </div>
                )}
                {builder.website && (
                  <div className="builder-info-row">
                    <Globe size={16} />
                    <a
                      href={builder.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
                {builder.contactMethod && !builder.phone && !builder.website && (
                  <div className="builder-info-row">
                    <Building2 size={16} />
                    <span>{builder.contactMethod}</span>
                  </div>
                )}
              </div>

              <div className="builder-homes-count">
                <Home size={14} />
                <strong>{builder.homes}</strong> active homes in Fort Pierce area
              </div>

              {builder.notes && (
                <div
                  style={{
                    marginTop: 10,
                    fontSize: 13,
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5,
                    fontStyle: 'italic',
                  }}
                >
                  {builder.notes}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="tier-label tier-2" style={{ marginTop: 32 }}>
          <Home size={14} />
          Tier 2 — Moderate Activity (1-8 homes)
        </div>

        <div className="builders-grid">
          {builders.slice(7, 11).map((builder, i) => (
            <motion.div
              key={builder.name}
              className="builder-card"
              custom={i + 7}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <div className="builder-card-header">
                <div className="builder-name">{builder.name}</div>
                <span className={`builder-badge ${builder.type}`}>
                  {builder.type}
                </span>
              </div>

              <div className="builder-info">
                {builder.phone && (
                  <div className="builder-info-row">
                    <Phone size={16} />
                    <a href={`tel:${builder.phone.replace(/\D/g, '')}`}>
                      {builder.phone}
                    </a>
                  </div>
                )}
                {builder.address && (
                  <div className="builder-info-row">
                    <MapPin size={16} />
                    <span>{builder.address}</span>
                  </div>
                )}
                {builder.website && (
                  <div className="builder-info-row">
                    <Globe size={16} />
                    <a
                      href={builder.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
                {builder.contactMethod && !builder.phone && !builder.website && (
                  <div className="builder-info-row">
                    <Building2 size={16} />
                    <span>{builder.contactMethod}</span>
                  </div>
                )}
              </div>

              <div className="builder-homes-count">
                <Home size={14} />
                <strong>{builder.homes}</strong> active homes in Fort Pierce area
              </div>

              {builder.notes && (
                <div
                  style={{
                    marginTop: 10,
                    fontSize: 13,
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5,
                    fontStyle: 'italic',
                  }}
                >
                  {builder.notes}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="tier-label tier-3" style={{ marginTop: 32 }}>
          <Building2 size={14} />
          Tier 3 — Custom & Local (Build on Your Lot)
        </div>

        <div className="builders-grid">
          {builders.slice(11).map((builder, i) => (
            <motion.div
              key={builder.name}
              className="builder-card"
              custom={i + 11}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <div className="builder-card-header">
                <div className="builder-name">{builder.name}</div>
                <span className={`builder-badge ${builder.type}`}>
                  {builder.type}
                </span>
              </div>

              <div className="builder-info">
                {builder.phone && (
                  <div className="builder-info-row">
                    <Phone size={16} />
                    <a href={`tel:${builder.phone.replace(/\D/g, '')}`}>
                      {builder.phone}
                    </a>
                  </div>
                )}
                {builder.address && (
                  <div className="builder-info-row">
                    <MapPin size={16} />
                    <span>{builder.address}</span>
                  </div>
                )}
                {builder.website && (
                  <div className="builder-info-row">
                    <Globe size={16} />
                    <a
                      href={builder.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
                {builder.contactMethod && !builder.phone && !builder.website && (
                  <div className="builder-info-row">
                    <Building2 size={16} />
                    <span>{builder.contactMethod}</span>
                  </div>
                )}
              </div>

              <div className="builder-homes-count">
                <Home size={14} />
                <strong>{builder.homes}</strong> active homes in Fort Pierce area
              </div>

              {builder.notes && (
                <div
                  style={{
                    marginTop: 10,
                    fontSize: 13,
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5,
                    fontStyle: 'italic',
                  }}
                >
                  {builder.notes}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="page-footer">
        <p>Fort Pierce, FL 34949 · St. Lucie County · Treasure Coast</p>
      </footer>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <div className="toast-container">
            <motion.div
              className="toast"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <CheckCircle2 size={18} />
              <span>Email template copied to clipboard</span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
