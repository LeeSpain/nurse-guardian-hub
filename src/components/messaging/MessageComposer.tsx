import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Image, Smile } from 'lucide-react';
import Button from '@/components/ui-components/Button';
import FileUploadZone from '@/components/ui-components/FileUploadZone';
import { useMessages } from '@/hooks/useMessages';

interface MessageComposerProps {
  recipientId: string;
  appointmentId?: string;
  onMessageSent?: () => void;
  placeholder?: string;
}

const MessageComposer: React.FC<MessageComposerProps> = ({
  recipientId,
  appointmentId,
  onMessageSent,
  placeholder = "Type your message..."
}) => {
  const [message, setMessage] = useState('');
  const [showFileUpload, setShowFileUpload] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { sendMessage } = useMessages();

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      await sendMessage(recipientId, message.trim(), appointmentId);
      setMessage('');
      onMessageSent?.();
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUploaded = async (result: { url?: string; path?: string }) => {
    if (result.path) {
      // Send a message with file attachment
      const fileMessage = `📎 File attached: ${result.path.split('/').pop()}`;
      await sendMessage(recipientId, fileMessage, appointmentId);
      setShowFileUpload(false);
      onMessageSent?.();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
      <div className="flex space-x-2">
        <div className="flex-grow relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none overflow-hidden"
            rows={1}
            style={{ minHeight: '40px', maxHeight: '120px' }}
          />
        </div>
        
        <div className="flex space-x-1">
          <button
            onClick={() => setShowFileUpload(true)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Attach file"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          
          <Button
            variant="client"
            size="sm"
            onClick={handleSendMessage}
            disabled={!message.trim()}
            icon={<Send className="w-4 h-4" />}
          >
            Send
          </Button>
        </div>
      </div>

      {showFileUpload && (
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium text-gray-700">Attach File</h4>
            <button
              onClick={() => setShowFileUpload(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          
          <FileUploadZone
            onFileUploaded={handleFileUploaded}
            options={{
              bucket: 'documents',
              maxSizeBytes: 10 * 1024 * 1024, // 10MB
              allowedTypes: [
                'application/pdf',
                'image/jpeg',
                'image/png',
                'text/plain',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
              ]
            }}
            accept=".pdf,.jpg,.jpeg,.png,.txt,.doc,.docx"
            className="h-32"
          />
        </div>
      )}
    </div>
  );
};

export default MessageComposer;