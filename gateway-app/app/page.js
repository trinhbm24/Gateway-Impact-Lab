"use client";
import { useState } from "react";

const PATHWAY_OPTIONS = [
  "Education & Youth","Environmental & Sustainability","Healthcare & Wellbeing",
  "Technology & Innovation","Arts & Culture","Community Development",
  "Animal Welfare","Hunger & Food Security"
];
const SUB_INTERESTS = [
  "Working directly with children","Working with elderly or adults","Working with animals",
  "Environmental fieldwork","Data, research, or analysis","Teaching or tutoring",
  "Event planning and logistics","Marketing, design, or communications",
  "Building, making, or physical labor","Policy, advocacy, or governance",
  "Entrepreneurship or business development","Healthcare or medical settings"
];
const COMPETENCIES = [
  "Empathy & cross-cultural understanding","Collaboration & teamwork",
  "Communication (speaking, writing, presenting)","Critical thinking & problem-solving",
  "Leadership & initiative","Project management & organization",
  "Creative thinking & design","Data analysis & research",
  "Advocacy & persuasion","Resilience & adaptability",
  "Ethical reasoning & moral courage","Systems thinking"
];
const STRENGTHS = [
  "Writing","Public speaking","Organizing events","Technology/coding",
  "Art/design/media","Sports/physical","Languages/translation",
  "Research/analysis","Teaching","Fundraising/persuasion"
];
const AVAILABILITY = [
  "Weekday mornings","Weekday afternoons","Weekday evenings",
  "Saturday mornings","Saturday afternoons","Sunday mornings","Sunday afternoons"
];

const SAMPLE_STUDENTS = [
  {name:"Minh-Anh Nguyen",grade:"Grade 11",age:16,nationality:"Vietnamese-American",languages:["English (fluent)","Vietnamese (fluent)"],district:"District 7",transport:"Grab/taxi",maxTravel:"30 min",pathways:["Environmental & Sustainability","Technology & Innovation"],subInterests:["Data, research, or analysis","Environmental fieldwork","Marketing, design, or communications"],compGoals:["Systems thinking","Data analysis & research","Communication (speaking, writing, presenting)"],strengths:["Technology/coding","Research/analysis","Writing"],ambiguity:4,independence:4,priorService:2,availability:["Weekday afternoons","Saturday mornings"],commitment:"4-6 hours/week",duration:"One semester",groupPref:"Solo or pair",motivation:"I want to understand how environmental issues actually get solved through data, not just awareness campaigns.",meaningful:"A project where I can see the data I collected actually change how an organization makes decisions.",specificInterest:"Interested in urban sustainability and circular economy models."},
  {name:"Sofia Chen",grade:"Grade 10",age:15,nationality:"Taiwanese-British",languages:["English (fluent)"],district:"District 2/Thu Duc",transport:"School bus, Grab",maxTravel:"20 min",pathways:["Arts & Culture","Education & Youth"],subInterests:["Working directly with children","Design, art, or creative production","Teaching or tutoring"],compGoals:["Creative thinking & design","Empathy & cross-cultural understanding","Communication (speaking, writing, presenting)"],strengths:["Art/design/media","Teaching","Public speaking"],ambiguity:3,independence:3,priorService:3,availability:["Weekday afternoons","Saturday mornings","Saturday afternoons"],commitment:"4-6 hours/week",duration:"Full academic year",groupPref:"Small group (3-5)",motivation:"I love art and I love kids. I want to use creative expression to help children who don't normally have access to art education.",meaningful:"Running an art workshop where children create something they're genuinely proud of.",specificInterest:"Interested in The Factory or YUU."},
  {name:"James Park",grade:"Grade 12",age:17,nationality:"Korean-Canadian",languages:["English (fluent)"],district:"District 7",transport:"Family driver",maxTravel:"45 min",pathways:["Healthcare & Wellbeing","Community Development"],subInterests:["Research, data collection, or analysis","Policy, advocacy, or governance","Event planning and logistics"],compGoals:["Critical thinking & problem-solving","Ethical reasoning & moral courage","Leadership & initiative"],strengths:["Organizing events","Public speaking","Research/analysis"],ambiguity:5,independence:5,priorService:4,availability:["Weekday afternoons","Saturday mornings"],commitment:"6-10 hours/week",duration:"Full academic year",groupPref:"Solo or pair",motivation:"I'm applying to pre-med and want genuine healthcare exposure in a developing country context. I want to contribute something real.",meaningful:"Producing a research deliverable that an organization uses in their grant application.",specificInterest:"Interested in public health systems, particularly health equity."},
  {name:"Ly Tran",grade:"Grade 9",age:14,nationality:"Vietnamese",languages:["Vietnamese (fluent)","English (fluent)"],district:"Binh Thanh",transport:"Motorbike (family)",maxTravel:"25 min",pathways:["Education & Youth","Hunger & Food Security"],subInterests:["Working directly with children","Teaching or tutoring","Event planning and logistics"],compGoals:["Empathy & cross-cultural understanding","Collaboration & teamwork","Resilience & adaptability"],strengths:["Languages/translation","Teaching","Sports/physical"],ambiguity:2,independence:2,priorService:1,availability:["Saturday mornings","Saturday afternoons"],commitment:"2-4 hours/week",duration:"One semester",groupPref:"Small group (3-5)",motivation:"This is my first time doing community service. I'm a bit nervous but I speak Vietnamese natively so maybe I can help with translation?",meaningful:"I think just meeting people from different backgrounds would be meaningful for me.",specificInterest:"Open to suggestions."},
  {name:"Priya Sharma",grade:"Grade 11",age:16,nationality:"Indian",languages:["English (fluent)"],district:"District 2/Thu Duc",transport:"Grab/taxi",maxTravel:"30 min",pathways:["Technology & Innovation","Education & Youth"],subInterests:["Teaching or tutoring","Technology, website, or digital tools","Entrepreneurship or business development"],compGoals:["Leadership & initiative","Project management & organization","Creative thinking & design"],strengths:["Technology/coding","Organizing events","Fundraising/persuasion"],ambiguity:4,independence:4,priorService:3,availability:["Weekday afternoons","Sunday mornings"],commitment:"4-6 hours/week",duration:"One semester",groupPref:"Small group (3-5)",motivation:"I want to build something real. I want to use my coding skills to help an organization that actually needs tech help.",meaningful:"Building a tool — a website, app, or database — that an organization uses every day after I leave.",specificInterest:"Interested in CoderSchool or Fablab Saigon."},
  {name:"Lucas Mueller",grade:"Grade 10",age:15,nationality:"German-Vietnamese",languages:["English (fluent)","Vietnamese (conversational)"],district:"District 7",transport:"Bicycle, Grab",maxTravel:"20 min",pathways:["Animal Welfare","Environmental & Sustainability"],subInterests:["Working with animals","Environmental fieldwork","Marketing, design, or communications"],compGoals:["Empathy & cross-cultural understanding","Communication (speaking, writing, presenting)","Resilience & adaptability"],strengths:["Art/design/media","Sports/physical","Languages/translation"],ambiguity:3,independence:3,priorService:2,availability:["Weekday afternoons","Saturday mornings","Saturday afternoons"],commitment:"4-6 hours/week",duration:"Full academic year",groupPref:"No preference",motivation:"I have two rescue dogs and I've seen how bad the stray animal situation is in Saigon. I want to do something about it.",meaningful:"Directly helping animals get adopted and seeing the family take them home.",specificInterest:"RAD7 is literally in my district. Also interested in ARC Saigon."},
];

const PATHWAY_COLORS = {
  "Education":"#2E75B6","Environmental":"#2D8C3C","Healthcare":"#C03030",
  "Technology":"#7B2D8E","Arts":"#D4851F","Community":"#1A6B7A",
  "Animal":"#6B8E23","Hunger":"#8B4513",
};
function getPathColor(p){for(const[k,v]of Object.entries(PATHWAY_COLORS))if(p.includes(k))return v;return"#666";}

function MultiSelect({ options, selected, onChange, columns = 1 }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: 6 }}>
      {options.map(o => {
        const active = selected.includes(o);
        return (
          <button key={o} type="button" onClick={() => onChange(active ? selected.filter(s => s !== o) : [...selected, o])}
            style={{ textAlign: "left", padding: "8px 12px", borderRadius: 6, fontSize: 13,
              border: active ? "1px solid #6B46C1" : "1px solid #30363D",
              background: active ? "#6B46C120" : "#0D1117",
              color: active ? "#C9D1D9" : "#8B949E", cursor: "pointer" }}>
            {active ? "✓ " : ""}{o}
          </button>
        );
      })}
    </div>
  );
}

function RatingSelect({ value, onChange }) {
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {[1,2,3,4,5].map(n => (
        <button key={n} type="button" onClick={() => onChange(n)}
          style={{ width: 40, height: 40, borderRadius: 8, fontSize: 16, fontWeight: 700, cursor: "pointer",
            border: value === n ? "2px solid #6B46C1" : "1px solid #30363D",
            background: value === n ? "#6B46C130" : "#0D1117",
            color: value === n ? "#9F7AEA" : "#8B949E" }}>
          {n}
        </button>
      ))}
    </div>
  );
}

function Label({ children, sub }) {
  return (
    <div style={{ marginBottom: 6 }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: "#C9D1D9" }}>{children}</div>
      {sub && <div style={{ fontSize: 12, color: "#8B949E", marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

function Field({ label, sub, children }) {
  return <div style={{ marginBottom: 20 }}><Label sub={sub}>{label}</Label>{children}</div>;
}

function TextInput({ value, onChange, placeholder }) {
  return <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
    style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #30363D",
      background: "#0D1117", color: "#C9D1D9", fontSize: 14, fontFamily: "Inter, sans-serif",
      outline: "none", boxSizing: "border-box" }} />;
}

function TextArea({ value, onChange, placeholder, rows = 3 }) {
  return <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows}
    style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #30363D",
      background: "#0D1117", color: "#C9D1D9", fontSize: 14, fontFamily: "Inter, sans-serif",
      outline: "none", resize: "vertical", boxSizing: "border-box" }} />;
}

function Select({ value, onChange, options }) {
  return <select value={value} onChange={e => onChange(e.target.value)}
    style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #30363D",
      background: "#0D1117", color: "#C9D1D9", fontSize: 14, fontFamily: "Inter, sans-serif" }}>
    <option value="">Select...</option>
    {options.map(o => <option key={o} value={o}>{o}</option>)}
  </select>;
}

export default function Home() {
  const [mode, setMode] = useState("choose"); // "choose" | "form" | "sample"
  const [matches, setMatches] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedSample, setSelectedSample] = useState(null);

  // Form state
  const [form, setForm] = useState({
    name:"",grade:"",age:"",nationality:"",languages:[],district:"",transport:"",maxTravel:"",
    pathways:[],subInterests:[],compGoals:[],strengths:[],
    ambiguity:3,independence:3,priorService:2,
    availability:[],commitment:"",duration:"",groupPref:"",
    motivation:"",meaningful:"",specificInterest:""
  });
  const u = (key) => (val) => setForm(f => ({ ...f, [key]: val }));

  const runMatch = async (student) => {
    setLoading(true); setMatches(null); setError(null);
    try {
      const res = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setMatches(data.matches);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const dlColors = { Mastery: "#58A6FF", Identity: "#F0883E", Creativity: "#A371F7" };

  return (
    <div style={{ fontFamily: "Inter, -apple-system, sans-serif", background: "#0D1117", color: "#E6EDF3", minHeight: "100vh" }}>
      {/* HEADER */}
      <div style={{ background: "linear-gradient(135deg, #1A1A2E, #16213E)", borderBottom: "1px solid #30363D", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #6B46C1, #9F7AEA)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🌐</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, letterSpacing: 1 }}>GATEWAY IMPACT LAB</div>
            <div style={{ fontSize: 11, color: "#8B949E" }}>AI-Powered Service Learning Matching • HCMC Pilot</div>
          </div>
        </div>
        <div style={{ fontSize: 12, color: "#8B949E", textAlign: "right" }}>
          100 Community Partners • Deeper Learning Framework<br/>Powered by Claude AI
        </div>
      </div>

      {/* HERO / CHOOSER */}
      {!matches && !loading && mode === "choose" && (
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "60px 24px", textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🎯</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, background: "linear-gradient(135deg, #9F7AEA, #6B46C1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Find Your Community Match
          </h1>
          <p style={{ color: "#8B949E", fontSize: 15, lineHeight: 1.7, maxWidth: 520, margin: "0 auto 32px" }}>
            Our AI analyzes your interests, skills, logistics, and deeper learning goals to match you with the best community partner from 100 organizations across Ho Chi Minh City.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setMode("form")} style={{ padding: "14px 32px", borderRadius: 10, border: "none", background: "linear-gradient(135deg, #6B46C1, #9F7AEA)", color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
              ✍️ Fill In My Profile
            </button>
            <button onClick={() => setMode("sample")} style={{ padding: "14px 32px", borderRadius: 10, border: "1px solid #30363D", background: "#161B22", color: "#C9D1D9", fontWeight: 600, fontSize: 15, cursor: "pointer" }}>
              👤 Try a Sample Student
            </button>
          </div>
          <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, textAlign: "left" }}>
            {[["🧠","Deeper Learning","Matches built on Mastery, Identity, and Creativity — not just pathway labels."],
              ["⚖️","Bilateral Value","Every match serves the organization's real needs AND the student's growth."],
              ["📈","Growth Edge","Placements stretch you beyond your comfort zone into future-proof skills."]
            ].map(([emoji,title,desc]) => (
              <div key={title} style={{ background: "#161B22", border: "1px solid #21262D", borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{emoji}</div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{title}</div>
                <div style={{ fontSize: 12, color: "#8B949E", lineHeight: 1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SAMPLE STUDENT PICKER */}
      {mode === "sample" && !matches && !loading && (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 24px" }}>
          <button onClick={() => { setMode("choose"); setSelectedSample(null); }} style={{ background: "none", border: "none", color: "#8B949E", cursor: "pointer", fontSize: 13, marginBottom: 16 }}>← Back</button>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Select a Sample Student</h2>
          <div style={{ display: "grid", gap: 10 }}>
            {SAMPLE_STUDENTS.map((s, i) => (
              <button key={i} onClick={() => setSelectedSample(s)} style={{
                textAlign: "left", padding: "14px 18px", borderRadius: 10,
                border: selectedSample === s ? "1px solid #6B46C1" : "1px solid #21262D",
                background: selectedSample === s ? "#6B46C115" : "#161B22",
                cursor: "pointer", color: "#E6EDF3"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{s.name}</div>
                    <div style={{ fontSize: 12, color: "#8B949E", marginTop: 2 }}>{s.grade} • {s.nationality} • {s.district}</div>
                  </div>
                  <div style={{ fontSize: 12, color: "#9F7AEA" }}>{s.pathways.join(" • ")}</div>
                </div>
                <div style={{ fontSize: 12, color: "#8B949E", marginTop: 6, lineHeight: 1.5 }}>{s.motivation}</div>
              </button>
            ))}
          </div>
          {selectedSample && (
            <button onClick={() => runMatch(selectedSample)} style={{ marginTop: 20, padding: "14px 40px", borderRadius: 10, border: "none", background: "linear-gradient(135deg, #6B46C1, #9F7AEA)", color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer", display: "block", width: "100%" }}>
              🎯 Run AI Matching for {selectedSample.name}
            </button>
          )}
        </div>
      )}

      {/* CUSTOM FORM */}
      {mode === "form" && !matches && !loading && (
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "32px 24px" }}>
          <button onClick={() => setMode("choose")} style={{ background: "none", border: "none", color: "#8B949E", cursor: "pointer", fontSize: 13, marginBottom: 16 }}>← Back</button>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Your Profile</h2>
          <p style={{ color: "#8B949E", fontSize: 13, marginBottom: 24 }}>Fill in what you can. The more you share, the better the match.</p>

          <div style={{ background: "#161B22", border: "1px solid #30363D", borderRadius: 12, padding: 24, marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#9F7AEA", marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>About You</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
              <Field label="Name"><TextInput value={form.name} onChange={u("name")} placeholder="Full name" /></Field>
              <Field label="Grade"><Select value={form.grade} onChange={u("grade")} options={["Grade 9","Grade 10","Grade 11","Grade 12"]} /></Field>
              <Field label="Age"><TextInput value={form.age} onChange={u("age")} placeholder="e.g., 16" /></Field>
              <Field label="Nationality"><TextInput value={form.nationality} onChange={u("nationality")} placeholder="e.g., Vietnamese-American" /></Field>
              <Field label="District"><Select value={form.district} onChange={u("district")} options={["District 1","District 2/Thu Duc","District 3","District 5","District 7","Binh Thanh","Binh Tan","Go Vap","Can Gio","Other"]} /></Field>
              <Field label="Transport"><TextInput value={form.transport} onChange={u("transport")} placeholder="e.g., Grab, school bus" /></Field>
            </div>
            <Field label="Max Travel Time"><TextInput value={form.maxTravel} onChange={u("maxTravel")} placeholder="e.g., 30 min one way" /></Field>
            <Field label="Languages" sub="Select all that apply"><MultiSelect options={["English (fluent)","Vietnamese (fluent)","Vietnamese (conversational)","Other"]} selected={form.languages} onChange={u("languages")} columns={2} /></Field>
          </div>

          <div style={{ background: "#161B22", border: "1px solid #30363D", borderRadius: 12, padding: 24, marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#9F7AEA", marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>Interests & Goals</div>
            <Field label="Pathway Interests" sub="Select your top 2-3"><MultiSelect options={PATHWAY_OPTIONS} selected={form.pathways} onChange={u("pathways")} /></Field>
            <Field label="What Kind of Work Interests You?" sub="Select all that genuinely appeal"><MultiSelect options={SUB_INTERESTS} selected={form.subInterests} onChange={u("subInterests")} columns={2} /></Field>
            <Field label="Competencies to Develop" sub="Select top 3-4"><MultiSelect options={COMPETENCIES} selected={form.compGoals} onChange={u("compGoals")} /></Field>
            <Field label="Your Current Strengths" sub="Select 2-3"><MultiSelect options={STRENGTHS} selected={form.strengths} onChange={u("strengths")} columns={2} /></Field>
          </div>

          <div style={{ background: "#161B22", border: "1px solid #30363D", borderRadius: 12, padding: 24, marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#9F7AEA", marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>Self-Assessment</div>
            <Field label="Comfort with Ambiguity" sub="1 = need clear instructions, 5 = thrive in uncertainty"><RatingSelect value={form.ambiguity} onChange={u("ambiguity")} /></Field>
            <Field label="Independence Level" sub="1 = need close supervision, 5 = fully self-directed"><RatingSelect value={form.independence} onChange={u("independence")} /></Field>
            <Field label="Prior Service Experience" sub="1 = none, 5 = extensive"><RatingSelect value={form.priorService} onChange={u("priorService")} /></Field>
          </div>

          <div style={{ background: "#161B22", border: "1px solid #30363D", borderRadius: 12, padding: 24, marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#9F7AEA", marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>Availability</div>
            <Field label="When Are You Available?" sub="Select all"><MultiSelect options={AVAILABILITY} selected={form.availability} onChange={u("availability")} columns={2} /></Field>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
              <Field label="Weekly Commitment"><Select value={form.commitment} onChange={u("commitment")} options={["2-4 hours/week","4-6 hours/week","6-10 hours/week"]} /></Field>
              <Field label="Duration"><Select value={form.duration} onChange={u("duration")} options={["One semester","Full academic year"]} /></Field>
            </div>
            <Field label="Group Preference"><Select value={form.groupPref} onChange={u("groupPref")} options={["Solo or pair","Small group (3-5)","Larger team (6+)","No preference"]} /></Field>
          </div>

          <div style={{ background: "#161B22", border: "1px solid #30363D", borderRadius: 12, padding: 24, marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#9F7AEA", marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>Motivation</div>
            <Field label="Why do you want to serve?" sub="Be honest — your real motivation helps us find the right fit."><TextArea value={form.motivation} onChange={u("motivation")} placeholder="What draws you to community service?" rows={3} /></Field>
            <Field label="What does meaningful service look like to you?"><TextArea value={form.meaningful} onChange={u("meaningful")} placeholder="Describe an experience you'd consider genuinely meaningful." rows={3} /></Field>
            <Field label="Any specific organizations or issues you care about?"><TextArea value={form.specificInterest} onChange={u("specificInterest")} placeholder="Optional — tell us if you already have something in mind." rows={2} /></Field>
          </div>

          <button onClick={() => runMatch(form)} disabled={!form.name || form.pathways.length === 0}
            style={{ padding: "16px 40px", borderRadius: 10, border: "none", width: "100%",
              background: (!form.name || form.pathways.length === 0) ? "#30363D" : "linear-gradient(135deg, #6B46C1, #9F7AEA)",
              color: "#fff", fontWeight: 700, fontSize: 16, cursor: (!form.name || form.pathways.length === 0) ? "not-allowed" : "pointer" }}>
            🎯 Find My Matches
          </button>
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div style={{ textAlign: "center", padding: 80 }}>
          <div style={{ fontSize: 48, marginBottom: 16, animation: "pulse 1.5s infinite" }}>🧠</div>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>AI is analyzing 100 community partners...</div>
          <div style={{ color: "#8B949E", fontSize: 14, maxWidth: 400, margin: "0 auto", lineHeight: 1.6 }}>
            Evaluating logistics feasibility, bilateral value, growth edge, competency fit, and deeper learning dimensions. This takes 10-20 seconds.
          </div>
          <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div style={{ maxWidth: 600, margin: "40px auto", padding: "20px 24px", background: "#DA363320", border: "1px solid #DA3633", borderRadius: 10, color: "#F85149" }}>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>Matching Error</div>
          <div style={{ fontSize: 13 }}>{error}</div>
          <button onClick={() => { setError(null); setMatches(null); setMode("choose"); }} style={{ marginTop: 12, padding: "8px 20px", borderRadius: 6, border: "1px solid #DA3633", background: "transparent", color: "#F85149", cursor: "pointer", fontSize: 13 }}>Try Again</button>
        </div>
      )}

      {/* RESULTS */}
      {matches && (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Your Top 3 Matches</h2>
            <button onClick={() => { setMatches(null); setMode("choose"); setSelectedSample(null); }}
              style={{ padding: "8px 20px", borderRadius: 8, border: "1px solid #30363D", background: "#161B22", color: "#C9D1D9", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
              ← Start Over
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {matches.map((m, i) => (
              <div key={i} style={{ background: "#161B22", border: "1px solid #30363D", borderRadius: 12, overflow: "hidden" }}>
                <div style={{ padding: "16px 20px", borderBottom: "1px solid #21262D", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ background: i === 0 ? "#6B46C1" : "#30363D", color: "#fff", fontWeight: 800, fontSize: 18, width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>#{i+1}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 17 }}>{m.partnerName}</div>
                      <div style={{ fontSize: 12, color: "#8B949E" }}>Partner #{m.partnerId}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ background: (dlColors[m.deeperLearningDimension] || "#666") + "20", color: dlColors[m.deeperLearningDimension] || "#666", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 12 }}>{m.deeperLearningDimension}</div>
                    <div style={{ background: m.matchScore >= 85 ? "#238636" : m.matchScore >= 70 ? "#9E6A03" : "#DA3633", color: "#fff", fontWeight: 800, fontSize: 18, padding: "6px 14px", borderRadius: 8 }}>{m.matchScore}%</div>
                  </div>
                </div>
                <div style={{ padding: "14px 20px", background: "#0D1117", fontSize: 15, fontWeight: 500, lineHeight: 1.5 }}>{m.headline}</div>
                <div style={{ padding: "16px 20px", display: "grid", gap: 14, fontSize: 13 }}>
                  {[["🚗","Logistics",m.logisticsFit],["🤝","Bilateral Value",m.bilateralValue],["📈","Growth Edge",m.growthEdge],["🧠","Competency Development",m.competencyDevelopment],["🔨","Suggested Project",m.suggestedProject],["⚠️","Risk",m.risk]].map(([e,l,t]) => (
                    <div key={l}><div style={{ color: "#8B949E", fontWeight: 600, marginBottom: 3 }}>{e} {l}</div><div style={{ color: "#C9D1D9", lineHeight: 1.7 }}>{t}</div></div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 32, padding: 20, background: "#161B22", border: "1px solid #30363D", borderRadius: 10, fontSize: 13, color: "#8B949E", lineHeight: 1.7 }}>
            <strong style={{ color: "#C9D1D9" }}>How this works:</strong> Gateway's AI evaluates all 100 HCMC community partners against your profile using five priority layers: logistics feasibility, bilateral value (both sides benefit), growth edge (you're stretched beyond comfort), competency-pathway fit, and identity alignment with your stated motivation. Matches are ranked by overall fit with an emphasis on future-proof skills from Mehta & Fine's Deeper Learning framework.
          </div>
        </div>
      )}
    </div>
  );
}
