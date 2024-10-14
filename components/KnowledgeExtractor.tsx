"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const KnowledgeExtractor = () => {
  const [extractedKnowledge, setExtractedKnowledge] = useState('');

  const extractKnowledge = async () => {
    // In a real application, you would send the transcription to your local LLM via Ollama
    // and receive the extracted knowledge
    setTimeout(() => {
      setExtractedKnowledge('Key points extracted from the meeting:\n1. ...\n2. ...\n3. ...');
    }, 1000);
  };

  return (
    <div>
      <Button onClick={extractKnowledge} className="w-full mb-4">
        Extract Knowledge
      </Button>
      <Textarea
        value={extractedKnowledge}
        readOnly
        className="h-48"
        placeholder="Extracted knowledge will appear here..."
      />
    </div>
  );
};

export default KnowledgeExtractor;