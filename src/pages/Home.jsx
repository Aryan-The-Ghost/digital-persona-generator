export default function Home() {
  return (
    <div className="text-white flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Digital Persona Generator</h1>

      <a
        href="/wizard"
        className="mt-6 px-6 py-3 bg-blue-500 rounded-lg font-semibold"
      >
        Start Wizard
      </a>
    </div>
  );
}
