import { useState } from 'react';

type Props = {
  onAdd: (content: string, tags: string[]) => void;
};

function parseTags(input: string): string[] {
  return input
    .split(/[,\s]+/)
    .map((t) => t.trim().replace(/^#/, ''))
    .filter(Boolean);
}

export default function StudyForm({ onAdd }: Props) {
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = content.trim();
    if (!trimmed) return;
    onAdd(trimmed, parseTags(tagInput));
    setContent('');
    setTagInput('');
  };

  return (
    <section className="card">
      <h2 className="section-title">学習を記録する</h2>
      <form onSubmit={handleSubmit} className="study-form">
        <textarea
          className="form-input"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="今日の学習内容を入力（例：応用情報の過去問を解いた）"
          rows={2}
          required
        />
        <input
          className="form-input"
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          placeholder="タグ（例：応用情報, React）※任意・カンマ区切り"
        />
        <button type="submit" className="btn-primary">
          記録する
        </button>
      </form>
    </section>
  );
}