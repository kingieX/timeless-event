// // import React from 'react'

// import UnderConstruction from '../../../components/UnderConstruction';

// const MyHome = () => {
//   return (
//     <div>
//       <UnderConstruction />
//     </div>
//   );
// };

// export default MyHome;

import { Link } from 'react-router-dom';

const MyHome = ({ projects }) => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">My Projects</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map(project => (
          <div key={project.id} className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <Link
              to={`/projects/${project.id}`}
              className="text-blue-500 hover:underline"
            >
              View Project
            </Link>
          </div>
        ))}
        {/* Add New Project Card */}
        <div className="bg-white p-4 shadow-md rounded-md flex items-center justify-center">
          <button
            className="text-blue-500 text-lg"
            onClick={() => {
              /* Logic to open add project modal */
            }}
          >
            + Add New Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyHome;
