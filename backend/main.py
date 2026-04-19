from fastapi import FastAPI, UploadFile, File, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import asyncio
import json

from log_parser import parse_logs
from threat_detector import detect_threats, get_threat_summary
from threat_enricher import enrich_threats, get_attack_map_data
from attack_chain import build_attack_chains
from gemini_service import analyze_threats, predict_next_attack

app = FastAPI(title="SENTINEL AI — Threat Intelligence Platform")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory store
store = {}

# WebSocket connections
active_connections: list[WebSocket] = []

async def broadcast(message: dict):
    for connection in active_connections:
        try:
            await connection.send_text(json.dumps(message))
        except Exception:
            pass

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    active_connections.append(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        active_connections.remove(websocket)

@app.get("/")
def root():
    return {"status": "SENTINEL AI is online", "version": "1.0"}

@app.post("/upload")
async def upload_log(file: UploadFile = File(...)):
    try:
        content = (await file.read()).decode("utf-8", errors="ignore")
        
        # Broadcast: parsing started
        await broadcast({"event": "parsing", "message": f"Parsing {file.filename}..."})

        # Step 1: Parse logs
        entries = parse_logs(content, file.filename)
        await broadcast({"event": "parsed", "message": f"Parsed {len(entries)} log entries"})

        # Step 2: Detect threats
        threats = detect_threats(entries)
        await broadcast({"event": "detected", "message": f"Detected {len(threats)} threats"})

        # Step 3: Enrich with geolocation
        threats = await enrich_threats(threats)
        await broadcast({"event": "enriched", "message": "IP geolocation complete"})

        # Step 4: Build attack chains
        chains = build_attack_chains(threats)

        # Step 5: AI analysis
        summary = get_threat_summary(threats)
        await broadcast({"event": "analyzing", "message": "AI deep analysis running..."})
        
        ai_analysis = {}
        prediction = ""
        if threats:
            ai_analysis = analyze_threats(threats, summary)
            prediction = predict_next_attack(threats)

        # Store results
        store["threats"] = threats
        store["summary"] = summary
        store["chains"] = chains
        store["ai_analysis"] = ai_analysis
        store["prediction"] = prediction
        store["map_data"] = get_attack_map_data(threats)
        store["raw_entries"] = entries[:100]

        await broadcast({"event": "complete", "message": "Analysis complete"})

        return JSONResponse({
            "success": True,
            "filename": file.filename,
            "total_entries": len(entries),
            "total_threats": len(threats),
            "summary": summary,
            "threats": threats[:50],
            "chains": chains[:10],
            "ai_analysis": ai_analysis,
            "prediction": prediction,
            "map_data": store["map_data"]
        })

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

@app.get("/threats")
def get_threats():
    return JSONResponse(store.get("threats", [])[:100])

@app.get("/summary")
def get_summary():
    return JSONResponse(store.get("summary", {}))

@app.get("/chains")
def get_chains():
    return JSONResponse(store.get("chains", []))

@app.get("/ai-analysis")
def get_ai_analysis():
    return JSONResponse(store.get("ai_analysis", {}))

@app.get("/map-data")
def get_map_data():
    return JSONResponse(store.get("map_data", []))

@app.get("/status")
def get_status():
    return JSONResponse({
        "has_data": "threats" in store,
        "total_threats": len(store.get("threats", [])),
        "total_chains": len(store.get("chains", []))
    })
