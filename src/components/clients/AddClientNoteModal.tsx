import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useClientNotes, NoteType } from '@/hooks/useClientNotes';

interface AddClientNoteModalProps {
  clientId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddClientNoteModal = ({ clientId, open, onOpenChange }: AddClientNoteModalProps) => {
  const { createNote } = useClientNotes(clientId);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [noteType, setNoteType] = useState<NoteType>('general');
  const [isConfidential, setIsConfidential] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createNote({
        client_id: clientId,
        title,
        content,
        note_type: noteType,
        is_confidential: isConfidential,
        attachments: [],
        organization_id: '', // Will be set by the hook
      });

      setTitle('');
      setContent('');
      setNoteType('general');
      setIsConfidential(false);
      onOpenChange(false);
    } catch (error) {
      console.error('Error creating note:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Client Note</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="noteType">Note Type</Label>
            <Select value={noteType} onValueChange={(v) => setNoteType(v as NoteType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="medical">Medical</SelectItem>
                <SelectItem value="incident">Incident</SelectItem>
                <SelectItem value="communication">Communication</SelectItem>
                <SelectItem value="care_update">Care Update</SelectItem>
                <SelectItem value="assessment">Assessment</SelectItem>
                <SelectItem value="complaint">Complaint</SelectItem>
                <SelectItem value="safeguarding">Safeguarding</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Note content"
              rows={6}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="confidential" className="flex items-center gap-2">
              Mark as Confidential
            </Label>
            <Switch
              id="confidential"
              checked={isConfidential}
              onCheckedChange={setIsConfidential}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Note'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
