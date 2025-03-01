import Image from "next/image";

export const EmptySearch = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/empty-search.jpg" alt="Empty" width={360} height={360} />
      <h2 className="text-2xl font-semibold mt-6">No results found!</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Try searching for something else.
      </p>
    </div>
  );
};
