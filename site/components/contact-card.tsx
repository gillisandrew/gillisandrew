"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "./ui/textarea";
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { contactFormSchema } from "@/lib/schema";
import { Turnstile } from "@marsidev/react-turnstile";
// import { Turnstile } from "@marsidev/react-turnstile";

export function ContactCard() {
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    // mode: 'onTouched',
    shouldUseNativeValidation: false,
    defaultValues: {
      name: "",
      email: "",
      message: "",
      token: ""
    }
  })

  async function onSubmit(values: z.infer<typeof contactFormSchema>) {
    try {
      // Simulate a successful contact form submission
      console.log(values)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
      if (!response.ok) {
        throw new Error('Failed to send your message. Please try again.')
      }

      toast.success('Your message has been sent successfully!')
    } catch (error) {
      console.error('Error submitting contact form', error)
      toast.error('Failed to send your message. Please try again.')
    }
  }

  return (
    <Card className="contact-card w-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-serif">Contact me</CardTitle>
        <CardDescription>
          Please fill out the form below and I will get back to you shortly.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">

              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        type="text"
                        autoComplete="name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>&nbsp;</FormMessage>
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder="johndoe@mail.com"
                        type="email"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>&nbsp;</FormMessage>
                  </FormItem>
                )}
              />

              {/* Message Field */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel htmlFor="message">Message</FormLabel>
                    <FormControl>
                      <Textarea
                        id="message"
                        placeholder="Your message..."
                        autoComplete="off"
                        className="min-h-24"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>&nbsp;</FormMessage>
                  </FormItem>
                )}
              />
              <div className="grid gap-2 grid-cols-[300px_1fr] h-[65px]">
                {/* Token Field */}
                {form.formState.isDirty ? <Turnstile
                    options={{
                        action: 'submit-form',
                        theme: 'light'
                    }}
                    onSuccess={(token) => form.setValue('token', token)}
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                /> : <div />}
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}