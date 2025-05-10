"use client";

import { useOrganization } from "@clerk/nextjs";
import { EmptyOrg } from "./empty-org";
import { BoardList } from "./board-list";

type DashboardClientProps = {
  searchParams: {
    search?: string;
    favorites?: string;
  };
};

export const DashboardClient = ({ searchParams }: DashboardClientProps) => {
  const { organization } = useOrganization();

  return (
    <div className="flex-1 h-[calc(100%-80px)] p-6">
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList orgId={organization.id} query={searchParams} />
      )}
    </div>
  );
}; 