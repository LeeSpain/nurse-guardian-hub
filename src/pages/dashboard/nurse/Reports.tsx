import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';
import { FileText, Download, Calendar, DollarSign, Users, ClipboardCheck } from 'lucide-react';
import Button from '@/components/ui-components/Button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';

const Reports: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useUser();
  const [startDate, setStartDate] = useState(format(new Date(), 'yyyy-MM-01'));
  const [endDate, setEndDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  
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

  const reportTypes = [
    {
      id: 'timesheet',
      title: 'Staff Timesheet Export',
      description: 'Export staff hours for payroll processing',
      icon: <Calendar className="text-blue-600" size={32} />,
      color: 'bg-blue-100',
    },
    {
      id: 'care-plan',
      title: 'Care Plan Compliance Audit',
      description: 'Review care plan completion and updates',
      icon: <ClipboardCheck className="text-purple-600" size={32} />,
      color: 'bg-purple-100',
    },
    {
      id: 'medication',
      title: 'Medication Administration Audit',
      description: 'Track medication administration records',
      icon: <FileText className="text-green-600" size={32} />,
      color: 'bg-green-100',
    },
    {
      id: 'incidents',
      title: 'Incident Reports Summary',
      description: 'Review all incident reports and follow-ups',
      icon: <FileText className="text-red-600" size={32} />,
      color: 'bg-red-100',
    },
    {
      id: 'visits',
      title: 'Client Visit Statistics',
      description: 'Detailed breakdown of client visits',
      icon: <Users className="text-orange-600" size={32} />,
      color: 'bg-orange-100',
    },
    {
      id: 'performance',
      title: 'Staff Performance Metrics',
      description: 'Individual staff performance data',
      icon: <Users className="text-teal-600" size={32} />,
      color: 'bg-teal-100',
    },
    {
      id: 'financial',
      title: 'Financial Summary Report',
      description: 'Revenue, expenses, and profitability',
      icon: <DollarSign className="text-green-600" size={32} />,
      color: 'bg-green-100',
    },
    {
      id: 'compliance',
      title: 'Regulatory Compliance Report',
      description: 'CQC compliance and documentation status',
      icon: <ClipboardCheck className="text-indigo-600" size={32} />,
      color: 'bg-indigo-100',
    },
  ];

  const handleGenerateReport = (reportId: string) => {
    console.log(`Generating report: ${reportId} from ${startDate} to ${endDate}`);
    // In production, this would trigger actual report generation
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Reports</h1>
          <p className="text-muted-foreground">Generate and export comprehensive business reports</p>
        </div>

        {/* Date Range Selector */}
        <Card className="p-6 mb-8">
          <h3 className="font-semibold mb-4">Report Date Range</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium">Start Date</label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">End Date</label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setStartDate(format(new Date(new Date().getFullYear(), new Date().getMonth(), 1), 'yyyy-MM-dd'));
                  setEndDate(format(new Date(), 'yyyy-MM-dd'));
                }}
              >
                This Month
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  const lastMonth = new Date();
                  lastMonth.setMonth(lastMonth.getMonth() - 1);
                  setStartDate(format(new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1), 'yyyy-MM-dd'));
                  setEndDate(format(new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0), 'yyyy-MM-dd'));
                }}
              >
                Last Month
              </Button>
            </div>
          </div>
        </Card>

        {/* Report Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportTypes.map((report) => (
            <Card
              key={report.id}
              className="p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-14 h-14 ${report.color} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  {report.icon}
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-foreground mb-1">{report.title}</h3>
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button
                  variant="nurse"
                  size="sm"
                  className="w-full"
                  icon={<Download size={16} />}
                  onClick={() => handleGenerateReport(report.id)}
                >
                  Generate Report
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 text-xs">
                    PDF
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 text-xs">
                    Excel
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 text-xs">
                    CSV
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Recent Reports */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Recent Reports</h2>
          <Card className="divide-y">
            {[
              { name: 'Staff Timesheet - June 2025', date: '2025-06-30', type: 'Excel', size: '245 KB' },
              { name: 'Care Plan Compliance - June 2025', date: '2025-06-30', type: 'PDF', size: '1.2 MB' },
              { name: 'Financial Summary - May 2025', date: '2025-05-31', type: 'PDF', size: '890 KB' },
            ].map((report, idx) => (
              <div key={idx} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FileText className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{report.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(report.date), 'MMM d, yyyy')} • {report.type} • {report.size}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" icon={<Download size={16} />}>
                  Download
                </Button>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reports;