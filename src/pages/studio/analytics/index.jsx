import React, { useEffect, useMemo, useState } from 'react';
import { Typography } from '../../../components/Typography';
import { reportsApi } from '../../../api/reports';
import {
  DollarSign,
  Wallet,
  TrendingUp,
  ShoppingBag,
  Loader2,
  BarChart3,
  Package,
} from 'lucide-react';

import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';

export const Analytics = () => {
  const [summary, setSummary] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnalytics = async (signal) => {
    try {
      setLoading(true);
      setError(null);

      const [summaryRes, chartRes, topProductsRes] = await Promise.all([
        reportsApi.getFinancialSummary(),
        reportsApi.getSalesChart(days),
        reportsApi.getTopProducts(),
      ]);

      if (signal && signal.aborted) return;

      const rawData = chartRes?.data?.chartData || [];

      // Create a map of existing data for quick lookup
      const dataMap = rawData.reduce((acc, curr) => {
        acc[curr.date] = curr;
        return acc;
      }, {});

      const filledData = [];
      let runningProfit = 0;

      // Generate dates for the selected timeframe and fill gaps
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      for (let i = days - 1; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);

        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;

        const dayData = dataMap[dateStr] || { revenue: 0, expenses: 0 };
        const profit = (dayData.revenue || 0) - (dayData.expenses || 0);
        runningProfit += profit;

        filledData.push({
          date: new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(d),
          revenue: dayData.revenue || 0,
          expenses: dayData.expenses || 0,
          profit,
          cumulativeProfit: runningProfit,
        });
      }

      setSummary(summaryRes?.data?.summary);
      setChartData(filledData);
      setTopProducts(topProductsRes?.data?.topProducts || []);
    } catch (err) {
      console.error(err);
      if (!signal || !signal.aborted) setError('Failed to load analytics data');
    } finally {
      if (!signal || !signal.aborted) setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchAnalytics(controller.signal);

    return () => {
      controller.abort();
    };
  }, [days]);

  const stats = useMemo(() => {
    if (!summary) return [];

    const netProfit = (summary.totalRevenue || 0) - (summary.totalSpent || 0);

    return [
      {
        title: 'Total Revenue',
        value: `$${(summary.totalRevenue || 0).toLocaleString()}`,
        icon: DollarSign,
        color: 'text-green-600 bg-green-50',
      },
      {
        title: 'Total Spent',
        value: `$${(summary.totalSpent || 0).toLocaleString()}`,
        icon: ShoppingBag,
        color: 'text-purple-600 bg-purple-50',
      },
      {
        title: 'Net Profit',
        value: `$${netProfit.toLocaleString()}`,
        icon: Wallet,
        color: netProfit >= 0 ? 'text-blue-600 bg-blue-50' : 'text-red-600 bg-red-50',
      },
      {
        title: 'Wallet Balance',
        value: `$${(summary.walletBalance || 0).toLocaleString()}`,
        icon: TrendingUp,
        color: 'text-orange-600 bg-orange-50',
      },
    ];
  }, [summary]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] w-full">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <Typography className="text-red-500">{error}</Typography>
        <button
          onClick={() => fetchAnalytics()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* Dashboard Header & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Typography variant="h1" className="text-2xl font-bold tracking-tight text-gray-900">
            Analytics Dashboard
          </Typography>
          <p className="text-sm text-gray-500">Monitor your business performance metrics.</p>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="days-filter" className="text-sm font-medium text-gray-700">
            Timeframe:
          </label>
          <select
            id="days-filter"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="rounded-md border-gray-300 py-1.5 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="overflow-hidden rounded-2xl bg-surface p-5 shadow border border-surface-container-high flex items-center justify-between"
            >
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500 truncate">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-md ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart and Products Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Chart Section */}
        <div className="lg:col-span-2 bg-surface p-6 rounded-2xl shadow border border-surface-container-high space-y-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-gray-500" />
            <Typography variant="h2" className="text-lg font-semibold text-gray-900">
              Sales Trends
            </Typography>
          </div>
          <div className="h-80 w-full">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={chartData}
                  margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis
                    dataKey="date"
                    stroke="#9ca3af"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    minTickGap={30}
                  />
                  <YAxis
                    yAxisId="left"
                    stroke="#9ca3af"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#9ca3af"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    hide={days > 30}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      borderRadius: '12px',
                      border: 'none',
                      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                      padding: '12px',
                    }}
                    itemStyle={{ padding: '2px 0' }}
                    formatter={(value, name) => [`$${value.toLocaleString()}`, name]}
                  />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    iconType="circle"
                    wrapperStyle={{ paddingBottom: '20px' }}
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="revenue"
                    name="Daily Revenue"
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                    barSize={20}
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="expenses"
                    name="Daily Expenses"
                    fill="#ef4444"
                    radius={[4, 4, 0, 0]}
                    barSize={20}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="cumulativeProfit"
                    name="Total Growth (Cumulative)"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={days <= 30}
                    activeDot={{ r: 6 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                No chart data available for this period.
              </div>
            )}
          </div>
        </div>

        {/* Top Products Section */}
        <div className="bg-surface p-6 rounded-2xl shadow border border-surface-container-high space-y-4">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-gray-500" />
            <Typography variant="h2" className="text-lg font-semibold text-gray-900">
              Top Products
            </Typography>
          </div>
          <div className="divide-y divide-gray-100 overflow-y-auto max-h-80 pr-1">
            {topProducts.length > 0 ? (
              topProducts.map((product, idx) => (
                <div
                  key={product.id || idx}
                  className="py-3 flex items-center justify-between first:pt-0 last:pb-0"
                >
                  <div className="truncate pr-4">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {product.name || 'Unknown Product'}
                    </p>
                    <p className="text-xs text-gray-500">{product.salesCount || 0} units sold</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    {`$${((product.price || 0) * (product.salesCount || 0)).toLocaleString()}`}
                  </p>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-gray-400 text-sm">
                No product data available.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
