import httpx
import asyncio

async def geolocate_ip(ip: str) -> dict:
    if ip in ("unknown", "127.0.0.1", "localhost"):
        return {"country": "Local", "city": "localhost", "lat": 0, "lon": 0, "isp": "Local"}
    
    try:
        async with httpx.AsyncClient(timeout=3.0) as client:
            response = await client.get(f"http://ip-api.com/json/{ip}?fields=country,city,lat,lon,isp,org,as")
            if response.status_code == 200:
                data = response.json()
                return {
                    "country": data.get("country", "Unknown"),
                    "city": data.get("city", "Unknown"),
                    "lat": data.get("lat", 0),
                    "lon": data.get("lon", 0),
                    "isp": data.get("isp", "Unknown"),
                    "org": data.get("org", "Unknown")
                }
    except Exception:
        pass
    
    return {"country": "Unknown", "city": "Unknown", "lat": 0, "lon": 0, "isp": "Unknown"}

async def enrich_threats(threats: list) -> list:
    unique_ips = list(set(t["ip"] for t in threats if t["ip"] != "unknown"))
    
    # Geolocate all unique IPs concurrently
    geo_cache = {}
    tasks = [geolocate_ip(ip) for ip in unique_ips]
    results = await asyncio.gather(*tasks)
    
    for ip, geo in zip(unique_ips, results):
        geo_cache[ip] = geo
    
    # Attach geo data to threats
    enriched = []
    for threat in threats:
        threat["geo"] = geo_cache.get(threat["ip"], {
            "country": "Unknown", "city": "Unknown", "lat": 0, "lon": 0
        })
        enriched.append(threat)
    
    return enriched

def get_attack_map_data(threats: list) -> list:
    """Returns data formatted for the globe visualization"""
    ip_geo = {}
    for t in threats:
        ip = t["ip"]
        if ip not in ip_geo and t.get("geo"):
            geo = t["geo"]
            if geo.get("lat") and geo.get("lon"):
                ip_geo[ip] = {
                    "ip": ip,
                    "lat": geo["lat"],
                    "lng": geo["lon"],
                    "country": geo["country"],
                    "count": 0,
                    "severity": t["severity"]
                }
        if ip in ip_geo:
            ip_geo[ip]["count"] += 1
    
    return list(ip_geo.values())
