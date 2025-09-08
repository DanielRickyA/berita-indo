"use client";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  CategoryModelResponse,
  createCategory,
  CreateCategoryRequest,
  deleteCategory,
  getCategoriesAdmin,
  GetCategoriesParams,
  updateCategory,
} from "@/lib/api/apiCategory";
import { CirclePlus, EllipsisVertical, Loader, Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useEffect, useState } from "react";
import PaginationTable from "@/components/pagination-table";
import DeleteDialog from "@/components/delete-dialog";
import { toast } from "sonner";
function Page() {
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formState, setFormState] = useState<CreateCategoryRequest>({
    name: "",
  });

  const [categories, setCategories] = useState<CategoryModelResponse[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const fetchCategories = async (params: GetCategoriesParams) => {
    try {
      setIsLoading(true);
      const res = await getCategoriesAdmin(params);
      if (res.data) {
        setCategories(res.data);
        setTotal(res.totalData ?? 0); // kalau API balikin total
      }
    } catch (err) {
      console.error("Gagal ambil kategori:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories({ page, limit, search });
  }, [page, search]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      if (selectedId) {
        await updateCategory({ id: selectedId, ...formState });
        toast.success("Category has been updated successfully.");
      } else {
        await createCategory(formState);
        toast.success("Category has been created successfully.");
      }

      setOpen(false);
      setSelectedId(null);
      setFormState({ name: "" });

      await fetchCategories({ page, limit, search });
    } catch (error) {
      console.error("Gagal menyimpan kategori:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setIsLoading(true);
      await deleteCategory(deleteId);
      toast.success("Category has been deleted successfully.");

      setDeleteDialogOpen(false);
      setDeleteId(null);

      await fetchCategories({ page, limit, search });
    } catch (error) {
      console.error("Gagal menghapus kategori:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <h1 className="text-2xl font-bold text-left mb-2 md:mb-0">
          Category List
        </h1>
        <Dialog
          open={open}
          onOpenChange={(value) => {
            if (!value) setSelectedId(null);
            setOpen(value);
          }}
        >
          <DialogTrigger asChild>
            <Button onClick={() => setFormState({ name: "" })}>
              <CirclePlus /> Add New Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {selectedId ? "Edit Category" : "Add New Category"}
              </DialogTitle>
            </DialogHeader>
            {isLoading ? (
              <Loader className="animate-spin m-auto" />
            ) : (
              <form className="mt-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6 mb-4">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Category Name</Label>
                    <Input
                      id="name"
                      type="text"
                      name="name"
                      value={formState.name}
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
      </div>
      <Card className="mt-4">
        <CardContent>
          <p className="font-medium">Total Categories: {total}</p>
          <Separator className="my-4" />
          <div className="flex">
            <div className="w-full md:w-[30%]">
              <Input
                type="text"
                placeholder="Search category name"
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
                <TableHead>Category Name</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={2} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} className="text-center">
                    Tidak ada data
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>{category.name}</TableCell>
                    <TableCell className="text-right ">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <EllipsisVertical className="font-normal cursor-pointer" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedId(category.id);
                              setFormState(category);
                              setOpen(true);
                            }}
                          >
                            Update
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setDeleteId(category.id);
                              setDeleteDialogOpen(true);
                            }}
                          >
                            Delete
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
                <TableCell colSpan={2}>
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
