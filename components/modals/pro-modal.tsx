"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { useProModal } from "@/store/use-pro-modal";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { useOrganization } from "@clerk/nextjs";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const ProModal = () => {
  const { isOpen, onClose } = useProModal();
  const [pending, setPending] = useState<boolean>(false);

  const { organization } = useOrganization();
  const pay = useAction(api.stripe.pay);

  const onClick = async () => {
    if (!organization?.id) return;

    setPending(true);

    try {
      const redirectUrl = await pay({ orgId: organization.id });

      window.location.href = redirectUrl;
    } finally {
      setPending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[340px] p-0 overflow-hidden">
        <div className="aspect-video relative flex items-center justify-center">
          <Image src="/pro.svg" alt="Pro image" className="object-fit" fill />
        </div>

        <div
          className={cn(
            "text-neutral-700 mx-auto space-y-6 p-6",
            font.className
          )}
        >
          <h2 className="font-medium text-lg">🚀 Upgrade to Pro today!</h2>
          <div className="pl-3">
            <ul className="text-[11px] space-y-1 list-disc">
              <li>Unlimited boards</li>
              <li>Unlimited organizations</li>
              <li>Unlimited members</li>
              <li>and much more!</li>
            </ul>
          </div>

          <Button
            size="sm"
            className="w-full"
            disabled={pending}
            onClick={onClick}
          >
            {pending ? "Loading..." : "Upgrade to pro"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
