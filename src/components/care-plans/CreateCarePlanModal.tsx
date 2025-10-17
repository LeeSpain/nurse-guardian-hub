import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import { useCarePlans } from '@/hooks/useCarePlans';
import { useClients } from '@/hooks/useClients';
import { useOrganization } from '@/hooks/useOrganization';

interface CreateCarePlanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateCarePlanModal: React.FC<CreateCarePlanModalProps> = ({ open, onOpenChange }) => {
  const { createCarePlan } = useCarePlans();
  const { clients } = useClients();
  const { organization } = useOrganization();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    client_id: '',
    title: '',
    start_date: '',
    review_date: '',
    status: 'active',
  });
  
  const [goals, setGoals] = useState<string[]>(['']);
  const [interventions, setInterventions] = useState<string[]>(['']);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.client_id || !formData.title || !formData.start_date || !formData.review_date) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!organization?.id) {
      toast.error('Organization not found');
      return;
    }

    const filteredGoals = goals.filter(g => g.trim() !== '');
    const filteredInterventions = interventions.filter(i => i.trim() !== '');

    if (filteredGoals.length === 0) {
      toast.error('Please add at least one goal');
      return;
    }

    setLoading(true);
    try {
      await createCarePlan({
        client_id: formData.client_id,
        title: formData.title,
        start_date: formData.start_date,
        review_date: formData.review_date,
        goals: filteredGoals,
        interventions: filteredInterventions,
      });
      
      toast.success('Care plan created successfully');
      onOpenChange(false);
      
      // Reset form
      setFormData({
        client_id: '',
        title: '',
        start_date: '',
        review_date: '',
        status: 'active',
      });
      setGoals(['']);
      setInterventions(['']);
    } catch (error) {
      console.error('Error creating care plan:', error);
      toast.error('Failed to create care plan');
    } finally {
      setLoading(false);
    }
  };

  const addGoal = () => setGoals([...goals, '']);
  const removeGoal = (index: number) => setGoals(goals.filter((_, i) => i !== index));
  const updateGoal = (index: number, value: string) => {
    const newGoals = [...goals];
    newGoals[index] = value;
    setGoals(newGoals);
  };

  const addIntervention = () => setInterventions([...interventions, '']);
  const removeIntervention = (index: number) => setInterventions(interventions.filter((_, i) => i !== index));
  const updateIntervention = (index: number, value: string) => {
    const newInterventions = [...interventions];
    newInterventions[index] = value;
    setInterventions(newInterventions);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Care Plan</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="client">Client *</Label>
              <Select value={formData.client_id} onValueChange={(v) => setFormData({ ...formData, client_id: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select client..." />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.first_name} {client.last_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Care Plan Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Daily Living Support Plan"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start_date">Start Date *</Label>
                <Input
                  id="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="review_date">Review Date *</Label>
                <Input
                  id="review_date"
                  type="date"
                  value={formData.review_date}
                  onChange={(e) => setFormData({ ...formData, review_date: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Care Goals *</Label>
              {goals.map((goal, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={goal}
                    onChange={(e) => updateGoal(index, e.target.value)}
                    placeholder="Enter a care goal..."
                  />
                  {goals.length > 1 && (
                    <Button type="button" variant="outline" size="icon" onClick={() => removeGoal(index)}>
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addGoal} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Goal
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Interventions</Label>
              {interventions.map((intervention, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={intervention}
                    onChange={(e) => updateIntervention(index, e.target.value)}
                    placeholder="Enter an intervention..."
                  />
                  {interventions.length > 1 && (
                    <Button type="button" variant="outline" size="icon" onClick={() => removeIntervention(index)}>
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addIntervention} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Intervention
              </Button>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Creating...' : 'Create Care Plan'}
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
