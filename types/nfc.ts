export interface NFC {
  read: () => Promise<{
    interactionType: number;
    [key: string]: any;
  }>;
} 