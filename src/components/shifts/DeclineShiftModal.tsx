import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

interface DeclineShiftModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (reason?: string) => void;
  shiftDetails?: {
    date: string;
    time: string;
    client: string;
  };
}

const DeclineShiftModal = ({
  open,
  onOpenChange,
  onConfirm,
  shiftDetails,
}: DeclineShiftModalProps) => {
  const [reason, setReason] = useState("");

  const handleConfirm = () => {
    onConfirm(reason.trim() || undefined);
    setReason("");
  };

  const handleCancel = () => {
    setReason("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <DialogTitle>Decline Shift</DialogTitle>
              <DialogDescription>
                Are you sure you want to decline this shift?
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {shiftDetails && (
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <div className="text-sm">
              <span className="font-medium">Client:</span> {shiftDetails.client}
            </div>
            <div className="text-sm">
              <span className="font-medium">Date:</span> {shiftDetails.date}
            </div>
            <div className="text-sm">
              <span className="font-medium">Time:</span> {shiftDetails.time}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="reason">
            Reason for declining (optional)
          </Label>
          <Textarea
            id="reason"
            placeholder="Please provide a reason for declining this shift..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            className="resize-none"
          />
          <p className="text-xs text-muted-foreground">
            Providing a reason helps managers understand your availability and improve scheduling.
          </p>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirm}
          >
            Decline Shift
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeclineShiftModal;
