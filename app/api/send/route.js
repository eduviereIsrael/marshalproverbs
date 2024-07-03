import { EmailTemplate } from '@/components'; 
import { Resend } from 'resend';
import { NextResponse } from "next/server";

const resend = new Resend('re_VgPwqXtN_EUtENisbN1rQha6can8aoQVg');

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Mawshal Proverbs <hey@mawshalproverbs.com>',
      to: ['iamoluwasegunemmanuel@gmail.com'],
      subject: 'Hello world',
      react: EmailTemplate({ firstName: 'John' }),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
