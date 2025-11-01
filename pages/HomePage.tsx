
import React from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import { COURSES } from '../constants';

const HomePage: React.FC = () => {
    const featuredCourses = COURSES.slice(0, 3);

    return (
        <div>
            {/* Hero Section */}
            <section className="text-center py-20">
                <h1 className="text-5xl md:text-6xl font-extrabold text-text-primary tracking-tight">
                    Unlock the Power of <span className="text-brand">Artificial Intelligence</span>
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-lg text-highlight">
                    Join SH AI Academy to master the essential skills in AI, Machine Learning, and Data Science through our expert-led courses.
                </p>
                <div className="mt-8">
                    <Link to="/courses" className="bg-brand hover:bg-sky-400 text-primary font-bold py-3 px-8 rounded-md text-lg transition-transform duration-300 inline-block transform hover:scale-105">
                        Explore Courses
                    </Link>
                </div>
            </section>

            {/* Featured Courses Section */}
            <section className="py-16">
                <h2 className="text-3xl font-bold text-center mb-10">Featured Courses</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredCourses.map(course => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
                 <div className="text-center mt-12">
                    <Link to="/courses" className="text-brand hover:underline font-semibold">
                        View All Courses &rarr;
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
