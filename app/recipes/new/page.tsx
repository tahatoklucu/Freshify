"use client";

import { useState } from "react";
import { Plus, Trash2, Image as ImageIcon, Sparkles } from "lucide-react";

export default function ShareRecipePage() {
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);

  return (
    <main className="min-h-screen bg-[#F8FAFC] py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-black text-slate-900 tracking-tight">
            Share your masterpiece
          </h1>
          <p className="text-slate-500 text-lg mt-3">
            Every great recipe has a story. Tell yours.
          </p>
        </div>

        <form className="space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border-2 border-dashed border-slate-200 hover:border-orange-500 transition-colors text-center group cursor-pointer">
            <input type="file" id="image" className="hidden" />
            <label htmlFor="image" className="cursor-pointer">
              <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <ImageIcon size={28} />
              </div>
              <span className="font-bold text-slate-900">
                Upload recipe cover image
              </span>
              <p className="text-sm text-slate-400 mt-1">PNG, JPG up to 5MB</p>
            </label>
          </div>
          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
            <input
              type="text"
              placeholder="Recipe Title"
              className="w-full text-2xl font-bold bg-transparent border-b border-slate-200 pb-2 outline-none focus:border-orange-500"
            />
            <textarea
              placeholder="Describe your creation..."
              rows={3}
              className="w-full bg-slate-50 p-6 rounded-2xl border-none outline-none focus:ring-2 focus:ring-orange-500/20 resize-none"
            ></textarea>
            <div className="pt-6">
              <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-500" /> Ingredients
              </h3>
              {ingredients.map((ing, i) => (
                <div key={i} className="flex gap-3 mb-3">
                  <input
                    value={ing}
                    className="w-full p-4 rounded-2xl bg-slate-50 outline-none focus:ring-2 focus:ring-orange-500/20"
                    placeholder={`E.g. 500g Flour`}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setIngredients(ingredients.filter((_, idx) => idx !== i))
                    }
                    className="text-slate-300 hover:text-red-500"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setIngredients([...ingredients, ""])}
                className="text-sm font-bold text-orange-600 hover:underline"
              >
                {" "}
                + Add Ingredient
              </button>
            </div>

            <div className="pt-6">
              <h3 className="text-lg font-black text-slate-900 mb-4">
                Cooking Steps
              </h3>
              {instructions.map((ins, i) => (
                <div key={i} className="flex gap-4 mb-4">
                  <div className="w-12 h-12 flex-shrink-0 rounded-full bg-slate-900 text-white font-black flex items-center justify-center text-sm">
                    {i + 1}
                  </div>
                  <textarea
                    value={ins}
                    className="w-full p-4 rounded-2xl bg-slate-50 outline-none focus:ring-2 focus:ring-orange-500/20 resize-none"
                    placeholder={`Describe step ${i + 1}...`}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setInstructions(
                        instructions.filter((_, idx) => idx !== i)
                      )
                    }
                    className="text-slate-300 hover:text-red-500"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setInstructions([...instructions, ""])}
                className="text-sm font-bold text-orange-600 hover:underline"
              >
                {" "}
                + Add Step
              </button>
            </div>
          </div>
          <button className="w-full bg-slate-900 text-white py-6 rounded-[2rem] font-black text-xl hover:bg-orange-600 transition-all shadow-xl shadow-orange-900/10">
            Publish Recipe
          </button>
        </form>
      </div>
    </main>
  );
}
