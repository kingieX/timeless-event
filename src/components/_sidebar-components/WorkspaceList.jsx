import { Link } from 'react-router-dom';
import { MdWorkOutline } from 'react-icons/md';
import { TiFolder } from 'react-icons/ti';
import { IoAddCircleOutline } from 'react-icons/io5';

const WorkspaceList = ({ workspaces }) => {
  return (
    <div className="border-t border-gray mt-4 mb-10">
      <Link
        to="/app/workspace"
        className="flex items-center px-4 py-3 hover:bg-blue-50 cursor-pointer"
      >
        <MdWorkOutline className="w-6 h-6 mr-4" />
        <span>Workspace</span>
        <IoAddCircleOutline className="w-6 h-6 ml-auto" />
      </Link>

      {workspaces.map((workspace, index) => (
        <Link
          key={index}
          to={`/app/workspace/${workspace.team_space_id}`}
          className="flex items-center pl-10 px-4 py-2 hover:bg-blue-50 cursor-pointer"
        >
          <TiFolder className="w-6 h-6 mr-4" />
          <span>{workspace.team_space_name}</span>
        </Link>
      ))}
    </div>
  );
};

export default WorkspaceList;
