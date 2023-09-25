import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { ReactNode } from "react";

export default function layout({
  children,
}: { children: ReactNode | ReactNode[] }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
