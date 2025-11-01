import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../types';
import { useAuth } from '../context/AuthContext';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { isAuthenticated, progress } = useAuth();

  const completedModules = (isAuthenticated && progress[course.id]) || [];
  const totalModules = course.modules.length;
  const percentage = totalModules > 0 ? Math.round((completedModules.length / totalModules) * 100) : 0;

  const getButtonText = () => {
    if (percentage === 100) return 'Review Course';
    if (percentage > 0) return 'Continue Learning';
    return 'Start Learning';
  }

  return (
    <div className="bg-secondary rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex flex-col">
      <img className="w-full h-48 object-cover" src={course.thumbnailUrl} alt={course.title} />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-text-primary mb-2">{course.title}</h3>
        <p className="text-highlight text-sm flex-grow">{course.description}</p>
        
        {isAuthenticated && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-semibold text-highlight">Progress</span>
              <span className="text-xs font-semibold text-brand">{percentage}%</span>
            </div>
            <div className="w-full bg-accent rounded-full h-2.5">
              <div className="bg-brand h-2.5 rounded-full transition-all duration-300" style={{ width: `${percentage}%` }}></div>
            </div>
          </div>
        )}

        <div className="mt-6">
          <Link
            to={`/course/${course.id}`}
            className="w-full text-center bg-brand hover:bg-sky-400 text-primary font-bold py-2 px-4 rounded-md transition-colors duration-300 inline-block"
          >
            {getButtonText()}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
