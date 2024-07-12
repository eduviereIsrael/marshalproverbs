
import { Resend } from 'resend';
import { NextResponse } from "next/server";
import WelcomeEmail from '@/components/EmailTemplate';
import TestEmail from '@/components/TestEmail';
import { EmailTemplate } from '@/components/TestEmail';

const resend = new Resend('re_VgPwqXtN_EUtENisbN1rQha6can8aoQVg');

export async function POST(req) {
  try {
    const body = await req.json();
    const { email } = body;
    console.log(email)
    const { data, error } = await resend.emails.send({
      from: 'Mawshal Proverbs <hey@mawshalproverbs.com>',
      // from: 'Acme <john.emmanuel@mawshalproverbs.com>',
      // to: ["eduviereisrael@gmail.com"],
      to: [email],
      subject: 'Hello world',
      react: EmailTemplate({firstName: "John"}),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
