from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

client = None
try:
    if os.getenv("GEMINI_API_KEY"):
        client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
except Exception as e:
    print(f"Warning: Gemini Client failed to initialize: {e}")

def analyze_threats(threats: list, summary: dict) -> dict:
    threat_text = "\n".join([
        f"- [{t['severity'].upper()}] {t['threat_name']} from IP {t['ip']} | {t['description']}"
        for t in threats[:30]
    ])

    prompt = f"""
You are SENTINEL, an elite AI cybersecurity analyst inside a real-time threat intelligence platform.

THREAT SUMMARY:
Total threats detected: {summary['total']}
By severity: {summary['by_severity']}
By category: {summary['by_category']}
Top attacking IPs: {summary['top_ips'][:5]}

THREAT DETAILS (sample):
{threat_text}

Generate a comprehensive security analysis with EXACTLY these 4 sections:

EXECUTIVE_BRIEFING:
Write a 3-sentence executive summary of what happened, written like a real security incident report. Be specific about attack types and severity. Please use Markdown.

ATTACK_NARRATIVE:
Write a 4-5 sentence story connecting the attack patterns. Explain what the attacker was likely trying to do, in what sequence, and what their goal probably was. Please use Markdown.

RISK_ASSESSMENT:
Rate overall risk as CRITICAL/HIGH/MEDIUM/LOW and explain why in 2-3 sentences. Mention which systems are most at risk. Please use Markdown.

REMEDIATION_PLAYBOOK:
List exactly 5 specific remediation actions. Each action must include the exact terminal command to execute it. Format each as:
ACTION: [what to do]
COMMAND: [exact terminal command]

Keep the entire response professional, technical, and actionable.
"""
    try:
        response = client.models.generate_content(
            model="gemini-flash-latest",
            contents=prompt
        )
        return parse_ai_response(response.text)
    except Exception as e:
        print(f"Error calling Gemini: {e}")
        return {
            "executive_briefing": "AI analysis failed. Check API key.",
            "attack_narrative": "",
            "risk_assessment": "",
            "remediation_playbook": []
        }

def parse_ai_response(text: str) -> dict:
    sections = {
        "executive_briefing": "",
        "attack_narrative": "",
        "risk_assessment": "",
        "remediation_playbook": []
    }
    
    current_section = None
    lines = text.split("\n")
    buffer = []
    
    for line in lines:
        line = line.strip()
        if "EXECUTIVE_BRIEFING:" in line:
            current_section = "executive_briefing"
            buffer = []
        elif "ATTACK_NARRATIVE:" in line:
            if current_section:
                sections[current_section] = "\n".join(buffer).strip()
            current_section = "attack_narrative"
            buffer = []
        elif "RISK_ASSESSMENT:" in line:
            if current_section:
                sections[current_section] = "\n".join(buffer).strip()
            current_section = "risk_assessment"
            buffer = []
        elif "REMEDIATION_PLAYBOOK:" in line:
            if current_section:
                sections[current_section] = "\n".join(buffer).strip()
            current_section = "remediation_playbook"
            buffer = []
        elif line and current_section:
            if current_section == "remediation_playbook":
                if line.startswith("ACTION:") or line.startswith("COMMAND:"):
                    buffer.append(line)
            else:
                buffer.append(line)
    
    # Parse remediation into structured list
    remediation = []
    action = None
    for item in buffer:
        if item.startswith("ACTION:"):
            action = item.replace("ACTION:", "").strip()
        elif item.startswith("COMMAND:") and action:
            remediation.append({
                "action": action,
                "command": item.replace("COMMAND:", "").strip()
            })
            action = None
    
    sections["remediation_playbook"] = remediation
    if current_section and current_section != "remediation_playbook":
        sections[current_section] = "\n".join(buffer).strip()
    
    return sections

def predict_next_attack(threats: list) -> str:
    categories = [t["category"] for t in threats]
    
    if "recon" in categories and "brute_force" not in categories:
        return "Based on reconnaissance activity detected, expect brute force login attempts within the next phase of this attack."
    elif "brute_force" in categories and "cmdi" not in categories:
        return "Brute force pattern detected. If credentials are weak, expect command injection or privilege escalation attempts next."
    elif len(set(categories)) >= 3:
        return "Multi-vector attack in progress. Attacker is systematically probing all surfaces. Immediate lockdown recommended."
    else:
        return "Monitor for escalation. Current pattern suggests automated scanning — may be followed by targeted exploitation."
