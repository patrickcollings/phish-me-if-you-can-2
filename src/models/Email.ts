export interface Email {
  subject: string;
  name: string;
  email: string;
  to: string;
  template: string;
  attachment: boolean;
  attachmentExtension: string;
  attachmentName: string;
  description: string;
  id: number;
  read: boolean;
  time: Date;
  scam: boolean;
}
