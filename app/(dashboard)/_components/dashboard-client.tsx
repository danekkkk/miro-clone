"use client";

import { useOrganization } from "@clerk/nextjs";
import { EmptyOrg } from "./empty-org";
import { BoardList } from "./board-list";

type DashboardClientProps = {
  search?: string;
  favorites?: string;
};

export const DashboardClient = ({
  search,
  favorites,
}: DashboardClientProps) => {
  const { organization, isLoaded } = useOrganization();

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="flex-1 h-[calc(100%-80px)] p-6">
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList
          orgId={organization.id}
          search={search}
          favorites={favorites}
        />
      )}
    </div>
  );
};
