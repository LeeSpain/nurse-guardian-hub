import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';
import { TrendingUp, DollarSign, Users, Calendar, Download, Filter } from 'lucide-react';
import Button from '@/components/ui-components/Button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format, subMonths } from 'date-fns';

const Analytics: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useUser();
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

  // Mock data - would be replaced with real data
  const monthlyEarnings = [
    { month: 'Jan', amount: 4200 },
    { month: 'Feb', amount: 4800 },
    { month: 'Mar', amount: 5100 },
    { month: 'Apr', amount: 4900 },
    { month: 'May', amount: 5400 },
    { month: 'Jun', amount: 5800 },
  ];

  const currentMonth = monthlyEarnings[monthlyEarnings.length - 1];
  const previousMonth = monthlyEarnings[monthlyEarnings.length - 2];
  const earningsGrowth = ((currentMonth.amount - previousMonth.amount) / previousMonth.amount * 100).toFixed(1);

  const maxEarnings = Math.max(...monthlyEarnings.map(m => m.amount));

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
              <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                <TrendingUp size={16} />
                +{earningsGrowth}%
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Monthly Earnings</p>
              <p className="text-2xl font-bold text-foreground">£{currentMonth.amount.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">vs. £{previousMonth.amount.toLocaleString()} last month</p>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="text-blue-600" size={24} />
              </div>
              <div className="flex items-center gap-1 text-blue-600 text-sm font-medium">
                <TrendingUp size={16} />
                +12%
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Shifts</p>
              <p className="text-2xl font-bold text-foreground">156</p>
              <p className="text-xs text-muted-foreground mt-1">vs. 139 last month</p>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="text-purple-600" size={24} />
              </div>
              <div className="flex items-center gap-1 text-purple-600 text-sm font-medium">
                <TrendingUp size={16} />
                +8%
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Active Clients</p>
              <p className="text-2xl font-bold text-foreground">24</p>
              <p className="text-xs text-muted-foreground mt-1">vs. 22 last month</p>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <TrendingUp className="text-orange-600" size={24} />
              </div>
              <div className="flex items-center gap-1 text-orange-600 text-sm font-medium">
                +5%
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Avg. Hourly Rate</p>
              <p className="text-2xl font-bold text-foreground">£32.50</p>
              <p className="text-xs text-muted-foreground mt-1">vs. £31.00 last month</p>
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
              <div className="space-y-4">
                {monthlyEarnings.map((month) => (
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
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Revenue by Service Type</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Personal Care</span>
                    <span className="font-medium">£2,400 (42%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Medication Support</span>
                    <span className="font-medium">£1,800 (31%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Mobility Assistance</span>
                    <span className="font-medium">£1,000 (17%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Other Services</span>
                    <span className="font-medium">£600 (10%)</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Top Earning Staff</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <div>
                      <p className="font-medium">Sarah Johnson</p>
                      <p className="text-xs text-muted-foreground">42 shifts completed</p>
                    </div>
                    <span className="font-semibold text-purple-600">£2,100</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">Michael Chen</p>
                      <p className="text-xs text-muted-foreground">38 shifts completed</p>
                    </div>
                    <span className="font-semibold">£1,850</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">Emma Williams</p>
                      <p className="text-xs text-muted-foreground">35 shifts completed</p>
                    </div>
                    <span className="font-semibold">£1,650</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="shifts" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Shift Completion Rate</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Completed</span>
                      <span className="font-medium">94%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-600" style={{ width: '94%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Cancelled</span>
                      <span className="font-medium">4%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-600" style={{ width: '4%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">No Show</span>
                      <span className="font-medium">2%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-red-600" style={{ width: '2%' }}></div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Peak Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Morning (6AM - 12PM)</span>
                    <span className="font-medium">45 shifts</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Afternoon (12PM - 6PM)</span>
                    <span className="font-medium">68 shifts</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Evening (6PM - 12AM)</span>
                    <span className="font-medium">32 shifts</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Night (12AM - 6AM)</span>
                    <span className="font-medium">11 shifts</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="clients" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Client Engagement Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Average Visits/Client</p>
                  <p className="text-3xl font-bold text-foreground">6.5</p>
                  <p className="text-xs text-green-600 mt-1">+0.8 from last month</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Client Retention</p>
                  <p className="text-3xl font-bold text-foreground">92%</p>
                  <p className="text-xs text-green-600 mt-1">+3% from last month</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">New Clients</p>
                  <p className="text-3xl font-bold text-foreground">8</p>
                  <p className="text-xs text-blue-600 mt-1">This month</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Care Quality Indicators</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Care Plans Reviewed On Time</span>
                      <span className="font-medium text-green-600">98%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-600" style={{ width: '98%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Medication Compliance</span>
                      <span className="font-medium text-green-600">96%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-600" style={{ width: '96%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Documentation Completed</span>
                      <span className="font-medium text-green-600">100%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-600" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Compliance Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <span className="text-sm">All Staff DBS Checks</span>
                    <span className="text-green-600 font-medium">✓ Current</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <span className="text-sm">Training Certifications</span>
                    <span className="text-green-600 font-medium">✓ Up to Date</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <span className="text-sm">Insurance Renewal</span>
                    <span className="text-yellow-600 font-medium">⚠ Due in 14 days</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
  );
};

export default Analytics;