import { useState, useEffect } from 'react';
import type { StudyLog } from '../types';

const STORAGE_KEY = 'study-grass-logs';

export function useStudyLogs() {
  const [logs, setLogs] = useState<StudyLog[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as StudyLog[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  }, [logs]);

  const addLog = (content: string, tags: string[]) => {
    const d = new Date();
    const today = [
      d.getFullYear(),
      String(d.getMonth() + 1).padStart(2, '0'),
      String(d.getDate()).padStart(2, '0'),
    ].join('-');
    const newLog: StudyLog = {
      id: crypto.randomUUID(),
      date: today,
      content: content.trim(),
      tags,
      createdAt: new Date().toISOString(),
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  const deleteLog = (id: string) => {
    setLogs((prev) => prev.filter((log) => log.id !== id));
  };

  return { logs, addLog, deleteLog };
}