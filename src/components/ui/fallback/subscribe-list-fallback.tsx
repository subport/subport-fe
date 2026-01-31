function SubscribeListFallback() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="bg-box-black flex w-full animate-pulse cursor-pointer items-center justify-between rounded-xl p-4 transition-colors"
        >
          <div className="flex items-center gap-2">
            <div className="size-10 rounded-lg object-contain" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default SubscribeListFallback;
