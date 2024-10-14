import { Mic, Save, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AudioRecorder from '@/components/AudioRecorder';
import TranscriptionViewer from '@/components/TranscriptionViewer';
import KnowledgeExtractor from '@/components/KnowledgeExtractor';
import ObsidianSync from '@/components/ObsidianSync';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">AI Knowledge and Wisdom Extractor</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Record Meeting</h2>
          <AudioRecorder />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Transcription</h2>
          <TranscriptionViewer />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Extract Knowledge</h2>
          <KnowledgeExtractor />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Sync with Obsidian</h2>
          <ObsidianSync />
        </div>
      </div>
    </div>
  );
}