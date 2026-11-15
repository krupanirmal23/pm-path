export function SearchDialog({ onClose }: { onClose: () => void }) {
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center bg-black/30" onClick={onClose}>
      <div className="nb-card p-6">Search is coming soon.</div>
    </div>
  );
}
