import React, { useState } from 'react'
import Layout from '../components/layout/Layout'
import { useAuth } from '../context/AuthContext'

export default function Settings() {
  const { user } = useAuth()
  const [name, setName] = useState(user?.name || 'Admin User')
  const [email, setEmail] = useState(user?.email || 'admin@example.com')
  const [role, setRole] = useState(user?.role || 'Admin')
  const [activeTab, setActiveTab] = useState('profile')
  const [saved, setSaved] = useState(false)

  // Notification prefs
  const [notifPrefs, setNotifPrefs] = useState({
    forecast_complete: true,
    dataset_upload: true,
    report_ready: true,
    low_stock: true,
    upload_fail: true,
    email_notif: false,
  })

  // API settings
  const [apiSettings, setApiSettings] = useState({
    default_model: 'Random Forest',
    forecast_horizon: '6',
    auto_retrain: true,
    pagination_size: '10',
  })

  const handleSave = (e) => {
    e.preventDefault()
    localStorage.setItem('userSettings', JSON.stringify({ name, email, role }))
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <Layout title="Settings">
      <p className="text-gray-400 mb-6">Manage your account and application preferences</p>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-[#1B1538] p-1.5 rounded-xl border border-[#312B56] w-fit">
        {[
          { key: 'profile', label: '👤 Profile' },
          { key: 'notifications', label: '🔔 Notifications' },
          { key: 'api', label: '⚙️ API Settings' },
          { key: 'security', label: '🔒 Security' },
        ].map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === tab.key
                ? 'bg-gradient-to-r from-violet-500 to-pink-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'profile' && (
        <div className="max-w-2xl">
          <form onSubmit={handleSave} className="bg-[#211A45] rounded-2xl p-8 border border-[#39306A] space-y-5">
            <h3 className="text-lg font-semibold">Profile Information</h3>

            {/* Avatar */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 flex items-center justify-center text-2xl font-bold text-white">
                {name[0]?.toUpperCase()}
              </div>
              <div>
                <p className="text-white font-medium">{name}</p>
                <p className="text-sm text-gray-400">{role}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Full Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)}
                className="w-full bg-[#2D2257] text-white px-4 py-3 rounded-xl border border-[#39306A] outline-none focus:border-violet-500 transition" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full bg-[#2D2257] text-white px-4 py-3 rounded-xl border border-[#39306A] outline-none focus:border-violet-500 transition" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Role</label>
              <select value={role} onChange={e => setRole(e.target.value)}
                className="w-full bg-[#2D2257] text-white px-4 py-3 rounded-xl border border-[#39306A] outline-none focus:border-violet-500 transition">
                {['Admin', 'Manager', 'Analyst', 'Viewer'].map(r => <option key={r}>{r}</option>)}
              </select>
            </div>

            <button type="submit"
              className={`px-8 py-3 rounded-xl font-semibold transition ${
                saved
                  ? 'bg-green-600 text-white'
                  : 'bg-gradient-to-r from-violet-500 to-pink-500 hover:opacity-90'
              }`}>
              {saved ? '✅ Saved!' : 'Save Changes'}
            </button>
          </form>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="max-w-2xl">
          <div className="bg-[#211A45] rounded-2xl p-8 border border-[#39306A]">
            <h3 className="text-lg font-semibold mb-6">Notification Preferences</h3>
            <div className="space-y-4">
              {[
                { key: 'forecast_complete', label: 'Forecast Completed', desc: 'Notify when a forecast generation finishes' },
                { key: 'dataset_upload', label: 'Dataset Uploaded', desc: 'Notify when a new dataset is uploaded' },
                { key: 'report_ready', label: 'Report Generated', desc: 'Notify when a report is ready to download' },
                { key: 'low_stock', label: 'Low Stock Alert', desc: 'Notify when product stock drops to critical level' },
                { key: 'upload_fail', label: 'Upload Failed', desc: 'Notify when a dataset upload fails' },
                { key: 'email_notif', label: 'Email Notifications', desc: 'Also receive notifications via email' },
              ].map(pref => (
                <div key={pref.key} className="flex items-center justify-between p-4 rounded-xl bg-[#2D2257]">
                  <div>
                    <p className="text-sm font-medium text-white">{pref.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{pref.desc}</p>
                  </div>
                  <button
                    onClick={() => setNotifPrefs(prev => ({ ...prev, [pref.key]: !prev[pref.key] }))}
                    className={`relative w-12 h-6 rounded-full transition ${notifPrefs[pref.key] ? 'bg-violet-500' : 'bg-[#39306A]'}`}
                  >
                    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${notifPrefs[pref.key] ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>
              ))}
            </div>
            <button onClick={() => setSaved(true)}
              className="mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 font-semibold hover:opacity-90">
              Save Preferences
            </button>
          </div>
        </div>
      )}

      {activeTab === 'api' && (
        <div className="max-w-2xl">
          <div className="bg-[#211A45] rounded-2xl p-8 border border-[#39306A] space-y-5">
            <h3 className="text-lg font-semibold">API & Forecasting Settings</h3>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Default Forecasting Model</label>
              <select value={apiSettings.default_model}
                onChange={e => setApiSettings(p => ({ ...p, default_model: e.target.value }))}
                className="w-full bg-[#2D2257] text-white px-4 py-3 rounded-xl border border-[#39306A] outline-none focus:border-violet-500">
                {['Linear Regression', 'Random Forest', 'XGBoost', 'ARIMA'].map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Forecast Horizon (months)</label>
              <select value={apiSettings.forecast_horizon}
                onChange={e => setApiSettings(p => ({ ...p, forecast_horizon: e.target.value }))}
                className="w-full bg-[#2D2257] text-white px-4 py-3 rounded-xl border border-[#39306A] outline-none focus:border-violet-500">
                {['3', '6', '9', '12'].map(v => <option key={v}>{v}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Pagination Page Size</label>
              <select value={apiSettings.pagination_size}
                onChange={e => setApiSettings(p => ({ ...p, pagination_size: e.target.value }))}
                className="w-full bg-[#2D2257] text-white px-4 py-3 rounded-xl border border-[#39306A] outline-none focus:border-violet-500">
                {['10', '25', '50', '100'].map(v => <option key={v}>{v}</option>)}
              </select>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#2D2257]">
              <div>
                <p className="text-sm font-medium text-white">Auto-retrain Models</p>
                <p className="text-xs text-gray-400 mt-0.5">Automatically retrain when new data is uploaded</p>
              </div>
              <button
                onClick={() => setApiSettings(p => ({ ...p, auto_retrain: !p.auto_retrain }))}
                className={`relative w-12 h-6 rounded-full transition ${apiSettings.auto_retrain ? 'bg-violet-500' : 'bg-[#39306A]'}`}>
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${apiSettings.auto_retrain ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
            <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 font-semibold hover:opacity-90">
              Save API Settings
            </button>
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="max-w-2xl">
          <div className="bg-[#211A45] rounded-2xl p-8 border border-[#39306A] space-y-5">
            <h3 className="text-lg font-semibold">Security Settings</h3>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Current Password</label>
              <input type="password" placeholder="Enter current password"
                className="w-full bg-[#2D2257] text-white px-4 py-3 rounded-xl border border-[#39306A] outline-none focus:border-violet-500" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">New Password</label>
              <input type="password" placeholder="Enter new password"
                className="w-full bg-[#2D2257] text-white px-4 py-3 rounded-xl border border-[#39306A] outline-none focus:border-violet-500" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Confirm New Password</label>
              <input type="password" placeholder="Confirm new password"
                className="w-full bg-[#2D2257] text-white px-4 py-3 rounded-xl border border-[#39306A] outline-none focus:border-violet-500" />
            </div>
            <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 font-semibold hover:opacity-90">
              Update Password
            </button>
            <div className="p-4 rounded-xl bg-[#2D2257] mt-4">
              <p className="text-sm font-medium text-white mb-1">Session Info</p>
              <p className="text-xs text-gray-400">Token expires: 12 hours from login</p>
              <p className="text-xs text-gray-400 mt-1">Last login: Today</p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
