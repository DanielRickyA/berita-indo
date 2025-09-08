import { Badge } from "@/components/ui/badge";
import { getArticle, getArticles } from "@/lib/api/apiArticle";
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
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface PageProps {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

async function Page({ params }: PageProps) {
  const { id } = params;

  const article = await getArticle(id);

  const articles = await getArticles({
    category: article.category.id,
    page: 1,
    limit: 3,
  });
  console.log(articles);
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
      <p className="text-black mt-4 font-semibold text-xl">Berita Lainnnya</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles?.data
          ?.filter((item) => item.id !== article.id) // buang artikel utama
          .map((item) => (
            <Link href={`/${item.id}`} key={item.id}>
              <Card className="bg-transparent border-none shadow-none w-full p-0 pt-4 gap-2">
                <CardHeader className="relative p-0 aspect-video">
                  <Image
                    src={item.imageUrl}
                    alt="Background"
                    fill
                    priority
                    className="object-cover rounded-lg w-full h-full border"
                  />
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-sm mt-1 text-gray-500">
                    {formatDate(item.createdAt)}
                  </p>
                  <p
                    className="mt-2 font-semibold text-lg custom-line-clamp-2"
                    title={item.title}
                  >
                    {item.title}
                  </p>
                  <p className="mt-2 text-black/70 custom-line-clamp-3">
                    {item.content}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-4">
                    <Badge className="rounded-full bg-[#acd0f8] text-[#1f3c8b]">
                      {item.category.name}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}

        {articles?.data?.filter((item) => item.id !== article.id).length ===
          0 && (
          <p className="col-span-full mt-6 text-left text-2xl text-gray-500">
            Tidak ada berita lainnya.
          </p>
        )}
      </div>
    </div>
  );
}

export default Page;
