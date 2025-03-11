
import { SidebarAdmin } from "@/components/admin/sidebar";
import { constructMetadata } from "@/lib/utils";

interface AppLayoutProps {
  children: React.ReactNode;
}
export const metadata = constructMetadata({image: "https://comfy-cuchufli-7e0880.netlify.app/dashboard.png"})

export default function AppLayout({ children }: AppLayoutProps) {

  return (
    <main>
      <SidebarAdmin>{children}</SidebarAdmin>
    </main>
  );
}
