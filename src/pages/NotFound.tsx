import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="mx-auto grid min-h-[50vh] max-w-md place-items-center p-6 text-center">
      <div className="nb-card bg-pink p-8">
        <h1 className="text-3xl font-bold">Page not found</h1>
        <p className="mt-2">That page doesn’t exist. It may have moved.</p>
        <Link to="/" className="nb-btn nb-btn-primary mt-4">
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
