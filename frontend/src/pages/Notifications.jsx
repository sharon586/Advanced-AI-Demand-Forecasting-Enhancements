import React, { useState } from 'react'
import Layout from '../components/layout/Layout'
import { useNotifications } from '../context/NotificationContext'

const typeConfig = {
  success: { color: 'text-green-400', bg: 'bg-green-900/20 border-green-800/40', icon: '✅', label: 'Success' },
  error: { color: 'text-red-400', bg: 'bg-red-900/20 border-red-800/40', icon: '❌', label: 'Error' },
  warning: { color: 'text-yellow-400', bg: 'bg-yellow-900/20 border-yellow-800/40', icon: '⚠️', label: 'Warning' },
  info: { color: 'text-blue-400', bg: 'bg-blue-900/20 border-blue-800/40', icon: 'ℹ️', label: 'Info' },
}

export default function NotificationsPage() {
  const { notifications, unreadCount, markRead, markAllRead, removeNotification } = useNotifications()
  const [filter, setFilter] = useState('all')

  const filtered = notifications.filter(n => {
    if (filter === 'unread') return !n.read
    if (filter === 'success') return n.type === 'success'
    if (filter === 'error') return n.type === 'error'
    if (filter === 'warning') return n.type === 'warning'
    return true
  })

  return (
    <Layout title="Notifications">
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-400">Manage your system notifications and alerts</p>
        {unreadCount > 0 && (
          <button onClick={markAllRead}
            className="px-4 py-2 rounded-xl bg-[#241B4B] border border-[#39306A] text-sm text-violet-400 hover:text-violet-300 transition">
            ✓ Mark all as read ({unreadCount})
          </button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { key: 'all', label: 'All', count: notifications.length },
          { key: 'unread', label: 'Unread', count: unreadCount },
          { key: 'success', label: 'Success', count: notifications.filter(n => n.type === 'success').length },
          { key: 'error', label: 'Errors', count: notifications.filter(n => n.type === 'error').length },
          { key: 'warning', label: 'Warnings', count: notifications.filter(n => n.type === 'warning').length },
        ].map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-xl text-sm transition flex items-center gap-2 ${
              filter === f.key
                ? 'bg-gradient-to-r from-violet-500 to-pink-500 text-white'
                : 'bg-[#211A45] border border-[#39306A] text-gray-400 hover:text-white'
            }`}>
            {f.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${filter === f.key ? 'bg-white/20' : 'bg-[#312B56]'}`}>
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-[#211A45] rounded-2xl p-12 text-center border border-[#39306A]">
            <div className="text-5xl mb-4">🔕</div>
            <p className="text-gray-400">No notifications in this category</p>
          </div>
        ) : (
          filtered.map(n => {
            const cfg = typeConfig[n.type] || typeConfig.info
            return (
              <div
                key={n.id}
                className={`flex items-start gap-4 p-5 rounded-2xl border cursor-pointer transition hover:scale-[1.01] ${
                  !n.read ? `${cfg.bg} border-opacity-60` : 'bg-[#211A45] border-[#39306A]'
                }`}
                onClick={() => markRead(n.id)}
              >
                <span className="text-2xl mt-0.5">{cfg.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-semibold ${!n.read ? 'text-white' : 'text-gray-300'}`}>{n.title}</h3>
                    {!n.read && <span className="w-2 h-2 rounded-full bg-violet-500" />}
                    <span className={`text-xs px-2 py-0.5 rounded-full ml-auto ${cfg.bg} ${cfg.color} border ${cfg.bg.includes('border') ? '' : 'border-transparent'}`}>
                      {cfg.label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{n.message}</p>
                  <p className="text-xs text-gray-600 mt-2">{n.time}</p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); removeNotification(n.id) }}
                  className="text-gray-600 hover:text-red-400 transition text-lg p-1"
                  title="Remove notification"
                >×</button>
              </div>
            )
          })
        )}
      </div>
    </Layout>
  )
}
