import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Stamp, TriangleAlert } from "lucide-react";

const conditionTypes = [
  { name: "Forest Mass", horizon: "Generational", mobility: "Route-Defining", settlement: "Foundational", bureauNoun: "passage-distorting growth zone", localVerb: "opens only after it is listened to" },
  { name: "River System Shift", horizon: "Seasonal to Multi-Year", mobility: "Severe", settlement: "Severe", bureauNoun: "hydrological instability pattern", localVerb: "changes mouth before the count holds" },
  { name: "Weather Belt", horizon: "Seasonal", mobility: "Route-Defining", settlement: "Moderate", bureauNoun: "freight-displacing atmospheric band", localVerb: "moves freight prices before ships move" },
  { name: "Disease Ecology", horizon: "Seasonal", mobility: "Moderate", settlement: "Moderate", bureauNoun: "contact-linked interruption ecology", localVerb: "travels through lodging, breath, and cargo cloth" },
  { name: "Legacy Infrastructure", horizon: "Generational", mobility: "Moderate", settlement: "Foundational", bureauNoun: "residual transit substrate", localVerb: "keeps choosing halts after its makers are gone" },
  { name: "Information / Rumor Regime", horizon: "Immediate to Multi-Year", mobility: "Severe", settlement: "Moderate", bureauNoun: "unlicensed circulation system", localVerb: "arrives before the road notice" },
];

const regions = [
  { name: "Verdance Belt", code: "VB", office: "West-door copy house", texture: "wet rim paths beneath canopy settlements", authority: "village listeners and bowl-room copy-hands" },
  { name: "Crown of Glass", code: "CG", office: "Helion district relay desk", texture: "the Helion transit and cooling lattice", authority: "systems clerks and grid auditors" },
  { name: "Sahri Expanse", code: "SE", office: "Aquifer ledger station", texture: "canyon wells and counted salt roads", authority: "water stewards and pass-keeping families" },
  { name: "Thalmere", code: "TH", office: "Harbor tower duplicate desk", texture: "harbor towers and floating market ledgers", authority: "harbor towers and maritime copy courts" },
  { name: "Ashen Reach", code: "AR", office: "Ventwarden archive room", texture: "vent roads above the lower forge districts", authority: "forge councils and vent wardens" },
  { name: "Interregional Corridor", code: "IC", office: "Convoy transfer copy desk", texture: "relay roads between border markets", authority: "relay clerks and regional negotiators" },
];

const effects = [
  "alters route timing",
  "distorts memory or perception",
  "reorganizes settlement patterns",
  "interrupts trade or supply chains",
  "produces dependency on local knowledge",
  "changes what can be officially recorded",
];

const localSources = [
  { name: "bird orientation", sign: "small birds facing houses instead of trees before the departure window closes", correction: "The birds moved first. The office arrived after." },
  { name: "moss or root behavior", sign: "moss lifting under wheels after the second survey pass", correction: "Filed road is no longer road." },
  { name: "water taste or flood rhythm", sign: "water turning metal-sharp before the channel shift is visible", correction: "The flood was not late. The calendar was early." },
  { name: "caravan silence or animal refusal", sign: "pack animals stopping before visible hazard and caravans refusing song", correction: "Do not write refusal as inefficiency." },
  { name: "household ritual or mourning practice", sign: "bowls left set after registry closure and doors left unlatched at dusk", correction: "This is not delay. This is waiting." },
  { name: "port rumor, song, or copied story", sign: "dock songs changing route names before formal notice reaches the tower", correction: "Recorder mistook rumor for noise." },
];

const misclassifications = [
  "warning entered as superstition",
  "person-loss entered as route-delay",
  "local practice entered as inefficient labor",
  "ecological shift entered as logistics error",
  "dependency entered as voluntary cooperation",
  "withheld knowledge entered as noncompliance",
];

const statuses = ["Monitor", "Restricted Transit", "Strategic Priority", "Local Control", "Unresolved", "Central Filing Prohibited | Local Copy Required"];
const filedPrefixes = ["Lower", "Outer", "Central", "North", "Black", "White", "Glass", "Ash", "Salt", "Green", "Spiral", "Hidden"];
const filedNouns = ["Refusal", "Reversal", "Silence", "Cascade", "Breach", "Drift", "Mouth", "Gate", "Memory", "Return", "Band", "Passage"];
const copyMarks = ["EDGE WATERMARKED", "WET HANDLING", "MARGIN HAND UNOFFICIAL", "CHECK HOUSEHOLD COPY", "ROUTE NAMES WITHHELD", "CENTRAL CLAIM BARRED"];
const recorderInitials = ["M.P.", "K.V.", "S.R.", "H.L.", "T.A.", "O.N."];

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function rollDie() { return Math.floor(Math.random() * 6); }

function makeRecord() {
  const conditionIndex = rollDie();
  const regionIndex = rollDie();
  const effectIndex = rollDie();
  const sourceIndex = rollDie();
  const misIndex = rollDie();
  const statusIndex = rollDie();
  const condition = conditionTypes[conditionIndex];
  const region = regions[regionIndex];
  const source = localSources[sourceIndex];
  const misclassification = misclassifications[misIndex];
  const status = statuses[statusIndex];
  const intake = String(Math.floor(100 + Math.random() * 900));
  const copyNo = Math.floor(2 + Math.random() * 6);
  const filedName = `${pick(filedPrefixes)} ${region.name.split(" ")[0]} ${pick(filedNouns)} ${condition.name}`;
  const markA = pick(copyMarks);
  let markB = pick(copyMarks);
  while (markB === markA) markB = pick(copyMarks);
  const mobilityQualifier = effectIndex === 0 || effectIndex === 3 ? "convoy sequence" : effectIndex === 1 ? "return account" : effectIndex === 5 ? "registry confidence" : "settlement planning";
  const bureauSummary = `Filed at ${region.office} after three incompatible copies. Reported sign: ${source.sign}. First copy places the earliest disturbance near ${region.texture}; second lists only the condition number; third withholds the place-name. ${region.authority} supplied passage testimony but retained local names. Recorder column: ${misclassification}.`;
  const localCorrection = `${source.correction} Bureau column names ${condition.name.toLowerCase()}; local copy says it ${condition.localVerb}. Do not restore names withheld by bowl, harbor, caravan, ward, or door copy.`;
  const routingInstruction = status === "Central Filing Prohibited | Local Copy Required"
    ? "Return one copy to the local archive before central circulation. Central file may copy corrections, not names."
    : status === "Local Control"
    ? "Bureau copy advisory only. Local listeners, stewards, wardens, or tower clerks retain final passage authority."
    : status === "Unresolved"
    ? "Hold classification open. Do not convert silence, waiting, refusal, rumor, or mourning into absence."
    : status === "Strategic Priority"
    ? "Forward under controlled circulation. Attach local correction unabridged. Do not reduce signs to schedule numbers alone."
    : "Forward to Bureau of Passage with local addendum attached. Margin corrections must remain visible on all copies.";
  return {
    dice: [conditionIndex + 1, regionIndex + 1, effectIndex + 1, sourceIndex + 1, misIndex + 1, statusIndex + 1],
    conditionNumber: `AC-${region.code}-${conditionIndex + 1}${regionIndex + 1}-${intake}`,
    filedName,
    conditionType: condition.name,
    primaryRegion: region.name,
    operationalHorizon: condition.horizon,
    mobilityEffect: condition.mobility,
    settlementEffect: condition.settlement,
    administrativeStatus: status,
    reportedSign: source.sign,
    bureauMisclassification: misclassification,
    bureauSummary,
    localCorrection,
    routingInstruction,
    copyNo,
    recorder: pick(recorderInitials),
    copyMarks: [markA, markB],
    mobilityQualifier,
  };
}

function recordToText(record) {
  return `BUREAU OF PASSAGE: ACTIVE CONDITION INTAKE REGISTER\n${record.copyMarks.join(" | ")}\n\nLot Sequence: ${record.dice.join(" | ")}\nCondition Number: ${record.conditionNumber}\nFiled Name: ${record.filedName}\nRegistry Class: ${record.conditionType}\nFiled Region: ${record.primaryRegion}\nActive Period: ${record.operationalHorizon}\nPassage Mark: ${record.mobilityEffect}\nSettlement Mark: ${record.settlementEffect}\nReported Sign: ${record.reportedSign}\nRecorder Notation: ${record.bureauMisclassification}\nRouting Status: ${record.administrativeStatus}\n\nRecorder Entry:\n${record.bureauSummary}\n\nMargin Hand / Local Correction:\n${record.localCorrection}\n\nRouting Instruction:\n${record.routingInstruction}`;
}

export default function EryndorActiveConditionGenerator() {
  const [record, setRecord] = useState(() => makeRecord());
  const [copied, setCopied] = useState(false);
  const totalVariations = useMemo(() => 6 ** 6, []);
  const generate = () => { setRecord(makeRecord()); setCopied(false); };
  const copyRecord = async () => {
    try { await navigator.clipboard.writeText(recordToText(record)); setCopied(true); setTimeout(() => setCopied(false), 1400); }
    catch { setCopied(false); }
  };
  return (
    <div className="min-h-screen bg-[#17130d] px-3 py-5 ery-serif text-stone-100 md:px-8 md:py-8">
      <style>{`.ery-serif { font-family: 'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', Georgia, serif; }.ery-mono { font-family: 'Avenir Next Condensed', 'Arial Narrow', 'Helvetica Neue Condensed Bold', ui-sans-serif, system-ui, sans-serif; }.ery-stamp { font-family: 'Avenir Next Condensed', 'Arial Narrow', 'Helvetica Neue Condensed Bold', ui-sans-serif, system-ui, sans-serif; }.paper-grain { background-image: radial-gradient(rgba(28,25,20,0.08) 0.7px, transparent 0.7px), linear-gradient(0deg, rgba(28,25,20,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(28,25,20,0.045) 1px, transparent 1px); background-size: 9px 9px, 22px 22px, 22px 22px; }`}</style>
      <div className="mx-auto max-w-7xl">
        <div className="mb-5">
          <div>
            <div className="flex flex-wrap items-center gap-2 ery-mono text-[11px] uppercase tracking-[0.24em] text-amber-100/70"><span>Bureau of Passage</span><span className="text-stone-600">|</span><span>Register of Active Conditions</span><span className="text-stone-600">|</span><span>Late Flood Revision</span></div>
            <h1 className="mt-2 ery-serif whitespace-nowrap text-[clamp(2rem,4.8vw,4.8rem)] font-black uppercase leading-[0.92] tracking-[-0.06em] text-[#efe4ca]">Provisional Intake Register</h1>
          </div>
          <div className="mt-3 flex max-w-full flex-wrap gap-2 ery-mono text-[11px] uppercase tracking-[0.16em] text-amber-100/80"><span className="border border-amber-100/25 bg-black/20 px-3 py-1.5">Form Capacity: {totalVariations.toLocaleString()} States</span><span className="border border-amber-100/25 bg-black/20 px-3 py-1.5">Lot Order: 1–6</span><span className="border border-amber-100/25 bg-black/20 px-3 py-1.5">Local Addendum Required</span></div>
        </div>
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
          <motion.main key={record.conditionNumber} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }} className="relative overflow-hidden border border-stone-800 bg-[#e7dcc3] p-4 text-[#1c1914] shadow-2xl md:p-7">
            <div className="paper-grain pointer-events-none absolute inset-0 opacity-70" />
            <div className="pointer-events-none absolute right-8 top-48 z-30 max-w-[420px] rotate-12 border-4 border-red-900/30 px-7 py-3 ery-stamp text-sm font-black uppercase tracking-[0.1em] text-red-900/30 md:right-10 md:top-44 md:text-base">{record.administrativeStatus.includes("Central") ? "Do Not Send to Central File" : "Bureau Circulation Copy"}</div>
            <div className="relative">
              <header className="border-b-2 border-[#1c1914] pb-4">
                <div className="mb-4 flex items-center justify-between gap-4 border-b border-stone-500/50 pb-3"><BureauSeal /><ConditionGlyph type={record.conditionType} /></div>
                <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_150px] md:items-start">
                  <div><div className="ery-mono whitespace-nowrap text-[10px] uppercase tracking-[0.16em] text-stone-700">{record.copyMarks[0]} | {record.copyMarks[1]}</div><h2 className="mt-3 ery-serif whitespace-nowrap text-[clamp(1.55rem,2.35vw,2.45rem)] font-black uppercase leading-[0.95] tracking-[-0.085em]">Active Condition Intake</h2><p className="mt-4 max-w-3xl ery-mono text-xs leading-5 text-stone-700">Controlled circulation copy. Registry fields provisional pending local sign-check. Six lots assign class, region, passage, sign, notation, and routing. Withheld names are not to be restored by central clerks.</p></div>
                  <div className="w-fit max-w-full border-2 border-[#1c1914] bg-[#e7dcc3]/95 p-3 ery-mono text-[10px] uppercase leading-5 tracking-[0.03em] md:w-[150px]"><div>COPY {record.copyNo}</div><div>RECORDER: {record.recorder}</div><div>LOTS: {record.dice.join(" ")}</div><div>{record.conditionNumber}</div></div>
                </div>
              </header>
              <section className="mt-5 grid gap-px overflow-hidden border-2 border-[#1c1914] bg-[#1c1914] text-sm md:grid-cols-2"><Cell label="Filed Name" value={record.filedName} wide /><Cell label="Registry Class" value={record.conditionType} /><Cell label="Filed Region" value={record.primaryRegion} /><Cell label="Active Period" value={record.operationalHorizon} /><Cell label="Passage Mark" value={`${record.mobilityEffect} | ${record.mobilityQualifier}`} /><Cell label="Settlement Mark" value={record.settlementEffect} /><Cell label="Routing Status" value={record.administrativeStatus} /><Cell label="Reported Sign" value={record.reportedSign} wide /><Cell label="Recorder Notation" value={record.bureauMisclassification} wide /></section>
              <section className="mt-6 grid gap-4 xl:grid-cols-[1fr_0.46fr]"><div><Block title="Recorder Entry" icon={<FileText size={15} />}>{record.bureauSummary}</Block><Block title="Routing Instruction" icon={<Stamp size={15} />}>{record.routingInstruction}</Block></div><aside className="border-l-0 border-stone-500/50 xl:border-l xl:pl-4"><div className="mb-3 ery-mono text-[10px] uppercase tracking-[0.22em] text-stone-600">Margin hand unofficial</div><div className="rotate-[-0.5deg] border border-stone-500/70 bg-[#f1e8d0]/80 p-4 ery-serif text-[15px] italic leading-7 shadow-sm">{record.localCorrection}</div><div className="mt-4 rotate-[0.4deg] border border-stone-500/60 bg-[#efe3c8]/70 p-3 ery-mono text-[11px] leading-5 text-stone-700">West copy-hand: sign checked. Correction travels with copy. Custody changes what the record can safely name.</div></aside></section>
              <footer className="mt-6 border-t-2 border-[#1c1914] pt-3"><RouteTrace /><div className="mt-2 ery-mono text-[10px] uppercase tracking-[0.28em] text-stone-700">Lower edge watermarked | provisional register output | local correction attached | page 1 of 1</div></footer>
            </div>
          </motion.main>
          <aside className="space-y-4">
            <div className="border border-stone-700 bg-[#241d13] p-4 shadow-xl"><div className="ery-mono text-xs font-bold uppercase tracking-[0.18em] text-amber-100">Registry Lot Drawer</div><div className="mt-3 border border-stone-700 bg-black/15 p-3 ery-mono text-[11px] uppercase leading-5 tracking-[0.12em] text-stone-300">Six lots drawn in fixed order. Sequence void if local addendum is detached.</div><div className="mt-4 grid grid-cols-6 gap-2">{record.dice.map((die, idx) => (<div key={idx} className="flex aspect-square items-center justify-center rounded-full border border-amber-100/40 bg-[#e7dcc3] text-center ery-serif text-lg font-black text-[#241d13] shadow-inner">{die}</div>))}</div><button onClick={generate} className="mt-4 flex w-full items-center justify-center border border-amber-100/70 bg-amber-100 px-4 py-3 ery-mono text-xs font-black uppercase tracking-[0.14em] text-[#17130d] transition hover:bg-amber-50">Draw Six Lots</button><button onClick={copyRecord} className="mt-2 flex w-full items-center justify-center border border-stone-500 px-4 py-3 ery-mono text-xs font-bold uppercase tracking-[0.14em] text-stone-100 transition hover:bg-stone-800">{copied ? "Transcript Prepared" : "Prepare Transcript"}</button></div>
            <div className="border border-stone-700 bg-[#241d13] p-4 shadow-xl"><div className="ery-mono text-xs font-bold uppercase tracking-[0.18em] text-amber-100">Lot Order</div><div className="mt-3 space-y-2 text-xs"><RollLine n="1" label="Class" value={record.conditionType} /><RollLine n="2" label="Region" value={record.primaryRegion} /><RollLine n="3" label="Passage" value={effects[record.dice[2] - 1]} /><RollLine n="4" label="Sign" value={record.reportedSign} /><RollLine n="5" label="Notation" value={record.bureauMisclassification} /><RollLine n="6" label="Routing" value={record.administrativeStatus} /></div></div>
            <div className="border border-red-900/60 bg-red-950/30 p-4 ery-mono text-xs leading-6 text-red-100/90 shadow-xl"><div className="mb-2 flex items-center gap-2 ery-mono text-xs font-bold uppercase tracking-[0.16em] text-red-100"><TriangleAlert size={16} /> Clerk Notice</div>This copy does not grant passage. Comparable fields are for Bureau circulation only. Margin hand remains attached when local signs exceed registry fields.</div>
            <div className="border border-stone-700 bg-[#241d13] p-4 shadow-xl"><div className="ery-mono text-xs font-bold uppercase tracking-[0.18em] text-amber-100">Register Basis</div><div className="mt-3 space-y-3 text-sm leading-6 text-stone-300"><p>Active conditions are filed when a route, settlement, or exchange pattern changes before any authority can name a single responsible actor.</p><p>Bureau copies compare cases across regions. Local corrections preserve signs that cannot safely become central fields.</p></div></div>
            <div className="border border-stone-700 bg-[#241d13] p-4 shadow-xl"><div className="ery-mono text-xs font-bold uppercase tracking-[0.18em] text-amber-100">Filed Classes</div><div className="mt-3 grid grid-cols-2 gap-2 ery-mono text-[10px] uppercase tracking-[0.12em] text-stone-300"><div className="border border-stone-700 bg-black/15 px-2 py-2">Forest Mass</div><div className="border border-stone-700 bg-black/15 px-2 py-2">River Shift</div><div className="border border-stone-700 bg-black/15 px-2 py-2">Weather Belt</div><div className="border border-stone-700 bg-black/15 px-2 py-2">Disease Ecology</div><div className="border border-stone-700 bg-black/15 px-2 py-2">Legacy Road</div><div className="border border-stone-700 bg-black/15 px-2 py-2">Rumor Regime</div></div></div>
            <div className="border border-stone-700 bg-[#241d13] p-4 shadow-xl"><div className="ery-mono text-xs font-bold uppercase tracking-[0.18em] text-amber-100">Copy Custody</div><div className="mt-3 space-y-2 ery-mono text-[10px] uppercase tracking-[0.12em] text-stone-300"><div className="flex items-center justify-between border border-stone-700 bg-black/15 px-2 py-2"><span>1. Local sign-check</span><span className="text-amber-100/80">required</span></div><div className="flex items-center justify-between border border-stone-700 bg-black/15 px-2 py-2"><span>2. Margin hand retained</span><span className="text-amber-100/80">required</span></div><div className="flex items-center justify-between border border-stone-700 bg-black/15 px-2 py-2"><span>3. Names withheld</span><span className="text-amber-100/80">honored</span></div><div className="flex items-center justify-between border border-stone-700 bg-black/15 px-2 py-2"><span>4. Central filing</span><span className="text-amber-100/80">conditional</span></div></div></div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function BureauSeal() {
  return (<div className="flex items-center gap-3 text-[#1c1914]"><svg width="62" height="62" viewBox="0 0 62 62" aria-hidden="true" className="shrink-0 opacity-90"><circle cx="31" cy="31" r="26" fill="none" stroke="currentColor" strokeWidth="2.4" /><circle cx="31" cy="31" r="23" fill="none" stroke="currentColor" strokeWidth="1.1" opacity="0.42" /><path d="M12 31 C12.5 20, 20 12, 31 11 C42 12, 49.5 20, 50 31" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="2.2 2.8" opacity="0.8" /><path d="M31 9.5 L32.2 13.2 L35.9 13.2 L32.9 15.4 L34 19 L31 16.8 L28 19 L29.1 15.4 L26.1 13.2 L29.8 13.2 Z" fill="currentColor" /><g fill="none" stroke="currentColor" strokeWidth="2.05" strokeLinecap="round" strokeLinejoin="round"><path d="M17 36 V25.5" /><path d="M45 36 V25.5" /><path d="M17 25.5 L23 24 L27.5 22 L31 17.8 L34.5 22 L39 24 L45 25.5" /><path d="M22 36 V28" /><path d="M40 36 V28" /><path d="M26.4 36 V30.5 C26.4 27.5 28.4 25.3 31 25.3 C33.6 25.3 35.6 27.5 35.6 30.5 V36" /></g><g fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M13.8 39.3 C18 36.8, 22.1 36.8, 26.2 39.3 C30.3 41.8, 34.3 41.8, 38.4 39.3 C42.2 37, 46 37, 49 38.8" /><path d="M15.5 43 C19.6 40.8, 23.8 40.8, 27.9 43 C32 45.2, 36.1 45.2, 40.1 43 C43.4 41.4, 46.2 41.3, 48.4 42" /></g><path d="M31 45.2 L32.3 48.1 L35.2 49.4 L32.3 50.7 L31 53.6 L29.7 50.7 L26.8 49.4 L29.7 48.1 Z" fill="currentColor" /></svg><div className="hidden sm:block"><div className="ery-mono text-[10px] uppercase tracking-[0.22em] text-stone-600">Bureau Seal</div><div className="ery-serif text-sm font-bold uppercase tracking-[0.08em]">Passage | Record | Return</div></div></div>);
}

function ConditionGlyph({ type }) {
  const label = type.includes("Forest") ? "Root" : type.includes("River") ? "Water" : type.includes("Weather") ? "Storm" : type.includes("Disease") ? "Spore" : type.includes("Legacy") ? "Road" : "Signal";
  return (<div className="flex items-center gap-3 text-[#1c1914] opacity-80"><div className="hidden text-right sm:block"><div className="ery-mono text-[10px] uppercase tracking-[0.22em] text-stone-600">Condition Mark</div><div className="ery-serif text-sm font-bold uppercase tracking-[0.08em]">{label}</div></div><svg width="58" height="42" viewBox="0 0 58 42" aria-hidden="true" className="shrink-0">{type.includes("Forest") && <g fill="none" stroke="currentColor" strokeWidth="2"><path d="M29 3 C25 13, 35 16, 29 27"/><path d="M29 27 C18 27, 16 35, 6 37"/><path d="M29 27 C39 27, 42 35, 53 37"/><path d="M29 16 C20 15, 17 10, 12 6"/><path d="M29 16 C38 15, 41 10, 46 6"/></g>}{type.includes("River") && <g fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 10 C17 2, 25 22, 37 12 S49 10, 54 5"/><path d="M4 25 C18 15, 25 36, 39 25 S50 22, 55 31"/></g>}{type.includes("Weather") && <g fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 22 C17 5, 46 7, 45 24 C44 39, 18 38, 19 24 C20 15, 36 15, 35 25"/><path d="M7 33 H51"/></g>}{type.includes("Disease") && <g fill="none" stroke="currentColor" strokeWidth="2"><circle cx="29" cy="21" r="8"/><circle cx="12" cy="12" r="3"/><circle cx="46" cy="10" r="3"/><circle cx="48" cy="31" r="3"/><circle cx="13" cy="32" r="3"/><path d="M21 17 L15 13 M37 16 L44 11 M37 26 L45 30 M21 26 L16 30"/></g>}{type.includes("Legacy") && <g fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 32 C17 23, 26 23, 34 15 S49 7, 54 12"/><path d="M8 37 C20 29, 29 29, 38 20 S51 14, 55 18"/><path d="M18 27 L22 33 M31 20 L36 26 M44 13 L49 19"/></g>}{type.includes("Information") && <g fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 21 H52"/><path d="M12 12 L22 21 L12 30"/><path d="M28 12 L38 21 L28 30"/><circle cx="7" cy="21" r="3"/><circle cx="52" cy="21" r="3"/></g>}</svg></div>);
}

function RouteTrace() { return (<svg viewBox="0 0 720 36" aria-hidden="true" className="h-9 w-full text-stone-700 opacity-70"><path d="M8 22 C78 3, 128 36, 190 18 S292 10, 348 22 S452 35, 516 14 S633 9, 712 25" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="7 6" /><circle cx="8" cy="22" r="4" fill="currentColor" /><circle cx="190" cy="18" r="3" fill="currentColor" /><circle cx="348" cy="22" r="3" fill="currentColor" /><circle cx="516" cy="14" r="3" fill="currentColor" /><circle cx="712" cy="25" r="4" fill="currentColor" /></svg>); }
function Cell({ label, value, wide }) { return (<div className={`${wide ? "md:col-span-2" : ""} bg-[#e7dcc3] p-3 min-h-[86px]`}><div className="ery-mono text-[10px] font-black uppercase tracking-[0.18em] text-stone-600">{label}</div><div className="mt-2 ery-serif text-[14px] font-semibold leading-5 text-[#1c1914] md:text-[16px]">{value}</div></div>); }
function Block({ title, icon, children }) { return (<div className="mb-4 border border-stone-500/70 bg-[#efe4ca]/60 p-4"><div className="mb-2 flex items-center gap-2 ery-mono text-[10px] font-black uppercase tracking-[0.22em] text-stone-600">{icon} {title}</div><p className="ery-serif text-[15px] leading-7 text-[#1c1914]">{children}</p></div>); }
function RollLine({ n, label, value }) { return (<div className="grid grid-cols-[2rem_5.6rem_1fr] gap-2 border border-stone-700 bg-black/15 p-2 text-stone-300"><div className="ery-mono font-black text-amber-100">{n}</div><div className="ery-mono uppercase tracking-[0.14em] text-stone-500">{label}</div><div className="ery-serif text-sm text-stone-200">{value}</div></div>); }
