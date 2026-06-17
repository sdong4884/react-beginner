import { useNavigate } from "react-router";
import { AppSidebar } from "../components/common";
import { SkeletonHotTopic, SkeletonNewTopic } from "../components/skeleton";
import { Button } from "../components/ui";
import { PencilLine } from "lucide-react";

function App() {
  const navigate = useNavigate();

  return (
    <main className="w-full h-full min-h-180 flex p-6 gap-6">
      <div className="fixed right-1/2 bottom-10 translate-x-1/2 z-20 items-center">
        <Button
          variant={"destructive"}
          className="py-5! px-6! rounded-full"
          onClick={() => navigate("/topics/create")}
        >
          <PencilLine />
          나만의 토픽 작성
        </Button>
      </div>
      <AppSidebar />
      <section className="flex-1 flex flex-col gap-12">
        {/* HOT TOPIC */}
        <div className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <img src="/assets/gif/gif-001.gif" alt="" className="w-7 h-7" />
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                HOT 토픽
              </h4>
            </div>
            <p className="text-muted-foreground md:text-base">
              지금 가장 주목받는 주제들을 살펴보고, 다양한 관점의 인사이트를
              얻어보세요.
            </p>
          </div>
          <div className="grid grid-cols-4 gap-6">
            <SkeletonHotTopic />
            <SkeletonHotTopic />
            <SkeletonHotTopic />
            <SkeletonHotTopic />
          </div>
        </div>
        {/* NEW TOPIC */}
        <div className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <img src="/assets/gif/gif-002.gif" alt="" className="w-7 h-7" />
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                NEW 토픽
              </h4>
            </div>
            <p className="text-muted-foreground md:text-base">
              새로운 시선으로, 새로운 이야기를 시작하세요. 지금 바로 당신만의
              토픽을 작성해보세요.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <SkeletonNewTopic />
            <SkeletonNewTopic />
            <SkeletonNewTopic />
            <SkeletonNewTopic />
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
