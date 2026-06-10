import { ThemeProvider } from "@/components/theme-provider";
import { AppHeader } from "./components/common";
import { AppSidebar } from "./components/common/AppSidebar";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="page">
        <AppHeader />
        <div className="container">
          <main className="w-full h-full min-h-180 flex p-6 gap-6">
            <AppSidebar />
            <section className="flex-1 flex flex-col gap-12"></section>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
