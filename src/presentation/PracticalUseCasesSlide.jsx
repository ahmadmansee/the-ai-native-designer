import { useEffect, useRef, useState } from 'react';
import { SlideFrame } from './SlideFrame.jsx';
import './PracticalUseCasesSlide.css';

const CHATGPT = 'assets/logos/chatgpt.png';
const MOBBIN = 'assets/logos/mobbin.ico';
const patterns = [
  { label: 'Single page', color: '#e5a477', focus: 'Everything in one view' },
  { label: 'Delivery first', color: '#8aab9a', focus: 'Confirm where it goes' },
  { label: 'Card picker', color: '#8ba4cb', focus: 'Make the selection clear' },
  { label: 'Express pay', color: '#bca58d', focus: 'A shorter payment path' },
  { label: 'Order review', color: '#a396bc', focus: 'Check before placing an order' },
];
const phaseNames = {
  references: ['Write the request', 'Search through Mobbin MCP', 'Compare the results', 'Inspect a pattern'],
  synthesis: ['Attach source material', 'Read the evidence', 'Group the issues', 'Review the draft'],
  rehearsal: ['Set the scenario', 'Walk through the form', 'Question the friction', 'Try a clearer version'],
};

function useSequence(visible, index) {
  const [phase, setPhase] = useState(0);
  const [playing, setPlaying] = useState(false);
  const started = useRef(false);
  const [run, setRun] = useState(0);
  useEffect(() => {
    if (!visible || started.current) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { started.current = true; setPhase(3); return undefined; }
    const timer = window.setTimeout(() => { started.current = true; setPlaying(true); }, index * 600);
    return () => window.clearTimeout(timer);
  }, [visible, index]);
  useEffect(() => {
    if (!visible || !playing) return undefined;
    const timer = window.setTimeout(() => {
      if (phase < 3) setPhase(value => value + 1);
      else setPlaying(false);
    }, phase === 0 ? 4000 : 3600);
    return () => window.clearTimeout(timer);
  }, [phase, playing, visible, run]);
  function replay() { setPhase(0); setRun(value => value + 1); setPlaying(true); }
  function next() { setPlaying(false); setPhase(value => (value + 1) % 4); }
  function inspect() { setPlaying(false); setPhase(3); }
  return { phase, playing, run, replay, next, inspect, setPhase, pause: () => setPlaying(false), toggle: () => { if (phase === 3 && !playing) replay(); else setPlaying(value => !value); } };
}

function Prompt({ text, phase, run, playing }) {
  const [length, setLength] = useState(0);
  useEffect(() => { if (phase === 0) setLength(0); }, [run, phase]);
  useEffect(() => {
    if (phase !== 0 || !playing || length >= text.length) return undefined;
    const timer = window.setTimeout(() => setLength(value => Math.min(text.length, value + 2)), 35);
    return () => window.clearTimeout(timer);
  }, [text, phase, playing, length]);
  return <div className="uc-prompt"><span aria-hidden="true">↗</span><p>{phase === 0 ? text.slice(0, length) : text}{phase === 0 && playing && length < text.length && <i className="uc-type-cursor" />}</p></div>;
}

function CheckoutScreen({ pattern = 0, small = false }) {
  return <div className={`uc-checkout-phone ${small ? 'is-mini' : ''} uc-checkout-phone--${pattern}`} style={{ '--uc-accent': patterns[pattern].color }}>
    <div className="uc-phone-island" /><div className="uc-phone-status"><span>9:41</span><span>▰</span></div>
    <div className="uc-checkout-nav"><span>‹</span><strong>Checkout</strong><span>⋯</span></div>
    <div className="uc-checkout-order"><div className="uc-food-thumb"><i /><b /></div><div><strong>Falafel bowl</strong><span>1 item · sample order</span></div></div>
    <div className={`uc-checkout-block ${pattern === 1 ? 'is-focused' : ''}`}><small>DELIVER TO</small><strong>Home <span>Change</span></strong><p>Saved delivery address</p></div>
    <div className={`uc-checkout-block ${pattern === 2 ? 'is-focused' : ''}`}><small>PAYMENT</small><strong><b className="uc-card-symbol">▭</b> Card •••• 4242 <i>✓</i></strong>{pattern === 2 && <p>Selected for this order</p>}</div>
    {pattern === 3 ? <div className="uc-express-pay">Express checkout</div> : <div className="uc-checkout-total"><span>Order total</span><strong>42.00</strong></div>}
    <div className="uc-checkout-cta">{pattern === 4 ? 'Review order' : 'Place order'} <span>→</span></div><div className="uc-phone-home" />
  </div>;
}

function ReferencesDemo({ phase, sequence, selected, setSelected }) {
  if (phase === 0) return <div className="uc-source-setup"><div className="uc-connected"><img src={MOBBIN} alt="" /><strong>Mobbin MCP</strong><span>Connected</span><i /></div><div className="uc-search-filters"><span>iOS</span><span>Food & drink</span><span>Checkout</span></div><div className="uc-search-example"><span>Look for</span><strong>Payment selection.<br />Delivery details.<br />Final review.</strong></div></div>;
  if (phase === 1) return <div className="uc-tool-search"><span className="uc-tool-label"><i />Searching reference screens</span><code>Reference search</code><div><span>Platform</span><strong>iOS</strong></div><div><span>Category</span><strong>Food & drink</strong></div><div><span>Flow</span><strong>Checkout</strong></div><div className="uc-search-scan" aria-hidden="true"><i /><i /><i /><i /><i /></div></div>;
  if (phase === 2) return <div className="uc-reference-gallery"><span className="uc-result-label">Five illustrative screen patterns</span><div className="uc-five-screens">{patterns.map((pattern, index) => <button type="button" key={pattern.label} onClick={() => { setSelected(index); sequence.inspect(); }} aria-label={`Inspect ${pattern.label} checkout pattern`}><CheckoutScreen pattern={index} small /><span>{pattern.label}</span></button>)}</div></div>;
  return <div className="uc-reference-inspector"><CheckoutScreen pattern={selected} /><div className="uc-pattern-list"><small>PATTERNS</small>{patterns.map((pattern, index) => <button type="button" key={pattern.label} className={selected === index ? 'is-selected' : ''} onClick={() => { setSelected(index); sequence.pause(); }}><span>0{index + 1}</span>{pattern.label}</button>)}<p>{patterns[selected].focus}</p></div></div>;
}

const quotes = [
  { source: 'Note A', text: '“I only saw the delivery fee at the end.”', theme: 'Price clarity' },
  { source: 'Note B', text: '“I wasn’t sure which card was selected.”', theme: 'Payment confidence' },
];
function SynthesisDemo({ phase, sequence }) {
  const [selected, setSelected] = useState(0);
  if (phase === 0) return <div className="uc-source-setup"><div className="uc-file"><span>≡</span><div><strong>Interview notes</strong><small>notes-a.md · notes-b.md</small></div><b>✓</b></div><div className="uc-skill"><span>SKILL</span><strong>Research synthesis</strong><small>Evidence → themes → priorities</small></div><p className="uc-source-note">Sample notes attached to this request.</p></div>;
  if (phase === 1) return <div className="uc-quotes"><span className="uc-result-label">Read before summarizing</span>{quotes.map(quote => <div key={quote.source}><small>{quote.source}</small><p>{quote.text}</p><span>Source excerpt</span></div>)}</div>;
  if (phase === 2) return <div className="uc-theme-groups"><span className="uc-result-label">Group by the problem</span>{quotes.map((quote, index) => <div key={quote.theme}><span>0{index + 1}</span><strong>{quote.theme}</strong><p>{index === 0 ? 'Surface fees before the final step.' : 'Make the selected card unmistakable.'}</p><small>{quote.source} ↗</small></div>)}</div>;
  return <div className="uc-summary-document"><div className="uc-document-title"><small>DRAFT EXECUTIVE SUMMARY</small><strong>Two issues to investigate</strong></div>{quotes.map((quote, index) => <button type="button" key={quote.theme} onClick={() => { setSelected(index); sequence.pause(); }} className={selected === index ? 'is-selected' : ''}><span>P{index + 1}</span><div><strong>{quote.theme}</strong><small>{quote.source} · source linked</small></div><b>↗</b></button>)}<div className="uc-source-excerpt"><small>{quotes[selected].source}</small><p>{quotes[selected].text}</p></div><small className="uc-draft-check">Suggested priorities. Review the evidence.</small></div>;
}

function PaymentScreen({ phase, onAdvance }) {
  const filled = phase >= 1;
  return <div className={`uc-payment-phone ${phase === 2 ? 'has-question' : ''} ${phase === 3 ? 'is-revised' : ''}`}>
    <div className="uc-phone-island" /><div className="uc-phone-status"><span>9:41</span><span>▰</span></div><div className="uc-payment-heading"><span>‹</span><strong>Add a card</strong></div>
    <div className="uc-payment-card"><span>Card number</span><strong>{filled ? '••••  ••••  ••••  4242' : 'Enter card number'}</strong></div>
    <div className="uc-payment-fields"><div><span>Expiry</span><strong>{filled ? '12 / 30' : 'MM / YY'}</strong></div><div><span>CVV</span><strong>•••</strong></div></div>
    <button className="uc-payment-billing" type="button" onClick={onAdvance}><span>Billing address</span><b>Required</b></button>
    {phase === 3 && <p className="uc-billing-helper">Used to verify your card. Your delivery address stays the same.</p>}
    <div className="uc-secure-label">♙ Secure card storage</div><div className="uc-payment-save">Save card</div><div className="uc-phone-home" />
    {phase === 1 && <span className="uc-demo-pointer" aria-hidden="true">↖</span>}
  </div>;
}

function RehearsalDemo({ phase, sequence }) {
  if (phase === 0) return <div className="uc-persona"><div className="uc-persona-avatar">A</div><small>SIMULATED PERSONA</small><strong>First-time customer</strong><div><span>Goal</span><p>Save a payment method.</p></div><div><span>Context</span><p>Unfamiliar with this app.</p></div><div className="uc-persona-task">Task: add a new card</div></div>;
  return <div className={`uc-rehearsal-scene ${phase === 1 ? 'is-entering' : ''}`}><PaymentScreen phase={phase} onAdvance={() => { sequence.pause(); sequence.setPhase(phase === 3 ? 2 : 3); }} /><div className={`uc-rehearsal-comment ${phase === 3 ? 'is-revised' : ''}`}><small>{phase === 1 ? 'WALKTHROUGH' : phase === 2 ? 'QUESTION TO TEST' : 'CHANGE TO TRY'}</small><strong>{phase === 1 ? 'Enter card details.' : phase === 2 ? '“Why do I need a billing address?”' : 'Explain why the address is needed.'}</strong>{phase === 2 && <button type="button" onClick={() => { sequence.pause(); sequence.setPhase(3); }}>Try clearer copy <span>→</span></button>}{phase === 3 && <span className="uc-change-check">✓ Helper text added</span>}</div></div>;
}

const demos = { references: ReferencesDemo, synthesis: SynthesisDemo, rehearsal: RehearsalDemo };
function DemoPanel({ example, index, visible }) {
  const sequence = useSequence(visible, index);
  const Demo = demos[example.id];
  const [selected, setSelected] = useState(2);
  return <article className="uc-example"><div className="uc-example-heading"><span>0{index + 1}</span><h3>{example.title}</h3></div>
    <div className={`uc-demo uc-demo--${example.id}`}><div className="uc-demo-header"><span><img src={example.id === 'references' ? MOBBIN : CHATGPT} alt="" /><strong>{example.id === 'references' ? 'Mobbin' : 'ChatGPT'}</strong></span><small>{example.id === 'rehearsal' ? 'Simulation' : 'Sample content'}</small></div>
      <Prompt text={example.prompt} phase={sequence.phase} run={sequence.run} playing={sequence.playing} />
      <div className="uc-story-stage"><div className="uc-story-frame" key={`${sequence.run}-${sequence.phase}`}><Demo phase={sequence.phase} sequence={sequence} selected={selected} setSelected={setSelected} /></div></div>
      <div className="uc-phase-status"><i className={sequence.playing ? 'is-playing' : ''} /><span>{phaseNames[example.id][sequence.phase]}</span>{example.id === 'rehearsal' && <small>Not user evidence</small>}</div>
    </div>
    <div className="uc-controls"><button type="button" onClick={sequence.toggle} aria-label={`${sequence.playing ? 'Pause' : 'Play'} ${example.title} animation`}>{sequence.playing ? 'Pause' : 'Play'} <span aria-hidden="true">{sequence.playing ? 'Ⅱ' : '▶'}</span></button><div><button type="button" onClick={sequence.replay} aria-label={`Replay ${example.title} animation`}>↺</button><button type="button" onClick={sequence.next} aria-label={`Next frame of ${example.title}`}>→</button></div></div>
  </article>;
}

export function PracticalUseCasesSlide({ slide }) {
  const slideRef = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.5 });
    if (slideRef.current) observer.observe(slideRef.current);
    return () => observer.disconnect();
  }, []);
  return <SlideFrame slide={slide} className="uc-slide"><div className="uc-heading"><h2 id={`${slide.id}-title`}>{slide.headline}</h2></div><div className="uc-grid" ref={slideRef}>{slide.examples.map((example, index) => <DemoPanel example={example} index={index} visible={visible} key={example.id} />)}</div></SlideFrame>;
}
