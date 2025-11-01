
import React from 'react';
import { COURSES } from '../constants';
import CourseCard from '../components/CourseCard';

const CoursesPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-12">All Courses</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {COURSES.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
