import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { COURSES } from '../constants';
import { CourseModule } from '../types';
import Quiz from '../components/Quiz';
import { useAuth } from '../context/AuthContext';

const TextIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm2 4h8v2H6V8zm0 4h8v2H6v-2z" clipRule="evenodd" /></svg>;
const VideoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2-2H4a2 2 0 01-2-2V6zm14 8V6a1 1 0 00-1-1H5a1 1 0 00-1 1v8a1 1 0 001 1h10a1 1 0 001-1zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8z" /></svg>;
const QuizIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V14a1 1 0 11-2 0v-3.17A3.001 3.001 0 017 8a3 3 0 014.133-2.5 1 1 0 00-.866-.5z" clipRule="evenodd" /></svg>;
const CodeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>;

const CourseDetailPage: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const course = COURSES.find(c => c.id === courseId);
    const [selectedModuleIndex, setSelectedModuleIndex] = useState(0);
    const { isAuthenticated, progress, updateModuleProgress } = useAuth();

    if (!course) {
        return <Navigate to="/courses" />;
    }

    const completedModules = (isAuthenticated && progress[course.id]) || [];
    const totalModules = course.modules.length;
    const progressPercentage = totalModules > 0 ? Math.round((completedModules.length / totalModules) * 100) : 0;

    const selectedModule = course.modules[selectedModuleIndex];

    const markCurrentModuleComplete = () => {
        if (isAuthenticated) {
            updateModuleProgress(course.id, selectedModule.id);
        }
    };

    const goToNextModule = () => {
        markCurrentModuleComplete();
        if (selectedModuleIndex < course.modules.length - 1) {
            setSelectedModuleIndex(selectedModuleIndex + 1);
        }
    };

    const goToPreviousModule = () => {
        if (selectedModuleIndex > 0) {
            setSelectedModuleIndex(selectedModuleIndex - 1);
        }
    };

    const renderModuleContent = (module: CourseModule) => {
        switch (module.type) {
            case 'text':
                return (
                    <div className="prose prose-invert max-w-none prose-headings:text-brand prose-p:text-text-primary prose-strong:text-text-primary prose-li:text-text-primary" dangerouslySetInnerHTML={{ __html: module.content.replace(/\n/g, '<br />') }} />
                );
            case 'video':
                return (
                    <div className="w-full aspect-video rounded-lg overflow-hidden">
                        <iframe
                            src={`https://www.youtube-nocookie.com/embed/${module.youtubeId}`}
                            title={module.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </div>
                );
            case 'quiz':
                return <Quiz questions={module.questions} onComplete={markCurrentModuleComplete} />;
            case 'code':
                return (
                    <div>
                        <p className="mb-4 text-highlight">Run and edit the code below to complete the exercise.</p>
                        <div className="w-full h-[600px] border border-accent rounded-lg overflow-hidden">
                            <iframe
                                src={module.embedUrl}
                                title={module.title}
                                frameBorder="0"
                                allowFullScreen
                                className="w-full h-full bg-white"
                            ></iframe>
                        </div>
                    </div>
                );
            default:
                return <p>Unsupported module type.</p>;
        }
    };

    const getIconForModule = (type: string) => {
        switch (type) {
            case 'text': return <TextIcon />;
            case 'video': return <VideoIcon />;
            case 'quiz': return <QuizIcon />;
            case 'code': return <CodeIcon />;
            default: return null;
        }
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">{course.title}</h1>
                <p className="text-highlight text-lg mb-4">{course.description}</p>
                {isAuthenticated && (
                    <div className="mt-4">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-semibold text-highlight">Course Progress</span>
                            <span className="text-sm font-semibold text-brand">{progressPercentage}% Complete</span>
                        </div>
                        <div className="w-full bg-accent rounded-full h-4">
                            <div className="bg-brand h-4 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <aside className="lg:w-1/4 flex-shrink-0">
                    <div className="bg-secondary p-4 rounded-lg sticky top-20">
                        <h3 className="font-bold text-lg mb-4">Course Content</h3>
                        <ul>
                            {course.modules.map((module, index) => {
                                const isCompleted = completedModules.includes(module.id);
                                return (
                                <li key={module.id}>
                                    <button
                                        onClick={() => setSelectedModuleIndex(index)}
                                        className={`w-full text-left p-3 rounded-md mb-2 flex items-center transition-colors ${
                                            selectedModuleIndex === index
                                                ? 'bg-brand text-primary'
                                                : 'hover:bg-accent text-highlight'
                                        }`}
                                    >
                                        {getIconForModule(module.type)}
                                        <span className="flex-1">{module.title}</span>
                                        {isCompleted && <CheckCircleIcon />}
                                    </button>
                                </li>
                            )})}
                        </ul>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="lg:w-3/4">
                    <div className="bg-secondary p-6 sm:p-8 rounded-lg min-h-[500px] flex flex-col">
                       <div className="flex-grow">
                            <h2 className="text-3xl font-bold mb-6">{selectedModule.title}</h2>
                            {renderModuleContent(selectedModule)}
                       </div>
                       <div className="mt-8 pt-6 border-t border-accent flex justify-between items-center">
                            <button 
                                onClick={goToPreviousModule} 
                                disabled={selectedModuleIndex === 0}
                                className="bg-accent hover:bg-highlight text-text-primary font-bold py-2 px-4 rounded-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                &larr; Previous
                            </button>
                            {selectedModuleIndex < course.modules.length - 1 ? (
                                <button 
                                    onClick={goToNextModule}
                                    className="bg-brand hover:bg-sky-400 text-primary font-bold py-2 px-4 rounded-md transition-colors duration-300"
                                >
                                    {completedModules.includes(selectedModule.id) ? 'Next Module' : 'Complete & Next'} &rarr;
                                </button>
                            ) : (
                                <button
                                    onClick={markCurrentModuleComplete}
                                    disabled={completedModules.includes(selectedModule.id)}
                                    className="bg-green-500 hover:bg-green-400 text-primary font-bold py-2 px-4 rounded-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {completedModules.includes(selectedModule.id) ? 'Course Finished' : 'Finish Course'}
                                </button>
                            )}
                       </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CourseDetailPage;