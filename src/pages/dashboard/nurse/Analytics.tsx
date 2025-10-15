import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';
import { TrendingUp, DollarSign, Users, Calendar, Download, Filter, TrendingDown } from 'lucide-react';
import Button from '@/components/ui-components/Button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { useAnalytics } from '@/hooks/useAnalytics';

const Analytics: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useUser();
  const { analytics, loading: analyticsLoading, error } = useAnalytics();
  const [timeRange, setTimeRange] = useState('month');
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-purple-600 border-r-transparent border-b-purple-600 border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!isAuthenticated || user?.role !== UserRole.NURSE) {
    return <Navigate to="/login" />;
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Card className="p-6">
          <p className="text-destructive">Error loading analytics: {error}</p>
        </Card>
      </div>
    );
  }

  const monthlyData = analytics?.monthlyRevenueData || [];
  const currentMonthEarnings = analytics?.monthlyEarnings || 0;
  const previousMonthEarnings = monthlyData.length >= 2 ? monthlyData[monthlyData.length - 2].amount : 0;
  const earningsGrowth = previousMonthEarnings > 0 
    ? ((currentMonthEarnings - previousMonthEarnings) / previousMonthEarnings * 100).toFixed(1)
    : '0';

  const maxEarnings = Math.max(...monthlyData.map(m => m.amount), 1);

  return (
    <div className="container mx-auto p-6 space-y-6">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analytics & Reports</h1>
            <p className="text-muted-foreground">Track performance and business insights</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" icon={<Filter size={16} />}>
              Time Range
            </Button>
            <Button variant="nurse" icon={<Download size={16} />}>
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="text-green-600" size={24} />
              </div>
              {analyticsLoading ? (
                <Skeleton className="h-6 w-16" />
              ) : (
                <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                  {parseFloat(earningsGrowth) >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {parseFloat(earningsGrowth) >= 0 ? '+' : ''}{earningsGrowth}%
                </div>
              )}
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Monthly Earnings</p>
              {analyticsLoading ? (
                <Skeleton className="h-8 w-32" />
              ) : (
                <>
                  <p className="text-2xl font-bold text-foreground">£{currentMonthEarnings.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">vs. £{previousMonthEarnings.toLocaleString()} last month</p>
                </>
              )}
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="text-blue-600" size={24} />
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Shifts</p>
              {analyticsLoading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <p className="text-2xl font-bold text-foreground">{analytics?.totalShifts || 0}</p>
              )}
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="text-purple-600" size={24} />
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Active Clients</p>
              {analyticsLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <>
                  <p className="text-2xl font-bold text-foreground">{analytics?.activeClients || 0}</p>
                  <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
                </>
              )}
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <TrendingUp className="text-orange-600" size={24} />
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Avg. Hourly Rate</p>
              {analyticsLoading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <p className="text-2xl font-bold text-foreground">£{(analytics?.averageHourlyRate || 0).toFixed(2)}</p>
              )}
            </div>
          </Card>
        </div>

        <Tabs defaultValue="revenue" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="shifts">Shifts</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="revenue" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-6">Monthly Revenue Trend</h3>
              {analyticsLoading ? (
                <Skeleton className="h-64 w-full" />
              ) : monthlyData.length > 0 ? (
                <div className="space-y-4">
                  {monthlyData.map((month) => (
                    <div key={month.month} className="flex items-center gap-4">
                      <div className="w-12 text-sm font-medium text-muted-foreground">{month.month}</div>
                      <div className="flex-grow">
                        <div className="h-8 bg-muted rounded-lg overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-end px-3 transition-all duration-500"
                            style={{ width: `${(month.amount / maxEarnings) * 100}%` }}
                          >
                            <span className="text-white text-sm font-medium">
                              £{month.amount.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-12">No revenue data available</p>
              )}
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Revenue by Service Type</h3>
                {analyticsLoading ? (
                  <Skeleton className="h-48 w-full" />
                ) : analytics?.revenueByService && analytics.revenueByService.length > 0 ? (
                  <div className="space-y-3">
                    {analytics.revenueByService.map((service, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="text-sm">{service.service_type}</span>
                        <span className="font-medium">£{service.amount.toLocaleString()} ({service.percentage.toFixed(0)}%)</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">No service data available</p>
                )}
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Top Earning Staff</h3>
                {analyticsLoading ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map(i => <Skeleton key={i} className="h-20 w-full" />)}
                  </div>
                ) : analytics?.topStaff && analytics.topStaff.length > 0 ? (
                  <div className="space-y-3">
                    {analytics.topStaff.map((staff, idx) => (
                      <div key={staff.id} className={`flex justify-between items-center p-3 rounded-lg ${idx === 0 ? 'bg-purple-50' : 'bg-muted'}`}>
                        <div>
                          <p className="font-medium">{staff.name}</p>
                          <p className="text-xs text-muted-foreground">{staff.shifts} shifts completed</p>
                        </div>
                        <span className={`font-semibold ${idx === 0 ? 'text-purple-600' : ''}`}>
                          £{staff.earnings.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">No staff data available</p>
                )}
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="shifts" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Shift Completion Rate</h3>
                {analyticsLoading ? (
                  <Skeleton className="h-48 w-full" />
                ) : analytics?.shiftStats ? (
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Completed</span>
                        <span className="font-medium">{analytics.shiftStats.completionRate.toFixed(0)}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-600" style={{ width: `${analytics.shiftStats.completionRate}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Cancelled</span>
                        <span className="font-medium">{analytics.shiftStats.cancelled}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-600" style={{ width: `${(analytics.shiftStats.cancelled / (analytics.totalShifts || 1)) * 100}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">No Show</span>
                        <span className="font-medium">{analytics.shiftStats.noShow}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-red-600" style={{ width: `${(analytics.shiftStats.noShow / (analytics.totalShifts || 1)) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">No shift data available</p>
                )}
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Peak Hours</h3>
                {analyticsLoading ? (
                  <Skeleton className="h-48 w-full" />
                ) : analytics?.peakHours && analytics.peakHours.length > 0 ? (
                  <div className="space-y-2">
                    {analytics.peakHours.map((slot, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="text-sm">{slot.hour}:00 - {slot.hour + 1}:00</span>
                        <span className="font-medium">{slot.count} shifts</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">No peak hour data available</p>
                )}
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="clients" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Client Engagement Metrics</h3>
              {analyticsLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[1, 2, 3].map(i => <Skeleton key={i} className="h-24 w-full" />)}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Active Clients</p>
                    <p className="text-3xl font-bold text-foreground">{analytics?.activeClients || 0}</p>
                    <p className="text-xs text-blue-600 mt-1">Last 30 days</p>
                  </div>
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Business Overview</h3>
              {analyticsLoading ? (
                <Skeleton className="h-48 w-full" />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Shifts</p>
                    <p className="text-3xl font-bold text-foreground">{analytics?.totalShifts || 0}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Completion Rate</p>
                    <p className="text-3xl font-bold text-foreground">{analytics?.shiftStats?.completionRate.toFixed(1) || 0}%</p>
                  </div>
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
  );
};

export default Analytics;
