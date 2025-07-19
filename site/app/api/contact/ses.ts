import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

const init = (to: string, from: string) => {
    const client = new SESv2Client({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.SES_AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.SES_AWS_SECRET_ACCESS_KEY!,
        },
    });
    return {
        async send(subject: string, message: string) {
            const command = new SendEmailCommand({
                Content: {
                    Simple: {
                        Subject: {
                            Data: subject,
                        },
                        Body: {
                            Text: {
                                Data: message,
                            },
                        },
                    },
                },
                Destination: {
                    ToAddresses: [to]
                },
                FromEmailAddress: from,
            });
            await client.send(command);
        }
    }
}

export default init;