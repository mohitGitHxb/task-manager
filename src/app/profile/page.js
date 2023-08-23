async function loadingTime() {
  await new Promise((resolve, reject) => {
    setTimeout(resolve, 4050);
  });
}
const page = async () => {
  await loadingTime();
  return (
    <div>
      <h1 className="text-5xl text-white">This is a profile route</h1>
    </div>
  );
};

export default page;
