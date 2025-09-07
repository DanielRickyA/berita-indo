import { Badge } from "@/components/ui/badge";
import { getArticle } from "@/lib/api/apiArticle";
import { formatDate } from "@/lib/utils";
import Image from "next/image";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";

interface DetailArticleProps {
  params: { id: string };
}

async function Page({ params }: DetailArticleProps) {
  const { id } = params;

  const article = await getArticle(id);
  console.log(article);
  return (
    <div className="max-w-7xl  mx-auto px-4 md:px-6 py-22 ">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="flex gap-2 items-center">
              <Home size={16} />
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{article?.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <p className="text-4xl font-semibold mt-4">{article?.title}</p>
      <p className="text-lg mt-4 text-gray-500">
        Creator :{" "}
        <span className="font-semibold text-black">
          {article?.user.username}
        </span>
      </p>

      <div className="aspect-video px-4 relative mt-2">
        <Image
          src={article?.imageUrl ?? ""}
          alt="Background"
          fill
          priority
          className="object-cover rounded-lg w-full h-full "
        />
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center gap-2">
          <p>Category : </p>
          <Badge className="rounded-full bg-[#acd0f8] text-[#1f3c8b]">
            {article?.category.name}
          </Badge>
        </div>
        <p className="text-sm mt-1 text-gray-500">
          Created At :{" "}
          <span className="font-semibold text-black">
            {formatDate(article?.createdAt)}
          </span>
        </p>
      </div>
      <p className="text-justify mt-4">{article?.content}</p>
    </div>
  );
}

export default Page;
