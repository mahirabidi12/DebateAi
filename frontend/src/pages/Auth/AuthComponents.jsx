// import React from 'react';

// export const AuthFormHeader = ({title, subtitle, setPage}) => (
//      <div className="text-center mb-6">
//         <button onClick={() => setPage('landing')} className="flex items-center space-x-2 mx-auto mb-4 text-gray-400 hover:text-white transition-colors">
//             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
//             <h1 className="text-xl font-bold tracking-wider">DebateAi</h1>
//         </button>
//         <h1 className="text-2xl font-bold text-white">{title}</h1>
//         <p className="text-sm text-gray-400 mt-2">{subtitle}</p>
//     </div>
// );

// export const SocialButton = ({ provider }) => {
//     const icons = {
//         GitHub: <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.293 2.864 7.92 6.781 9.143.497.092.679-.216.679-.48 0-.236-.009-.865-.014-1.698-2.779.604-3.364-1.34-3.364-1.34-.452-1.148-1.103-1.454-1.103-1.454-.901-.617.068-.605.068-.605 1 .07 1.528 1.026 1.528 1.026.888 1.522 2.33 1.082 2.9.828.09-.643.348-1.082.63-1.332-2.21-.252-4.533-1.107-4.533-4.924 0-1.087.388-1.977 1.025-2.673-.103-.253-.444-1.265.097-2.634 0 0 .835-.267 2.735 1.02a9.56 9.56 0 015.002 0c1.898-1.287 2.732-1.02 2.732-1.02.543 1.37.202 2.38.1 2.634.64.696 1.024 1.586 1.024 2.673 0 3.828-2.326 4.67-4.542 4.915.357.308.675.918.675 1.852 0 1.335-.012 2.413-.012 2.74 0 .267.18.577.687.479C19.14 19.916 22 16.29 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd"></path></svg>,
//         Google: <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.99,34.556,44,28.718,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
//     };
//     return (
//         <button className="social-btn w-full flex items-center justify-center py-2.5 rounded-md">
//             {icons[provider]} {provider}
//         </button>
//     );
// };

import React from 'react';
import { Link } from 'react-router-dom';

export const AuthFormHeader = ({title, subtitle}) => (
     <div className="text-center mb-6">
        <Link to="/" className="flex items-center space-x-2 mx-auto mb-4 text-gray-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
            <h1 className="text-xl font-bold tracking-wider">DebateAi</h1>
        </Link>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <p className="text-sm text-gray-400 mt-2">{subtitle}</p>
    </div>
);

export const SocialButton = ({ provider }) => {
    const icons = {
        GitHub: <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.293 2.864 7.92 6.781 9.143.497.092.679-.216.679-.48 0-.236-.009-.865-.014-1.698-2.779.604-3.364-1.34-3.364-1.34-.452-1.148-1.103-1.454-1.103-1.454-.901-.617.068-.605.068-.605 1 .07 1.528 1.026 1.528 1.026.888 1.522 2.33 1.082 2.9.828.09-.643.348-1.082.63-1.332-2.21-.252-4.533-1.107-4.533-4.924 0-1.087.388-1.977 1.025-2.673-.103-.253-.444-1.265.097-2.634 0 0 .835-.267 2.735 1.02a9.56 9.56 0 015.002 0c1.898-1.287 2.732-1.02 2.732-1.02.543 1.37.202 2.38.1 2.634.64.696 1.024 1.586 1.024 2.673 0 3.828-2.326 4.67-4.542 4.915.357.308.675.918.675 1.852 0 1.335-.012 2.413-.012 2.74 0 .267.18.577.687.479C19.14 19.916 22 16.29 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd"></path></svg>,
        Google: <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.99,34.556,44,28.718,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
    };
    return (
        <button className="social-btn w-full flex items-center justify-center py-2.5 rounded-md">
            {icons[provider]} {provider}
        </button>
    );
};

