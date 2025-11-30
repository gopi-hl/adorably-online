import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="text-center py-32">
      <h2 className="text-2xl font-bold mb-4 dark:text-white text-slate-900">Page Not Found</h2>
      <p className="text-slate-500 mb-6">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="text-violet-500 hover:underline">Back to Catalog</Link>
    </div>
  );
}
