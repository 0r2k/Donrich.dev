import type { Category, CaseStudyMode } from "@/lib/types";

type Props = {
  categories: Category[];
  selectedCategory?: string;
  selectedType?: CaseStudyMode;
  query?: string;
};

export function ProjectsFilter({ categories, selectedCategory, selectedType, query }: Props) {
  return (
    <form action="/proyectos" className="projects-filter">
      <label>
        Buscar
        <input type="text" name="q" defaultValue={query} placeholder="Buscar por stack, titulo o resumen" />
      </label>

      <label>
        Categoria
        <select name="categoria" defaultValue={selectedCategory ?? ""}>
          <option value="">Todas</option>
          {categories.map((category) => (
            <option key={category.id} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Tipo
        <select name="tipo" defaultValue={selectedType ?? ""}>
          <option value="">Todos</option>
          <option value="full">Caso completo</option>
          <option value="short">Ficha corta</option>
        </select>
      </label>

      <div className="projects-filter-actions">
        <button type="submit" className="btn btn-primary">
          Aplicar
        </button>
        <a href="/proyectos" className="btn btn-ghost">
          Limpiar
        </a>
      </div>
    </form>
  );
}
