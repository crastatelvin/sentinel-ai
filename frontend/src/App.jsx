import { useState } from 'react';
import './styles/globals.css';
import UploadPage from './pages/UploadPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  const [data, setData] = useState(null);
  return data
    ? <DashboardPage data={data} onReset={() => setData(null)} />
    : <UploadPage onUploadSuccess={setData} />;
}
