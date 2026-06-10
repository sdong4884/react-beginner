import { ThemeProvider } from "@/components/theme-provider";
import { AppHeader } from "./components/common";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="page">
        <AppHeader />
        <div className="container"></div>
      </div>
    </ThemeProvider>
  );
}

export default App;
