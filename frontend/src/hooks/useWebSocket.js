import { useEffect, useRef, useState } from 'react';

const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws';

export default function useWebSocket() {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState('connecting');
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(WS_URL);

    ws.current.onopen = () => setStatus('connected');
    ws.current.onclose = () => setStatus('disconnected');
    ws.current.onerror = () => setStatus('error');

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setMessages(prev => [...prev.slice(-50), data]);
      } catch {}
    };

    return () => ws.current?.close();
  }, []);

  return { messages, status };
}
