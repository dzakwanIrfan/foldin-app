import React, { useState } from "react";

/* ═══════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════ */

interface User {
  name: string;
  handle: string;
  avatar: string;
  impact?: string;
  kyc?: boolean;
}

interface Pin {
  name: string;
  area: string;
  claimable?: boolean;
}

interface Moment {
  id: string;
  user: User;
  time: string;
  text: string;
  pin: Pin | null;
  photo: string | null;
  touches: number;
  seen: number;
  youTouched: boolean;
}

interface Host {
  name: string;
  avatar: string;
  pro?: boolean;
  trusted?: boolean;
  satisfaction?: number;
  showupRate?: number;
  retention?: number;
}

interface MealDrink {
  included: boolean;
  items?: string[];
}

type EventType = "Nano" | "Micro" | "Open";

interface UpcomingEvent {
  id: string;
  title: string;
  host: Host;
  emoji: string;
  time: string;
  location?: string;
  attendees: number;
  capacity: number;
  type: EventType;
  price: number | null;
  mealDrink?: MealDrink;
  bring?: string[];
}

interface LiveEvent {
  id: string;
  title: string;
  host: Host;
  emoji: string;
  attendees: number;
  location: string;
}

interface EndedEvent {
  id: string;
  title: string;
  host: Host;
  emoji: string;
  time: string;
  rated: boolean;
}

interface Community {
  id: string;
  name: string;
  avatar: string;
  members: string;
  desc: string;
}

interface Ghost {
  name: string;
  avatar: string;
  lastSeen: string;
  strength: number;
  shared: string[];
}

interface DM {
  name: string;
  avatar: string;
  last: string;
  time: string;
  unread: number;
}

interface Place {
  name: string;
  emoji: string;
  area: string;
  moments: number;
  events: number;
  claimed: boolean;
}

type Claimable = Pin | Place | { name: string };

interface MapPinData {
  id: string;
  x: number;
  y: number;
  type: "event" | "moment" | "place";
  emoji?: string;
  avatar?: string;
  live?: boolean;
}

type SharePlatform = "whatsapp" | "x" | "telegram" | "native" | "copy";
type TabId = "discover" | "explore" | "create" | "message" | "profile";
type TouchedState = "touched" | "untouched" | null;
type EventCapacityLabel = "Nano" | "Micro" | "Open";

interface Me {
  name: string;
  handle: string;
  avatar: string;
  city: string;
  bio: string;
  badges: string[];
  isPro: boolean;
  kyc: boolean;
  trusted: boolean;
  satisfaction: number;
  showupRate: number;
  retention: number;
  impact: number;
  events: number;
  pins: number;
  moments: number;
  walletSKYA: number;
  walletUSD: number;
  tipsEarned: number;
}

/* ═══════════════════════════════════════════════════════════════
   THEME
   ═══════════════════════════════════════════════════════════════ */

const C = {
  bg: "#FBFAF6", surface: "#FFFFFF", surface2: "#F4F1EA", surface3: "#EBE7DE",
  border: "#E8E3D6", borderSoft: "#F0EBE0",
  text: "#0E0E10", textM: "#54545A", textL: "#8B8B92", textLL: "#BFBFC4",
  gold: "#EFC523", goldDeep: "#A88410", goldDarker: "#7A5F08",
  goldGlow: "rgba(239,197,35,0.10)", goldSoft: "rgba(239,197,35,0.22)", goldFill: "#FDF7E0",
  green: "#1F9F4A", greenSoft: "rgba(31,159,74,0.10)", greenLine: "rgba(31,159,74,0.18)",
  red: "#D54668", redSoft: "rgba(213,70,104,0.10)",
  purple: "#7C5CD8", purpleSoft: "rgba(124,92,216,0.10)",
  mapBg: "#F2EFE6", mapStreet: "#E5DFD0", mapStreetSoft: "#EFEAE0",
  mapPark: "#DDE9D5", mapWater: "#D5E4ED", mapBuilding: "#E5E0D2",
  shadow: "0 1px 2px rgba(20,15,5,0.04), 0 0 0 1px rgba(20,15,5,0.04)",
  shadowMd: "0 4px 16px rgba(20,15,5,0.06), 0 0 0 1px rgba(20,15,5,0.04)",
} as const;

const F = "'Geist', 'Inter', system-ui, sans-serif";
const Fs = "'Instrument Serif', 'Times New Roman', serif";
const Fm = "'Geist Mono', 'JetBrains Mono', monospace";

const BG: Record<string, string> = {
  "🌸": "linear-gradient(135deg, #FFE0E9, #FFC4D6)", "🌺": "linear-gradient(135deg, #FFE4D9, #FFCFB8)",
  "🎧": "linear-gradient(135deg, #FFF1D6, #FFE0AA)", "🌊": "linear-gradient(135deg, #D9EFFF, #B8DEFF)",
  "📚": "linear-gradient(135deg, #F2E8D6, #E0C9A0)", "🪐": "linear-gradient(135deg, #E8D9FF, #D0BFFA)",
  "🎯": "linear-gradient(135deg, #FFDED2, #FFC0AA)", "🌙": "linear-gradient(135deg, #D9DFFF, #B8C5FA)",
  "🎸": "linear-gradient(135deg, #F2D9D9, #E0B8B8)", "🌳": "linear-gradient(135deg, #D9F2DC, #B8E0BC)",
  "☀️": "linear-gradient(135deg, #FFF3C4, #FFCC4A)", "🏃": "linear-gradient(135deg, #DFE9F5, #A8C0E0)",
  "📖": "linear-gradient(135deg, #F2E5D6, #DCBF95)",
};

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const ME: Me = {
  name: "Lilis Huri", handle: "lilishuri", avatar: "🌸", city: "Jakarta",
  bio: "Built Foldin so we'd remember how to be human. OG #001.",
  badges: ["OG", "Host"], isPro: true, kyc: true, trusted: true,
  satisfaction: 96, showupRate: 94, retention: 68,
  impact: 2847320, events: 47, pins: 107, moments: 38,
  walletSKYA: 2631, walletUSD: 5.0, tipsEarned: 1250000,
};

const MOMENTS: Moment[] = [
  { id: "m1", user: { name: "Maya Putri", handle: "mayap", avatar: "🌺", impact: "1.2M", kyc: true }, time: "2h", text: "Coffee with strangers turned into a 4-hour conversation about why we all stopped going outside. The introvert in me cried.", pin: { name: "Kopi Tuku Cipete", area: "Cipete, Jakarta", claimable: true }, photo: null, touches: 2412000, seen: 5180000, youTouched: false },
  { id: "m2", user: { name: "Andra K", handle: "andra", avatar: "🎧", impact: "560K", kyc: true }, time: "5h", text: "Hosted my first Nano event. 4 strangers. Zero phones on the table. We talked for 3 hours straight. This is what I built Foldin for.", pin: { name: "Sudut Kantin SCBD", area: "SCBD, Jakarta", claimable: true }, photo: "amber", touches: 847000, seen: 1920000, youTouched: true },
  { id: "m3", user: { name: "Reza", handle: "rezz", avatar: "🌊", impact: "320K", kyc: false }, time: "1d", text: "Saw the same girl 3 times this week at different events. Foldin's Ghost Match told me we've crossed paths 11 times in 2 months. The world isn't that big.", pin: null, photo: "night", touches: 156000, seen: 412000, youTouched: false },
  { id: "m4", user: { name: "Sarah Lin", handle: "sarahl", avatar: "📚", impact: "980K", kyc: true }, time: "1d", text: "47 group chats. 0 friends I'd call at midnight. That stat from Surgeon General hit different when you realize it's you.", pin: null, photo: null, touches: 4100000, seen: 8700000, youTouched: true },
];

const LIVE_EVENTS: LiveEvent[] = [
  { id: "le1", title: "Sunrise Yoga", host: { name: "Maya P", avatar: "🌺", trusted: true }, emoji: "🧘", attendees: 47, location: "GBK Senayan" },
  { id: "le2", title: "Vinyl Listening", host: { name: "Marco T", avatar: "🎸" }, emoji: "🎵", attendees: 28, location: "Kemang" },
];

const UPCOMING: UpcomingEvent[] = [
  { id: "e1", title: "Founders Coffee #14", host: { name: "Andra K", avatar: "🎧", pro: true, trusted: true, satisfaction: 97, showupRate: 95, retention: 71 }, emoji: "☕", time: "Tomorrow · 9:00", location: "Kopi Tuku, Cipete", attendees: 4, capacity: 4, type: "Nano", price: null, mealDrink: { included: true, items: ["Coffee", "Light pastries"] }, bring: ["Your laptop", "An idea you're stuck on"] },
  { id: "e2", title: "Slow Sunset Run", host: { name: "Maya P", avatar: "🌺", pro: true, trusted: true, satisfaction: 98, showupRate: 92, retention: 64 }, emoji: "🌅", time: "Sat · 17:30", location: "GBK Senayan", attendees: 11, capacity: 20, type: "Micro", price: null, mealDrink: { included: false }, bring: ["Running shoes", "Water bottle", "Comfortable clothes"] },
  { id: "e3", title: "Grief Circle · Healing", host: { name: "Sarah L", avatar: "📚", pro: true, trusted: true, satisfaction: 99, showupRate: 91, retention: 80 }, emoji: "🕯️", time: "Sun · 19:00", location: "Aksara Kemang", attendees: 6, capacity: 8, type: "Nano", price: 50000, mealDrink: { included: true, items: ["Herbal tea", "Light snacks"] }, bring: ["Tissues (just in case)", "An open heart"] },
  { id: "e4", title: "Quiet Books Club · Vol 7", host: { name: "Bagus W", avatar: "🌳", pro: false }, emoji: "📖", time: "Tue · 19:30", location: "Aksara Kemang", attendees: 8, capacity: 12, type: "Micro", price: null, mealDrink: { included: true, items: ["Tea (chamomile, jasmine)"] }, bring: ["Your current book", "Bookmark of choice"] },
];

const ENDED_EVENTS: EndedEvent[] = [
  { id: "ee1", title: "Sunrise Yoga · Vol 12", host: { name: "Maya Putri", avatar: "🌺", pro: true, trusted: true }, emoji: "🧘", time: "Yesterday · 6:30 AM", rated: false },
  { id: "ee2", title: "Founders Coffee #13", host: { name: "Andra K", avatar: "🎧", pro: true, trusted: true }, emoji: "☕", time: "Last Tuesday", rated: true },
];

const COMMUNITIES: Community[] = [
  { id: "c1", name: "Daylight Asia", avatar: "☀️", members: "12.4K", desc: "Founders meeting strangers IRL." },
  { id: "c2", name: "Slow Sunday Run", avatar: "🏃", members: "892", desc: "No PRs. Just vibes." },
  { id: "c3", name: "Quiet Books", avatar: "📖", members: "2.1K", desc: "Reading, alone, together." },
];

const GHOSTS: Ghost[] = [
  { name: "Tasya Khairiyah", avatar: "🪐", lastSeen: "Yesterday · Kopi Tuku", strength: 94, shared: ["Coffee", "Books", "Slow run"] },
  { name: "Faisal R", avatar: "🎯", lastSeen: "3 days ago · Senayan", strength: 71, shared: ["Run club", "Vinyl"] },
  { name: "Putri Ramadhani", avatar: "🌙", lastSeen: "Last week · Aksara", strength: 58, shared: ["Books"] },
];

const DMS: DM[] = [
  { name: "Andra K", avatar: "🎧", last: "see you at the nano sunday?", time: "12m", unread: 2 },
  { name: "Sarah Lin", avatar: "📚", last: "the book club is on for tue", time: "2h", unread: 0 },
  { name: "Maya Putri", avatar: "🌺", last: "thank you for showing up 🌸", time: "1d", unread: 0 },
];

const PLACES: Place[] = [
  { name: "Kopi Tuku Cipete", emoji: "☕", area: "Cipete, Jakarta", moments: 47, events: 12, claimed: false },
  { name: "Senayan Park", emoji: "🌳", area: "Senayan, Jakarta", moments: 2100, events: 38, claimed: true },
  { name: "Aksara Kemang", emoji: "📚", area: "Kemang, Jakarta", moments: 210, events: 8, claimed: true },
];

/* ═══════════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════════ */

const fmt = (n: number): string =>
  n >= 1000000 ? (n / 1000000).toFixed(1).replace(/\.0$/, "") + "M"
  : n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, "") + "K"
  : n.toString();

const fmtIDR = (n: number): string => "Rp " + n.toLocaleString("id-ID");

const shareTo = (platform: SharePlatform, moment: Moment): void => {
  const text = `"${moment.text.slice(0, 120)}${moment.text.length > 120 ? "…" : ""}" — ${moment.user.name}`;
  const url = `https://foldin.app/m/${moment.id}`;
  const enc = encodeURIComponent(`${text}\n\nFollow on Foldin: ${url}`);
  if (platform === "whatsapp") window.open(`https://wa.me/?text=${enc}`, "_blank");
  else if (platform === "x") window.open(`https://twitter.com/intent/tweet?text=${enc}`, "_blank");
  else if (platform === "telegram") window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, "_blank");
  else if (platform === "native") {
    if (navigator.share) navigator.share({ title: "Foldin Moment", text, url }).catch(() => {});
    else navigator.clipboard?.writeText(`${text} ${url}`);
  } else if (platform === "copy") navigator.clipboard?.writeText(`${text} ${url}`);
};

/* ═══════════════════════════════════════════════════════════════
   ICONS
   ═══════════════════════════════════════════════════════════════ */

interface IconProps { size?: number; color?: string; }
interface PinIconProps extends IconProps { filled?: boolean; }

const HeartFilled = ({ size = 18, color = C.gold }: IconProps) => <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>;
const HeartOutline = ({ size = 18, color = C.textL }: IconProps) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>;
const HeartBroken = ({ size = 18, color = C.textL }: IconProps) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5l-1 4 2 3-2 3 2 3-1 3" /><path d="M11.05 4.61a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23" /><path d="M12.95 4.61a5.5 5.5 0 0 1 7.78 7.78l-1.06 1.06L12 21.23" /></svg>;
const Eye = ({ size = 14, color = C.textL }: IconProps) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>;
const PinIcon = ({ size = 14, color = C.goldDeep, filled = false }: PinIconProps) => <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : "none"} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" fill={filled ? "white" : "none"} /></svg>;
const ShareIcon = ({ size = 14, color = C.textM }: IconProps) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></svg>;
const Sparkle = ({ size = 12, color = C.goldDeep }: IconProps) => <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12 0 L13.5 9 L24 12 L13.5 15 L12 24 L10.5 15 L0 12 L10.5 9 Z" /></svg>;
const KYCSeal = ({ size = 12 }: { size?: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill={C.gold}><path d="M12 0L14.5 2.5L18 1.5L19 5L22.5 6L21.5 9.5L24 12L21.5 14.5L22.5 18L19 19L18 22.5L14.5 21.5L12 24L9.5 21.5L6 22.5L5 19L1.5 18L2.5 14.5L0 12L2.5 9.5L1.5 6L5 5L6 1.5L9.5 2.5L12 0Z" /><path d="M7 12L10.5 15.5L17 9" stroke="white" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const ProBadge = () => <span style={{ display: "inline-flex", alignItems: "center", padding: "2px 6px", borderRadius: 4, background: `linear-gradient(135deg, ${C.gold}, ${C.goldDeep})`, color: "white", fontSize: 9, fontWeight: 700, fontFamily: F, letterSpacing: "0.05em" }}>PRO</span>;
const TrustedBadge = () => <span style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: "2px 6px", borderRadius: 4, background: C.greenSoft, color: C.green, fontSize: 9, fontWeight: 700, fontFamily: F, letterSpacing: "0.05em" }}><svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" /></svg>TRUSTED</span>;
const KYCBadge = () => <span style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: "2px 6px", borderRadius: 4, background: C.goldFill, color: C.goldDarker, fontSize: 9, fontWeight: 700, fontFamily: F, letterSpacing: "0.05em" }}><KYCSeal size={9} /> KYC</span>;

/* ═══════════════════════════════════════════════════════════════
   AVATAR + LAYOUT PRIMITIVES
   ═══════════════════════════════════════════════════════════════ */

interface AvatarProps {
  avatar?: string;
  name?: string;
  size?: number;
  ring?: boolean;
  showKYC?: boolean;
}

const Avatar = ({ avatar, name, size = 40, ring = false, showKYC = false }: AvatarProps) => {
  const bg = (avatar && BG[avatar]) || `linear-gradient(135deg, ${C.surface2}, ${C.surface3})`;
  return (
    <div style={{ width: size, height: size, position: "relative", flexShrink: 0 }}>
      <div style={{ width: size, height: size, borderRadius: "50%", background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.5, lineHeight: 1, boxShadow: ring ? `0 0 0 2px ${C.bg}, 0 0 0 4px ${C.gold}` : "inset 0 1px 2px rgba(255,255,255,0.45), 0 1px 2px rgba(20,15,5,0.06)" }}>{avatar || (name ? name[0] : "?")}</div>
      {showKYC && <div style={{ position: "absolute", bottom: -2, right: -2, width: size * 0.34, height: size * 0.34, borderRadius: "50%", background: "white", display: "flex", alignItems: "center", justifyContent: "center" }}><KYCSeal size={size * 0.34} /></div>}
    </div>
  );
};

interface TopBarProps {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  large?: boolean;
}

const TopBar = ({ title, subtitle, right, large = false }: TopBarProps) => (
  <div style={{ padding: large ? "20px 20px 14px" : "14px 20px", display: "flex", alignItems: "center", background: C.bg, borderBottom: `1px solid ${C.borderSoft}`, position: "sticky", top: 0, zIndex: 10 }}>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontFamily: large ? Fs : F, fontSize: large ? 30 : 17, fontWeight: large ? 400 : 600, color: C.text, letterSpacing: "-0.02em", lineHeight: 1.05 }}>{title}</div>
      {subtitle && <div style={{ fontSize: 12, color: C.textL, fontFamily: F, marginTop: 3 }}>{subtitle}</div>}
    </div>
    {right}
  </div>
);

interface SectionLabelProps {
  children: React.ReactNode;
  action?: string;
  padding?: string;
}

const SectionLabel = ({ children, action, padding = "0 20px 10px" }: SectionLabelProps) => (
  <div style={{ padding, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
    <span style={{ fontSize: 11, fontWeight: 600, color: C.textM, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: F }}>{children}</span>
    {action && <span style={{ fontSize: 11, color: C.goldDeep, fontFamily: F, fontWeight: 600, cursor: "pointer" }}>{action}</span>}
  </div>
);

interface FieldLabelProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const FieldLabel = ({ children, style }: FieldLabelProps) => (
  <div style={{ fontSize: 11, fontWeight: 600, color: C.textM, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: F, marginBottom: 8, ...style }}>{children}</div>
);

interface RowProps {
  label: string;
  value: string;
  accent?: boolean;
  muted?: boolean;
  bold?: boolean;
}

const Row = ({ label, value, accent, muted, bold }: RowProps) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12.5, fontFamily: F, padding: "3px 0" }}>
    <span style={{ color: muted ? C.textL : C.textM }}>{label}</span>
    <span style={{ color: accent ? C.green : muted ? C.textL : C.text, fontFamily: Fm, fontWeight: bold ? 700 : 600, fontSize: bold ? 14 : 12.5 }}>{value}</span>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   INTERACTIVE MAP
   ═══════════════════════════════════════════════════════════════ */

const InteractiveMap = () => {
  const [filter, setFilter] = useState<"All" | "Live" | "Events" | "Moments">("All");
  const pins: MapPinData[] = [
    { id: "p1", x: 22, y: 24, type: "event", emoji: "🧘", live: true }, { id: "p2", x: 64, y: 20, type: "moment", avatar: "🌺" },
    { id: "p3", x: 78, y: 48, type: "event", emoji: "☕" }, { id: "p4", x: 32, y: 62, type: "place", emoji: "📍" },
    { id: "p5", x: 56, y: 76, type: "moment", avatar: "🎧" }, { id: "p6", x: 14, y: 80, type: "event", emoji: "🎵", live: true },
    { id: "p7", x: 82, y: 78, type: "moment", avatar: "📚" },
  ];
  const filtered = pins.filter(p => filter === "All" || (filter === "Live" && p.live) || (filter === "Events" && p.type === "event") || (filter === "Moments" && p.type === "moment"));
  return (
    <div style={{ position: "relative", height: 340, overflow: "hidden", background: C.mapBg, borderBottom: `1px solid ${C.borderSoft}` }}>
      <svg width="100%" height="100%" viewBox="0 0 400 340" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0 }}>
        <path d="M 50 50 Q 90 30 130 60 Q 155 85 130 110 Q 95 130 70 115 Q 45 95 50 50 Z" fill={C.mapPark} opacity="0.7" />
        <ellipse cx="320" cy="240" rx="65" ry="38" fill={C.mapPark} opacity="0.65" />
        <path d="M -10 195 Q 80 180 180 200 Q 280 218 410 195 L 410 220 Q 290 240 180 222 Q 80 205 -10 220 Z" fill={C.mapWater} opacity="0.75" />
        <path d="M 0 130 Q 200 122 400 138" stroke={C.mapStreet} strokeWidth="9" fill="none" />
        <path d="M 0 130 Q 200 122 400 138" stroke="white" strokeWidth="2" strokeDasharray="4 6" fill="none" opacity="0.7" />
        <path d="M 0 260 Q 100 252 200 262 Q 300 272 400 258" stroke={C.mapStreet} strokeWidth="7" fill="none" />
        <path d="M 105 0 Q 115 100 110 200 Q 108 270 118 340" stroke={C.mapStreet} strokeWidth="7" fill="none" />
        <path d="M 280 0 Q 285 100 282 200 Q 280 270 290 340" stroke={C.mapStreet} strokeWidth="6" fill="none" />
        <rect x="38" y="22" width="38" height="32" rx="3" fill={C.mapBuilding} opacity="0.8" />
        <rect x="200" y="40" width="55" height="36" rx="3" fill={C.mapBuilding} opacity="0.8" />
        <rect x="320" y="100" width="35" height="48" rx="3" fill={C.mapBuilding} opacity="0.8" />
        <rect x="20" y="270" width="48" height="28" rx="3" fill={C.mapBuilding} opacity="0.8" />
      </svg>
      <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 5, width: 90, height: 90, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
        <div style={{ position: "absolute", width: 80, height: 80, borderRadius: "50%", background: C.gold, opacity: 0.18, animation: "pulseRing 2.4s infinite" }} />
        <div style={{ width: 16, height: 16, borderRadius: "50%", background: C.gold, border: "3px solid white", boxShadow: "0 2px 8px rgba(0,0,0,0.18)", zIndex: 1 }} />
      </div>
      {filtered.map(p => p.type === "moment" ? (
        <div key={p.id} style={{ position: "absolute", left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%, -100%)", zIndex: 4 }}>
          <div style={{ width: 38, height: 38, borderRadius: "50%", padding: 2, background: "white", boxShadow: `0 4px 10px rgba(0,0,0,0.15), 0 0 0 2px ${C.gold}` }}>
            <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: (p.avatar && BG[p.avatar]) || C.surface2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{p.avatar}</div>
          </div>
        </div>
      ) : (
        <div key={p.id} style={{ position: "absolute", left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%, -50%)", zIndex: 4 }}>
          {p.live && <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: 50, height: 50, borderRadius: "50%", background: C.gold, opacity: 0.22, animation: "pulseRing 1.8s infinite" }} />}
          <div style={{ position: "relative", width: 34, height: 34, borderRadius: "50%", background: "white", border: `2px solid ${C.gold}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, boxShadow: "0 3px 10px rgba(0,0,0,0.12)" }}>{p.emoji}</div>
        </div>
      ))}
      <div style={{ position: "absolute", top: 12, left: 12, right: 12, display: "flex", gap: 6, zIndex: 10, overflowX: "auto" }}>
        {(["All", "Live", "Events", "Moments"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: "7px 13px", borderRadius: 99, flexShrink: 0, background: filter === f ? C.text : "rgba(255,255,255,0.94)", color: filter === f ? "white" : C.text, border: filter === f ? "none" : `1px solid ${C.border}`, fontSize: 11.5, fontWeight: 600, fontFamily: F, cursor: "pointer", boxShadow: C.shadow }}>{f}</button>
        ))}
      </div>
      <div style={{ position: "absolute", bottom: 12, left: 12, right: 12, display: "flex", alignItems: "center", gap: 8, zIndex: 10 }}>
        <div style={{ flex: 1, padding: "10px 14px", borderRadius: 99, background: "rgba(255,255,255,0.94)", border: `1px solid ${C.border}`, boxShadow: C.shadow, display: "flex", alignItems: "center", gap: 8, fontSize: 12, fontFamily: F, color: C.textM }}>
          <PinIcon size={13} color={C.goldDeep} filled /><span style={{ fontWeight: 500, color: C.text }}>Senopati</span><span style={{ color: C.textLL }}>·</span><span style={{ color: C.goldDeep, fontWeight: 600, fontFamily: Fm }}>2.5km</span><span style={{ color: C.textLL }}>·</span><span>{filtered.length} nearby</span>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   REACTION ROW + MOMENT CARD
   ═══════════════════════════════════════════════════════════════ */

interface ReactionRowProps {
  moment: Moment;
  onTouch: (id: string) => void;
  onUntouch: (id: string) => void;
  onShare: (moment: Moment) => void;
}

const ReactionRow = ({ moment, onTouch, onUntouch, onShare }: ReactionRowProps) => (
  <div style={{ display: "flex", alignItems: "center", gap: 6, paddingTop: 10, marginTop: 10, borderTop: `1px solid ${C.borderSoft}` }}>
    <button onClick={() => onTouch(moment.id)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 11px", borderRadius: 99, background: moment.youTouched ? C.goldFill : "transparent", border: `1px solid ${moment.youTouched ? C.goldSoft : C.border}`, color: moment.youTouched ? C.goldDeep : C.textM, fontSize: 12.5, fontWeight: 500, fontFamily: F, cursor: "pointer" }}>
      {moment.youTouched ? <HeartFilled size={14} /> : <HeartOutline size={14} />}<span style={{ fontFamily: Fm, fontWeight: 600 }}>{fmt(moment.touches)}</span>
    </button>
    <button onClick={() => onUntouch(moment.id)} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: 99, background: "transparent", border: `1px solid ${C.border}`, color: C.textL, cursor: "pointer", padding: 0 }}><HeartBroken size={14} /></button>
    <div style={{ display: "flex", alignItems: "center", gap: 4, color: C.textL, fontSize: 11.5, fontFamily: F, marginLeft: 6 }}><Eye size={13} /><span style={{ fontFamily: Fm, fontWeight: 600 }}>{fmt(moment.seen)}</span></div>
    <div style={{ flex: 1 }} />
    <button onClick={() => onShare(moment)} style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.textM, padding: "6px 12px", borderRadius: 99, fontSize: 12, fontWeight: 500, fontFamily: F, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}><ShareIcon size={13} /> Share</button>
  </div>
);

interface MomentCardProps extends ReactionRowProps {
  onClaimPin: (pin: Pin) => void;
}

const MomentCard = ({ moment, onTouch, onUntouch, onShare, onClaimPin }: MomentCardProps) => (
  <div style={{ padding: 16, background: C.surface, borderRadius: 18, border: `1px solid ${C.border}`, boxShadow: C.shadow, marginBottom: 10 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
      <Avatar avatar={moment.user.avatar} name={moment.user.name} size={40} showKYC={moment.user.kyc} />
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.text, fontFamily: F }}>{moment.user.name}</span>
          <span style={{ fontSize: 11, color: C.goldDeep, fontFamily: Fm, fontWeight: 600 }}>· {moment.user.impact}</span>
        </div>
        <div style={{ fontSize: 12, color: C.textL, fontFamily: F, marginTop: 1 }}>@{moment.user.handle} · {moment.time}</div>
      </div>
    </div>
    <div style={{ fontSize: 14.5, color: C.text, lineHeight: 1.55, fontFamily: F, marginBottom: 12 }}>{moment.text}</div>
    {moment.photo && <div style={{ height: 200, borderRadius: 14, marginBottom: 12, background: moment.photo === "amber" ? "linear-gradient(135deg, #F4D58D 0%, #C8924A 60%, #5B3A12 100%)" : "linear-gradient(180deg, #1B2A4E 0%, #3D4F7C 50%, #6E5C8C 100%)" }} />}
    {moment.pin && (
      <div style={{ background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 12, marginBottom: 12, overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px" }}>
          <PinIcon size={14} color={C.goldDeep} filled />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: C.text, fontFamily: F }}>{moment.pin.name}</div>
            <div style={{ fontSize: 10.5, color: C.textL, fontFamily: F, marginTop: 1 }}>{moment.pin.area}</div>
          </div>
        </div>
        {moment.pin.claimable && (
          <div style={{ padding: "8px 12px", borderTop: `1px solid ${C.border}`, background: C.goldFill, display: "flex", alignItems: "center", gap: 8 }}>
            <Sparkle size={11} />
            <span style={{ fontSize: 11, color: C.goldDarker, fontFamily: F, flex: 1, lineHeight: 1.4 }}><strong>Are you {moment.pin.name}?</strong> Claim this place.</span>
            <button onClick={() => moment.pin && onClaimPin(moment.pin)} style={{ padding: "5px 10px", background: C.goldDeep, color: "white", border: "none", borderRadius: 99, fontSize: 11, fontWeight: 600, fontFamily: F, cursor: "pointer" }}>Claim</button>
          </div>
        )}
      </div>
    )}
    <ReactionRow moment={moment} onTouch={onTouch} onUntouch={onUntouch} onShare={onShare} />
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   EVENT ROW + PAST EVENT CARD
   ═══════════════════════════════════════════════════════════════ */

const HostMetricsInline = ({ host }: { host: Host }) => !host.satisfaction ? null : (
  <div style={{ display: "flex", gap: 8, fontSize: 10.5, fontFamily: F, color: C.textM, marginTop: 4, flexWrap: "wrap" }}>
    <span>⭐ <span style={{ fontFamily: Fm, color: C.text, fontWeight: 600 }}>{host.satisfaction}%</span> satisfaction</span>
    <span style={{ color: C.textLL }}>·</span>
    <span>👋 <span style={{ fontFamily: Fm, color: C.text, fontWeight: 600 }}>{host.showupRate}%</span> show-up</span>
  </div>
);

interface EventRowProps {
  event: UpcomingEvent;
  onRSVP: (event: UpcomingEvent) => void;
}

const EventRow = ({ event, onRSVP }: EventRowProps) => {
  const isFull = event.attendees >= event.capacity;
  return (
    <div style={{ padding: 14, background: C.surface, borderRadius: 16, border: `1px solid ${C.border}`, boxShadow: C.shadow, marginBottom: 8 }}>
      <div style={{ display: "flex", gap: 12, marginBottom: 10 }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: C.surface2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{event.emoji}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 4 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.text, fontFamily: F, lineHeight: 1.3, flex: 1 }}>{event.title}</div>
            <span style={{ fontSize: 9, fontWeight: 700, color: event.type === "Nano" ? C.goldDeep : C.purple, background: event.type === "Nano" ? C.goldFill : C.purpleSoft, padding: "2px 7px", borderRadius: 4, fontFamily: F }}>{event.type.toUpperCase()}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            <Avatar avatar={event.host.avatar} name={event.host.name} size={18} />
            <span style={{ fontSize: 11.5, color: C.textM, fontFamily: F }}>by {event.host.name}</span>
            {event.host.pro && <ProBadge />}{event.host.trusted && <TrustedBadge />}
          </div>
          {event.host.trusted && <HostMetricsInline host={event.host} />}
          <div style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 11.5, color: C.textM, fontFamily: F, marginTop: 5 }}>
            <span>{event.time}</span><span style={{ width: 2, height: 2, borderRadius: 99, background: C.textLL }} />
            <span style={{ color: C.text, fontFamily: Fm, fontWeight: 600 }}>{event.attendees}/{event.capacity}</span>
            <span style={{ width: 2, height: 2, borderRadius: 99, background: C.textLL }} />
            {event.price ? <span style={{ color: C.green, fontWeight: 600, fontFamily: Fm }}>{fmtIDR(event.price)}</span> : <span style={{ color: C.green, fontWeight: 500 }}>Free</span>}
          </div>
        </div>
      </div>
      {event.mealDrink && (
        <div style={{ padding: "9px 12px", borderRadius: 10, marginBottom: 6, background: event.mealDrink.included ? "rgba(31,159,74,0.05)" : C.surface2, border: `1px solid ${event.mealDrink.included ? C.greenLine : C.border}` }}>
          <div style={{ fontSize: 10.5, fontWeight: 600, color: C.textM, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: F, marginBottom: event.mealDrink.included && event.mealDrink.items ? 5 : 0, display: "flex", alignItems: "center", gap: 5 }}>
            <span>🍽️</span><span>{event.mealDrink.included ? "Meal & Drink · included" : "No meal — bring your own"}</span>
          </div>
          {event.mealDrink.included && event.mealDrink.items && (
            <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
              {event.mealDrink.items.map(i => <li key={i} style={{ fontSize: 12, color: C.text, fontFamily: F, lineHeight: 1.5, display: "flex", gap: 6 }}><span style={{ color: C.green, fontWeight: 700 }}>✓</span><span>{i}</span></li>)}
            </ul>
          )}
        </div>
      )}
      {event.bring && event.bring.length > 0 && (
        <div style={{ padding: "9px 12px", borderRadius: 10, marginBottom: 8, background: C.goldFill, border: `1px solid ${C.goldSoft}` }}>
          <div style={{ fontSize: 10.5, fontWeight: 600, color: C.goldDarker, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: F, marginBottom: 5, display: "flex", alignItems: "center", gap: 5 }}><span>🎒</span><span>What to bring</span></div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {event.bring.map(b => <li key={b} style={{ fontSize: 12, color: C.text, fontFamily: F, lineHeight: 1.5, display: "flex", gap: 6 }}><span style={{ color: C.goldDeep, fontWeight: 700 }}>·</span><span>{b}</span></li>)}
          </ul>
        </div>
      )}
      <button onClick={() => !isFull && onRSVP(event)} disabled={isFull} style={{ width: "100%", padding: "10px 12px", background: isFull ? C.surface2 : C.text, color: isFull ? C.textL : "white", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 600, fontFamily: F, cursor: isFull ? "not-allowed" : "pointer" }}>{isFull ? "Full · Join Waitlist" : event.price ? `RSVP & Pay · ${fmtIDR(event.price)}` : "RSVP — Get QR"}</button>
    </div>
  );
};

interface PastEventCardProps {
  event: EndedEvent;
  onRate: (event: EndedEvent) => void;
}

const PastEventCard = ({ event, onRate }: PastEventCardProps) => (
  <div style={{ padding: 14, background: C.surface, borderRadius: 16, border: `1px solid ${event.rated ? C.border : C.goldSoft}`, boxShadow: event.rated ? C.shadow : `0 4px 16px ${C.goldGlow}, 0 0 0 1px ${C.goldSoft}`, marginBottom: 8, display: "flex", alignItems: "center", gap: 12 }}>
    <div style={{ width: 44, height: 44, borderRadius: 12, background: event.rated ? C.surface2 : C.goldFill, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{event.emoji}</div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 13.5, fontWeight: 600, color: C.text, fontFamily: F, lineHeight: 1.3 }}>{event.title}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 3 }}>
        <Avatar avatar={event.host.avatar} name={event.host.name} size={14} />
        <span style={{ fontSize: 11, color: C.textL, fontFamily: F }}>{event.host.name} · {event.time}</span>
      </div>
    </div>
    {event.rated ? <span style={{ fontSize: 10, fontWeight: 700, color: C.green, background: C.greenSoft, padding: "5px 9px", borderRadius: 99, fontFamily: F }}>✓ RATED</span> : <button onClick={() => onRate(event)} style={{ padding: "7px 14px", background: `linear-gradient(135deg, ${C.gold}, ${C.goldDeep})`, color: "white", border: "none", borderRadius: 99, fontSize: 12, fontWeight: 700, fontFamily: F, cursor: "pointer", boxShadow: `0 2px 8px ${C.goldSoft}` }}>Rate & tip →</button>}
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   DISCOVER
   ═══════════════════════════════════════════════════════════════ */

interface DiscoverScreenProps {
  moments: Moment[];
  endedEvents: EndedEvent[];
  onTouch: (id: string) => void;
  onUntouch: (id: string) => void;
  onShare: (moment: Moment) => void;
  onRSVP: (event: UpcomingEvent) => void;
  onRate: (event: EndedEvent) => void;
  onClaimPin: (pin: Claimable) => void;
}

const DiscoverScreen = ({ moments, endedEvents, onTouch, onUntouch, onShare, onRSVP, onRate, onClaimPin }: DiscoverScreenProps) => {
  const unrated = endedEvents.filter(e => !e.rated);
  return (
    <div>
      <TopBar title="Foldin" subtitle={`${ME.city} · 3km radius`} large />
      <InteractiveMap />
      <div style={{ padding: "16px 0 20px" }}>
        {unrated.length > 0 && (<>
          <SectionLabel>To rate</SectionLabel>
          <div style={{ padding: "0 20px", marginBottom: 18 }}>{unrated.map(e => <PastEventCard key={e.id} event={e} onRate={onRate} />)}</div>
        </>)}
        <div style={{ marginBottom: 18 }}>
          <div style={{ padding: "0 20px 10px", display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: 99, background: C.red, animation: "blink 1.5s infinite" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: C.red, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: F }}>Live now</span>
          </div>
          <div style={{ display: "flex", gap: 10, padding: "0 20px", overflowX: "auto" }}>
            {LIVE_EVENTS.map(e => (
              <div key={e.id} style={{ flexShrink: 0, width: 170, padding: 14, background: C.surface, borderRadius: 16, border: `1px solid ${C.border}`, boxShadow: C.shadow, position: "relative" }}>
                <div style={{ position: "absolute", top: 10, right: 10, padding: "2px 7px", background: C.redSoft, color: C.red, borderRadius: 99, fontSize: 9, fontWeight: 700, fontFamily: F }}>LIVE</div>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: C.surface2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 10 }}>{e.emoji}</div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: C.text, fontFamily: F, marginBottom: 4 }}>{e.title}</div>
                <div style={{ fontSize: 11, color: C.textL, fontFamily: F, marginBottom: 8 }}>{e.location}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Avatar avatar={e.host.avatar} name={e.host.name} size={20} />
                  <span style={{ fontSize: 11, color: C.textM, fontFamily: F, flex: 1 }}>{e.host.name}</span>
                  <span style={{ fontSize: 11, color: C.goldDeep, fontFamily: Fm, fontWeight: 700 }}>{e.attendees}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <SectionLabel action="See all">Upcoming near you</SectionLabel>
        <div style={{ padding: "0 20px", marginBottom: 18 }}>{UPCOMING.map(e => <EventRow key={e.id} event={e} onRSVP={onRSVP} />)}</div>
        <SectionLabel action="See all">Communities to join</SectionLabel>
        <div style={{ display: "flex", gap: 10, padding: "0 20px 18px", overflowX: "auto" }}>
          {COMMUNITIES.map(c => (
            <div key={c.id} style={{ flexShrink: 0, width: 200, padding: 14, background: C.surface, borderRadius: 16, border: `1px solid ${C.border}`, boxShadow: C.shadow }}>
              <Avatar avatar={c.avatar} name={c.name} size={44} />
              <div style={{ fontSize: 14, fontWeight: 600, color: C.text, fontFamily: F, marginTop: 10 }}>{c.name}</div>
              <div style={{ fontSize: 11, color: C.textL, fontFamily: F, marginBottom: 8 }}><span style={{ fontFamily: Fm, color: C.goldDeep, fontWeight: 700 }}>{c.members}</span> members</div>
              <div style={{ fontSize: 12, color: C.textM, fontFamily: F, lineHeight: 1.4, marginBottom: 12 }}>{c.desc}</div>
              <button style={{ width: "100%", padding: 8, background: C.goldFill, border: `1px solid ${C.goldSoft}`, color: C.goldDarker, borderRadius: 8, fontSize: 12, fontWeight: 600, fontFamily: F, cursor: "pointer" }}>Join</button>
            </div>
          ))}
        </div>
        <SectionLabel>Moments</SectionLabel>
        <div style={{ padding: "0 14px" }}>{moments.map(m => <MomentCard key={m.id} moment={m} onTouch={onTouch} onUntouch={onUntouch} onShare={onShare} onClaimPin={onClaimPin} />)}</div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   EXPLORE
   ═══════════════════════════════════════════════════════════════ */

interface ExploreResult {
  name: string;
  handle?: string;
  avatar?: string;
  emoji?: string;
  area?: string;
  meta: string;
  kyc?: boolean;
  claimed?: boolean;
  moments?: number;
  events?: number;
}

interface ExploreScreenProps {
  onClaimPin: (pin: Claimable) => void;
}

const ExploreScreen = ({ onClaimPin }: ExploreScreenProps) => {
  const [q, setQ] = useState<string>("");
  const results: ExploreResult[] = [
    { name: "Andra K", handle: "andra", avatar: "🎧", meta: "560K · Pro Host", kyc: true },
    { name: "Maya Putri", handle: "mayap", avatar: "🌺", meta: "1.2M · OG", kyc: true },
    ...PLACES.map(p => ({ ...p, meta: `${p.moments} moments` })),
  ];
  const filtered = q ? results.filter(r => r.name.toLowerCase().includes(q.toLowerCase())) : results;
  return (
    <div>
      <TopBar title="Explore" large />
      <div style={{ padding: "12px 20px 20px" }}>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search people, places, hosts" style={{ width: "100%", padding: "11px 14px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, marginBottom: 14, boxShadow: C.shadow, color: C.text, fontFamily: F, fontSize: 13.5, outline: "none" }} />
        {filtered.map((r, i) => {
          const isPlace = r.area !== undefined;
          return (
            <div key={i} style={{ padding: 12, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, marginBottom: 8, boxShadow: C.shadow }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {isPlace ? <div style={{ width: 44, height: 44, borderRadius: 12, background: C.surface2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{r.emoji}</div> : <Avatar avatar={r.avatar} name={r.name} size={44} showKYC={r.kyc} />}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.text, fontFamily: F }}>{r.name}</div>
                  <div style={{ fontSize: 11.5, color: C.textL, fontFamily: F }}>{r.handle ? `@${r.handle} · ` : ""}{r.meta}</div>
                </div>
              </div>
              {isPlace && r.claimed === false && (
                <div style={{ marginTop: 10, padding: "8px 12px", background: C.goldFill, border: `1px solid ${C.goldSoft}`, borderRadius: 10, display: "flex", alignItems: "center", gap: 8 }}>
                  <Sparkle size={11} />
                  <span style={{ fontSize: 11, color: C.goldDarker, fontFamily: F, flex: 1 }}>Brand-claimable · 60/30/10</span>
                  <button onClick={() => onClaimPin({ name: r.name })} style={{ padding: "5px 10px", background: C.goldDeep, color: "white", border: "none", borderRadius: 99, fontSize: 11, fontWeight: 600, fontFamily: F, cursor: "pointer" }}>Claim</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   MESSAGES (DMs first, Ghost Match below)
   ═══════════════════════════════════════════════════════════════ */

const MessageScreen = () => (
  <div>
    <TopBar title="Messages" large />
    <div style={{ padding: "14px 20px 20px" }}>
      <SectionLabel padding="0 0 10px">Direct messages</SectionLabel>
      {DMS.map((dm, i) => (
        <div key={i} style={{ padding: 12, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, marginBottom: 8, boxShadow: C.shadow, display: "flex", alignItems: "center", gap: 12 }}>
          <Avatar avatar={dm.avatar} name={dm.name} size={44} />
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 13.5, fontWeight: 600, color: C.text, fontFamily: F }}>{dm.name}</span>
              <span style={{ fontSize: 11, color: C.textL, fontFamily: F, marginLeft: "auto" }}>{dm.time}</span>
            </div>
            <div style={{ fontSize: 12, color: dm.unread > 0 ? C.text : C.textL, fontFamily: F, marginTop: 2, fontWeight: dm.unread > 0 ? 500 : 400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{dm.last}</div>
          </div>
          {dm.unread > 0 && <div style={{ width: 20, height: 20, borderRadius: 99, background: C.gold, color: C.text, fontSize: 10, fontWeight: 700, fontFamily: F, display: "flex", alignItems: "center", justifyContent: "center" }}>{dm.unread}</div>}
        </div>
      ))}
      <SectionLabel padding="22px 0 10px">Ghost Match</SectionLabel>
      <div style={{ padding: 14, marginBottom: 8, borderRadius: 16, background: `linear-gradient(135deg, ${C.purpleSoft} 0%, ${C.surface} 100%)`, border: `1px solid ${C.border}`, boxShadow: C.shadow }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
          <span style={{ fontSize: 16 }}>👻</span>
          <span style={{ fontSize: 10, fontWeight: 700, color: C.purple, letterSpacing: "0.15em", fontFamily: F }}>GHOST MATCH</span>
        </div>
        <div style={{ fontSize: 13, color: C.text, fontFamily: F, lineHeight: 1.5 }}>People you keep crossing paths with.</div>
      </div>
      {GHOSTS.map((g, i) => (
        <div key={i} style={{ padding: 14, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, marginBottom: 8, boxShadow: C.shadow }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Avatar avatar={g.avatar} name={g.name} size={46} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.text, fontFamily: F }}>{g.name}</div>
              <div style={{ fontSize: 11, color: C.textL, fontFamily: F }}>{g.lastSeen}</div>
              <div style={{ display: "flex", gap: 4, marginTop: 6, flexWrap: "wrap" }}>
                {g.shared.map(t => <span key={t} style={{ fontSize: 10, padding: "2px 7px", background: C.surface2, color: C.textM, borderRadius: 99, fontFamily: F }}>{t}</span>)}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: Fs, fontSize: 24, color: C.goldDeep }}>{g.strength}</div>
              <div style={{ fontSize: 8.5, color: C.textL, fontFamily: F, letterSpacing: "0.12em", textTransform: "uppercase" }}>match</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   QR CODE + RSVP MODAL
   ═══════════════════════════════════════════════════════════════ */

interface QRCodeVisualProps { size?: number; seed?: string; }

const QRCodeVisual = ({ size = 200, seed = "FOLDIN" }: QRCodeVisualProps) => {
  const grid = 25, cell = size / grid;
  const cells: React.ReactElement[] = [];
  const drawCorner = (ox: number, oy: number) => {
    for (let y = 0; y < 7; y++) for (let x = 0; x < 7; x++) {
      if (x === 0 || x === 6 || y === 0 || y === 6 || (x >= 2 && x <= 4 && y >= 2 && y <= 4))
        cells.push(<rect key={`c${ox}${oy}${x}${y}`} x={(ox + x) * cell} y={(oy + y) * cell} width={cell + 0.5} height={cell + 0.5} fill="black" />);
    }
  };
  drawCorner(0, 0); drawCorner(grid - 7, 0); drawCorner(0, grid - 7);
  let s = 0; for (let i = 0; i < seed.length; i++) s += seed.charCodeAt(i);
  for (let y = 0; y < grid; y++) for (let x = 0; x < grid; x++) {
    if ((x < 8 && y < 8) || (x >= grid - 8 && y < 8) || (x < 8 && y >= grid - 8)) continue;
    if ((x * 13 + y * 7 + x * y * 3 + s) % 7 < 3) cells.push(<rect key={`${x}${y}`} x={x * cell} y={y * cell} width={cell + 0.5} height={cell + 0.5} fill="black" />);
  }
  return <svg width={size} height={size} style={{ background: "white", borderRadius: 8 }}>{cells}</svg>;
};

interface QRRSVPModalProps {
  event: UpcomingEvent | null;
  onClose: () => void;
}

const QRRSVPModal = ({ event, onClose }: QRRSVPModalProps) => !event ? null : (
  <div style={{ position: "absolute", inset: 0, background: "rgba(20,15,5,0.55)", zIndex: 70, display: "flex", alignItems: "flex-end" }}>
    <div style={{ width: "100%", background: C.bg, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: "10px 0 28px" }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}><div style={{ width: 40, height: 4, borderRadius: 2, background: C.border }} /></div>
      <div style={{ padding: "0 20px", textAlign: "center", marginBottom: 18 }}>
        <div style={{ display: "inline-flex", padding: "5px 11px", background: C.greenSoft, color: C.green, borderRadius: 99, fontSize: 10.5, fontWeight: 700, fontFamily: F, letterSpacing: "0.1em", marginBottom: 10 }}>✓ YOU'RE IN</div>
        <div style={{ fontFamily: Fs, fontSize: 28, color: C.text, letterSpacing: "-0.02em", lineHeight: 1.1 }}>See you there.</div>
      </div>
      <div style={{ padding: "0 20px", marginBottom: 16 }}>
        <div style={{ padding: 20, background: C.surface, borderRadius: 18, border: `1px solid ${C.goldSoft}`, boxShadow: `0 8px 24px ${C.goldGlow}`, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <QRCodeVisual size={200} seed={event.id} />
          <div style={{ marginTop: 12, fontSize: 11, color: C.textM, fontFamily: Fm, fontWeight: 600 }}>FOLDIN-{event.id.toUpperCase()}-{Date.now().toString(36).slice(-4).toUpperCase()}</div>
        </div>
        <div style={{ fontSize: 12, color: C.textM, fontFamily: F, textAlign: "center", marginTop: 12, lineHeight: 1.5 }}>Show this at check-in.<br />The host will scan to confirm your spot.</div>
      </div>
      <div style={{ padding: "0 20px", marginBottom: 14 }}>
        <div style={{ padding: 14, background: C.surface, borderRadius: 14, border: `1px solid ${C.border}`, boxShadow: C.shadow }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: C.surface2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{event.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.text, fontFamily: F }}>{event.title}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                <Avatar avatar={event.host.avatar} name={event.host.name} size={14} />
                <span style={{ fontSize: 11, color: C.textL, fontFamily: F }}>{event.host.name}</span>
                {event.host.trusted && <TrustedBadge />}
              </div>
            </div>
          </div>
          <div style={{ height: 1, background: C.border, margin: "10px 0" }} />
          <Row label="When" value={event.time} /><Row label="Where" value={event.location || "TBA"} /><Row label="Capacity" value={`${event.attendees + 1}/${event.capacity}`} />
        </div>
      </div>
      <div style={{ padding: "0 20px" }}>
        <button onClick={onClose} style={{ width: "100%", padding: 12, background: C.text, color: "white", border: "none", borderRadius: 12, fontSize: 13, fontWeight: 700, fontFamily: F, cursor: "pointer" }}>Done</button>
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   POST-EVENT MODAL (Touch / Untouch + Tip)
   ═══════════════════════════════════════════════════════════════ */

interface PostEventSubmitData {
  event: EndedEvent;
  touched: TouchedState;
  tip: number;
  feedback: string;
}

interface PostEventModalProps {
  event: EndedEvent | null;
  onClose: () => void;
  onSubmit: (data: PostEventSubmitData) => void;
}

const PostEventModal = ({ event, onClose, onSubmit }: PostEventModalProps) => {
  const [touched, setTouched] = useState<TouchedState>(null);
  const [tipAmount, setTipAmount] = useState<number>(50000);
  const [customTip, setCustomTip] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  if (!event) return null;
  const finalTip = customTip ? parseInt(customTip) || 0 : tipAmount;
  const fee = Math.floor(finalTip * 0.10);
  const hostGets = finalTip - fee;
  const submit = (withTip: boolean) => onSubmit({ event, touched, tip: withTip ? finalTip : 0, feedback });
  return (
    <div style={{ position: "absolute", inset: 0, background: "rgba(20,15,5,0.55)", zIndex: 80, display: "flex", alignItems: "flex-end" }}>
      <div style={{ width: "100%", maxHeight: "96%", background: C.bg, borderTopLeftRadius: 24, borderTopRightRadius: 24, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 0" }}><div style={{ width: 40, height: 4, borderRadius: 2, background: C.border }} /></div>
        <div style={{ display: "flex", alignItems: "center", padding: "10px 20px" }}>
          <button onClick={onClose} style={{ background: "none", border: "none", color: C.textM, fontSize: 13.5, cursor: "pointer", fontFamily: F }}>Skip</button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "8px 20px 28px" }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ width: 72, height: 72, borderRadius: 22, background: C.surface, border: `1px solid ${C.border}`, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 36, boxShadow: C.shadowMd, marginBottom: 14 }}>{event.emoji}</div>
            <div style={{ fontSize: 10.5, fontWeight: 600, color: C.textL, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: F, marginBottom: 6 }}>{event.time}</div>
            <div style={{ fontFamily: Fs, fontSize: 32, color: C.text, letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: 8 }}>How was {event.title}?</div>
            <div style={{ fontSize: 14, color: C.textM, fontFamily: F }}>Was it memorable?</div>
          </div>
          {!touched && (
            <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
              <button onClick={() => setTouched("touched")} style={{ flex: 1, padding: "22px 16px", background: C.surface, border: `2px solid ${C.border}`, borderRadius: 18, cursor: "pointer", fontFamily: F, boxShadow: C.shadow }}>
                <div style={{ fontSize: 44, marginBottom: 8 }}>💛</div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: C.text }}>Touched</div>
                <div style={{ fontSize: 11, color: C.textL, marginTop: 3 }}>It was memorable</div>
              </button>
              <button onClick={() => setTouched("untouched")} style={{ flex: 1, padding: "22px 16px", background: C.surface, border: `2px solid ${C.border}`, borderRadius: 18, cursor: "pointer", fontFamily: F, boxShadow: C.shadow }}>
                <div style={{ fontSize: 44, marginBottom: 8 }}>💔</div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: C.text }}>Untouched</div>
                <div style={{ fontSize: 11, color: C.textL, marginTop: 3 }}>Didn't land</div>
              </button>
            </div>
          )}
          {touched === "touched" && (
            <>
              <div style={{ padding: 14, background: C.goldFill, border: `1px solid ${C.goldSoft}`, borderRadius: 14, marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ fontSize: 32 }}>💛</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.text, fontFamily: F }}>You touched this event</div>
                  <div style={{ fontSize: 11.5, color: C.goldDarker, fontFamily: F }}>Counts toward {event.host.name}'s satisfaction</div>
                </div>
              </div>
              <div style={{ padding: 16, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, boxShadow: C.shadow, marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <Avatar avatar={event.host.avatar} name={event.host.name} size={44} showKYC={event.host.pro} />
                  <div style={{ fontFamily: Fs, fontSize: 20, color: C.text }}>Tip {event.host.name} to support them</div>
                </div>
                <div style={{ fontSize: 12.5, color: C.textM, fontFamily: F, lineHeight: 1.5, marginBottom: 14 }}>When you tip a host, you show them their work matters. Foldin keeps 10% — the rest goes directly to them.</div>
                <FieldLabel>Quick amount</FieldLabel>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, marginBottom: 12 }}>
                  {[10000, 25000, 50000, 100000].map(a => (
                    <button key={a} onClick={() => { setTipAmount(a); setCustomTip(""); }} style={{ padding: "12px 4px", background: !customTip && tipAmount === a ? C.text : C.surface, color: !customTip && tipAmount === a ? "white" : C.text, border: !customTip && tipAmount === a ? "none" : `1px solid ${C.border}`, borderRadius: 10, fontSize: 12, fontWeight: 600, fontFamily: F, cursor: "pointer" }}>{a / 1000}K</button>
                  ))}
                </div>
                <FieldLabel>Or custom</FieldLabel>
                <div style={{ display: "flex", alignItems: "center", padding: "0 14px", background: C.surface, border: `1px solid ${customTip ? C.goldSoft : C.border}`, borderRadius: 10, marginBottom: 12 }}>
                  <span style={{ color: C.textM, fontSize: 14, fontFamily: F }}>Rp</span>
                  <input value={customTip} onChange={e => setCustomTip(e.target.value.replace(/\D/g, ""))} placeholder="0" style={{ flex: 1, padding: 12, background: "transparent", border: "none", outline: "none", color: C.text, fontSize: 14, fontFamily: Fm, fontWeight: 600 }} />
                </div>
                {finalTip > 0 && (
                  <div style={{ padding: 12, background: C.surface2, borderRadius: 10, border: `1px solid ${C.border}`, marginBottom: 12 }}>
                    <Row label="Your tip" value={fmtIDR(finalTip)} />
                    <Row label="Foldin (10%)" value={`− ${fmtIDR(fee)}`} muted />
                    <div style={{ height: 1, background: C.border, margin: "6px 0" }} />
                    <Row label={`${event.host.name} receives`} value={fmtIDR(hostGets)} accent bold />
                  </div>
                )}
                <button onClick={() => submit(true)} disabled={finalTip <= 0} style={{ width: "100%", padding: 14, background: finalTip > 0 ? `linear-gradient(135deg, ${C.gold}, ${C.goldDeep})` : C.surface3, color: finalTip > 0 ? "white" : C.textL, border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, fontFamily: F, cursor: finalTip > 0 ? "pointer" : "not-allowed", marginBottom: 8 }}>Send {finalTip > 0 ? fmtIDR(finalTip) : "tip"} & submit</button>
                <button onClick={() => submit(false)} style={{ width: "100%", padding: 12, background: "transparent", color: C.textM, border: "none", fontSize: 12.5, fontFamily: F, cursor: "pointer" }}>Skip tip, just submit rating</button>
              </div>
            </>
          )}
          {touched === "untouched" && (
            <>
              <div style={{ padding: 14, background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 14, marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ fontSize: 32 }}>💔</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.text, fontFamily: F }}>You weren't moved</div>
                  <div style={{ fontSize: 11.5, color: C.textM, fontFamily: F }}>Private — only the host sees it</div>
                </div>
              </div>
              <FieldLabel>What could've been better?</FieldLabel>
              <textarea value={feedback} onChange={e => setFeedback(e.target.value.slice(0, 280))} placeholder="Started late · Too crowded · Didn't feel intimate" style={{ width: "100%", padding: 12, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, color: C.text, fontSize: 13, fontFamily: F, outline: "none", minHeight: 100, resize: "vertical", marginBottom: 14, boxShadow: C.shadow }} />
              <button onClick={() => submit(false)} style={{ width: "100%", padding: 14, background: C.text, color: "white", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, fontFamily: F, cursor: "pointer" }}>Submit feedback</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   CLAIM MODAL (brand claims a pin)
   ═══════════════════════════════════════════════════════════════ */

interface ClaimModalProps {
  pin: Claimable | null;
  onClose: () => void;
}

const ClaimModal = ({ pin, onClose }: ClaimModalProps) => !pin ? null : (
  <div style={{ position: "absolute", inset: 0, background: "rgba(20,15,5,0.45)", zIndex: 70, display: "flex", alignItems: "flex-end" }}>
    <div style={{ width: "100%", background: C.bg, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: "10px 0 28px" }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}><div style={{ width: 40, height: 4, borderRadius: 2, background: C.border }} /></div>
      <div style={{ padding: "0 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <div>
            <div style={{ fontFamily: Fs, fontSize: 24, color: C.text }}>Claim {pin.name}</div>
            <div style={{ fontSize: 12.5, color: C.textM, fontFamily: F, marginTop: 4 }}>For brand owners. KYC required.</div>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 99, background: C.surface, border: `1px solid ${C.border}`, color: C.textM, cursor: "pointer" }}>✕</button>
        </div>
        <div style={{ padding: 16, background: C.goldFill, borderRadius: 14, border: `1px solid ${C.goldSoft}`, marginBottom: 14 }}>
          <FieldLabel style={{ marginBottom: 10 }}>Revenue split</FieldLabel>
          <div style={{ display: "flex", borderRadius: 8, overflow: "hidden", background: "white" }}>
            <div style={{ flex: 60, padding: "10px 12px", background: `linear-gradient(135deg, ${C.gold}, ${C.goldDeep})`, color: "white" }}><div style={{ fontSize: 18, fontWeight: 700, fontFamily: Fm }}>60%</div><div style={{ fontSize: 10, fontWeight: 600 }}>You (brand)</div></div>
            <div style={{ flex: 30, padding: "10px 12px", background: C.surface3, color: C.text }}><div style={{ fontSize: 16, fontWeight: 700, fontFamily: Fm }}>30%</div><div style={{ fontSize: 10, fontWeight: 600, color: C.textM }}>Contributor</div></div>
            <div style={{ flex: 10, padding: "10px 12px", background: C.surface2, color: C.textM }}><div style={{ fontSize: 14, fontWeight: 700, fontFamily: Fm }}>10%</div><div style={{ fontSize: 10, fontWeight: 600 }}>Foldin</div></div>
          </div>
        </div>
        <button style={{ width: "100%", padding: 14, background: `linear-gradient(135deg, ${C.gold}, ${C.goldDeep})`, color: "white", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, fontFamily: F, cursor: "pointer" }}>Start KYC verification</button>
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   POSTCARD MODAL (share)
   ═══════════════════════════════════════════════════════════════ */

interface PostcardModalProps {
  moment: Moment | null;
  onClose: () => void;
}

const PostcardModal = ({ moment, onClose }: PostcardModalProps) => !moment ? null : (
  <div style={{ position: "absolute", inset: 0, background: "rgba(20,15,5,0.55)", zIndex: 60, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20 }}>
    <div style={{ width: "100%", maxWidth: 320, padding: 24, borderRadius: 22, background: C.surface, border: `1px solid ${C.border}`, boxShadow: `0 30px 80px rgba(0,0,0,0.4)` }}>
      <div style={{ fontSize: 9, fontWeight: 700, color: C.goldDarker, letterSpacing: "0.3em", fontFamily: F, marginBottom: 18 }}>FOLDIN MOMENT</div>
      <div style={{ fontFamily: Fs, fontSize: 56, color: C.text, lineHeight: 0.95, letterSpacing: "-0.04em" }}>{fmt(moment.touches)}</div>
      <div style={{ fontSize: 13.5, color: C.textM, fontFamily: F, marginBottom: 22 }}>people touched this moment</div>
      <div style={{ padding: 14, background: C.surface2, borderRadius: 12, marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: C.text, lineHeight: 1.5, fontFamily: Fs, fontStyle: "italic" }}>"{moment.text.slice(0, 110)}{moment.text.length > 110 ? "…" : ""}"</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, paddingTop: 14, borderTop: `1px dashed ${C.border}` }}>
        <Avatar avatar={moment.user.avatar} name={moment.user.name} size={28} />
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.text, fontFamily: F }}>{moment.user.name}</div>
          <div style={{ fontSize: 10, color: C.textL, fontFamily: Fm }}>foldin.app/@{moment.user.handle}</div>
        </div>
      </div>
    </div>
    <div style={{ display: "flex", gap: 6, marginTop: 22, flexWrap: "wrap", justifyContent: "center" }}>
      {([{ id: "x" as SharePlatform, label: "X" }, { id: "whatsapp" as SharePlatform, label: "WhatsApp" }, { id: "telegram" as SharePlatform, label: "Telegram" }, { id: "native" as SharePlatform, label: "More" }, { id: "copy" as SharePlatform, label: "Copy" }]).map(p => (
        <button key={p.id} onClick={() => shareTo(p.id, moment)} style={{ background: "rgba(255,255,255,0.95)", color: C.text, border: "none", padding: "9px 14px", borderRadius: 99, fontSize: 12, fontWeight: 600, fontFamily: F, cursor: "pointer" }}>{p.label}</button>
      ))}
    </div>
    <button onClick={onClose} style={{ marginTop: 18, background: "none", border: "none", color: "rgba(255,255,255,0.7)", fontSize: 13, fontFamily: F, cursor: "pointer" }}>Close</button>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   CREATE MODAL
   ═══════════════════════════════════════════════════════════════ */

type CreateType = "moment" | "event" | "pin" | null;

interface CreateModalProps {
  onClose: () => void;
  onPostMoment: (data: { text: string }) => void;
}

const CreateModal = ({ onClose, onPostMoment }: CreateModalProps) => {
  const [type, setType] = useState<CreateType>(null);
  const [text, setText] = useState<string>("");
  return (
    <div style={{ position: "absolute", inset: 0, background: "rgba(20,15,5,0.45)", zIndex: 50, display: "flex", alignItems: "flex-end" }}>
      <div style={{ width: "100%", maxHeight: "94%", background: C.bg, borderTopLeftRadius: 24, borderTopRightRadius: 24, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 0" }}><div style={{ width: 40, height: 4, borderRadius: 2, background: C.border }} /></div>
        <div style={{ display: "flex", alignItems: "center", padding: "12px 20px" }}>
          <button onClick={type ? () => setType(null) : onClose} style={{ background: "none", border: "none", color: C.textM, fontSize: 13.5, cursor: "pointer", fontFamily: F }}>{type ? "← Back" : "Cancel"}</button>
          <div style={{ flex: 1, textAlign: "center", color: C.text, fontWeight: 600, fontSize: 15, fontFamily: F }}>{type ? `New ${type}` : "Create"}</div>
          {type === "moment" && <button onClick={() => { onPostMoment({ text }); onClose(); }} disabled={!text} style={{ background: text ? C.text : C.surface3, color: text ? "white" : C.textL, border: "none", padding: "8px 16px", borderRadius: 99, fontSize: 12.5, fontWeight: 700, fontFamily: F, cursor: text ? "pointer" : "not-allowed" }}>Post</button>}
          {!type && <div style={{ width: 50 }} />}
        </div>
        <div style={{ padding: "16px 20px 28px", flex: 1, overflowY: "auto" }}>
          {!type && (
            <>
              <div style={{ fontFamily: Fs, fontSize: 26, color: C.text, marginBottom: 22 }}>What are you putting into the world?</div>
              {([{ id: "moment" as CreateType, label: "Moment", icon: "💭", desc: "Share a thought" }, { id: "event" as CreateType, label: "Event", icon: "📅", desc: "Host something" }, { id: "pin" as CreateType, label: "Pin", icon: "📍", desc: "Drop a place" }]).map(t => (
                <button key={t.id} onClick={() => setType(t.id)} style={{ width: "100%", padding: 16, marginBottom: 8, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 14, boxShadow: C.shadow }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: C.surface2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{t.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14.5, fontWeight: 600, color: C.text, fontFamily: F }}>{t.label}</div>
                    <div style={{ fontSize: 12, color: C.textL, fontFamily: F }}>{t.desc}</div>
                  </div>
                </button>
              ))}
            </>
          )}
          {type === "moment" && (
            <textarea value={text} onChange={e => setText(e.target.value.slice(0, 500))} placeholder="What's real right now?" autoFocus style={{ width: "100%", minHeight: 200, background: "transparent", border: "none", outline: "none", color: C.text, fontSize: 16, fontFamily: F, lineHeight: 1.55, resize: "none" }} />
          )}
          {type === "event" && (
            <div style={{ fontSize: 13, color: C.textM, fontFamily: F, padding: 16, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12 }}>
              Event creation flow with Meal/Drink + What to bring fields. Paid events require Foldin Pro (KYC). Tips on hosts only available after event ends.
            </div>
          )}
          {type === "pin" && (
            <div style={{ fontSize: 13, color: C.textM, fontFamily: F, padding: 16, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12 }}>
              One pin per location. When the venue claims this pin as a brand, you earn 30% forever.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   PROFILE
   ═══════════════════════════════════════════════════════════════ */

type ProfileTab = "moments" | "events" | "pins";

interface ProfileScreenProps {
  moments: Moment[];
}

const ProfileScreen = ({ moments }: ProfileScreenProps) => {
  const [tab, setTab] = useState<ProfileTab>("moments");
  return (
    <div>
      <TopBar title="Profile" />
      <div style={{ padding: "20px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 14 }}>
          <Avatar avatar={ME.avatar} name={ME.name} size={88} ring showKYC />
          <div style={{ flex: 1, paddingTop: 8 }}>
            <div style={{ fontFamily: Fs, fontSize: 24, color: C.text }}>{ME.name}</div>
            <div style={{ fontSize: 13, color: C.textL, fontFamily: F, marginTop: 3 }}>@{ME.handle} · {ME.city}</div>
            <div style={{ display: "flex", gap: 5, marginTop: 8, flexWrap: "wrap" }}>
              {ME.isPro && <ProBadge />}{ME.trusted && <TrustedBadge />}{ME.kyc && <KYCBadge />}
              {ME.badges.map(b => <span key={b} style={{ fontSize: 9.5, fontWeight: 700, color: C.green, background: C.greenSoft, padding: "3px 7px", borderRadius: 4, fontFamily: F }}>{b}</span>)}
            </div>
          </div>
        </div>
        <div style={{ fontSize: 14, color: C.text, fontFamily: F, lineHeight: 1.5, marginBottom: 18 }}>{ME.bio}</div>

        {ME.trusted && (
          <div style={{ padding: 14, background: C.surface, border: `1px solid ${C.goldSoft}`, borderRadius: 16, marginBottom: 14, boxShadow: C.shadow }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <TrustedBadge />
              <span style={{ fontSize: 11, fontWeight: 600, color: C.textM, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: F }}>Host metrics</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {[{ icon: "⭐", label: "Satisfaction", value: `${ME.satisfaction}%` }, { icon: "👋", label: "Show-up", value: `${ME.showupRate}%` }, { icon: "🔄", label: "Retention", value: `${ME.retention}%` }].map(m => (
                <div key={m.label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 20, marginBottom: 4 }}>{m.icon}</div>
                  <div style={{ fontFamily: Fs, fontSize: 22, color: C.text }}>{m.value}</div>
                  <div style={{ fontSize: 10, color: C.textL, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 4, fontWeight: 600 }}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 18 }}>
          {[{ label: "Impact", value: fmt(ME.impact), accent: true }, { label: "Events", value: ME.events.toString() }, { label: "Pins", value: ME.pins.toString() }, { label: "Moments", value: ME.moments.toString() }].map(s => (
            <div key={s.label} style={{ padding: "14px 6px", textAlign: "center", background: s.accent ? C.goldFill : C.surface, border: `1px solid ${s.accent ? C.goldSoft : C.border}`, borderRadius: 14, boxShadow: C.shadow }}>
              <div style={{ fontFamily: Fs, fontSize: 24, color: s.accent ? C.goldDarker : C.text }}>{s.value}</div>
              <div style={{ fontSize: 10, color: C.textL, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 6, fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ padding: 14, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, marginBottom: 18, boxShadow: C.shadow, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: C.goldFill, display: "flex", alignItems: "center", justifyContent: "center" }}><Sparkle size={16} /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: C.textM, fontFamily: F, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>Tips earned · this month</div>
            <div style={{ fontFamily: Fs, fontSize: 22, color: C.text }}>{fmtIDR(ME.tipsEarned)}</div>
          </div>
          <button style={{ padding: "7px 12px", background: C.text, color: "white", border: "none", borderRadius: 99, fontSize: 12, fontWeight: 600, fontFamily: F, cursor: "pointer" }}>Withdraw</button>
        </div>

        <div style={{ display: "flex", borderBottom: `1px solid ${C.border}`, marginBottom: 14 }}>
          {([{ id: "moments" as ProfileTab, label: "Moments" }, { id: "events" as ProfileTab, label: "Events" }, { id: "pins" as ProfileTab, label: "Pins" }]).map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, padding: "12px 0", background: "transparent", border: "none", borderBottom: tab === t.id ? `2px solid ${C.gold}` : "2px solid transparent", color: tab === t.id ? C.text : C.textL, fontSize: 12.5, fontWeight: 600, fontFamily: F, cursor: "pointer", marginBottom: -1 }}>{t.label}</button>
          ))}
        </div>
        {tab === "moments" && moments.slice(0, 2).map(m => <div key={m.id} style={{ padding: 14, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, marginBottom: 8 }}><div style={{ fontSize: 13.5, color: C.text, fontFamily: F, lineHeight: 1.5 }}>{m.text.slice(0, 100)}...</div></div>)}
        {tab === "events" && ENDED_EVENTS.map((e, i) => <div key={i} style={{ padding: 14, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, marginBottom: 8, display: "flex", alignItems: "center", gap: 12 }}><div style={{ fontSize: 22 }}>{e.emoji}</div><div style={{ flex: 1 }}><div style={{ fontSize: 13.5, color: C.text, fontFamily: F }}>{e.title}</div><div style={{ fontSize: 11.5, color: C.textL, fontFamily: F }}>{e.time}</div></div></div>)}
        {tab === "pins" && PLACES.map((p, i) => <div key={i} style={{ padding: 14, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, marginBottom: 8, display: "flex", alignItems: "center", gap: 12 }}><div style={{ fontSize: 22 }}>{p.emoji}</div><div style={{ flex: 1 }}><div style={{ fontSize: 13.5, color: C.text, fontFamily: F }}>{p.name}</div><div style={{ fontSize: 11.5, color: C.textL, fontFamily: F }}>{p.area}</div></div></div>)}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   NAV
   ═══════════════════════════════════════════════════════════════ */

type NavIconType = "home" | "search" | "message" | "user";

interface NavIconProps {
  icon: NavIconType;
  active: boolean;
}

const NavIcon = ({ icon, active }: NavIconProps) => {
  const s = active ? C.text : C.textL, f = active ? C.text : "none";
  if (icon === "home") return <svg width="22" height="22" viewBox="0 0 24 24" fill={f} stroke={s} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L12 2l9 7.5V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.5z" /><path d="M9 22V12h6v10" stroke={active ? "white" : s} fill="none" /></svg>;
  if (icon === "search") return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth={active ? 2.4 : 1.8} strokeLinecap="round"><circle cx="11" cy="11" r="7.5" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>;
  if (icon === "message") return <svg width="22" height="22" viewBox="0 0 24 24" fill={f} stroke={s} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>;
  if (icon === "user") return <svg width="22" height="22" viewBox="0 0 24 24" fill={f} stroke={s} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
  return null;
};

interface BottomNavProps {
  tab: TabId;
  setTab: (tab: TabId) => void;
  onCreate: () => void;
}

interface NavItem {
  id: TabId;
  label: string;
  icon?: NavIconType;
  isCreate?: boolean;
}

const BottomNav = ({ tab, setTab, onCreate }: BottomNavProps) => {
  const items: NavItem[] = [
    { id: "discover", label: "Home", icon: "home" },
    { id: "explore", label: "Search", icon: "search" },
    { id: "create", label: "Create", isCreate: true },
    { id: "message", label: "Inbox", icon: "message" },
    { id: "profile", label: "You", icon: "user" },
  ];
  return (
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(251,250,246,0.92)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", borderTop: `1px solid ${C.borderSoft}`, padding: "8px 6px 22px", display: "flex", zIndex: 20 }}>
      {items.map(it => {
        const active = !it.isCreate && tab === it.id;
        return (
          <button key={it.id} onClick={() => it.isCreate ? onCreate() : setTab(it.id)} style={{ flex: 1, background: "none", border: "none", cursor: "pointer", padding: "6px 2px", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, position: "relative" }}>
            {it.isCreate ? (
              <div style={{ width: 36, height: 36, borderRadius: 11, background: `linear-gradient(135deg, ${C.gold}, ${C.goldDeep})`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", boxShadow: `0 4px 14px ${C.goldSoft}`, marginTop: -2 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              </div>
            ) : (
              <div style={{ height: 36, display: "flex", alignItems: "center" }}>{it.icon && <NavIcon icon={it.icon} active={active} />}</div>
            )}
            <span style={{ fontSize: 10, fontFamily: F, fontWeight: active ? 600 : 500, color: active ? C.text : (it.isCreate ? C.goldDarker : C.textL) }}>{it.label}</span>
            {active && <div style={{ position: "absolute", bottom: 16, width: 4, height: 4, borderRadius: 99, background: C.gold }} />}
          </button>
        );
      })}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════════════ */

export default function FoldinApp() {
  const [tab, setTab] = useState<TabId>("discover");
  const [moments, setMoments] = useState<Moment[]>(MOMENTS);
  const [endedEvents, setEndedEvents] = useState<EndedEvent[]>(ENDED_EVENTS);
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [postcard, setPostcard] = useState<Moment | null>(null);
  const [qrEvent, setQrEvent] = useState<UpcomingEvent | null>(null);
  const [rateEvent, setRateEvent] = useState<EndedEvent | null>(null);
  const [claiming, setClaiming] = useState<Claimable | null>(null);

  const handleTouch = (id: string): void => {
    setMoments(prev => prev.map(m => m.id === id ? { ...m, youTouched: !m.youTouched, touches: m.youTouched ? m.touches - 1 : m.touches + 1 } : m));
  };

  const handleUntouch = (_id: string): void => {
    /* private — backend only */
  };

  const handlePostMoment = ({ text }: { text: string }): void => {
    setMoments(prev => [{
      id: "m" + Date.now(),
      user: { name: ME.name, handle: ME.handle, avatar: ME.avatar, impact: fmt(ME.impact), kyc: true },
      time: "now",
      text,
      pin: null,
      photo: null,
      touches: 0,
      seen: 0,
      youTouched: false,
    }, ...prev]);
  };

  const handleRatingSubmit = ({ event }: PostEventSubmitData): void => {
    setEndedEvents(prev => prev.map(e => e.id === event.id ? { ...e, rated: true } : e));
    setRateEvent(null);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0E0E10", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: F }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap');
        * { -webkit-font-smoothing: antialiased; box-sizing: border-box; }
        ::-webkit-scrollbar { width: 0; height: 0; }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes pulseRing { 0% { transform: scale(0.6); opacity: 0.6; } 100% { transform: scale(2.2); opacity: 0; } }
        button { font-family: inherit; }
        button:active { transform: scale(0.97); transition: transform 0.08s; }
      `}</style>
      <div style={{ width: 390, height: 820, background: C.bg, borderRadius: 44, overflow: "hidden", position: "relative", boxShadow: `0 0 0 8px #1a1814, 0 0 0 9px #2a251d, 0 60px 140px rgba(239,197,35,0.15), 0 80px 160px rgba(0,0,0,0.4)`, display: "flex", flexDirection: "column" }}>
        <div style={{ height: 38, padding: "10px 28px 0", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 13, fontWeight: 600, color: C.text, fontFamily: F, position: "relative", zIndex: 11, background: C.bg }}>
          <span>9:41</span>
          <div style={{ width: 95, height: 22, borderRadius: 99, background: C.text, position: "absolute", left: "50%", top: 8, transform: "translateX(-50%)" }} />
          <div style={{ fontSize: 11 }}>📶 🔋</div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", paddingBottom: 88, background: C.bg }}>
          {tab === "discover" && <DiscoverScreen moments={moments} endedEvents={endedEvents} onTouch={handleTouch} onUntouch={handleUntouch} onShare={m => setPostcard(m)} onRSVP={e => setQrEvent(e)} onRate={e => setRateEvent(e)} onClaimPin={pin => setClaiming(pin)} />}
          {tab === "explore" && <ExploreScreen onClaimPin={pin => setClaiming(pin)} />}
          {tab === "message" && <MessageScreen />}
          {tab === "profile" && <ProfileScreen moments={moments} />}
        </div>
        <BottomNav tab={tab} setTab={setTab} onCreate={() => setShowCreate(true)} />
        {showCreate && <CreateModal onClose={() => setShowCreate(false)} onPostMoment={handlePostMoment} />}
        {postcard && <PostcardModal moment={postcard} onClose={() => setPostcard(null)} />}
        {qrEvent && <QRRSVPModal event={qrEvent} onClose={() => setQrEvent(null)} />}
        {rateEvent && <PostEventModal event={rateEvent} onClose={() => setRateEvent(null)} onSubmit={handleRatingSubmit} />}
        {claiming && <ClaimModal pin={claiming} onClose={() => setClaiming(null)} />}
      </div>
    </div>
  );
}
