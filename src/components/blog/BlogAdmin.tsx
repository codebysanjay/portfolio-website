"use client";

export default function BlogAdmin() {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center gap-8 px-4 py-24">
      <div className="max-w-2xl w-full text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Blog Admin</h2>
        <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-6">
          Blog admin (create, update, delete) will be implemented here with Firebase Auth.
        </p>
      </div>
    </section>
  );
} 