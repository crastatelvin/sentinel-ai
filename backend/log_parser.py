import re
import pandas as pd
from datetime import datetime

# Regex patterns for different log formats
PATTERNS = {
    "apache": re.compile(
        r'(?P<ip>\d+\.\d+\.\d+\.\d+).*?\[(?P<time>[^\]]+)\].*?"(?P<method>\w+)\s(?P<path>[^\s]+).*?"\s(?P<status>\d+)'
    ),
    "nginx": re.compile(
        r'(?P<ip>\d+\.\d+\.\d+\.\d+).*?\[(?P<time>[^\]]+)\].*?"(?P<method>\w+)\s(?P<path>[^\s]+).*?"\s(?P<status>\d+)'
    ),
    "auth": re.compile(
        r'(?P<time>\w+\s+\d+\s[\d:]+).*?(?P<event>Failed password|Accepted password|Invalid user|authentication failure|BREAK-IN ATTEMPT).*?(?:from\s(?P<ip>\d+\.\d+\.\d+\.\d+))?'
    ),
    "csv": None
}

def detect_format(content: str) -> str:
    if "Failed password" in content or "Invalid user" in content:
        return "auth"
    if '"GET' in content or '"POST' in content:
        if "nginx" in content.lower():
            return "nginx"
        return "apache"
    return "unknown"

def parse_logs(content: str, filename: str) -> list:
    if filename.endswith(".csv"):
        return parse_csv(content)
    
    fmt = detect_format(content)
    lines = content.strip().split("\n")
    entries = []

    for line in lines:
        line = line.strip()
        if not line:
            continue
        
        if fmt == "auth":
            match = PATTERNS["auth"].search(line)
            if match:
                entries.append({
                    "raw": line,
                    "ip": match.group("ip") or "unknown",
                    "time": match.group("time"),
                    "event": match.group("event"),
                    "format": "auth"
                })
        elif fmt in ("apache", "nginx"):
            match = PATTERNS[fmt].search(line)
            if match:
                entries.append({
                    "raw": line,
                    "ip": match.group("ip"),
                    "time": match.group("time"),
                    "method": match.group("method"),
                    "path": match.group("path"),
                    "status": match.group("status"),
                    "format": fmt
                })
        else:
            entries.append({
                "raw": line,
                "ip": "unknown",
                "time": "",
                "event": line,
                "format": "unknown"
            })

    return entries

def parse_csv(content: str) -> list:
    import io
    df = pd.read_csv(io.StringIO(content))
    return df.to_dict(orient="records")
