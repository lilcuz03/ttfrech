import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, phone, service, message } = await req.json();

  try {
    await resend.emails.send({
      from: "noreply@ttfrech.co.za", 
      to: "contact@ttfrech.co.za",
      replyTo: email,
      subject: `New enquiry from ${name}${service ? ` — ${service}` : ""}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1A1A18">
          <div style="background:#182338;padding:24px 32px;margin-bottom:0">
            <h2 style="color:#C4A248;margin:0;font-size:20px">New Quote Request</h2>
            <p style="color:rgba(245,240,232,.5);margin:4px 0 0;font-size:13px">TtFRECH Renovators & Investments</p>
          </div>
          <div style="background:#f9f8f6;padding:32px">
            <table style="width:100%;border-collapse:collapse;font-size:14px">
              <tr style="border-bottom:1px solid #e8ddd0">
                <td style="padding:12px 0;font-weight:600;color:#182338;width:30%">Name</td>
                <td style="padding:12px 0;color:#374151">${name}</td>
              </tr>
              <tr style="border-bottom:1px solid #e8ddd0">
                <td style="padding:12px 0;font-weight:600;color:#182338">Email</td>
                <td style="padding:12px 0;color:#374151"><a href="mailto:${email}" style="color:#C4A248">${email}</a></td>
              </tr>
              ${
                phone
                  ? `
              <tr style="border-bottom:1px solid #e8ddd0">
                <td style="padding:12px 0;font-weight:600;color:#182338">Phone</td>
                <td style="padding:12px 0;color:#374151"><a href="tel:${phone}" style="color:#C4A248">${phone}</a></td>
              </tr>`
                  : ""
              }
              ${
                service
                  ? `
              <tr style="border-bottom:1px solid #e8ddd0">
                <td style="padding:12px 0;font-weight:600;color:#182338">Service</td>
                <td style="padding:12px 0;color:#374151">${service}</td>
              </tr>`
                  : ""
              }
              <tr>
                <td style="padding:12px 0;font-weight:600;color:#182338;vertical-align:top">Message</td>
                <td style="padding:12px 0;color:#374151;line-height:1.7">${message.replace(/\n/g, "<br/>")}</td>
              </tr>
            </table>
          </div>
          <div style="background:#182338;padding:16px 32px;text-align:center">
            <p style="color:rgba(245,240,232,.3);font-size:11px;margin:0">Reply directly to this email to respond to ${name}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}
