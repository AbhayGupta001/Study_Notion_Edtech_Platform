import Spinner from '../../common/Spinner';
import { sidebarLinks } from '../../../data/dashboard-links';
import SideBarLink from './SideBarLink';
import { SlClose } from 'react-icons/sl';
import { ImExit } from 'react-icons/im';
import { useSelector } from 'react-redux';

const SideBar = ({showConfirmationModal,clicked,setClicked}) => {

  const { loading: authLoading } = useSelector(state => state.auth);
  const { loading: profileLoading, user } = useSelector(state => state.profile);


  if( profileLoading || authLoading )
    return <Spinner/>

  return (
    <div className={`font-inter max-sm:absolute z-50 left-0 top-0 border-richblack-800 border-r ${
      !clicked ? "max-sm:-translate-x-[400px] max-sm:invisible" : "visible"
    } bg-richblack-800 h-[calc(100vh-3.6rem)] w-[220px] text-white py-10 transition-all duration-500 ease-linear`}>

      <div className='flex flex-col'>
        <button className='self-end text-2xl m-4 text-richblack-100 bg-transparent border border-transparent rounded-full flex items-center justify-center sm:hidden hover:bg-richblack-100 hover:text-richblack-800 hover:border-richblack-100 transition-all duration-75' onClick={()=> setClicked(prev => !prev)}>
          <SlClose/>
        </button>
        
        {
          sidebarLinks.map(link => {
              if(link.type && link.type !== user.accountType) return null;
              return <SideBarLink key={link.id} link={link} iconName={link.icon}/>
          })
        }

        <hr className=' w-[80%] mx-auto text-richblack-700 my-6 '/>

        <SideBarLink key={{id:6}} link={{
            name:"Setings",
            path:"dashboard/settings",
            icon:"VscSettingsGear"
          }} 
          iconName={"VscSettingsGear"}
        />
      </div>
      
      <button className={`flex gap-x-2 px-7 pr-10 py-[0.4rem] items-center text-[15px] text-richblack-300 border-l-[4px] border-transparent transition-all duration-200 
         font-medium whitespace-nowrap w-full`} onClick={showConfirmationModal}>
            <span>
                <ImExit className="text-lg"/>
            </span>
            <p>Logout</p>
        </button>
    </div>
  )
}

export default SideBar