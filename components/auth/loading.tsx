import Image from "next/image";

export const Loading = () => (
  <div className="h-full w-full flex flex-col justify-center items-center bg-yellow-50">
    <Image
      src="/logo.svg"
      alt="logo"
      width={120}
      height={120}
      className="animate-pulse duration-700"
    />
  </div>
);
