"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ObsidianSync = () => {
  const [vaultPath, setVaultPath] = useState('');
  const [syncStatus, setSyncStatus] = useState('');

  const syncWithObsidian = async () => {
    // In a real application, you would implement the logic to sync with Obsidian here
    setSyncStatus('Syncing...');
    setTimeout(() => {
      setSyncStatus('Sync complete!');
    }, 2000);
  };

  return (
    <div>
      <Input
        type="text"
        placeholder="Enter Obsidian vault path"
        value={vaultPath}
        onChange={(e) => setVaultPath(e.target.value)}
        className="mb-4"
      />
      <Button onClick={syncWithObsidian} className="w-full mb-4">
        Sync with Obsidian
      </Button>
      {syncStatus && <p className="text-sm text-muted-foreground">{syncStatus}</p>}
    </div>
  );
};

export default ObsidianSync;