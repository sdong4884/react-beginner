import { NavLink, useNavigate } from "react-router";
import { Separator } from "../ui";
import { useAuthStore } from "@/stores";

function AppHeader() {
  const navigate = useNavigate();

  const email = useAuthStore((state) => state.email);
  const reset = useAuthStore((state) => state.reset);

  return (
    <header className="fixed top-0 z-10 w-full flex items-center justify-center bg-[#121212]">
      <div className="w-full max-w-332 flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-5">
          <img
            src=""
            alt=""
            className="w-6 h-6 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <div className="flex items-center gap-5">
            <div className="font-semibold cursor-pointer">토픽 인사이트</div>
            <Separator orientation="vertical" className="\!h-4" />
            <div className="font-semibold cursor-pointer">포트폴리오</div>
          </div>
        </div>
        {email ? (
          <div className="flex items-center gap-5">
            <span>{email}</span>
            <Separator orientation="vertical" className="h-4!" />
            <span onClick={reset}>로그아웃</span>
          </div>
        ) : (
          <NavLink to={"/sign-in"}>로그인</NavLink>
        )}
      </div>
    </header>
  );
}

export { AppHeader };
