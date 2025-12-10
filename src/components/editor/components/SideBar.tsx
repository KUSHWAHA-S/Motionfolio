import { Portfolio, SectionType } from "@/types/portfolio";


export default function Sidebar({
  active,
  onChange,
  onAdd,
  saving,
  tab,
  setTab,
  portfolio,
}: {
  active: SectionType;
  onChange: (s: SectionType) => void;
  onAdd: (s: SectionType) => void;
  saving: boolean;
  tab: "edit" | "preview";
  setTab: (t: "edit" | "preview") => void;
  portfolio: Portfolio;
}) {
  const items: { id: SectionType; label: string }[] = [
    { id: "hero", label: "Hero" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "theme", label: "Theme" },
  ];

  return (
    <aside className='w-64 bg-white border-r p-4 flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <div className='font-semibold'>Editor</div>
        <div className='text-xs text-slate-500'>
          {saving ? "Saving" : "All saved"}
        </div>
      </div>

      <div className='flex gap-2'>
        <button
          onClick={() => setTab("edit")}
          className={`px-3 py-1 rounded ${
            tab === "edit" ? "bg-slate-900 text-white" : "bg-slate-100"
          }`}
        >
          Edit
        </button>
        <button
          onClick={() => setTab("preview")}
          className={`px-3 py-1 rounded ${
            tab === "preview" ? "bg-slate-900 text-white" : "bg-slate-100"
          }`}
        >
          Preview
        </button>
      </div>

      <div className='space-y-2 mt-4'>
        {items.map((it) => (
          <motion.button
            key={it.id}
            onClick={() => onChange(it.id)}
            whileHover={{ x: 6 }}
            className={`w-full text-left p-2 rounded-md ${
              active === it.id ? "bg-sky-600 text-white" : "hover:bg-slate-50"
            }`}
          >
            {it.label}
          </motion.button>
        ))}
      </div>

      <div className='mt-auto'>
        <div className='text-xs text-slate-500 mb-2'>Add section</div>
        <div className='flex gap-2 flex-wrap'>
          <button
            onClick={() => onAdd("projects")}
            className='px-3 py-1 bg-white border rounded shadow-sm'
          >
            + Projects
          </button>
          <button
            onClick={() => onAdd("experience")}
            className='px-3 py-1 bg-white border rounded shadow-sm'
          >
            + Experience
          </button>
          <button
            onClick={() => onAdd("skills")}
            className='px-3 py-1 bg-white border rounded shadow-sm'
          >
            + Skills
          </button>
        </div>

        <div className='mt-4 text-xs text-slate-500'>Theme</div>
        <div className='mt-2'>
          <div className='text-sm font-medium'>Primary</div>
          <input
            type='color'
            value={portfolio.theme.primary}
            onChange={(e) =>
              setTheme({ ...portfolio.theme, primary: e.target.value })
            }
            className='w-10 h-10 p-0 border-0'
          />
        </div>
      </div>
    </aside>
  );
}
