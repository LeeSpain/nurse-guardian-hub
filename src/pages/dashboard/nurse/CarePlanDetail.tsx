import React, { useState, useEffect } from 'react';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';
import { ArrowLeft, Edit, Save, X, Plus, Trash2, AlertTriangle, FileText, Calendar } from 'lucide-react';
import Button from '@/components/ui-components/Button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useOrganization } from '@/hooks/useOrganization';

interface CarePlan {
  id: string;
  title: string;
  client_id: string;
  start_date: string;
  review_date: string | null;
  status: string;
  goals: any[];
  interventions: any[];
  risk_assessment: any;
  created_at: string;
  updated_at: string;
  client_name?: string;
}

const CarePlanDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading: userLoading } = useUser();
  const { organization } = useOrganization();
  const [carePlan, setCarePlan] = useState<CarePlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [editForm, setEditForm] = useState({
    title: '',
    review_date: '',
    status: '',
    goals: [] as string[],
    interventions: [] as string[],
  });

  useEffect(() => {
    if (id && organization?.id) {
      fetchCarePlan();
    }
  }, [id, organization?.id]);

  const fetchCarePlan = async () => {
    try {
      setLoading(true);
      // Fetch care plan
      const { data: planData, error: planError } = await supabase
        .from('care_plans')
        .select('*')
        .eq('id', id)
        .eq('organization_id', organization!.id)
        .single();

      if (planError) throw planError;

      // Fetch client details separately
      const { data: clientData, error: clientError } = await supabase
        .from('clients')
        .select('first_name, last_name')
        .eq('id', planData.client_id)
        .single();

      if (clientError) throw clientError;

      const formattedPlan: CarePlan = {
        ...planData,
        client_name: `${clientData.first_name} ${clientData.last_name}`,
        goals: Array.isArray(planData.goals) ? planData.goals.filter((g: any) => g !== null).map((g: any) => String(g)) : [],
        interventions: Array.isArray(planData.interventions) ? planData.interventions.filter((i: any) => i !== null).map((i: any) => String(i)) : [],
      };

      setCarePlan(formattedPlan);
      setEditForm({
        title: formattedPlan.title,
        review_date: formattedPlan.review_date || '',
        status: formattedPlan.status,
        goals: formattedPlan.goals,
        interventions: formattedPlan.interventions,
      });
    } catch (error: any) {
      console.error('Error fetching care plan:', error);
      toast.error('Failed to load care plan');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!carePlan) return;

    try {
      setSaving(true);
      const { error } = await supabase
        .from('care_plans')
        .update({
          title: editForm.title,
          review_date: editForm.review_date,
          status: editForm.status,
          goals: editForm.goals,
          interventions: editForm.interventions,
          updated_at: new Date().toISOString(),
        })
        .eq('id', carePlan.id);

      if (error) throw error;

      toast.success('Care plan updated successfully');
      setEditing(false);
      await fetchCarePlan();
    } catch (error: any) {
      console.error('Error updating care plan:', error);
      toast.error('Failed to update care plan');
    } finally {
      setSaving(false);
    }
  };

  const addGoal = () => {
    setEditForm({ ...editForm, goals: [...editForm.goals, ''] });
  };

  const updateGoal = (index: number, value: string) => {
    const newGoals = [...editForm.goals];
    newGoals[index] = value;
    setEditForm({ ...editForm, goals: newGoals });
  };

  const removeGoal = (index: number) => {
    setEditForm({ ...editForm, goals: editForm.goals.filter((_, i) => i !== index) });
  };

  const addIntervention = () => {
    setEditForm({ ...editForm, interventions: [...editForm.interventions, ''] });
  };

  const updateIntervention = (index: number, value: string) => {
    const newInterventions = [...editForm.interventions];
    newInterventions[index] = value;
    setEditForm({ ...editForm, interventions: newInterventions });
  };

  const removeIntervention = (index: number) => {
    setEditForm({ ...editForm, interventions: editForm.interventions.filter((_, i) => i !== index) });
  };

  if (userLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-primary border-r-transparent border-b-primary border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== UserRole.NURSE) {
    return <Navigate to="/login" />;
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: 'bg-green-100 text-green-800',
      review_needed: 'bg-yellow-100 text-yellow-800',
      archived: 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate('/nurse/dashboard/care-plans')}>
            <ArrowLeft size={16} className="mr-2" />
            Back to Care Plans
          </Button>
        </div>
        <div className="flex gap-2">
          {editing ? (
            <>
              <Button variant="outline" onClick={() => { setEditing(false); fetchCarePlan(); }}>
                <X size={16} className="mr-2" />
                Cancel
              </Button>
              <Button variant="nurse" onClick={handleSave} disabled={saving}>
                <Save size={16} className="mr-2" />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </>
          ) : (
            <Button variant="nurse" onClick={() => setEditing(true)}>
              <Edit size={16} className="mr-2" />
              Edit Plan
            </Button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="space-y-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      ) : !carePlan ? (
        <Card className="p-12 text-center">
          <AlertTriangle className="text-muted-foreground mx-auto mb-4" size={48} />
          <h3 className="text-lg font-medium text-foreground mb-2">Care plan not found</h3>
          <p className="text-muted-foreground">The care plan you're looking for doesn't exist or has been removed.</p>
        </Card>
      ) : (
        <>
          {/* Header Card */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                {editing ? (
                  <Input
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="text-2xl font-bold mb-2"
                  />
                ) : (
                  <h1 className="text-2xl font-bold text-foreground mb-2">{carePlan.title}</h1>
                )}
                <p className="text-muted-foreground">Client: {carePlan.client_name}</p>
              </div>
              <Badge className={getStatusColor(carePlan.status)}>
                {carePlan.status.replace('_', ' ')}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Start Date</p>
                <p className="font-medium flex items-center">
                  <Calendar size={16} className="mr-2 text-primary" />
                  {format(new Date(carePlan.start_date), 'MMM d, yyyy')}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Review Date</p>
                {editing ? (
                  <Input
                    type="date"
                    value={editForm.review_date}
                    onChange={(e) => setEditForm({ ...editForm, review_date: e.target.value })}
                  />
                ) : (
                  <p className="font-medium flex items-center">
                    <Calendar size={16} className="mr-2 text-primary" />
                    {carePlan.review_date ? format(new Date(carePlan.review_date), 'MMM d, yyyy') : 'Not set'}
                  </p>
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Last Updated</p>
                <p className="font-medium">{format(new Date(carePlan.updated_at), 'MMM d, yyyy')}</p>
              </div>
            </div>
          </Card>

          {/* Goals Section */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground flex items-center">
                <FileText size={20} className="mr-2 text-primary" />
                Care Goals
              </h2>
              {editing && (
                <Button variant="outline" size="sm" onClick={addGoal}>
                  <Plus size={16} className="mr-2" />
                  Add Goal
                </Button>
              )}
            </div>
            <div className="space-y-3">
              {editForm.goals.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No goals set yet</p>
              ) : (
                editForm.goals.map((goal, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {editing ? (
                      <>
                        <Input
                          value={goal}
                          onChange={(e) => updateGoal(index, e.target.value)}
                          placeholder="Enter goal..."
                          className="flex-1"
                        />
                        <Button variant="outline" size="sm" onClick={() => removeGoal(index)}>
                          <Trash2 size={16} />
                        </Button>
                      </>
                    ) : (
                      <div className="flex items-start gap-3 p-3 bg-muted rounded-lg flex-1">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <p className="flex-1">{goal}</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Interventions Section */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground flex items-center">
                <FileText size={20} className="mr-2 text-primary" />
                Interventions
              </h2>
              {editing && (
                <Button variant="outline" size="sm" onClick={addIntervention}>
                  <Plus size={16} className="mr-2" />
                  Add Intervention
                </Button>
              )}
            </div>
            <div className="space-y-3">
              {editForm.interventions.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No interventions set yet</p>
              ) : (
                editForm.interventions.map((intervention, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {editing ? (
                      <>
                        <Textarea
                          value={intervention}
                          onChange={(e) => updateIntervention(index, e.target.value)}
                          placeholder="Enter intervention..."
                          className="flex-1"
                          rows={2}
                        />
                        <Button variant="outline" size="sm" onClick={() => removeIntervention(index)}>
                          <Trash2 size={16} />
                        </Button>
                      </>
                    ) : (
                      <div className="p-3 bg-muted rounded-lg flex-1">
                        <p>{intervention}</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default CarePlanDetail;
