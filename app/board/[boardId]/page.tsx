import { BoardIdPageClient } from "./_components/board-id-page-client";

type BoardIdPageProps = {
  params: {
    boardId: string;
  };
};

const BoardIdPage = ({ params }: BoardIdPageProps) => {
  return <BoardIdPageClient boardId={params.boardId} />;
};

export default BoardIdPage;
