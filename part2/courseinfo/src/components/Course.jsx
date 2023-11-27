import React from "react";

function Course({ courses }) {
  return (
    <div>
      {courses.map((course) => {
        return (
          <div key={course.id}>
            <h1>{course.name}</h1>
            <div>
              {course.parts.map((part) => {
                return (
                  <p key={part.id}>
                    {part.name} {part.exercises}
                  </p>
                );
              })}
            </div>
            <p>
              <b>
                total of{" "}
                {course.parts
                  .map((part) => part.exercises)
                  .reduce((acc, curr) => acc + curr, 0)}{" "}
                exercises
              </b>
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default Course;
