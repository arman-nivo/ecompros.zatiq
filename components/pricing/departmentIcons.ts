import { Code2, Headphones, Megaphone, Palette, type LucideIcon } from "lucide-react";

import type { DepartmentId } from "@/lib/pricing";

export const departmentIcons: Record<DepartmentId, LucideIcon> = {
  creative: Palette,
  marketing: Megaphone,
  operations: Headphones,
  technology: Code2,
};
