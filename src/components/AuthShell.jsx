// Shared card layout and field styles for the login, register and forgot-password pages
export const inputClass =
  "w-full rounded-xl border border-line bg-ink px-4 py-3 text-text placeholder:text-muted/60 transition focus:border-rose focus:outline-none";

export default function AuthShell({ title, subtitle, children }) {
  return (
    <div className="mx-auto flex max-w-md flex-col px-5 py-14">
      <h1 className="font-display text-5xl font-semibold">{title}</h1>
      <p className="mt-2 text-muted">{subtitle}</p>
      <div className="mt-8 rounded-2xl border border-line bg-panel p-6 sm:p-8">{children}</div>
    </div>
  );
}

export function FormError({ message }) {
  if (!message) return null;
  return (
    <p role="alert" className="mb-4 rounded-xl border border-rose-deep/50 bg-rose-deep/10 px-4 py-3 text-sm text-rose">
      {message}
    </p>
  );
}

export function GoogleButton({ onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex w-full items-center justify-center gap-3 rounded-full border border-line px-6 py-3 font-medium transition hover:border-rose disabled:opacity-60"
    >
      <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
        <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.4 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6.1C12.3 13.6 17.7 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z"/>
        <path fill="#FBBC05" d="M10.4 28.7a14.5 14.5 0 010-9.4l-7.8-6.1a24 24 0 000 21.6l7.8-6.1z"/>
        <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.8 2.3-8.4 2.3-6.3 0-11.7-4.1-13.6-9.8l-7.8 6.1C6.5 42.6 14.6 48 24 48z"/>
      </svg>
      Continue with Google
    </button>
  );
}

export function Divider() {
  return (
    <div className="my-6 flex items-center gap-4 text-sm text-muted">
      <span className="h-px flex-1 bg-line" />
      or
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
