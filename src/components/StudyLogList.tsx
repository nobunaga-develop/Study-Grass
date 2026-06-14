import type { StudyLog } from '../types';

type Props = {
  logs: StudyLog[];
  onDelete: (id: string) => void;
};

export default function StudyLogList({ logs, onDelete }: Props) {
  if (logs.length === 0) {
    return (
      <section className="card">
        <h2 className="section-title">学習ログ</h2>
        <p className="empty-message">まだ記録がありません。最初の学習を記録してみましょう！</p>
      </section>
    );
  }

  const handleDelete = (id: string) => {
    if (window.confirm('このログを削除しますか？')) {
      onDelete(id);
    }
  };

  return (
    <section className="card">
      <h2 className="section-title">学習ログ</h2>
      <ul className="log-list">
        {logs.map((log) => (
          <li key={log.id} className="log-item">
            <div className="log-date">{log.date}</div>
            <div className="log-content">{log.content}</div>
            {log.tags.length > 0 && (
              <div className="log-tags">
                {log.tags.map((tag) => (
                  <span key={tag} className="tag">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            <button
              className="btn-delete"
              onClick={() => handleDelete(log.id)}
              aria-label="削除"
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}