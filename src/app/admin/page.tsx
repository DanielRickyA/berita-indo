"use client";
import DeleteDialog from "@/components/delete-dialog";
import PaginationTable from "@/components/pagination-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import UploadImageDialog from "@/components/upload-image-dialog";
import {
  ArticleModelResponse,
  createArticle,
  CreateArticleRequest,
  deleteArticle,
  getArticleAdmin,
  GetArticlesParams,
  updateArticle,
  uploadImage,
} from "@/lib/api/apiArticle";
import { CategoryModelResponse, getCategories } from "@/lib/api/apiCategory";
import { CirclePlus, EllipsisVertical, Loader, Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function Page() {
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [uploadDialogOpen, setuploadDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formState, setFormState] = useState<CreateArticleRequest>({
    title: "",
    categoryId: "all",
    content: "",
  });

  const [articles, setArticles] = useState<ArticleModelResponse[]>([]);
  const [categories, setCategories] = useState<CategoryModelResponse[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const fetchArticle = async (params: GetArticlesParams) => {
    try {
      setIsLoading(true);
      const res = await getArticleAdmin(params);
      if (res.data) {
        setArticles(res.data);
        setTotal(res.total ?? 0);
      }
    } catch (err) {
      console.error("Gagal ambil kategori:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const res = await getCategories();
      if (res.data) {
        setCategories(res.data);
      }
    } catch (err) {
      console.error("Gagal ambil kategori:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticle({ page, limit, title: search });
  }, [page, search]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryInputChange = (value: string) => {
    setFormState((prev) => ({
      ...prev,
      categoryId: value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    fetchArticle({
      page,
      limit,
      title: search,
      category: value !== "all" ? value : undefined,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formState.categoryId == "all") {
      toast.error("Please select the category!");
    }

    try {
      setIsLoading(true);

      if (selectedId) {
        await updateArticle({ id: selectedId, ...formState });
        toast.success("Article has been updated successfully.");
      } else {
        await createArticle(formState);
        toast.success("Article has been created successfully.");
      }

      setOpen(false);
      setSelectedId(null);
      setFormState({ title: "", content: "", categoryId: "all" });

      const params: GetArticlesParams = { page, limit, title: search };
      if (selectedCategory !== "all") {
        params.category = selectedCategory;
      }

      await fetchArticle(params);
    } catch (error) {
      console.error("Failed to save article:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setIsLoading(true);
      await deleteArticle(deleteId);
      toast.success("Article has been deleted successfully.");

      setDeleteDialogOpen(false);
      setDeleteId(null);

      const params: GetArticlesParams = { page, limit, title: search };
      if (selectedCategory !== "all") {
        params.category = selectedCategory;
      }

      await fetchArticle(params);
    } catch (error) {
      console.error("Failed to delete article:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadImage = async (file: File, articleId: string) => {
    try {
      setIsLoading(true);

      // Upload file ke server
      const res = await uploadImage(file);

      // Update artikel dengan image baru
      await updateArticle({ id: articleId, imageUrl: res.imageUrl });

      toast.success("Image uploaded successfully.");

      // Refresh tabel
      const params: GetArticlesParams = { page, limit, title: search };
      if (selectedCategory !== "all") {
        params.category = selectedCategory;
      }
      await fetchArticle(params);
    } catch (error) {
      console.error("Failed to upload image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <h1 className="text-2xl font-bold text-left mb-2 md:mb-0">
          Article List
        </h1>
        <Dialog
          open={open}
          onOpenChange={(value) => {
            if (!value) setSelectedId(null);
            setOpen(value);
          }}
        >
          <DialogTrigger asChild>
            <Button
              className="w-full md:w-auto"
              onClick={() =>
                setFormState({ title: "", categoryId: "all", content: "" })
              }
            >
              <CirclePlus /> Add New Article
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {selectedId ? "Edit Article" : "Add New Article"}
              </DialogTitle>
            </DialogHeader>
            {isLoading ? (
              <Loader className="animate-spin m-auto" />
            ) : (
              <form className="mt-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6 mb-4">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Title</Label>
                    <Input
                      id="title"
                      type="text"
                      name="title"
                      value={formState.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">Content</Label>
                    <Select
                      value={formState.categoryId}
                      onValueChange={handleCategoryInputChange}
                    >
                      <SelectTrigger className="w-full bg-white !text-black/80">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Select Categories</SelectItem>
                        {categories
                          .filter((category) => category.id)
                          .map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">Content</Label>
                    <Textarea
                      id="content"
                      name="content"
                      value={formState.content}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button disabled={isLoading} type="submit">
                    {isLoading && <Loader2 className="animate-spin" />} Simpan
                  </Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>
        <DeleteDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          title="Delete Category"
          description="Are you sure you want to delete this category? This action cannot be undone."
          isLoading={isLoading}
          onConfirm={handleDelete}
        />
        <UploadImageDialog
          open={uploadDialogOpen}
          onOpenChange={setuploadDialogOpen}
          isLoading={isLoading}
          articleId={selectedArticleId}
          onUploadImage={handleUploadImage}
        />
      </div>
      <Card className="mt-4">
        <CardContent>
          <p className="font-medium">Total Articles : {total}</p>
          <Separator className="my-4" />
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-[20%]">
              <Select
                value={selectedCategory}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="w-full bg-white !text-black/80">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Select Categories</SelectItem>
                  {categories
                    .filter((category) => category.id)
                    .map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-[30%]">
              <Input
                type="text"
                placeholder="Search article title"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white !text-black/80"
              />
            </div>
          </div>
          <Separator className="my-4" />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Thumbnail</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Content</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    Tidak ada data
                  </TableCell>
                </TableRow>
              ) : (
                articles.map((articles) => (
                  <TableRow key={articles.id}>
                    <TableCell>
                      <div className="relative p-0 aspect-video w-[250px]">
                        <Image
                          src={
                            articles?.imageUrl ||
                            "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500"
                          }
                          alt="Background"
                          fill
                          priority
                          className="object-cover rounded-lg w-full h-full"
                        />
                      </div>
                    </TableCell>
                    <TableCell>{articles.title}</TableCell>
                    <TableCell>{articles.category.name}</TableCell>
                    <TableCell className="max-w-[400px] break-words overflow-hidden whitespace-normal">
                      {articles.content}
                    </TableCell>
                    <TableCell className="text-right ">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <EllipsisVertical className="font-normal cursor-pointer" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedId(articles.id);
                              setFormState({
                                title: articles.title,
                                content: articles.content,
                                categoryId: articles.categoryId,
                              });
                              setOpen(true);
                            }}
                          >
                            Update
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setDeleteId(articles.id);
                              setDeleteDialogOpen(true);
                            }}
                          >
                            Delete
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedArticleId(articles.id);
                              setuploadDialogOpen(true);
                            }}
                          >
                            Upload Image
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5}>
                  <PaginationTable
                    page={page}
                    limit={limit}
                    total={total}
                    onPageChange={setPage}
                  />
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;
