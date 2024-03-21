export default function Form1() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div>
        <h1 className="text-4xl font-bold mb-4">PWA Offline Example</h1>
        <p className="text-lg">PWA Offline Example with VITE + React.</p>
      </div>
      <div className="flex flex-col my-4 self-start">
        <h1 className="text-4xl">Forms</h1>
        <ul className="flex flex-col my-4" style={{ listStyleType: "none" }}>
          <li className=" hover:text-gray-400 cursor-pointer" key="firstform">
            <a href="/forms/firstform"> First Form </a>
          </li>
          <li className=" hover:text-gray-400 cursor-pointer" key="secondform">
            <a href="/forms/secondform">Second Form</a>
          </li>
        </ul>
      </div>
    </main>
  );
}
