import React, { useState } from 'react'
import Layout from '../components/layout/Layout'
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend, PieChart, Pie, Cell
} from 'recharts'

const salesData = [
  { month: 'Jan', sales: 420000, profit: 126000, forecast: 450000 },
  { month: 'Feb', sales: 350000, profit: 105000, forecast: 380000 },
  { month: 'Mar', sales: 520000, profit: 156000, forecast: 550000 },
  { month: 'Apr', sales: 280000, profit: 84000, forecast: 300000 },
  { month: 'May', sales: 610000, profit: 183000, forecast: 640000 },
  { month: 'Jun', sales: 480000, profit: 144000, forecast: 510000 },
  { month: 'Jul', sales: 720000, profit: 216000, forecast: 750000 },
  { month: 'Aug', sales: 650000, profit: 195000, forecast: 680000 },
]

const productData = [
  { name: 'Headphones', value: 420, revenue: 840000 },
  { name: 'Mobile', value: 300, revenue: 600000 },
  { name: 'Laptop', value: 210, revenue: 1050000 },
  { name: 'Keyboard', value: 180, revenue: 180000 },
  { name: 'Mouse', value: 160, revenue: 112000 },
]

const regionData = [
  { region: 'North', sales: 1800000, color: '#7C3AED' },
  { region: 'South', sales: 1200000, color: '#EC4899' },
  { region: 'East', sales: 980000, color: '#3B82F6' },
  { region: 'West', sales: 1350000, color: '#10B981' },
]

const recentActivity = [
  { action: 'Forecast generated', detail: 'Random Forest — Electronics', time: '2 min ago', status: 'success', icon: '📈' },
  { action: 'Dataset uploaded', detail: 'sales_q4_2025.csv (1,240 rows)', time: '1 hour ago', status: 'success', icon: '📤' },
  { action: 'Report exported', detail: 'Annual Revenue PDF', time: '3 hours ago', status: 'success', icon: '📄' },
  { action: 'Model comparison', detail: '4 models benchmarked', time: '5 hours ago', status: 'success', icon: '🔬' },
  { action: 'Upload failed', detail: 'corrupt_data.csv — invalid format', time: '1 day ago', status: 'error', icon: '❌' },
]

const CATEGORIES = ['All', 'Electronics', 'Fashion', 'Groceries', 'Furniture']
const REGIONS = ['All', 'North', 'South', 'East', 'West']
const DATE_RANGES = ['Last 7 days', 'Last 30 days', 'Last 6 months', 'Last year']

export default function Dashboard() {
  const [category, setCategory] = useState('All')
  const [region, setRegion] = useState('All')
  const [dateRange, setDateRange] = useState('Last 6 months')

  const multiplier = { Electronics: 1.2, Fashion: 0.9, Groceries: 0.75, Furniture: 0.6 }[category] || 1
  const filteredSales = salesData.map(d => ({
    ...d,
    sales: Math.round(d.sales * multiplier),
    profit: Math.round(d.profit * multiplier),
    forecast: Math.round(d.forecast * multiplier)
  }))

  const totalSales = filteredSales.reduce((a, b) => a + b.sales, 0)
  const totalProfit = filteredSales.reduce((a, b) => a + b.profit, 0)

  return (
    <Layout title="Dashboard">
      {/* Subtitle */}
      <p className="text-gray-400 mb-6">Welcome back to your AI forecasting workspace</p>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8 p-4 bg-[#1B1538] rounded-2xl border border-[#312B56]">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">📅 Date:</span>
          <select
            value={dateRange}
            onChange={e => setDateRange(e.target.value)}
            className="bg-[#241B4B] text-white text-sm px-3 py-2 rounded-lg border border-[#39306A] outline-none"
          >
            {DATE_RANGES.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">🏷️ Category:</span>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="bg-[#241B4B] text-white text-sm px-3 py-2 rounded-lg border border-[#39306A] outline-none"
          >
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">📍 Region:</span>
          <select
            value={region}
            onChange={e => setRegion(e.target.value)}
            className="bg-[#241B4B] text-white text-sm px-3 py-2 rounded-lg border border-[#39306A] outline-none"
          >
            {REGIONS.map(r => <option key={r}>{r}</option>)}
          </select>
        </div>
        <button
          onClick={() => { setCategory('All'); setRegion('All'); setDateRange('Last 6 months') }}
          className="ml-auto px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-[#39306A] rounded-lg transition"
        >
          Reset Filters
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="rounded-2xl p-6 bg-gradient-to-br from-violet-600 to-fuchsia-600 shadow-lg">
          <p className="text-sm text-violet-200 mb-2">Total Sales</p>
          <h2 className="text-3xl font-bold text-white">₹{(totalSales / 100000).toFixed(1)}L</h2>
          <p className="text-xs text-violet-200 mt-2">↑ 15% from last period</p>
        </div>
        <div className="rounded-2xl p-6 bg-[#211A45] border border-[#39306A]">
          <p className="text-sm text-gray-400 mb-2">Forecast Accuracy</p>
          <h2 className="text-3xl font-bold text-pink-400">96%</h2>
          <p className="text-xs text-gray-500 mt-2">AI model precision</p>
        </div>
        <div className="rounded-2xl p-6 bg-[#211A45] border border-[#39306A]">
          <p className="text-sm text-gray-400 mb-2">Total Profit</p>
          <h2 className="text-3xl font-bold text-violet-400">₹{(totalProfit / 100000).toFixed(1)}L</h2>
          <p className="text-xs text-gray-500 mt-2">30% profit margin</p>
        </div>
        <div className="rounded-2xl p-6 bg-gradient-to-br from-indigo-600 to-blue-600 shadow-lg">
          <p className="text-sm text-indigo-200 mb-2">Revenue Growth</p>
          <h2 className="text-3xl font-bold text-white">+32%</h2>
          <p className="text-xs text-indigo-200 mt-2">Year over year</p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Monthly Sales Trend */}
        <div className="bg-[#211A45] rounded-2xl p-6 border border-[#39306A]">
          <h2 className="text-lg font-bold mb-1">Monthly Sales Trends</h2>
          <p className="text-gray-400 text-sm mb-5">Sales vs Forecast comparison</p>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={filteredSales}>
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EC4899" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#EC4899" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#39306A" />
              <XAxis dataKey="month" stroke="#9CA3AF" tick={{ fontSize: 12 }} />
              <YAxis stroke="#9CA3AF" tick={{ fontSize: 11 }} tickFormatter={v => `₹${(v/1000).toFixed(0)}K`} />
              <Tooltip formatter={(v) => [`₹${v.toLocaleString()}`, '']} contentStyle={{ background: '#211A45', border: '1px solid #39306A', borderRadius: 8 }} />
              <Legend />
              <Area type="monotone" dataKey="sales" stroke="#7C3AED" strokeWidth={2} fill="url(#salesGrad)" name="Sales" />
              <Area type="monotone" dataKey="forecast" stroke="#EC4899" strokeWidth={2} strokeDasharray="5 5" fill="url(#forecastGrad)" name="Forecast" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="bg-[#211A45] rounded-2xl p-6 border border-[#39306A]">
          <h2 className="text-lg font-bold mb-1">Top Products</h2>
          <p className="text-gray-400 text-sm mb-5">Units sold by product</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={productData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#39306A" />
              <XAxis dataKey="name" stroke="#9CA3AF" tick={{ fontSize: 11 }} />
              <YAxis stroke="#9CA3AF" tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ background: '#211A45', border: '1px solid #39306A', borderRadius: 8 }} />
              <Bar dataKey="value" name="Units" radius={[6, 6, 0, 0]}>
                {productData.map((_, i) => (
                  <Cell key={i} fill={['#7C3AED', '#EC4899', '#3B82F6', '#10B981', '#F59E0B'][i % 5]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Region Distribution */}
        <div className="bg-[#211A45] rounded-2xl p-6 border border-[#39306A]">
          <h2 className="text-lg font-bold mb-1">Sales by Region</h2>
          <p className="text-gray-400 text-sm mb-4">Regional distribution</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={regionData} dataKey="sales" nameKey="region" cx="50%" cy="50%" outerRadius={80} label={({ region, percent }) => `${region} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                {regionData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={v => [`₹${(v/100000).toFixed(1)}L`, 'Sales']} contentStyle={{ background: '#211A45', border: '1px solid #39306A', borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* AI Forecast Prediction */}
        <div className="col-span-2 bg-[#211A45] rounded-2xl p-6 border border-[#39306A]">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold">AI Forecast Prediction</h2>
              <p className="text-gray-400 text-sm">Machine learning future demand analysis</p>
            </div>
            <a href="/forecast" className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-sm font-semibold hover:opacity-90 transition">
              Run Forecast →
            </a>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={filteredSales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#39306A" />
              <XAxis dataKey="month" stroke="#9CA3AF" tick={{ fontSize: 12 }} />
              <YAxis stroke="#9CA3AF" tick={{ fontSize: 11 }} tickFormatter={v => `₹${(v/1000).toFixed(0)}K`} />
              <Tooltip formatter={v => [`₹${v.toLocaleString()}`, '']} contentStyle={{ background: '#211A45', border: '1px solid #39306A', borderRadius: 8 }} />
              <Line type="monotone" dataKey="forecast" stroke="#60A5FA" strokeWidth={3} dot={{ fill: '#60A5FA', r: 4 }} name="AI Forecast" />
              <Line type="monotone" dataKey="sales" stroke="#C084FC" strokeWidth={2} strokeDasharray="4 4" dot={false} name="Actual Sales" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-[#211A45] rounded-2xl p-6 border border-[#39306A]">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold">Recent Forecasting Activity</h2>
          <a href="/reports" className="text-sm text-violet-400 hover:text-violet-300">View all →</a>
        </div>
        <div className="space-y-3">
          {recentActivity.map((a, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#2D2257] transition">
              <span className="text-xl">{a.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{a.action}</p>
                <p className="text-xs text-gray-400">{a.detail}</p>
              </div>
              <div className="text-right">
                <span className={`text-xs px-2 py-1 rounded-full ${a.status === 'success' ? 'bg-green-900/40 text-green-400' : 'bg-red-900/40 text-red-400'}`}>
                  {a.status}
                </span>
                <p className="text-xs text-gray-500 mt-1">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
