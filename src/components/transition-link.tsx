"use client";

import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import type { CSSProperties, MouseEvent, PropsWithChildren } from "react";

type Props = PropsWithChildren<
  LinkProps & {
    className?: string;
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
    viewTransition?: boolean;
    target?: string;
    rel?: string;
    style?: CSSProperties;
  }
>;

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void | Promise<void>) => void;
};

export function TransitionLink({
  children,
  href,
  className,
  onClick,
  viewTransition = true,
  target,
  rel,
  style,
  ...rest
}: Props) {
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) {
      return;
    }

    const isModified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (isModified || target === "_blank") {
      return;
    }

    if (typeof href !== "string" || !href.startsWith("/")) {
      return;
    }

    event.preventDefault();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const doc = document as ViewTransitionDocument;

    if (viewTransition && !reducedMotion && typeof doc.startViewTransition === "function") {
      doc.startViewTransition(() => router.push(href));
      return;
    }

    router.push(href);
  };

  return (
    <Link href={href} className={className} onClick={handleClick} target={target} rel={rel} style={style} {...rest}>
      {children}
    </Link>
  );
}
