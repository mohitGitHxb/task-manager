async function loadingTime() {
  await new Promise((resolve, reject) => {
    setTimeout(resolve, 4050);
  });
}
export default async function About() {
  await loadingTime();
  return (
    <div className="min-w-[333px] bg-slate-700">
      <h1 contentEditable className="text-white text-justify text-3xl">
        This is editalble lol
      </h1>
    </div>
  );
}
