"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  LinkIcon,
  QrCode,
  BarChart3,
  Settings,
  Shield,
  LogOut,
} from "lucide-react";
import Image from "next/image";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Links", href: "/dashboard/links", icon: LinkIcon },
  { name: "QR Codes", href: "/dashboard/qr-codes", icon: QrCode },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

const adminNavigation = [{ name: "Admin Panel", href: "/admin", icon: Shield }];

export function DashboardSidebar() {
  const pathname = usePathname();
  const isAdmin = true; // later: from auth context

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center justify-start gap-2 px-2 h-10">
          {/* Text logo (expanded) */}
          <span className="font-semibold text-lg leading-none transition-opacity duration-200 group-data-[collapsible=icon]:hidden">
            Knot
          </span>

          {/* Image logo (collapsed) */}
          <span className="hidden group-data-[collapsible=icon]:block">
            <Image
              src="/logo.png"
              alt="Knot logo"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu className="p-2">
          <>
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

              return (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={isActive}>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}

            {isAdmin && (
              <>
                {adminNavigation.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

                  return (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link href={item.href}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </>
            )}
          </>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className="">
            <SidebarMenuButton asChild>
              <Link href="/login" className="p-3 h-11 text-lg gap-2">
                <LogOut className="h-4 w-4" />
                <span>Sign out</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
