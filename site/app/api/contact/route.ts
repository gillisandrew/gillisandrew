import { contactFormSchema } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";
import SES from './ses'

type ContactFormRequestBody = Zod.infer<typeof contactFormSchema>

async function verifyCaptcha(secret: string, token: string, clientIp?: string | null): Promise<void> {
    const response = await fetch(process.env.NEXT_PRIVATE_TURNSTILE_ENDPOINT!, {
        method: 'POST',
        body: JSON.stringify({
            secret,
            response: token,
            remoteip: clientIp
        }),
        headers: {
            'Content-Type': 'application/json'
          }
    })
    const outcome = await response.json()
    console.log(outcome)
    if(!outcome.success){
        throw new Error('Failed to verify captcha')
    }
}

function validateContactForm(body: unknown): ContactFormRequestBody {
    console.log(body)
    return contactFormSchema.parse(body)
}

async function sendNotification(body: Omit<ContactFormRequestBody, "token">) {
    const ses = SES(process.env.CONTACT_TO_EMAIL!, process.env.CONTACT_FROM_EMAIL!)
    ses.send('New message from your website', JSON.stringify(body, null, 2))
}


const getSuccessResponse = (message = "Your message has been sent successfully") => 
    new NextResponse(JSON.stringify({
        success: true,
        message: message
    }),  {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })

const getErrorResponse = (status = 500, message = "Failed to send your message. Please try again.") => 
    new NextResponse(JSON.stringify({
        success: false,
        message
    }),  {
        status: status,
        headers: {
            'Content-Type': 'application/json'
        }
    })

export async function POST(req: NextRequest): Promise<NextResponse> {
    console.log(req)
    try {
        // const contentType = req.headers.get('content-type')
        switch(req.headers.get('content-type')){
            case 'application/json':
                // Validate the request body
                const {token, ...body } = validateContactForm(await req.json())
                
                // Verify captcha
                await verifyCaptcha(process.env.NEXT_PRIVATE_TURNSTILE_SECRET_KEY!, token, req.cookies.get('x-forwarded-for')?.value)
                
                // Send notification
                await sendNotification(body)
                
                // Respond with a success message
                return getSuccessResponse()
            default:
                return getErrorResponse(415, 'Unsupported content type')
        }
    } catch (error) {
        console.error('Error submitting contact form', error)
        return getErrorResponse()
    }
}