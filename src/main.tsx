import { ThemeProvider } from "@/components/theme-provider";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./pages/index.tsx";
import SignUp from "./pages/sign-up";
import SignIn from "./pages/sign-in";
import CreateTopic from "./pages/topics/[topic_id]/create.tsx";
import RootLayout from "./pages/layout.tsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<App />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/topics/:topicId/create" element={<CreateTopic />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster richColors position="top-center" />
    </ThemeProvider>
  </StrictMode>,
);
