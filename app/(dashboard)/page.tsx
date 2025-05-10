import { DashboardClient } from "./_components/dashboard-client";

type DashboardPageProps = {
  searchParams: {
    search?: string;
    favorites?: string;
  };
};

const DashboardPage = ({ searchParams }: DashboardPageProps) => {
  return (
    <DashboardClient 
      search={searchParams.search} 
      favorites={searchParams.favorites} 
    />
  );
};

export default DashboardPage;
