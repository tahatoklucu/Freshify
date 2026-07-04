"use client";

import { useActionState, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Shield, Bell, Save, AlertCircle, Trash2 } from "lucide-react";
import { updatePassword, deleteAccount } from "@/app/actions/auth";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("security");

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-black text-slate-900 mb-8">Account Settings</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 space-y-2">
          <TabButton active={activeTab === "security"} onClick={() => setActiveTab("security")} icon={Shield} label="Security" />
          <TabButton active={activeTab === "notifications"} onClick={() => setActiveTab("notifications")} icon={Bell} label="Notifications" />
        </aside>

        <main className="flex-1 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          {activeTab === "security" && <SecurityForm />}
          {activeTab === "notifications" && <NotificationForm />}
        </main>
      </div>
    </div>
  );
}

function SecurityForm() {
  const { data: session } = useSession();
  const [showConfirm, setShowConfirm] = useState(false);
  
  const [passwordState, passwordAction, isPasswordPending] = useActionState(updatePassword, undefined);
  const [isDeletePending, setIsDeletePending] = useState(false);

  const isGoogleUser = session?.user?.email && !(session.user as any)?.password;

  return (
    <div className="space-y-10">
      {/* 1. Şifre Bölümü */}
      {!isGoogleUser ? (
        <form action={passwordAction} className="space-y-6">
          <h2 className="text-xl font-black">Security Preferences</h2>
          {passwordState?.error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{passwordState.error}</p>}
          {passwordState?.success && <p className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">Password updated successfully!</p>}
          
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
        <div className="flex items-center gap-4 p-6 bg-orange-50 border border-orange-100 rounded-3xl text-orange-700">
          <AlertCircle className="shrink-0" />
          <div>
            <h3 className="font-black">External Account</h3>
            <p className="text-sm">Password management is not available for accounts linked to Google.</p>
          </div>
        </div>
      )}

      {/* 2. Hesap Silme Bölümü */}
      <hr className="border-slate-100" />
      <div className="space-y-3 p-4 bg-red-50/50 border border-red-100 rounded-2xl">
        <h3 className="text-sm font-black text-red-600 uppercase tracking-wide">Delete Account</h3>
        <p className="text-xs text-red-500/80">Once you delete your account, there is no going back.</p>
        <button 
          onClick={() => setShowConfirm(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-red-700 transition-all flex items-center gap-2"
        >
          <Trash2 size={14} /> Delete Account
        </button>
      </div>

      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-3xl max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="text-lg font-black">Are you sure?</h3>
            <p className="text-sm text-slate-500">This will permanently delete your account and all associated data. This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirm(false)} className="flex-1 px-4 py-2 rounded-xl font-bold text-sm bg-slate-100">Cancel</button>
              <button 
                onClick={async () => {
                  setIsDeletePending(true);
                  const res = await deleteAccount();
                  if (res?.success) await signOut({ callbackUrl: "/" });
                  else setIsDeletePending(false);
                }} 
                className="flex-1 px-4 py-2 rounded-xl font-bold text-sm bg-red-600 text-white"
              >
                {isDeletePending ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function NotificationForm() {
  return (
    <form className="space-y-6">
      <h2 className="text-xl font-black">Notifications</h2>
      <div className="space-y-4">
        <ToggleRow name="emailNotifications" label="Email Notifications" description="Receive security alerts." defaultChecked />
        <ToggleRow name="recipeUpdates" label="Recipe Updates" description="Get notified when someone interacts with your recipes." />
      </div>
      <button type="submit" className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm">Save Preferences</button>
    </form>
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

function ToggleRow({ label, description, defaultChecked, name }: { label: string, description: string, defaultChecked?: boolean, name: string }) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
      <div>
        <p className="font-bold text-slate-700">{label}</p>
        <p className="text-xs text-slate-400">{description}</p>
      </div>
      <input name={name} type="checkbox" defaultChecked={defaultChecked} className="w-5 h-5 accent-orange-500 cursor-pointer" />
    </div>
  );
}

function TabButton({ active, onClick, icon: Icon, label }: any) {
  return (
    <button type="button" onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${active ? "bg-orange-50 text-orange-600" : "text-slate-500 hover:bg-slate-50"}`}>
      <Icon size={20} /> {label}
    </button>
  );
}