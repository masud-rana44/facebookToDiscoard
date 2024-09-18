import GroupList from "./GroupList";
import BotStatus from "./BotStatus";

function App() {
  return (
    <div className="min-h-[800px] bg-gray-800 rounded-2xl p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white">
          Facebook to Discord Bot Manager
        </h1>
      </header>
      <main className="flex flex-col items-center space-y-8">
        <GroupList />
        <BotStatus />
      </main>
    </div>
  );
}

export default App;
