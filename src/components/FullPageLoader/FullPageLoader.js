function FullPageLoader() {
  return (
    <div className="grid h-screen place-items-center">
      <div>
        <span className="loading loading-dots loading-lg "></span>
      </div>
      <span class="sr-only">Loading...</span>
    </div>
  );
}

export default FullPageLoader;
