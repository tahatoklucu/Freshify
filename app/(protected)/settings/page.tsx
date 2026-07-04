"use client";

import { useActionState, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Save, AlertCircle, Trash2, Lock, Mail, Calendar } from "lucide-react";
import { updatePassword, deleteAccount } from "@/app/actions/auth";

export default function SettingsPage() {
  const { data: session } = useSession();
  const formatDate = (date: any) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl">
          <Lock size={24} />
        </div>
        <h1 className="text-3xl font-black text-slate-900">Account Security</h1>
      </div>
      <div className="bg-white border border-slate-100 rounded-3xl p-6 mb-8 shadow-sm flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
        <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-black text-2xl border-4 border-slate-50 overflow-hidden shrink-0">
             {session?.user?.image ? (
                <img src={session.user.image} alt="Profile" className="w-full h-full object-cover" />
             ) : (
                session?.user?.name?.charAt(0).toUpperCase()
             )}
        </div>
        <div className="min-w-0">
          <h2 className="text-lg font-black text-slate-900 truncate">{session?.user?.name || "User"}</h2>
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-4 text-slate-500 text-sm mt-1">
            <span className="flex items-center gap-1"><Mail size={14} className="shrink-0" /> {session?.user?.email}</span>
            <span className="flex items-center gap-1"><Calendar size={14} className="shrink-0" /> Joined {formatDate((session?.user as any)?.createdAt)}</span>
          </div>
        </div>
      </div>

      <main className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
        <SecurityForm />
      </main>
    </div>
  );
}

function SecurityForm() {
  const { data: session } = useSession();
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordState, passwordAction, isPasswordPending] = useActionState(updatePassword, undefined);
  const [isDeletePending, setIsDeletePending] = useState(false);

  if (!session) return null;
  const isGoogleUser = !(session.user as any)?.password;

  return (
    <div className="space-y-10">
      {!isGoogleUser ? (
        <form action={passwordAction} className="space-y-6">
          <h2 className="text-xl font-black">Change Password</h2>
          {passwordState?.error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{passwordState.error}</p>}
          {passwordState?.success && <p className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">Password updated!</p>}
          <div className="space-y-4">
            <InputField name="currentPassword" label="Current Password" type="password" />
            <InputField name="newPassword" label="New Password" type="password" />
            <InputField name="confirmPassword" label="Confirm New Password" type="password" />
          </div>
          <button type="submit" disabled={isPasswordPending} className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all disabled:opacity-50">
            {isPasswordPending ? "Updating..." : <><Save size={16} /> Update Password</>}
          </button>
        </form>
      ) : (
        <div className="flex items-start sm:items-center gap-4 p-6 bg-orange-50 border border-orange-100 rounded-3xl text-orange-700">
          <AlertCircle className="shrink-0 mt-1 sm:mt-0" />
          <div>
            <h3 className="font-black">External Account</h3>
            <p className="text-sm">Password management is not available for accounts linked to Google.</p>
          </div>
        </div>
      )}

      <div className="pt-6 border-t border-slate-100">
        <div className="space-y-3 p-4 bg-red-50/50 border border-red-100 rounded-2xl">
          <h3 className="text-sm font-black text-red-600 uppercase tracking-wide">Delete Account</h3>
          <p className="text-xs text-red-500/80">Once you delete your account, there is no going back. This is permanent.</p>
          <button onClick={() => setShowConfirm(true)} className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-red-700 transition-all flex items-center gap-2 cursor-pointer">
            <Trash2 size={14} /> Delete Account
          </button>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-3xl max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="text-lg font-black">Are you sure?</h3>
            <p className="text-sm text-slate-500">This will permanently delete your account and all associated data.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirm(false)} className="flex-1 px-4 py-2 rounded-xl font-bold text-sm bg-slate-100 cursor-pointer">Cancel</button>
              <button onClick={async () => {
                setIsDeletePending(true);
                const res = await deleteAccount();
                if (res?.success) await signOut({ callbackUrl: "/" });
                else setIsDeletePending(false);
              }} className="flex-1 px-4 py-2 rounded-xl font-bold text-sm bg-red-600 text-white cursor-pointer">
                {isDeletePending ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InputField({ label, name, type = "text" }: { label: string, name: string, type?: string }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-slate-400 uppercase">{label}</label>
      <input name={name} type={type} required className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all" />
    </div>
  );
}