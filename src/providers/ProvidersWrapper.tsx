"use client";

import { type ReactNode } from "react";
import { MouseProvider } from "@/providers/MouseProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";

function ProvidersWrapper({ children }: { children: ReactNode }) {
  return (
    <MouseProvider>
      <CustomCursor />
      {children}
    </MouseProvider>
  );
}

export { ProvidersWrapper };
