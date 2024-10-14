"use client";

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, Square, Volume2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [includeSystemAudio, setIncludeSystemAudio] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    if (!consentGiven) {
      alert("Please ensure all parties have given consent before recording.");
      return;
    }

    try {
      let stream;
      if (includeSystemAudio) {
        // @ts-ignore: TypeScript doesn't recognize the getDisplayMedia method
        stream = await navigator.mediaDevices.getDisplayMedia({
          video: false,
          audio: true
        });
      } else {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      }

      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        console.log('Recording stopped, blob created');
        chunksRef.current = [];
        stream.getTracks().forEach(track => track.stop());
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error starting recording:', err);
      alert('Failed to start recording. Make sure you have granted the necessary permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div>
      <Alert className="mb-4">
        <AlertTitle>Important!</AlertTitle>
        <AlertDescription>
          Ensure all parties have given consent before recording any conversation.
        </AlertDescription>
      </Alert>
      <div className="flex items-center space-x-2 mb-4">
        <Switch
          id="system-audio"
          checked={includeSystemAudio}
          onCheckedChange={setIncludeSystemAudio}
        />
        <Label htmlFor="system-audio">Include System Audio</Label>
      </div>
      <Button
        onClick={() => setConsentGiven(!consentGiven)}
        variant={consentGiven ? "default" : "outline"}
        className="w-full mb-4"
      >
        {consentGiven ? "Consent Given" : "Confirm All Parties Consent"}
      </Button>
      <Button
        onClick={isRecording ? stopRecording : startRecording}
        className="w-full mb-4"
        disabled={!consentGiven}
      >
        {isRecording ? (
          <>
            <Square className="mr-2 h-4 w-4" /> Stop Recording
          </>
        ) : (
          <>
            {includeSystemAudio ? (
              <Volume2 className="mr-2 h-4 w-4" />
            ) : (
              <Mic className="mr-2 h-4 w-4" />
            )}
            Start Recording
          </>
        )}
      </Button>
      {isRecording && (
        <p className="text-sm text-muted-foreground">
          Recording in progress... Remember, all parties must be aware of the recording.
          {includeSystemAudio && " System audio is being captured."}
        </p>
      )}
    </div>
  );
};

export default AudioRecorder;