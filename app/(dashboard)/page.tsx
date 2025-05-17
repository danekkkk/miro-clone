import { DashboardClient } from "./_components/dashboard-client";

type Props = {
  searchParams: Promise<{
    search?: string;
    favorites?: string;
  }>;
};

const DashboardPage = async ({ searchParams }: Props) => {
  const params = await searchParams;

  return (
    <DashboardClient search={params.search} favorites={params.favorites} />
  );
};

export default DashboardPage;
