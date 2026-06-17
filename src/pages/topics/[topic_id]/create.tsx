import { useState } from "react";
import { AppEditor, AppFileUpload } from "@/components/common";
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { TOPIC_CATEGORY } from "@/constants/category.constant";
import {
  ArrowLeft,
  Asterisk,
  BookOpenCheck,
  ImageOff,
  Save,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/stores";
import { useNavigate, useParams } from "react-router";
import type { Block } from "@blocknote/core";
import { nanoid } from "nanoid";

export default function CreateTopic() {
  const user = useAuthStore((state) => state.user);
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<Block[]>([]);
  const [category, setCategory] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<File | string | null>(null);

  const handleSave = async () => {
    if (!title && !content && !category && !thumbnail) {
      toast.warning("제목, 본문, 카테고리, 썸네일을 기입하세요.");
      return;
    }

    // 파일 업로드 시,
    // 1. Supabase의 Storage(bucket)에 이미지를 먼저 업로드 한 후
    // 2. 이미지가 저장된 bucket 폴더의 경로 URL 주소를 Topic 테이블 thumbnail 컬럼에 문자열 형태로 저장

    let thumbnailUrl: string | null = null;

    if (thumbnail && thumbnail instanceof File) {
      // 썸네일 이미지를 storage에 업로드
      const fileExt = thumbnail.name.split(".").pop();
      const fileName = `${nanoid()}.${fileExt}`;
      const filePath = `topics/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("files")
        .upload(filePath, thumbnail);
      if (uploadError) {
        throw uploadError;
      }

      // 업로드된 이미지의 Public URL 값 가져오기
      const { data } = supabase.storage.from("files").getPublicUrl(filePath);

      if (!data) throw new Error("썸네일 Public URL 조회를 실패하였습니다.");
      thumbnailUrl = data.publicUrl;
    } else if (typeof thumbnail === "string") {
      // 기존 이미지 유지
      thumbnailUrl = thumbnail;
    }

    const { data, error } = await supabase
      .from("topic")
      .update([
        {
          title,
          content: JSON.stringify(content),
          category,
          thumbnail: thumbnailUrl,
          author: user.id,
        },
      ])
      .eq("id", topicId)
      .select();
    if (data) {
      toast.success("작성 중인 토픽을 저장하였습니다.");
      navigate(`/topics/${data[0].id}/create`);
    }
    if (error) {
      toast.error(error.message);
      return;
    }
  };
  const handlePublish = async () => {
    if (!title || !content || !category || !thumbnail) {
      toast.warning("제목, 본문, 카테고리, 썸네일은 필수값입니다.");
      return;
    }
  };

  return (
    <main className="w-full h-full min-h-256 flex gap-6 p-6">
      <div className="fixed right-1/2 bottom-10 translate-x-1/2 z-20 flex items-center gap-2">
        <Button variant={"outline"} size={"icon"}>
          <ArrowLeft />
        </Button>
        <Button variant={"outline"} size={"icon"}>
          <ArrowLeft />
        </Button>
        <Button
          type="button"
          onClick={handleSave}
          variant={"outline"}
          className="w-22 bg-yellow-800/50!"
        >
          <Save />
          저장
        </Button>
        <Button
          type="button"
          onClick={handlePublish}
          variant={"outline"}
          className="w-22 bg-emerald-800/50!"
        >
          <BookOpenCheck />
          발행
        </Button>
      </div>
      <section className="w-3/4 h-full flex flex-col gap-6">
        <div className="flex flex-col pb-6 border-b">
          <span className="text-[#F96859] font-semibold">Step 01</span>
          <span className="text-base font-semibold">토픽 작성하기</span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <Asterisk size={14} className="text-[#F96859]" />
            <Label className="text-muted-foreground">제목</Label>
          </div>
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="토픽 제목을 입력하세요."
            className="h-16 pl-6 text-lg! placeholder:text-lg placeholder:font-semibold border-0"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <Asterisk size={14} className="text-[#F96859]" />
            <Label className="text-muted-foreground">본문</Label>
          </div>
          <AppEditor setContent={setContent} />
        </div>
      </section>
      <section className="w-1/4 h-full flex flex-col gap-6">
        <div className="flex flex-col pb-6 border-b">
          <span className="text-[#F96859] font-semibold">Step 02</span>
          <span className="text-base font-semibold">
            카테고리 및 썸네일 등록
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <Asterisk size={14} className="text-[#F96859]" />
            <Label className="text-muted-foreground">카테고리</Label>
          </div>
          <Select
            value={category}
            onValueChange={(value) => setCategory(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="토픽(주제) 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>카테고리(주제)</SelectLabel>
                {TOPIC_CATEGORY.map((item) => {
                  return (
                    <SelectItem key={item.id} value={item.category}>
                      {item.label}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <Asterisk size={14} className="text-[#F96859]" />
            <Label className="text-muted-foreground">썸네일</Label>
          </div>
          <AppFileUpload file={thumbnail} onChange={setThumbnail} />
          <Button
            variant={"outline"}
            className="border-0"
            onClick={() => setThumbnail(null)}
          >
            <ImageOff />
            썸네일 제거
          </Button>
        </div>
      </section>
    </main>
  );
}
