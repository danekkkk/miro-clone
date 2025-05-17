import { BoardIdPageClient } from "./_components/board-id-page-client";

type Props = {
  params: Promise<{
    boardId: string;
  }>;
};

const BoardIdPage = async ({ params }: Props) => {
  const { boardId } = await params;

  return <BoardIdPageClient boardId={boardId} />;
};

export default BoardIdPage;
