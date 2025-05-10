import { Canvas } from "./_components/canvas";

type BoardIdPageProps = {
  params: {
    boardId: string;
  };
};

const BoardIdPage = ({ params }: BoardIdPageProps) => {
  const { boardId } = params;

  return <Canvas boardId={boardId} />;
};

export default BoardIdPage;
