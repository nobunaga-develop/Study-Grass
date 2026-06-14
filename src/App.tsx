import { Analytics } from '@vercel/analytics/react';
import { useStudyLogs } from './hooks/useStudyLogs';
import StudyForm from './components/StudyForm';
import StatsCards from './components/StatsCards';
import GrassCalendar from './components/GrassCalendar';
import StudyLogList from './components/StudyLogList';

export default function App() {
  const { logs, addLog, deleteLog } = useStudyLogs();

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Study Grass</h1>
        <p className="app-subtitle">今日も草を生やそう</p>
      </header>
      <main className="app-main">
        <StudyForm onAdd={addLog} />
        <StatsCards logs={logs} />
        <GrassCalendar logs={logs} />
        <StudyLogList logs={logs} onDelete={deleteLog} />
      </main>
      <Analytics />
    </div>
  );
}