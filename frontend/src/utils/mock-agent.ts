import { Draft } from "../types";

export function mockAgentDraft(rawText: string): Partial<Draft> {
  const text = rawText.toLowerCase();

  let type = "qibits";
  let tags = ["note"];
  let priority = "low";

  if (text.includes("mom") || text.includes("oxygen") || text.includes("med") || text.includes("doctor")) {
    type = "care";
    tags = ["health", "care"];
    priority = "high";
  } else if (text.includes("bill") || text.includes("bank") || text.includes("receipt") || text.includes("payment")) {
    type = "transactions";
    tags = ["finance", "money"];
    priority = "medium";
  } else if (text.includes("court") || text.includes("filing") || text.includes("motion") || text.includes("legal")) {
    type = "events";
    tags = ["legal"];
    priority = "high";
  } else if (text.includes("server") || text.includes("app") || text.includes("repo") || text.includes("deploy")) {
    type = "actions";
    tags = ["tech", "dev"];
  } else if (text.includes("todo") || text.includes("call") || text.includes("send") || text.includes("finish")) {
    type = "actions";
    tags = ["task"];
    priority = "medium";
  }

  const summary = text.length > 50 ? text.substring(0, 47) + "..." : text;

  return {
    suggestedType: type,
    summary,
    suggestedTags: tags,
    suggestedPriority: priority,
  };
}

export function mockIngestion(title: string, rawText: string, sourceType?: string): Draft {
  const suggestions = mockAgentDraft(rawText);

  return {
    id: "draft-" + Math.random().toString(36).substring(2, 9),
    createdAt: new Date().toISOString(),
    title: title || (rawText.length > 20 ? rawText.substring(0, 20) + "..." : rawText),
    sourceType,
    rawText,
    suggestedType: suggestions.suggestedType || "qibits",
    summary: suggestions.summary || rawText,
    suggestedTags: suggestions.suggestedTags || [],
    suggestedPriority: suggestions.suggestedPriority || "low",
    status: "draft"
  };
}
