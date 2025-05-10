import { DashboardClient } from "./_components/dashboard-client";

type DashboardPageProps = {
  searchParams: {
    search?: string;
    favorites?: string;
  };
};

const DashboardPage = ({ searchParams }: DashboardPageProps) => {
  return <DashboardClient searchParams={searchParams} />;
};

export default DashboardPage;
