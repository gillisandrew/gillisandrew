import Image from 'next/image';
import avatar from './avatar.png'
import { SocialNav } from "@/components/social";

export default function Home() {
  return (
      <main className="flex flex-col gap-4 items-center align-middle max-w-3xl mx-auto px-16 py-8">
        <div className="h-36 w-36 relative">
          <Image src={avatar} alt="Andrew Gillis" fill className="rounded-full" placeholder="blur" />
        </div>
        <h1 className="text-4xl font-semibold font-serif">Andrew Gillis</h1>
        <p className="text-sm text-muted-foreground text-balance text-center mb-2">
          Montreal-based software designer and developer. I specialize 
          in infrastructure as code on AWS with AWS CDK/CloudFormation 
          and Terraform. I have experience in a range of industries including 
          ecommerce, vehicle brokerage, and aviation.
        </p>
        <SocialNav />
      </main>
  );
}
