import { NextResponse } from "next/server";
import { partners } from "@/lib/partners";
import { MATCHING_PROMPT } from "@/lib/prompt";

export async function POST(request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY not configured. Add it in Vercel Environment Variables." },
      { status: 500 }
    );
  }

  try {
    const { student } = await request.json();

    if (!student) {
      return NextResponse.json({ error: "No student data provided" }, { status: 400 });
    }

    // Build partner summaries for the prompt
    const partnerSummaries = partners
      .map(
        (p) =>
          `[ID:${p.id}] ${p.name} | Path: ${p.path} | Dist: ${p.dist} | Eng: ${p.eng} | Competency: ${p.comp} | Needs: ${p.needs.join(", ")} | Mission: ${p.mission}`
      )
      .join("\n");

    // Build student profile text
    const studentProfile = `
STUDENT PROFILE:
Name: ${student.name} | Grade: ${student.grade} | Age: ${student.age}
Nationality: ${student.nationality} | Languages: ${student.languages.join(", ")}
District: ${student.district} | Transport: ${student.transport} | Max travel: ${student.maxTravel}
Pathway interests: ${student.pathways.join(", ")}
Sub-interests: ${student.subInterests.join(", ")}
Competencies to develop: ${student.compGoals.join(", ")}
Current strengths: ${student.strengths.join(", ")}
Comfort with ambiguity: ${student.ambiguity}/5 | Independence: ${student.independence}/5 | Prior service: ${student.priorService}/5
Availability: ${student.availability.join(", ")} | Commitment: ${student.commitment} | Duration: ${student.duration}
Group preference: ${student.groupPref}
Motivation: ${student.motivation}
What meaningful service looks like to them: ${student.meaningful}
Specific interest: ${student.specificInterest}`;

    // Call Claude API
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-haiku-20240307",
        max_tokens: 4000,
        system: MATCHING_PROMPT,
        messages: [
          {
            role: "user",
            content: `Here are all 100 available community partners:\n\n${partnerSummaries}\n\n${studentProfile}\n\nReturn the top 3 matches as JSON.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Anthropic API error:", response.status, errText);
      return NextResponse.json(
        { error: `API returned ${response.status}` },
        { status: 502 }
      );
    }

    const data = await response.json();
    const text = data.content?.[0]?.text || "";
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("Match API error:", err);
    return NextResponse.json(
      { error: "Matching failed: " + err.message },
      { status: 500 }
    );
  }
}
