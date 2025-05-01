import React from 'react';
import useWindowSize from '../hooks/useWindowSize';

const posts = [
    {
        id: 1,
        title: "Migrating to Linear 101",
        desc: "Linear helps streamline software projects, sprints, issues, and bug tracking. Here's how to get started.",
        author: "Jonathan Wills",
        date: "2022-01-10",
        img: "https://storage.googleapis.com/a1aa/image/316b7241-08c9-4ca0-be9c-9dfbbd279cdb.jpg"
    },
];

const Grid = ({ 
    children,
    columns = {
        mobile: 1,
        tablet: 2,
        desktop: 3
    },
    gap = 'gap-4',
    className = ''
}) => {
    const { isMobile, isTablet } = useWindowSize();

    const getGridColumns = () => {
        if (isMobile) return `grid-cols-${columns.mobile}`;
        if (isTablet) return `grid-cols-${columns.tablet}`;
        return `grid-cols-${columns.desktop}`;
    };

    return (
        <div className={`grid ${getGridColumns()} ${gap} ${className}`}>
            {children}
        </div>
    );
};

const BlogGrid = () => {
    return (
    <section className="max-w-[1280px] mx-auto px-6 mt-10 mb-16">
        <h2 className="text-gray-900 font-semibold text-base mb-6 select-none">Recent blog posts</h2>
        <Grid columns={{ mobile: 1, tablet: 2, desktop: 4 }} gap="gap-x-6 gap-y-8">
        {posts.map(post => (
            <article 
            key={post.id} 
            className="group relative space-y-3 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
            >
            <div className="overflow-hidden rounded-lg">
                <img 
                alt={post.title} 
                className="w-full object-cover h-[180px] group-hover:brightness-90 transition-all duration-300" 
                src={post.img} 
                />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-gray-700">
                {post.title}
            </h3>
            <p className="text-xs text-gray-600 leading-tight group-hover:text-gray-500">
                {post.desc}
            </p>
            <div className="flex items-center space-x-2 text-xs text-gray-500 font-medium">
                <i className="fas fa-user-circle text-base"></i>
                <span>{post.author}</span>
                <span>•</span>
                <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                </time>
            </div>
            </article>
        ))}
        </Grid>
        <div className="flex justify-center mt-8">
        <button className="bg-gray-900 text-white text-xs font-semibold px-6 py-2 rounded-md hover:bg-gray-800 transition" type="button">
            Loading more...
        </button>
        </div>
    </section>
    );
};

export default BlogGrid;