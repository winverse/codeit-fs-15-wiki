export interface MailMessage {
  to: string;
  subject: string;
  body: string;
}

export interface Mailer {
  send(input: MailMessage): Promise<void>;
}

export const mailer: Mailer = {
  async send(_input: MailMessage): Promise<void> {
    return undefined;
  },
};
