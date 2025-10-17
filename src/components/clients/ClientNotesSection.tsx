import { useState } from 'react';
import { useClientNotes, NoteType } from '@/hooks/useClientNotes';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AddClientNoteModal } from './AddClientNoteModal';
import { Plus, Lock, FileText, AlertTriangle, MessageSquare, HeartPulse, ClipboardCheck, AlertOctagon, Shield } from 'lucide-react';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

interface ClientNotesSectionProps {
  clientId: string;
}

const noteTypeIcons: Record<NoteType, any> = {
  general: FileText,
  medical: HeartPulse,
  incident: AlertTriangle,
  communication: MessageSquare,
  care_update: ClipboardCheck,
  assessment: ClipboardCheck,
  complaint: AlertOctagon,
  safeguarding: Shield,
};

const noteTypeColors: Record<NoteType, string> = {
  general: 'bg-muted',
  medical: 'bg-blue-500/10 text-blue-700 dark:text-blue-300',
  incident: 'bg-amber-500/10 text-amber-700 dark:text-amber-300',
  communication: 'bg-green-500/10 text-green-700 dark:text-green-300',
  care_update: 'bg-purple-500/10 text-purple-700 dark:text-purple-300',
  assessment: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300',
  complaint: 'bg-red-500/10 text-red-700 dark:text-red-300',
  safeguarding: 'bg-orange-500/10 text-orange-700 dark:text-orange-300',
};

export const ClientNotesSection = ({ clientId }: ClientNotesSectionProps) => {
  const { notes, loading } = useClientNotes(clientId);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filterType, setFilterType] = useState<NoteType | 'all'>('all');

  const filteredNotes = filterType === 'all' 
    ? notes 
    : notes.filter(note => note.note_type === filterType);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-3 w-full mb-2" />
            <Skeleton className="h-3 w-2/3" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Client Notes</h3>
        <Button onClick={() => setIsAddModalOpen(true)} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Note
        </Button>
      </div>

      <Tabs value={filterType} onValueChange={(v) => setFilterType(v as NoteType | 'all')}>
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="all">All ({notes.length})</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="medical">Medical</TabsTrigger>
          <TabsTrigger value="incident">Incident</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="care_update">Care Update</TabsTrigger>
        </TabsList>

        <TabsContent value={filterType} className="space-y-3 mt-4">
          {filteredNotes.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No notes found</p>
            </Card>
          ) : (
            filteredNotes.map((note) => {
              const Icon = noteTypeIcons[note.note_type];
              return (
                <Card key={note.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${noteTypeColors[note.note_type]}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-semibold text-sm">{note.title}</h4>
                          {note.is_confidential && (
                            <Badge variant="destructive" className="text-xs">
                              <Lock className="h-3 w-3 mr-1" />
                              Confidential
                            </Badge>
                          )}
                        </div>
                        <Badge variant="secondary" className="text-xs whitespace-nowrap">
                          {note.note_type.replace('_', ' ')}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2 whitespace-pre-wrap">
                        {note.content}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{format(new Date(note.created_at), 'PPp')}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </TabsContent>
      </Tabs>

      <AddClientNoteModal
        clientId={clientId}
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
      />
    </div>
  );
};
