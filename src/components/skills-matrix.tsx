import { Reveal } from "@/components/reveal";
import type { SkillGroup } from "@/lib/types";

export function SkillsMatrix({ groups }: { groups: SkillGroup[] }) {
  return (
    <section id="skills" className="section-block">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Skills</p>
          <h2>Stack transversal para construir producto real</h2>
        </Reveal>

        <div className="skills-grid">
          {groups.map((group) => (
            <Reveal key={group.id} className="skill-card">
              <h3>{group.title}</h3>
              <ul>
                {group.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
