import re

# Threat pattern definitions
THREAT_PATTERNS = [
    {
        "name": "Brute Force",
        "category": "brute_force",
        "severity": "critical",
        "patterns": [
            r"Failed password",
            r"authentication failure",
            r"BREAK-IN ATTEMPT",
            r"Invalid user"
        ],
        "description": "Repeated failed login attempts indicating automated password guessing"
    },
    {
        "name": "SQL Injection",
        "category": "sqli",
        "severity": "critical",
        "patterns": [
            r"(?i)(union\s+select|select\s+\*|drop\s+table|insert\s+into|or\s+1=1|and\s+1=1)",
            r"(?i)(\%27|\'|--|\%23|#)",
            r"(?i)(sleep\(|benchmark\(|waitfor\s+delay)"
        ],
        "description": "Malicious SQL code injected into request parameters"
    },
    {
        "name": "XSS Attack",
        "category": "xss",
        "severity": "high",
        "patterns": [
            r"(?i)(<script|javascript:|onerror=|onload=|alert\()",
            r"(?i)(\%3Cscript|\%3E)",
        ],
        "description": "Cross-site scripting attempt to inject malicious client-side code"
    },
    {
        "name": "Path Traversal",
        "category": "traversal",
        "severity": "high",
        "patterns": [
            r"(\.\./|\.\.\\|%2e%2e)",
            r"(/etc/passwd|/etc/shadow|/proc/self)",
            r"(boot\.ini|win\.ini|system32)"
        ],
        "description": "Attempt to access files outside the web root directory"
    },
    {
        "name": "Reconnaissance",
        "category": "recon",
        "severity": "medium",
        "patterns": [
            r"(?i)(nikto|nmap|masscan|sqlmap|dirbuster|gobuster)",
            r"(?i)(\.git/|\.env|config\.php|wp-config)",
            r"(?i)(admin|phpmyadmin|wp-admin|\.htaccess)"
        ],
        "description": "Scanning and probing to discover vulnerabilities and system information"
    },
    {
        "name": "Command Injection",
        "category": "cmdi",
        "severity": "critical",
        "patterns": [
            r"(?i)(;ls|;cat|;whoami|\|ls|\|cat|\|whoami)",
            r"(?i)(\$\(|\`.*\`)",
            r"(?i)(nc\s+-|netcat|/bin/sh|/bin/bash)"
        ],
        "description": "Attempt to execute arbitrary system commands on the server"
    },
    {
        "name": "DDoS Pattern",
        "category": "ddos",
        "severity": "high",
        "patterns": [
            r"(?i)(flood|DoS|DDoS)",
        ],
        "description": "High volume of requests designed to overwhelm server resources"
    }
]

SEVERITY_SCORE = {
    "critical": 90,
    "high": 70,
    "medium": 40,
    "low": 20
}

def detect_threats(entries: list) -> list:
    threats = []
    
    for entry in entries:
        raw = entry.get("raw", "") + " " + entry.get("path", "") + " " + entry.get("event", "")
        
        for pattern_def in THREAT_PATTERNS:
            for pattern in pattern_def["patterns"]:
                if re.search(pattern, raw):
                    threats.append({
                        "ip": entry.get("ip", "unknown"),
                        "time": entry.get("time", ""),
                        "raw": entry.get("raw", ""),
                        "threat_name": pattern_def["name"],
                        "category": pattern_def["category"],
                        "severity": pattern_def["severity"],
                        "severity_score": SEVERITY_SCORE[pattern_def["severity"]],
                        "description": pattern_def["description"],
                        "matched_pattern": pattern,
                        "confidence": 85
                    })
                    break

    return threats

def get_threat_summary(threats: list) -> dict:
    if not threats:
        return {"total": 0, "by_severity": {}, "by_category": {}, "top_ips": []}
    
    by_severity = {}
    by_category = {}
    ip_counts = {}

    for t in threats:
        sev = t["severity"]
        cat = t["category"]
        ip = t["ip"]

        by_severity[sev] = by_severity.get(sev, 0) + 1
        by_category[cat] = by_category.get(cat, 0) + 1
        ip_counts[ip] = ip_counts.get(ip, 0) + 1

    top_ips = sorted(ip_counts.items(), key=lambda x: x[1], reverse=True)[:10]

    return {
        "total": len(threats),
        "by_severity": by_severity,
        "by_category": by_category,
        "top_ips": [{"ip": ip, "count": count} for ip, count in top_ips]
    }
