"use client";

import Link from "next/link";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";
import type { ComponentProps, CSSProperties, MouseEvent, PropsWithChildren } from "react";

import { trackPlausibleEvent } from "@/lib/analytics/plausible";

type Props = PropsWithChildren<
  Omit<ComponentProps<typeof Link>, "href"> & {
    href: string;
    className?: string;
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
    target?: string;
    rel?: string;
    style?: CSSProperties;
  }
>;

export function TransitionLink({
  children,
  href,
  className,
  onClick,
  target,
  rel,
  style,
  ...rest
}: Props) {
  const pathname = usePathname();
  const router = useTransitionRouter();

  const stackAnimation = () => {
    document. documentElement.animate(
      [
        {
          opacity: 1, scale: 1, transform: "translateY(0)",
        },
        {
          opacity: 0.5, scale: 0.9, transform: "translateY(-100px)",
        },
      ],
      {
        duration: 500,
        easing: "cubic-bezier(0.76, 0, 0.24, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-old(root)"
      }
    );

    document. documentElement.animate(
      [
        {
          transform: "translateY(100%)",
        },
        {
          transform: "translateY(0)",
        },
      ],
      {
        duration: 500,
        easing: "cubic-bezier(0.76, 0, 0.24, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-new(root)"
      }
    );
  };

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) {
      return;
    }

    const isModified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (isModified || target === "_blank") {
      return;
    }

    if (typeof href !== "string") {
      return;
    }
    
    // Only track if it's a valid internal navigation
    if (href !== pathname) {
      event.preventDefault();

      trackPlausibleEvent("View Transition Completed", {
        from_path: pathname,
        to_path: href
      });
      
      // @ts-expect-error - Custom data attribute for view transition
      if (rest["data-transition-type"]) {
        // @ts-expect-error - Custom data attribute for view transition
        document.documentElement.dataset.transitionType = rest["data-transition-type"] as string;
        
        // Use default view transition for projects (or whatever type specified)
        router.push(href);
      } else {
        // CLEANUP: Remove active project transition names to prevent overlapping elements
        // This ensures they are merged into the root snapshot for the stack animation
        const activeElements = document.querySelectorAll('[style*="view-transition-name"]');
        activeElements.forEach((el) => {
          const element = el as HTMLElement;
          if (element.style.viewTransitionName.includes("active-project-")) {
            element.style.viewTransitionName = "";
          }
        });

        // Use custom stack animation for standard links
        router.push(href, {
          onTransitionReady: stackAnimation,
        });
      }
    }
  };

  return (
    <Link
      href={href}
      className={className}
      onClick={handleClick}
      target={target}
      rel={rel}
      style={style}
      prefetch={true}
      {...rest}
    >
      {children}
    </Link>
  );
}
