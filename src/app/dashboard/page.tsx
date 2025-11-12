// src/app/dashboard/page.tsx
"use client";

import useSWR from "swr";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function DashboardPage() {
  const router = useRouter();
  const {
    data: portfolios,
    error,
    mutate,
  } = useSWR("/api/portfolios", fetcher);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this portfolio?")) return;
    setDeletingId(id);
    const res = await fetch(`/api/portfolios/${id}`, { method: "DELETE" });
    if (res.ok) {
      mutate(); // refresh the list
    } else {
      alert("Failed to delete portfolio.");
    }
    setDeletingId(null);
  };

  if (error) return <p className='p-6'>Failed to load portfolios.</p>;
  if (!portfolios) return <p className='p-6'>Loading...</p>;

    return (
      <ProtectedRoute>
        <div className='max-w-6xl mx-auto py-10 px-6'>
          <Link href='/portfolio/new'> Portfolio</Link>
          <div className='flex justify-between items-center mb-6'>
            <h1 className='text-3xl font-bold'>Your Portfolios</h1>
            <Link
              href='/portfolio/new'
              className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg'
            >
              + Create New
            </Link>
          </div>

          {portfolios.length === 0 ? (
            <p>No portfolios yet. Click “Create New” to start.</p>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {portfolios.map((p: any) => (
                <div
                  key={p.id}
                  className='bg-slate-800 text-white p-5 rounded-2xl shadow-md hover:shadow-xl transition'
                >
                  <h2 className='text-xl font-semibold mb-2'>{p.title}</h2>
                  <p className='text-sm text-slate-400 mb-4'>
                    Last updated: {new Date(p.updated_at).toLocaleString()}
                  </p>
                  <div className='flex gap-2'>
                    <Link
                      href={`/portfolio/${p.id}/edit`}
                      className='bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-lg text-sm'
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/portfolio/${p.id}`}
                      className='bg-green-500 hover:bg-green-600 px-3 py-1 rounded-lg text-sm'
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDelete(p.id)}
                      disabled={deletingId === p.id}
                      className='bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg text-sm'
                    >
                      {deletingId === p.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </ProtectedRoute>
    );
}

// "use client";

// import ProtectedRoute from "@/components/ProtectedRoute";
// import { supabase } from "@/lib/supabaseClient";
// import { useUserStore } from "@/store/useUserStore";
// import Link from "next/link";

// export default function DashboardPage() {
//   const { clearUser } = useUserStore();

// //   const logout = async () => {
// //     await supabase.auth.signOut();
// //     clearUser();
// //     window.location.href = "/auth/signin";
// //   };
//   return (
//     <ProtectedRoute>
//       <div className='flex justify-center items-center min-h-screen'>
//         hello welcome to dashboard <br/>
//         <Link href='/portfolio/new'> Portfolio</Link>
//       </div>
//     </ProtectedRoute>
//   );
// }
