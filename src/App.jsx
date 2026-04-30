import { useState, useEffect, useRef } from "react";

const TEAL = "#4dd9c0";
const GOLD = "#c9a84c";
const DIM = "#2a2a2a";
const VOID = "#0a0a0b";
const SURFACE = "#111113";
const BORDER = "#1e1e22";
const TEXT_DIM = "#555560";
const TEXT_MID = "#888896";
const TEXT_BRIGHT = "#d4d4e0";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;600;700&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background: ${VOID};
  color: ${TEXT_BRIGHT};
  font-family: 'Space Mono', monospace;
  min-height: 100vh;
  overflow-x: hidden;
}

.console-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

.console-root::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 1000;
  opacity: 0.4;
}

.hud {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, ${TEAL}40, ${GOLD}30, transparent);
  z-index: 100;
}

.hud-bar {
  position: fixed;
  top: 0; left: 0; right: 0;
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 99;
  background: linear-gradient(to bottom, ${VOID}ee, transparent);
}

.system-label {
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.2em;
  color: ${TEXT_DIM};
  text-transform: uppercase;
}

.system-label span { color: ${TEAL}; }

.state-pulse {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: ${TEAL};
  box-shadow: 0 0 8px ${TEAL};
  animation: pulse 2.4s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.3; transform: scale(0.7); }
}

.void-center {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 24px;
  min-height: 100vh;
}

.phase-container {
  width: 100%;
  max-width: 640px;
  animation: fadeIn 0.8s ease forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

.signal-tag {
  font-size: 9px;
  letter-spacing: 0.25em;
  color: ${TEAL};
  text-transform: uppercase;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.signal-tag::before {
  content: '';
  display: block;
  width: 20px; height: 1px;
  background: ${TEAL};
}

.main-prompt {
  font-family: 'Syne', sans-serif;
  font-size: clamp(22px, 4vw, 32px);
  font-weight: 400;
  line-height: 1.3;
  color: ${TEXT_BRIGHT};
  margin-bottom: 40px;
  letter-spacing: -0.01em;
}

.sub-prompt {
  font-size: 11px;
  color: ${TEXT_DIM};
  letter-spacing: 0.1em;
  margin-bottom: 40px;
  line-height: 1.8;
}

.freq-field {
  position: relative;
  width: 100%; height: 80px;
  border: 1px solid ${BORDER};
  background: ${SURFACE};
  cursor: pointer;
  overflow: hidden;
  margin-bottom: 40px;
  transition: border-color 0.3s;
}

.freq-field:hover { border-color: ${TEAL}44; }

.freq-track {
  position: absolute;
  top: 50%; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, ${DIM} 20%, ${DIM} 80%, transparent);
  transform: translateY(-50%);
}

.freq-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, ${VOID} 0%, #0d2020 20%, #0a1a2a 50%, #1a1000 80%, ${VOID} 100%);
}

.freq-labels {
  position: absolute;
  bottom: 8px; left: 16px; right: 16px;
  display: flex;
  justify-content: space-between;
  font-size: 8px;
  color: ${TEXT_DIM};
  letter-spacing: 0.15em;
}

.freq-cursor {
  position: absolute;
  top: 0; bottom: 0;
  width: 1px;
  background: ${TEAL};
  box-shadow: 0 0 12px ${TEAL}80;
  transition: left 0.05s linear;
  pointer-events: none;
}

.freq-cursor::after {
  content: '';
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 6px; height: 6px;
  border-radius: 50%;
  background: ${TEAL};
  box-shadow: 0 0 10px ${TEAL};
}

.freq-logged {
  position: absolute;
  top: 8px; right: 12px;
  font-size: 8px;
  color: ${TEAL};
  letter-spacing: 0.2em;
  opacity: 0;
  transition: opacity 0.4s;
}

.freq-logged.visible { opacity: 1; }

.action-row {
  display: flex;
  align-items: center;
  gap: 20px;
}

.console-btn {
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding: 12px 24px;
  border: 1px solid ${TEAL}60;
  background: transparent;
  color: ${TEAL};
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
}

.console-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: ${TEAL};
  opacity: 0;
  transition: opacity 0.2s;
}

.console-btn:hover::before { opacity: 0.06; }
.console-btn:hover { border-color: ${TEAL}; }
.console-btn:disabled { opacity: 0.3; cursor: not-allowed; }

.console-input {
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid ${BORDER};
  padding: 16px 0;
  font-family: 'Space Mono', monospace;
  font-size: 18px;
  color: ${TEXT_BRIGHT};
  outline: none;
  transition: border-color 0.3s;
  caret-color: ${TEAL};
}

.console-input::placeholder { color: ${TEXT_DIM}; }
.console-input:focus { border-color: ${TEAL}50; }

.input-label {
  font-size: 9px;
  color: ${TEXT_DIM};
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 8px;
  display: block;
}

.reflection-word {
  font-family: 'Syne', sans-serif;
  font-size: clamp(40px, 8vw, 64px);
  font-weight: 600;
  color: ${TEXT_BRIGHT};
  letter-spacing: -0.02em;
  margin-bottom: 8px;
  animation: fadeIn 1s ease forwards;
}

.reflection-sub {
  font-size: 9px;
  color: ${TEXT_DIM};
  letter-spacing: 0.2em;
  margin-bottom: 48px;
}

.variable-block {
  border: 1px solid ${BORDER};
  background: ${SURFACE};
  padding: 0;
  margin-bottom: 16px;
  overflow: hidden;
}

.variable-header {
  padding: 10px 16px;
  background: ${DIM}40;
  border-bottom: 1px solid ${BORDER};
  font-size: 9px;
  letter-spacing: 0.2em;
  color: ${TEAL};
  display: flex;
  justify-content: space-between;
}

.variable-input {
  width: 100%;
  background: transparent;
  border: none;
  padding: 16px;
  font-family: 'Space Mono', monospace;
  font-size: 13px;
  color: ${TEXT_BRIGHT};
  outline: none;
  resize: none;
  min-height: 60px;
  caret-color: ${TEAL};
}

.variable-input::placeholder { color: ${TEXT_DIM}; }

.connection-field {
  border: 1px solid ${BORDER};
  background: ${SURFACE};
  padding: 0;
  margin-bottom: 32px;
}

.connection-header {
  padding: 10px 16px;
  border-bottom: 1px solid ${BORDER};
  font-size: 9px;
  letter-spacing: 0.2em;
  color: ${GOLD};
  display: flex;
  justify-content: space-between;
  background: ${DIM}20;
}

.result-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1px;
  border: 1px solid ${BORDER};
  background: ${BORDER};
  margin-bottom: 32px;
  animation: fadeIn 0.6s ease forwards;
}

.result-row {
  background: ${SURFACE};
  display: grid;
  grid-template-columns: 120px 1fr;
}

.result-key {
  padding: 14px 16px;
  font-size: 9px;
  letter-spacing: 0.18em;
  color: ${TEXT_DIM};
  border-right: 1px solid ${BORDER};
  display: flex;
  align-items: flex-start;
  padding-top: 16px;
}

.result-val {
  padding: 14px 20px;
  font-size: 13px;
  color: ${TEXT_BRIGHT};
  line-height: 1.5;
}

.result-val.assigned { color: ${GOLD}; }

.insight-block {
  border-left: 1px solid ${GOLD}50;
  padding: 16px 20px;
  margin-bottom: 32px;
  background: ${GOLD}05;
  animation: fadeIn 1s ease 0.4s both;
}

.insight-text {
  font-size: 12px;
  color: ${TEXT_MID};
  line-height: 1.8;
  letter-spacing: 0.02em;
}

.log-stream {
  border-top: 1px solid ${BORDER};
  padding: 16px 0;
  max-width: 640px;
  width: 100%;
}

.log-entry {
  font-size: 10px;
  color: ${TEXT_DIM};
  letter-spacing: 0.1em;
  padding: 4px 0;
  display: flex;
  gap: 16px;
  animation: fadeIn 0.4s ease forwards;
}

.log-entry .ts { color: #333340; }
.log-entry .val { color: ${TEAL}80; }

.idle-glyph {
  font-family: 'Syne', sans-serif;
  font-size: 80px;
  font-weight: 700;
  color: ${TEXT_DIM};
  line-height: 1;
  margin-bottom: 24px;
  letter-spacing: -0.04em;
}

.divider {
  width: 40px; height: 1px;
  background: ${BORDER};
  margin: 32px 0;
}

.status-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 9px;
  color: ${TEXT_DIM};
  letter-spacing: 0.15em;
  margin-top: 32px;
}

.status-dot {
  width: 4px; height: 4px;
  border-radius: 50%;
  background: ${TEAL};
  box-shadow: 0 0 6px ${TEAL};
}

.complete-mark {
  font-size: 9px;
  color: ${TEAL};
  letter-spacing: 0.2em;
  padding: 8px 12px;
  border: 1px solid ${TEAL}30;
  margin-bottom: 24px;
  display: inline-block;
}

@media (max-width: 600px) {
  .hud-bar { padding: 12px 20px; }
  .void-center { padding: 80px 20px 40px; }
}
`;

function PhaseZero({ onComplete }) {
  const [position, setPosition] = useState(null);
  const [logged, setLogged] = useState(false);
  const fieldRef = useRef(null);

  const handleMove = (e) => {
    if (!fieldRef.current) return;
    const rect = fieldRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    setPosition(pct);
  };

  const handleLog = () => {
    if (position === null) return;
    setLogged(true);
    setTimeout(() => onComplete({ stateCoord: position }), 1200);
  };

  return (
    <div className="phase-container">
      <div className="signal-tag">INTERACTION_01 · STATE_ACCESS</div>
      <div className="main-prompt">[ SIGNAL_DETECTED ]</div>
      <div className="sub-prompt">Position yourself where you are.<br />No labels. No instruction.</div>
      <div className="freq-field" ref={fieldRef} onMouseMove={handleMove} onTouchMove={handleMove} onClick={handleLog} onTouchEnd={handleLog}>
        <div className="freq-gradient" />
        <div className="freq-track" />
        <div className="freq-labels">
          <span>LOW</span>
          <span>CURRENT</span>
          <span>HIGH</span>
        </div>
        {position !== null && (
          <div className="freq-cursor" style={{ left: `${position * 100}%` }} />
        )}
        <div className={`freq-logged ${logged ? "visible" : ""}`}>
          [ Initial_State_Coordinates — Recorded ]
        </div>
      </div>
      <div className="action-row">
        <button className="console-btn" onClick={handleLog} disabled={position === null}>Log State →</button>
      </div>
    </div>
  );
}

function PhaseOne({ onComplete }) {
  const [word, setWord] = useState("");
  const [reflected, setReflected] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 200);
  }, []);

  const handleSubmit = () => {
    if (!word.trim()) return;
    setReflected(true);
    setTimeout(() => onComplete({ perceptionWord: word.trim() }), 2800);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  if (reflected) {
    return (
      <div className="phase-container">
        <div className="signal-tag">PERCEPTION_LAYER · REFLECTED</div>
        <div className="reflection-word">{word}</div>
        <div className="reflection-sub">[ Returned without interpretation ]</div>
        <div className="status-row">
          <div className="status-dot" />
          <span>PERCEPTION_FILTER · VISIBLE</span>
        </div>
      </div>
    );
  }

  return (
    <div className="phase-container">
      <div className="signal-tag">INTERACTION_02 · PERCEPTION_PROBE</div>
      <div className="main-prompt">What do you notice right now?</div>
      <div className="sub-prompt">One word.</div>
      <div>
        <span className="input-label">INPUT →</span>
        <input ref={inputRef} className="console-input" value={word} onChange={(e) => setWord(e.target.value.split(" ")[0])} onKeyDown={handleKey} placeholder="_" maxLength={32} />
      </div>
      <div style={{ marginTop: 32 }}>
        <div className="action-row">
          <button className="console-btn" onClick={handleSubmit} disabled={!word.trim()}>Return →</button>
        </div>
      </div>
    </div>
  );
}

function PhaseTwo({ onComplete }) {
  const [varA, setVarA] = useState("");
  const [varB, setVarB] = useState("");
  const [connection, setConnection] = useState("");
  const [processed, setProcessed] = useState(false);

  const handleProcess = () => {
    if (!varA.trim() || !varB.trim() || !connection.trim()) return;
    setProcessed(true);
  };

  if (processed) {
    return (
      <div className="phase-container">
        <div className="signal-tag">VARIABLE_VIEWER · PROCESSED</div>
        <div className="result-grid">
          <div className="result-row">
            <div className="result-key">VARIABLE_A</div>
            <div className="result-val">{varA}</div>
          </div>
          <div className="result-row">
            <div className="result-key">VARIABLE_B</div>
            <div className="result-val">{varB}</div>
          </div>
          <div className="result-row">
            <div className="result-key">CONNECTION</div>
            <div className="result-val assigned">{connection}</div>
          </div>
        </div>
        <div className="insight-block">
          <div className="insight-text">The connection between A and B was not built-in.<br />It was assigned.</div>
        </div>
        <div className="action-row">
          <button className="console-btn" onClick={onComplete}>Continue →</button>
        </div>
      </div>
    );
  }

  return (
    <div className="phase-container">
      <div className="signal-tag">INTERACTION_03 · VARIABLE_VIEWER</div>
      <div className="main-prompt">Describe a current situation.</div>
      <div className="sub-prompt">The system will isolate its structure.</div>
      <div className="variable-block" style={{ marginBottom: 12 }}>
        <div className="variable-header">
          <span>VARIABLE_A — External condition</span>
          <span>What is happening</span>
        </div>
        <textarea className="variable-input" value={varA} onChange={(e) => setVarA(e.target.value)} placeholder="The external condition..." rows={2} />
      </div>
      <div className="variable-block" style={{ marginBottom: 12 }}>
        <div className="variable-header">
          <span>VARIABLE_B — Internal State</span>
          <span>What is being experienced</span>
        </div>
        <textarea className="variable-input" value={varB} onChange={(e) => setVarB(e.target.value)} placeholder="What you are experiencing..." rows={2} />
      </div>
      <div className="connection-field" style={{ marginBottom: 32 }}>
        <div className="connection-header">
          <span>CONNECTION — Assigned by user</span>
          <span>How are they linked?</span>
        </div>
        <textarea className="variable-input" value={connection} onChange={(e) => setConnection(e.target.value)} placeholder="The connection between them is..." rows={2} />
      </div>
      <div className="action-row">
        <button className="console-btn" onClick={handleProcess} disabled={!varA.trim() || !varB.trim() || !connection.trim()}>Process →</button>
      </div>
    </div>
  );
}

function PhaseComplete({ log }) {
  return (
    <div className="phase-container">
      <div className="signal-tag">INITIALIZATION · COMPLETE</div>
      <div className="complete-mark">SYSTEM_ONLINE · CONSOLE_OPEN</div>
      <div className="main-prompt" style={{ fontSize: "clamp(18px, 3vw, 24px)", marginBottom: 16 }}>
        You are inside the system now.
      </div>
      <div style={{ marginBottom: 40 }}>
        <div className="divider" />
        <div className="log-stream">
          {log.map((entry, i) => (
            <div key={i} className="log-entry">
              <span className="ts">{entry.ts}</span>
              <span className="event">{entry.event}</span>
              {entry.val && <span className="val">{entry.val}</span>}
            </div>
          ))}
        </div>
      </div>
      <div className="action-row">
        <button className="console-btn" onClick={() => window.location.reload()} style={{ borderColor: `${GOLD}60`, color: GOLD }}>
          [ + ] Deepen →
        </button>
      </div>
    </div>
  );
}

export default function BhavesLabConsole() {
  const [phase, setPhase] = useState(-1);
  const [sessionLog, setSessionLog] = useState([]);
  const [initData, setInitData] = useState({});

  const now = () => {
    const d = new Date();
    return `${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}:${String(d.getSeconds()).padStart(2,"0")}`;
  };

  const addLog = (event, val = "") => {
    setSessionLog(prev => [...prev, { ts: now(), event, val }]);
  };

  const startSession = () => {
    setPhase(0);
    addLog("SESSION_INITIATED", "");
  };

  const handlePhase0 = (data) => {
    const coord = Math.round(data.stateCoord * 100);
    addLog("Initial_State_Coordinates", `${coord}%`);
    setInitData(prev => ({ ...prev, ...data }));
    setPhase(1);
  };

  const handlePhase1 = (data) => {
    addLog("Perception_Filter_Logged", data.perceptionWord);
    setInitData(prev => ({ ...prev, ...data }));
    setPhase(2);
  };

  const handlePhase2 = () => {
    addLog("Variable_Connection_Examined", "Assigned — not fixed");
    setPhase(3);
  };

  return (
    <>
      <style>{css}</style>
      <div className="console-root">
        <div className="hud" />
        <div className="hud-bar">
          <div className="system-label">BHAVÉ<span>'</span>S LAB · <span>CONSOLE_v2</span></div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {phase >= 0 && (
              <div className="system-label">PHASE <span>{phase === 3 ? "COMPLETE" : `0${phase + 1}`}</span></div>
            )}
            <div className="state-pulse" />
          </div>
        </div>
        <div className="void-center">
          {phase === -1 && (
            <div className="phase-container" style={{ textAlign: "left" }}>
              <div className="idle-glyph">BL</div>
              <div className="signal-tag">CONSCIOUSNESS_CONSOLE · INITIALIZATION_READY</div>
              <div className="main-prompt">You are not here to learn something.<br />You are here to see yourself.</div>
              <div className="sub-prompt">Three interactions.<br />No instruction.<br />No interpretation.</div>
              <button className="console-btn" onClick={startSession}>Initialize →</button>
            </div>
          )}
          {phase === 0 && <PhaseZero onComplete={handlePhase0} />}
          {phase === 1 && <PhaseOne onComplete={handlePhase1} />}
          {phase === 2 && <PhaseTwo onComplete={handlePhase2} />}
          {phase === 3 && <PhaseComplete log={sessionLog} />}
        </div>
      </div>
    </>
  );
}
