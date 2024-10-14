"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const TranscriptionViewer = () => {
  const [transcription, setTranscription] = useState('');

  // In a real application, you would fetch the transcription from your backend
  const fetchTranscription = async () => {
    // Simulating an API call
    setTimeout(() => {
      setTranscription('This is a sample transcription of the recorded meeting...');
    }, 1000);
  };

  return (
    <div>
      <Button onClick={fetchTranscription} className="w-full mb-4">
        Load Transcription
      </Button>
      <Textarea
        value={transcription}
        readOnly
        className="h-48"
        placeholder="Transcription will appear here..."
      />
    </div>
  );
};

export default TranscriptionViewer;