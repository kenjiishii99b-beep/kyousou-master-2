import { SignupForm } from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-12">
      <div className="w-full rounded-lg border border-slate-100 p-6 shadow-sm">
        <SignupForm />
      </div>
    </main>
  );
}
