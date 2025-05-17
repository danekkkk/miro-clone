"use client";

import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher, useOrganization } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Banknote, LayoutDashboard, Star } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { ORGANIZATION_SWITCHER_APPEARANCE } from "@/constants/organization-switcher-appearance";
import { useAction, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export const OrgSidebar = () => {
  const [pending, setPending] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const favorites = searchParams.get("favorites");

  const { organization } = useOrganization();
  const portal = useAction(api.stripe.portal);
  const pay = useAction(api.stripe.pay);

  const isSubscribed = useQuery(api.subscriptions.getIsSubscribed, {
    orgId: organization?.id,
  });

  const onClick = async () => {
    if (!organization?.id) return;

    setPending(true);

    try {
      const action = isSubscribed ? portal : pay;
      const redirectUrl = await action({
        orgId: organization.id,
      });

      window.location.href = redirectUrl;
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5">
      <Link href="/">
        <div className="flex items-center gap-x-2">
          <Image src="/logo.svg" alt="logo" height={40} width={40} />
          <span className={cn("font-semibold text-2xl", font.className)}>
            Miro
          </span>
          {isSubscribed && <Badge variant="secondary">PRO</Badge>}
        </div>
      </Link>
      <OrganizationSwitcher
        hidePersonal
        appearance={ORGANIZATION_SWITCHER_APPEARANCE}
      />
      <div className="space-y-1 w-full">
        <Button
          variant={favorites ? "ghost" : "secondary"}
          asChild
          size="lg"
          className="font-normal justify-start px-2 w-full"
        >
          <Link href="/">
            <LayoutDashboard className="size-4 mr-2" />
            Team boards
          </Link>
        </Button>

        <Button
          variant={favorites ? "secondary" : "ghost"}
          asChild
          size="lg"
          className="font-normal justify-start px-2 w-full"
        >
          <Link
            href={{
              pathname: "/",
              query: { favorites: true },
            }}
          >
            <Star className="size-4 mr-2" />
            Favorite boards
          </Link>
        </Button>

        <Button
          variant="ghost"
          size="lg"
          className="font-normal justify-start px-2 w-full"
          onClick={onClick}
          disabled={pending}
        >
          <Banknote className="size-4 mr-2" />
          {isSubscribed ? "Payment settings" : "Upgrade"}
        </Button>
      </div>
    </div>
  );
};
