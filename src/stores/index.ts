import { supabase } from "@/lib/supabase";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// const useStore = create((set) => ({
//   bears: 0,
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
//   updateBears: (newBears) => set({ bears: newBears }),
// }));

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthStore {
  user: User;
  setUser: (newUser: User) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (newUser: User) => set({ user: newUser }),

      // 로그아웃 (상태 + Supabase 세션 모두 제거)
      reset: async () => {
        await supabase.auth.signOut();
        set({ user: null }); // Zustand 상태 초기화
        localStorage.removeItem("auth-storage");
      },
    }),
    { name: "auth-storage" },
  ),
);
