import {
  Badge,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Separator,
} from "@/components/ui";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/stores";
import { TOPIC_STATUS, type Topic } from "@/types/topic.type";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import dayjs from "dayjs";

interface Props {
  children: React.ReactNode; // 부모 컴포넌트에서 <AppDraftsDialog> 태그 안에 작성한 내용 전달
}

export function AppDraftsDialog({ children }: Props) {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const [drafts, setDrafts] = useState([]);

  const fetchDrafts = async () => {
    try {
      const { data: topics, error } = await supabase
        .from("topic")
        .select("*")
        .eq("author", user.id)
        .eq("status", TOPIC_STATUS.TEMP);

      if (topics) {
        setDrafts(topics);
      }
      if (error) {
        toast.error(error.message);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDrafts();
    }
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>임시 저장된 토픽</DialogTitle>
          <DialogDescription>
            임시 저장된 토픽 목록입니다. 이어서 작성하거나 삭제할 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 py-4">
          <div className="flex items-center gap-2">
            <p>임시 저장</p>
            <p className="text-base text-green-600 -mr-1.5">{drafts.length}</p>
            <p>건</p>
          </div>
          <Separator />
          {drafts.length > 0 ? (
            <div className="min-h-60 h-60 flex flex-col items-center justify-start gap-3 overflow-y-scroll">
              {drafts.map((draft: Topic, index: number) => {
                return (
                  <div
                    key={index}
                    className="w-full flex items-center justify-between py-2 px-4 gap-3 rounded-md bg-card/50 cursor-pointer"
                    onClick={() => navigate(`/topics/${draft.id}/create`)}
                  >
                    <div className="flex items-start gap-2">
                      <Badge className="w-5 h-5 mt-0.75 rounded-sm aspect-square text-foreground bg-[#E26F24] hover:bg-[#E26F24]">
                        {index + 1}
                      </Badge>
                      <div className="flex flex-col">
                        <p className="line-clamp-1">{draft.title}</p>
                        <p className="text-xs text-muted-foreground">
                          작성일:{" "}
                          {dayjs(draft.created_at).format("YYYY. MM. DD")}
                        </p>
                      </div>
                    </div>
                    <Badge variant={"outline"}>작성중</Badge>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="min-h-60 flex items-center justify-center">
              <p className="text-muted-foreground/50">
                조회 가능한 정보가 없습니다.
              </p>
            </div>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant={"outline"} className="border-0">
              닫기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
