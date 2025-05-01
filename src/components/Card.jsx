import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/formatUtils';

const Card = ({ post, item, type = 'post' }) => {
    if (type === 'item' && item) {
        return (
            <Link to={`/items/${item.id}`} className="group">
                <article className="space-y-3 group hover:scale-[1.02] transition-transform duration-300">
                    <div className="overflow-hidden rounded-lg">
                        <img
                            alt={item.name}
                            className="rounded-lg w-full object-cover h-[180px] group-hover:opacity-90 transition-opacity"
                            src={item.image_url || '/placeholder-item.jpg'}
                        />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-gray-700 transition-colors">
                        {item.name}
                    </h3>
                    <p className="text-xs text-gray-600 leading-tight line-clamp-2">
                        {item.description}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-gray-900">{formatCurrency(item.price)}</span>
                        <span className="text-gray-500">{item.stock} in stock</span>
                    </div>
                    {item.store && (
                        <div className="text-xs text-gray-500">
                            {item.store.name}
                        </div>
                    )}
                </article>
            </Link>
        );
    }

    return (
        <article className="space-y-3 group hover:scale-[1.02] transition-transform duration-300">
            <div className="overflow-hidden rounded-lg">
                <img
                    alt={post.title}
                    className="rounded-lg w-full object-cover h-[180px] group-hover:opacity-90 transition-opacity"
                    src={post.image}
                />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-gray-700 transition-colors">
                {post.title}
            </h3>
            <p className="text-xs text-gray-600 leading-tight line-clamp-2">
                {post.description}
            </p>
            <div className="flex items-center space-x-2 text-xs text-gray-500 font-medium">
                <i className="fas fa-user-circle text-base"></i>
                <span>{post.author}</span>
                <span>•</span>
                <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', { 
                        day: 'numeric', 
                        month: 'short', 
                        year: 'numeric' 
                    })}
                </time>
            </div>
        </article>
    );
};

export default Card;