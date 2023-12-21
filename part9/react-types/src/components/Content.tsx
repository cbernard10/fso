import CoursePart from "../types";

type Props = { courseParts: CoursePart[] };

function Content({ courseParts }: Props) {
  return (
    <ul style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {courseParts.map((part) => {
        switch (part.kind) {
          case "basic":
            return (
              <li>
                <h3>
                  {part.name} {part.exerciseCount}
                </h3>
                <p>{part.description}</p>
              </li>
            );
          case "group":
            return (
              <li>
                <h3>
                  {part.name} {part.exerciseCount}
                </h3>
                <p>project exercises {part.groupProjectCount}</p>
              </li>
            );
          case "background":
            return (
              <li>
                <h3>
                  {part.name} {part.exerciseCount}
                </h3>
                <p>{part.description}</p>
                <p>required background: {part.backgroundMaterial}</p>
              </li>
            );
          case "special":
            return (
              <li>
                <h3>
                  {part.name} {part.exerciseCount}
                </h3>
                <p>{part.description}</p>
                <p>required skills: {part.requirements.join(", ")}</p>
              </li>
            );
        }
      })}
    </ul>
  );
}

export default Content;
