"use client";

import {
  OrganizationSwitcher,
  UserButton,
  useOrganization,
} from "@clerk/nextjs";

import { SearchInput } from "./search-input";
import { InviteButton } from "./invite-button";
import { ORGANIZATION_SWITCHER_APPEARANCE } from "@/constants/organization-switcher-appearance";

export const Navbar = () => {
  const { organization } = useOrganization();

  return (
    <nav className="flex items-center gap-x-4 p-5">
      <div className="hidden lg:flex lg:flex-1">
        <SearchInput />
      </div>
      <div className="block lg:hidden flex-1">
        <OrganizationSwitcher
          hidePersonal
          appearance={ORGANIZATION_SWITCHER_APPEARANCE}
        />
      </div>
      {organization && <InviteButton />}
      <UserButton />
    </nav>
  );
};
