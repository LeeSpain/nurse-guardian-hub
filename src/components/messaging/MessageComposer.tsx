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
  const [selectedFiles, setSelectedFiles] = useState<Array<{ name: string; path: string }>>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { sendMessage } = useMessages();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendWithAttachments();
    }
  };

  const handleFileUploaded = async (result: { url?: string; path?: string }) => {
    if (result.path) {
      const fileName = result.path.split('/').pop() || 'file';
      setSelectedFiles(prev => [...prev, { name: fileName, path: result.path! }]);
      setShowFileUpload(false);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSendWithAttachments = async () => {
    if (!message.trim() && selectedFiles.length === 0) return;

    try {
      let messageContent = message.trim();
      if (selectedFiles.length > 0) {
        const fileList = selectedFiles.map(f => `📎 ${f.name}`).join('\n');
        messageContent = messageContent ? `${messageContent}\n\n${fileList}` : fileList;
      }
      
      await sendMessage(recipientId, messageContent, appointmentId);
      setMessage('');
      setSelectedFiles([]);
      onMessageSent?.();
      
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    } catch (error) {
      console.error('Error sending message:', error);
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
      {/* Selected Files Display */}
      {selectedFiles.length > 0 && (
        <div className="flex flex-wrap gap-2 pb-2 border-b border-gray-200">
          {selectedFiles.map((file, index) => (
            <div key={index} className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg text-sm">
              <Paperclip className="w-4 h-4 text-gray-500" />
              <span className="text-gray-700">{file.name}</span>
              <button
                onClick={() => removeFile(index)}
                className="text-gray-400 hover:text-gray-600 ml-1"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

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
            onClick={handleSendWithAttachments}
            disabled={!message.trim() && selectedFiles.length === 0}
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