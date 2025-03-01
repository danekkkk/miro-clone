import Image from "next/image";

export const EmptyFavorites = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image
        src="/empty-favorites.png"
        alt="Empty"
        width={240}
        height={240}
        className="opacity-20"
      />
      <h2 className="text-2xl font-semibold mt-12">No favorite boards!</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Try favoriting a board.
      </p>
    </div>
  );
};
