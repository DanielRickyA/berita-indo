import Image from "next/image";
import { getCategories } from "@/lib/api/apiCategory";
import { CategoryModelResponse } from "@/lib/api/apiCategory";
import SearchAndFilter from "@/components/search-and-filter";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getArticles } from "@/lib/api/apiArticle";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface HomeProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

async function Home({ searchParams }: HomeProps) {
  const category =
    typeof searchParams.category === "string" ? searchParams.category : "";
  const search =
    typeof searchParams.search === "string" ? searchParams.search : "";
  const page =
    typeof searchParams.page === "string" ? parseInt(searchParams.page, 10) : 1;

  let categories: CategoryModelResponse[] = [];
  try {
    const res = await getCategories();
    categories = res.data || [];
  } catch (err) {
    console.error("Failed to fetch categories:", err);
  }

  const articles = await getArticles({
    category,
    title: search,
    page,
    limit: 9,
  });

  const totalPages = Math.ceil(articles.total / 9);

  console.log("Fetched articles:", articles);
  return (
    <div className="relative pb-8">
      <div className="relative w-full h-[50dvh]">
        <Image
          src="/bg.jpg"
          alt="Background"
          fill
          priority
          className="object-cover z-10"
        />
        <div className="absolute inset-0 bg-[#2563EC] opacity-85 z-20"></div>
        <div className="absolute inset-0 flex items-center justify-center z-30">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <p className="font-semibold text-white text-4xl text-center">
              BeritaIndo: Headlines, Articles, Insights, and Stories Worldwide
            </p>
            <p className="mt-4 text-center text-white/90 font-light">
              Your trusted source for news and fresh perspectives
            </p>

            <SearchAndFilter categories={categories} />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6">
        <div className="flex justify-between items-center">
          <p>
            Showing: {articles!.data!.length * articles.page} of{" "}
            {articles.total} article
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles?.data?.map((item) => (
            <Link href={`/${item.id}`} key={item.id}>
              <Card className="bg-transparent border-none shadow-none w-full p-0 pt-4 gap-2">
                <CardHeader className="relative p-0 aspect-video">
                  <Image
                    src={
                      item?.imageUrl ||
                      "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500"
                    }
                    alt="Background"
                    fill
                    priority
                    className="object-cover rounded-lg w-full h-full "
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
        </div>
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-8">
            <Pagination>
              <PaginationContent>
                {/* Previous */}
                <PaginationItem>
                  <PaginationPrevious
                    href={page > 1 ? `/?page=${page - 1}` : undefined}
                    className={
                      page === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                {/* Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <PaginationItem key={p}>
                      <PaginationLink
                        href={`/?page=${p}`}
                        isActive={p === page}
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

                {/* Next */}
                <PaginationItem>
                  <PaginationNext
                    href={page < totalPages ? `/?page=${page + 1}` : undefined}
                    className={
                      page === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
