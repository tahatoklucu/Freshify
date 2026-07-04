"use client";

import { useState } from "react";
import { Shield, Bell, Save } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("security");

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-black text-slate-900 mb-8">
        Account Settings
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 space-y-2">
          <TabButton
            active={activeTab === "security"}
            onClick={() => setActiveTab("security")}
            icon={Shield}
            label="Security"
          />
          <TabButton
            active={activeTab === "notifications"}
            onClick={() => setActiveTab("notifications")}
            icon={Bell}
            label="Notifications"
          />
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
  return (
    <div className="space-y-10">
      <div className="space-y-6">
        <h2 className="text-xl font-black">Security Preferences</h2>
        <p className="text-sm text-slate-500">
          Update your account credentials to keep your data safe.
        </p>
        <div className="space-y-4">
          <InputField label="Current Password" type="password" />
          <InputField label="New Password" type="password" />
          <InputField label="Confirm New Password" type="password" />
        </div>
        <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all">
          <Save size={16} /> Update Password
        </button>
      </div>

      <hr className="border-slate-100" />

      <div className="space-y-4 p-6 bg-red-50/50 border border-red-100 rounded-3xl">
        <div>
          <h3 className="text-lg font-black text-red-600">Delete Account</h3>
          <p className="text-sm text-red-500/80">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
        </div>
        <button className="bg-red-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-red-700 transition-all">
          Delete My Account Permanently
        </button>
      </div>
    </div>
  );
}

function NotificationForm() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-black">Notifications</h2>
      <p className="text-sm text-slate-500">
        Manage how you receive updates and alerts.
      </p>

      <div className="space-y-4">
        <ToggleRow
          label="Email Notifications"
          description="Receive security alerts and account updates."
          defaultChecked
        />
        <ToggleRow
          label="Recipe Updates"
          description="Get notified when someone interacts with your recipes."
        />
        <ToggleRow
          label="Newsletter"
          description="Occasional tips and cooking inspiration."
        />
      </div>
    </div>
  );
}

function InputField({ label, type = "text" }: any) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-slate-400 uppercase">
        {label}
      </label>
      <input
        type={type}
        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none"
      />
    </div>
  );
}

function ToggleRow({ label, description, defaultChecked }: any) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
      <div>
        <p className="font-bold text-slate-700">{label}</p>
        <p className="text-xs text-slate-400">{description}</p>
      </div>
      <input
        type="checkbox"
        className="w-5 h-5 accent-orange-500 cursor-pointer"
        defaultChecked={defaultChecked}
      />
    </div>
  );
}

function TabButton({ active, onClick, icon: Icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
        active
          ? "bg-orange-50 text-orange-600"
          : "text-slate-500 hover:bg-slate-50"
      }`}
    >
      <Icon size={20} /> {label}
    </button>
  );
}
