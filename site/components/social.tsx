import { cn } from "@/lib/utils";
import { GitHubLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import React from "react";



const SocialLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ href, className, children, ...props }, ref) => (
  <a
    ref={ref}
    className={cn("inline-flex items-center gap-2 hover:underline hover:underline-offset-4", className)}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  >
    {children}
  </a>
));
SocialLink.displayName = "SocialLink";


const SocialNav = React.forwardRef<
HTMLElement,
React.HTMLAttributes<HTMLElement>
>(({className, ...props},  ref) => (<nav
className={cn("flex flex-row gap-4", className)}
ref={ref}
{...props} 
>
    <SocialLink href="https://x.com/androidgillis">
      <TwitterLogoIcon />
      Twitter
    </SocialLink>
    <SocialLink href="https://github.com/gillisandrew">
      <GitHubLogoIcon />
      GitHub
    </SocialLink>
    <SocialLink href="https://linkedin.com/in/agillisdev">
      <LinkedInLogoIcon />
      LinkedIn
    </SocialLink>
  </nav>))

SocialNav.displayName = "SocialNav";
export {
  SocialNav,
  SocialLink,
};