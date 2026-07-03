import { db } from "@/lib/db";
import RecipeForm from "@/components/forms/recipeForm";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import SignInButton from "@/components/shared/signInButton";

export default async function NewRecipePage() {
  const session = await getServerSession(authOptions);

  const categories = await db.category.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" }
  });

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-6">
        <div className="bg-white p-10 md:p-16 rounded-[2.5rem] shadow-sm border border-slate-100 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">👋</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4">Hello, Chef!</h2>
          <p className="text-slate-500 mb-8">Please sign in to share your delicious recipes with our community.</p>
          <SignInButton />
        </div>
      </div>
    );
  }

  return <RecipeForm categories={categories} />;
}