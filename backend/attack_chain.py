from collections import defaultdict

def build_attack_chains(threats: list) -> list:
    """Group threats by IP and build attack narratives"""
    ip_threats = defaultdict(list)
    
    for threat in threats:
        ip = threat["ip"]
        ip_threats[ip].append(threat)
    
    chains = []
    for ip, ip_threat_list in ip_threats.items():
        if len(ip_threat_list) < 2:
            continue
        
        categories = [t["category"] for t in ip_threat_list]
        severities = [t["severity"] for t in ip_threat_list]
        
        # Detect escalation patterns
        chain_type = "unknown"
        narrative = ""
        
        if "recon" in categories and "brute_force" in categories:
            chain_type = "recon_to_bruteforce"
            narrative = f"IP {ip} began with reconnaissance scanning, then escalated to brute force login attempts. This is a classic targeted attack pattern."
        elif "recon" in categories and "sqli" in categories:
            chain_type = "recon_to_injection"
            narrative = f"IP {ip} performed reconnaissance to identify vulnerabilities, then launched SQL injection attacks. High likelihood of automated exploit toolkit."
        elif "brute_force" in categories and "cmdi" in categories:
            chain_type = "bruteforce_to_rce"
            narrative = f"CRITICAL: IP {ip} attempted brute force login followed by command injection. If any login succeeded, system may be compromised."
        elif len(set(categories)) >= 3:
            chain_type = "multi_vector"
            narrative = f"IP {ip} launched a sophisticated multi-vector attack using {len(set(categories))} different techniques. This indicates an advanced persistent threat actor."
        else:
            narrative = f"IP {ip} performed {len(ip_threat_list)} attack attempts using {', '.join(set(categories))} techniques."
        
        max_severity = "critical" if "critical" in severities else "high" if "high" in severities else "medium"
        
        chains.append({
            "ip": ip,
            "chain_type": chain_type,
            "narrative": narrative,
            "attack_count": len(ip_threat_list),
            "techniques": list(set(categories)),
            "max_severity": max_severity,
            "geo": ip_threat_list[0].get("geo", {})
        })
    
    return sorted(chains, key=lambda x: x["attack_count"], reverse=True)
